import { motion } from "framer-motion";
import ZodiacWheel from "@/components/astrology/ZodiacWheel";

export default function EnhancedZodiacWheel() {
  return (
    <div className="relative aspect-square">
      {/* Purple Border Ring - Exactly on wheel's radius */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 50% 50%,
              transparent 0%,
              transparent calc(100% - 3px),
              rgba(147, 51, 234, 0.7) calc(100% - 3px),
              rgba(147, 51, 234, 0.7) 100%
            )
          `
        }}
        animate={{
          opacity: [0.7, 1, 0.7]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          boxShadow: `
            inset 0 0 20px rgba(147, 51, 234, 0.3),
            0 0 20px rgba(147, 51, 234, 0.3)
          `
        }}
        animate={{
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Zodiac Symbols Ring */}
      <motion.div
        className="absolute inset-0"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 text-purple-600"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${i * 30}deg) translateY(-150px) rotate(-${i * 30}deg)`,
            }}
            whileHover={{ scale: 1.2 }}
          >
            ✧
          </motion.div>
        ))}
      </motion.div>

      {/* Main Zodiac Wheel */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10"
      >
        <ZodiacWheel />
      </motion.div>

      {/* Energy Particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-[#FF7E1D] rounded-full"
            style={{
              top: '50%',
              left: '50%',
            }}
            animate={{
              x: [0, Math.cos(i * 30 * Math.PI / 180) * 150],
              y: [0, Math.sin(i * 30 * Math.PI / 180) * 150],
              scale: [1, 0],
              opacity: [1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}