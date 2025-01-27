import { useEffect, useRef, useState } from "react";
import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { io } from "socket.io-client";
import SimplePeer from "simple-peer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Video, Mic, MicOff, VideoOff, Send, Phone } from "lucide-react";

// Create socket instance outside component to prevent multiple connections
const socket = io(window.location.origin);

interface ConsultationData {
  consultation: {
    id: number;
    roomId: string;
    status: string;
  };
  messages: Array<{
    id: number;
    senderId: number;
    message: string;
    createdAt: string;
  }>;
}

export default function Consultation() {
  const { id } = useParams();
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ConsultationData["messages"]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [peer, setPeer] = useState<SimplePeer.Instance | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);

  const myVideo = useRef<HTMLVideoElement>(null);
  const userVideo = useRef<HTMLVideoElement>(null);

  const { data: consultationData } = useQuery<ConsultationData>({
    queryKey: ["/api/consultations", id],
    enabled: !!id
  });

  useEffect(() => {
    if (!consultationData?.consultation) return;

    const initializeMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        setStream(mediaStream);
        if (myVideo.current) {
          myVideo.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Failed to get media devices:", err);
        toast({
          title: "Error",
          description: "Failed to access camera and microphone",
          variant: "destructive"
        });
      }
    };

    initializeMedia();
    socket.emit("join-room", consultationData.consultation.roomId);

    // Initialize consultation messages
    if (consultationData.messages) {
      setMessages(consultationData.messages);
    }

    const handleUserConnected = (userId: string) => {
      if (!stream) return;

      const newPeer = new SimplePeer({
        initiator: true,
        trickle: false,
        stream
      });

      newPeer.on("signal", signal => {
        socket.emit("video-signal", {
          signal,
          roomId: consultationData.consultation.roomId
        });
      });

      newPeer.on("stream", remoteStream => {
        if (userVideo.current) {
          userVideo.current.srcObject = remoteStream;
        }
      });

      setPeer(newPeer);
    };

    const handleVideoSignal = (data: { signal: SimplePeer.SignalData }) => {
      if (peer) {
        peer.signal(data.signal);
      }
    };

    const handleReceiveMessage = (message: ConsultationData["messages"][0]) => {
      setMessages(prev => [...prev, message]);
    };

    socket.on("user-connected", handleUserConnected);
    socket.on("video-signal", handleVideoSignal);
    socket.on("receive-message", handleReceiveMessage);

    return () => {
      socket.off("user-connected", handleUserConnected);
      socket.off("video-signal", handleVideoSignal);
      socket.off("receive-message", handleReceiveMessage);

      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (peer) {
        peer.destroy();
      }
    };
  }, [consultationData, stream, peer, toast]);

  const sendMessage = () => {
    if (!message.trim() || !consultationData?.consultation) return;

    socket.emit("send-message", {
      consultationId: consultationData.consultation.id,
      senderId: 1, // Replace with actual user ID when auth is implemented
      message: message.trim(),
      roomId: consultationData.consultation.roomId
    });
    setMessage("");
  };

  const toggleAudio = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !isAudioEnabled;
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !isVideoEnabled;
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  if (!consultationData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF] py-8">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Section */}
          <div className="lg:col-span-2">
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="aspect-video bg-gray-900 rounded-lg mb-4 relative">
                  <video
                    ref={myVideo}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <video
                    ref={userVideo}
                    autoPlay
                    playsInline
                    className="absolute top-4 right-4 w-1/4 aspect-video object-cover rounded-lg border-2 border-white"
                  />
                </div>
                <div className="flex justify-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleAudio}
                    className={isAudioEnabled ? "bg-white" : "bg-red-50 text-red-600"}
                  >
                    {isAudioEnabled ? <Mic /> : <MicOff />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleVideo}
                    className={isVideoEnabled ? "bg-white" : "bg-red-50 text-red-600"}
                  >
                    {isVideoEnabled ? <Video /> : <VideoOff />}
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                  >
                    <Phone className="rotate-[135deg]" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Section */}
          <div>
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="h-[60vh] flex flex-col">
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.senderId === 1 ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            msg.senderId === 1
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          {msg.message}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    />
                    <Button onClick={sendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}