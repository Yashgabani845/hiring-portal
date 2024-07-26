import React, { useState, useRef } from 'react';
import io from 'socket.io-client';
import '../CSS/videoMeeting.css';

const VideoMeeting = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isInCall, setIsInCall] = useState(false);
    const videoRef = useRef(null);
    const localStreamRef = useRef(null);
    const peerConnectionRef = useRef(null);
    const socket = useRef(io('http://localhost:5001')).current;

    // Handle incoming offer
    socket.on('offer', async (offer) => {
        console.log('Received offer:', offer);
        if (!peerConnectionRef.current) {
            console.error('Peer connection not initialized.');
            return;
        }
        try {
            await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(offer));
            const answer = await peerConnectionRef.current.createAnswer();
            await peerConnectionRef.current.setLocalDescription(answer);
            socket.emit('answer', answer);
        } catch (error) {
            console.error('Error handling offer:', error);
        }
    });

    // Handle incoming answer
    socket.on('answer', async (answer) => {
        console.log('Received answer:', answer);
        if (!peerConnectionRef.current) {
            console.error('Peer connection not initialized.');
            return;
        }
        try {
            if (peerConnectionRef.current.signalingState === 'have-local-offer') {
                await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(answer));
            } else {
                console.warn('Peer connection is not in correct state for answer:', peerConnectionRef.current.signalingState);
            }
        } catch (error) {
            console.error('Error handling answer:', error);
        }
    });

    // Handle incoming ICE candidates
    socket.on('candidate', async (candidate) => {
        console.log('Received candidate:', candidate);
        if (!peerConnectionRef.current) {
            console.error('Peer connection not initialized.');
            return;
        }
        try {
            if (peerConnectionRef.current.remoteDescription) {
                await peerConnectionRef.current.addIceCandidate(new RTCIceCandidate(candidate));
            } else {
                console.warn('Remote description is not set, cannot add candidate.');
            }
        } catch (error) {
            console.error('Error adding ICE candidate:', error);
        }
    });

    const handleStartStopCamera = async () => {
        if (isCameraOn) {
            const tracks = localStreamRef.current.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        } else {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: isMicOn });
                localStreamRef.current = stream;
                videoRef.current.srcObject = stream;
            } catch (error) {
                console.error("Error accessing media devices.", error);
                alert(`An unknown error occurred: ${error.message}`);
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

    const handleEndCall = () => {
        if (peerConnectionRef.current) {
            peerConnectionRef.current.close();
            peerConnectionRef.current = null;
        }
        setIsInCall(false);
        setIsCameraOn(false);
        const tracks = localStreamRef.current.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
    };

    const handleStartCall = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localStreamRef.current = stream;
            videoRef.current.srcObject = stream;
            setIsInCall(true);

            const peerConnectionConfig = {
                iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
            };

            peerConnectionRef.current = new RTCPeerConnection(peerConnectionConfig);

            stream.getTracks().forEach(track => peerConnectionRef.current.addTrack(track, stream));

            peerConnectionRef.current.onicecandidate = (event) => {
                if (event.candidate) {
                    console.log('Sending candidate:', event.candidate);
                    socket.emit('candidate', event.candidate);
                }
            };

            peerConnectionRef.current.ontrack = (event) => {
                console.log('Received remote stream:', event.streams);
                if (event.streams && event.streams.length > 0) {
                    const remoteVideo = document.createElement('video');
                    remoteVideo.srcObject = event.streams[0];
                    remoteVideo.autoplay = true;
                    remoteVideo.style.width="100px"
                    remoteVideo.style.height="100px"
                    document.body.appendChild(remoteVideo);
                } else {
                    console.warn('No remote streams received.');
                }
            };

            const offer = await peerConnectionRef.current.createOffer();
            await peerConnectionRef.current.setLocalDescription(offer);
            socket.emit('offer', offer);
        } catch (error) {
            console.error("Error starting call.", error);
            alert(`An unknown error occurred: ${error.message}`);
        }
    };

    return (
        <div className="video-meeting-container">
            <div className="video-container">
                <video ref={videoRef} autoPlay playsInline></video>
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
        </div>
    );
};

export default VideoMeeting;
