import React from "react";
import { io } from "socket.io-client";

const [isCameraOn, setIsCameraOn] = useState(false);
const [isMicOn, setIsMicOn] = useState(false);
const [isInCall, setIsInCall] = useState(false);
const videoRef = useRef(null);
const localStreamRef = useRef(null);
const peerConnectionRef = useRef(null);
const socket = useRef(io('http://localhost:5000')).current;
