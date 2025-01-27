import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Star, Sun, Moon } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: Date;
}

export default function ChatMessage({ message, isBot, timestamp }: ChatMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex gap-3 mb-4",
        isBot ? "justify-start" : "justify-end"
      )}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-[#FF7E1D] p-0.5 flex-shrink-0">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <Sun className="w-4 h-4 text-[#FF7E1D]" />
          </div>
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-2xl p-4",
        isBot ? 
          "bg-white shadow-md" :
          "bg-gradient-to-r from-purple-600 to-[#FF7E1D] text-white"
      )}>
        <p className="text-sm">{message}</p>
        <p className="text-xs mt-1 opacity-60">
          {new Date(timestamp).toLocaleTimeString()}
        </p>
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-[#FF7E1D] p-0.5 flex-shrink-0">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
            <Moon className="w-4 h-4 text-purple-600" />
          </div>
        </div>
      )}
    </motion.div>
  );
}
