import { motion } from "framer-motion";
import { Link } from "wouter";
import React from "react";

interface QuickAccessToolProps {
  tool: {
    name: string;
    icon: React.ReactNode;
    path: string;
  };
}

export default function QuickAccessTool({ tool }: QuickAccessToolProps) {
  return (
    <Link href={tool.path}>
      <motion.div
        className="group cursor-pointer bg-white/80 backdrop-blur-sm hover:bg-white shadow-sm hover:shadow-md rounded-lg p-6 text-center transition-all duration-300 h-[120px] flex flex-col items-center justify-center relative overflow-hidden"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-[#FF7E1D]/5 opacity-0 group-hover:opacity-100"
          initial={{ scale: 0 }}
          whileHover={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Icon Container */}
        <motion.div
          className="bg-purple-50 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br from-purple-600/10 to-[#FF7E1D]/10 transition-all duration-300 relative"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.5 }}
        >
          {/* Glowing Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-[#FF7E1D]/20 rounded-xl blur-md opacity-0 group-hover:opacity-100"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />

          {/* Icon */}
          <div className="text-purple-600 group-hover:text-[#FF7E1D] transition-colors duration-300 relative z-10">
            {React.cloneElement(tool.icon as React.ReactElement, {
              size: 24,
              className: "transition-transform duration-300 group-hover:scale-110"
            })}
          </div>
        </motion.div>

        {/* Tool Name */}
        <motion.div
          className="mt-3 text-[15px] font-medium text-gray-800 group-hover:text-[#FF7E1D] transition-colors duration-300 relative z-10"
          whileHover={{ scale: 1.05 }}
        >
          {tool.name}
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-2 right-2 text-purple-200 opacity-20 transform rotate-45 text-xs"
          initial={{ scale: 0.5 }}
          whileHover={{ scale: 1, rotate: 90 }}
          transition={{ duration: 0.3 }}
        >
          ✧
        </motion.div>
        
        <motion.div
          className="absolute bottom-2 left-2 text-[#FF7E1D]/20 opacity-20 transform -rotate-45 text-xs"
          initial={{ scale: 0.5 }}
          whileHover={{ scale: 1, rotate: -90 }}
          transition={{ duration: 0.3 }}
        >
          ✧
        </motion.div>
      </motion.div>
    </Link>
  );
}