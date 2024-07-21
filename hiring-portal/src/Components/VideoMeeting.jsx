import React, { useState, useRef } from 'react';
import '../CSS/videoMeeting.css';

const VideoMeeting = () => {
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isMicOn, setIsMicOn] = useState(true);
    const [isInCall, setIsInCall] = useState(false);
    const videoRef = useRef(null);

    const handleStartStopCamera = () => {
        if (isCameraOn) {
            // Stop camera logic
        } else {
            // Start camera logic
        }
        setIsCameraOn(!isCameraOn);
    };

    const handleMuteUnmuteMic = () => {
        if (isMicOn) {
            // Mute mic logic
        } else {
            // Unmute mic logic
        }
        setIsMicOn(!isMicOn);
    };

    const handleEndCall = () => {
        setIsInCall(false);
    };

    const handleStartCall = () => {
        setIsInCall(true);
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
