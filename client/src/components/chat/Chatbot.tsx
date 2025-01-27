import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Minimize2, Maximize2, Star } from "lucide-react";
import ChatMessage from "./ChatMessage";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Message {
  id: number;
  message: string;
  senderId: number;
  consultationId: number;
  createdAt: string;
}

export default function Chatbot() {
  const [isMinimized, setIsMinimized] = useState(true);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  // Query chat history
  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ["/api/chat/history"],
    enabled: !isMinimized,
    refetchInterval: 3000, // Poll every 3 seconds for new messages
  });

  // Send message mutation
  const sendMessage = useMutation({
    mutationFn: async (message: string) => {
      const response = await fetch("/api/chat/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });
      if (!response.ok) {
        throw new Error('Failed to send message');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chat/history"] });
      scrollToBottom();
    },
  });

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      await sendMessage.mutate(newMessage);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="w-[400px] h-[600px] flex flex-col bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF] shadow-xl">
              {/* Header */}
              <div className="p-4 border-b flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-[#FF7E1D]" />
                  <h3 className="font-semibold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                    Astro Guide
                  </h3>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMinimized(true)}
                >
                  <Minimize2 className="w-4 h-4" />
                </Button>
              </div>

              {/* Chat Container */}
              <div
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {messages.map((msg) => (
                  <ChatMessage
                    key={`${msg.id}-${msg.createdAt}`}
                    message={msg.message}
                    isBot={msg.senderId === -1}
                    timestamp={new Date(msg.createdAt)}
                  />
                ))}
              </div>

              {/* Input Area */}
              <form onSubmit={handleSendMessage} className="p-4 border-t bg-white">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Ask your astrological question..."
                    className="flex-1"
                  />
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90"
                    disabled={sendMessage.isPending}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {isMinimized && (
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => setIsMinimized(false)}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90 shadow-lg"
          >
            <Maximize2 className="w-6 h-6" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}