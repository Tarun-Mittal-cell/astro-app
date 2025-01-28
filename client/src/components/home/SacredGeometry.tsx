import { motion } from "framer-motion";

export default function SacredGeometry() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sri Yantra inspired pattern */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-[0.03]"
        initial={{ scale: 0.8, rotate: 0 }}
        animate={{ 
          scale: [0.8, 1, 0.8],
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Outer triangles */}
          <motion.path
            d="M50 10 L90 90 L10 90 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0 }}
          />
          <motion.path
            d="M50 15 L85 85 L15 85 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.2 }}
          />
          <motion.path
            d="M50 20 L80 80 L20 80 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.4 }}
          />
          
          {/* Inner triangles */}
          <motion.path
            d="M50 25 L75 75 L25 75 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.6 }}
          />
          <motion.path
            d="M50 30 L70 70 L30 70 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 0.8 }}
          />
          
          {/* Center bindu */}
          <motion.circle
            cx="50"
            cy="50"
            r="2"
            fill="currentColor"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 2 }}
          />
        </svg>
      </motion.div>

      {/* Lotus pattern */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.04]"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{
          duration: 45,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `rotate(${i * 45}deg)`,
            }}
          >
            <motion.div
              className="absolute top-0 left-1/2 w-1 h-[300px] origin-bottom"
              style={{
                background: "linear-gradient(to bottom, currentColor 0%, transparent 100%)",
              }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2, delay: i * 0.2 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Constellation dots */}
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-current rounded-full opacity-[0.03]"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 1, 0],
            opacity: [0, 0.03, 0]
          }}
          transition={{
            duration: 3,
            delay: Math.random() * 10,
            repeat: Infinity,
            repeatDelay: Math.random() * 10
          }}
        />
      ))}
    </div>
  );
}