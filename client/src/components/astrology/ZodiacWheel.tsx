import { motion } from "framer-motion";
import { useState } from "react";

const zodiacSigns = [
  { name: "Aquarius", symbol: "♒", color: "#9747FF", gradient: "from-[#A5D8FF] to-[#74C0FC]" },
  { name: "Pisces", symbol: "♓", color: "#9747FF", gradient: "from-[#B197FC] to-[#9775FA]" },
  { name: "Aries", symbol: "♈", color: "#9747FF", gradient: "from-[#FFB8B1] to-[#FF8787]" },
  { name: "Taurus", symbol: "♉", color: "#9747FF", gradient: "from-[#8CE99A] to-[#69DB7C]" },
  { name: "Gemini", symbol: "♊", color: "#9747FF", gradient: "from-[#74C0FC] to-[#4DABF7]" },
  { name: "Cancer", symbol: "♋", color: "#9747FF", gradient: "from-[#E599F7] to-[#DA77F2]" },
  { name: "Leo", symbol: "♌", color: "#9747FF", gradient: "from-[#FFD8A8] to-[#FFC078]" },
  { name: "Virgo", symbol: "♍", color: "#9747FF", gradient: "from-[#96F2D7] to-[#63E6BE]" },
  { name: "Libra", symbol: "♎", color: "#9747FF", gradient: "from-[#BAC8FF] to-[#91A7FF]" },
  { name: "Scorpio", symbol: "♏", color: "#9747FF", gradient: "from-[#E599F7] to-[#DA77F2]" },
  { name: "Sagittarius", symbol: "♐", color: "#9747FF", gradient: "from-[#FFA8A8] to-[#FF8787]" },
  { name: "Capricorn", symbol: "♑", color: "#9747FF", gradient: "from-[#8CE99A] to-[#69DB7C]" }
];

export default function ZodiacWheel() {
  const [hoveredSign, setHoveredSign] = useState<string | null>(null);

  return (
    <div className="relative aspect-square">
          {/* Orange circular gradient background */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FFD4C0] to-[#FFE4D4] opacity-90" />

          {/* Rotating Wheel Container */}
          <motion.div 
            className="relative aspect-square"
            animate={{ 
              rotate: 360 
            }}
            transition={{
              duration: 120,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Zodiac signs */}
            {zodiacSigns.map((sign, index) => {
              const angle = (index * 30 - 90) * (Math.PI / 180); // Start from top (-90 degrees)
              const radius = 32; // Reduced radius to bring icons more inward
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);

              return (
                <motion.button
                  key={sign.name}
                  className="absolute w-12 h-12 -mt-6 -ml-6 flex items-center justify-center"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    rotate: `-${index * 30}deg` // Counter-rotate to keep icons upright
                  }}
                  onHoverStart={() => setHoveredSign(sign.name)}
                  onHoverEnd={() => setHoveredSign(null)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="relative group flex items-center justify-center">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${sign.gradient}
                      flex items-center justify-center shadow-sm backdrop-blur-sm 
                      transition-all duration-300 group-hover:shadow-md p-2.5`}
                    >
                      <span className="text-2xl text-white transition-transform duration-300 
                        group-hover:scale-110 drop-shadow-sm">
                        {sign.symbol}
                      </span>
                    </div>
                    {/* Sign name tooltip */}
                    <div className={`
                      absolute -bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1.5 
                      rounded-lg shadow-lg whitespace-nowrap text-sm
                      transition-all duration-200
                      ${hoveredSign === sign.name ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
                    `}>
                      <span className="font-medium" style={{ color: sign.color }}>
                        {sign.name}
                      </span>
                    </div>
                  </div>
                </motion.button>
              );
            })}

            {/* Center OM symbol */}
            <div className="absolute inset-[35%] rounded-full bg-white/90 backdrop-blur-sm 
              flex items-center justify-center shadow-lg">
              <motion.span 
                className="text-5xl text-[#FF7E1D]"
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                ॐ
              </motion.span>
            </div>
          </motion.div>
        </div>
  );
}