import React, { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const Video = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isInCall, setIsInCall] = useState(false);
  const [userName, setUserName] = useState('');
  const [roomId, setRoomId] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const peerConnections = useRef({});
  const socket = useRef(io('http://localhost:5001')).current;

  useEffect(() => {
    if (isNameSet) {
      socket.emit('join', { userName, roomId });

      socket.on('user-joined', ({ userName: joinedUserName }) => {
        setConnectedUsers(prevUsers => [...prevUsers, joinedUserName]);
        getOrCreatePeerConnection(joinedUserName);
      });

      socket.on('user-left', ({ userName: leftUserName }) => {
        setConnectedUsers(prevUsers => prevUsers.filter(user => user !== leftUserName));
        if (peerConnections.current[leftUserName]) {
          peerConnections.current[leftUserName].close();
          delete peerConnections.current[leftUserName];
        }
      });

      socket.on('offer', async ({ offer, userName: remoteUserName }) => {
        const peerConnection = getOrCreatePeerConnection(remoteUserName);
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit('answer', { answer, userName, roomId });
      });

      socket.on('answer', async ({ answer, userName: remoteUserName }) => {
        const peerConnection = peerConnections.current[remoteUserName];
        if (peerConnection) {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        } else {
          console.error(`Peer connection for ${remoteUserName} not found.`);
        }
      });

      socket.on('candidate', ({ candidate, userName: remoteUserName }) => {
        const peerConnection = peerConnections.current[remoteUserName];
        if (peerConnection) {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        } else {
          console.error(`Peer connection for ${remoteUserName} not found.`);
        }
      });
    }
  }, [isNameSet]);

  const getOrCreatePeerConnection = (remoteUserName) => {
    if (!peerConnections.current[remoteUserName]) {
      console.log(`Creating new peer connection for ${remoteUserName}`);
      const peerConnection = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
      });

      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit('candidate', { candidate: event.candidate, userName, roomId });
        }
      };

      peerConnection.ontrack = (event) => {
        const remoteVideo = document.createElement('video');
        remoteVideo.srcObject = event.streams[0];
        remoteVideo.autoplay = true;
        remoteVideo.controls = false;
        remoteVideo.width = 300;
        remoteVideo.height = 300;
        document.getElementById('remote-videos').appendChild(remoteVideo);
      };

      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach(track => peerConnection.addTrack(track, localStreamRef.current));
      } else {
        console.error('Local stream not found');
      }

      peerConnections.current[remoteUserName] = peerConnection;
    }
    return peerConnections.current[remoteUserName];
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() !== '' && roomId.trim() !== '') {
      setIsNameSet(true);
    }
  };

  const handleStartStopCamera = async () => {
    if (isCameraOn) {
      const tracks = localStreamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: isMicOn });
        localStreamRef.current = stream;
        localVideoRef.current.srcObject = stream;
      } catch (error) {
        console.error("Error accessing media devices.", error);
        alert(`An unknown error occurred: ${error.message}`);
        return;
      }
    }
    setIsCameraOn(!isCameraOn);
  };

  const handleMuteUnmuteMic = () => {
    if (localStreamRef.current) {
      localStreamRef.current.getAudioTracks().forEach(track => (track.enabled = !track.enabled));
    }
    setIsMicOn(!isMicOn);
  };

  const handleStartCall = async () => {
    if (!localStreamRef.current) {
      alert('Please start the camera first.');
      return;
    }
    setIsInCall(true);
    for (const remoteUserName of connectedUsers) {
      const peerConnection = getOrCreatePeerConnection(remoteUserName);
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit('offer', { offer, userName, roomId });
    }
  };

  const handleEndCall = () => {
    for (const peerConnection of Object.values(peerConnections.current)) {
      peerConnection.close();
    }
    peerConnections.current = {};
    setIsInCall(false);
    setIsCameraOn(false);
    if (localStreamRef.current) {
      const tracks = localStreamRef.current.getTracks();
      tracks.forEach(track => track.stop());
      localVideoRef.current.srcObject = null;
    }
  };

  return (
    <div className="video-meeting-container">
      {!isNameSet ? (
        <form onSubmit={handleNameSubmit} className="name-form">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            required
          />
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Enter room ID"
            required
          />
          <button type="submit">Join</button>
        </form>
      ) : (
        <>
          <div className="video-container">
            <video ref={localVideoRef} autoPlay playsInline></video>
            <div id="remote-videos"></div>
          </div>
          <div className="controls">
            <button onClick={handleStartStopCamera} className={`control-btn ${isCameraOn ? 'on' : 'off'}`}>
              {isCameraOn ? 'Stop Camera' : 'Start Camera'}
            </button>
            <button onClick={handleMuteUnmuteMic} className={`control-btn ${isMicOn ? 'on' : 'off'}`}>
              {isMicOn ? 'Mute Mic' : 'Unmute Mic'}
            </button>
            {isInCall ? (
              <button onClick={handleEndCall} className="control-btn end-call">
                End Call
              </button>
            ) : (
              <button onClick={handleStartCall} className="control-btn start-call">
                Start Call
              </button>
            )}
          </div>
          <div className="user-list">
            <h3>Connected Users:</h3>
            <ul>
              {connectedUsers.map((user, index) => (
                <li key={index}>{user}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default Video;
