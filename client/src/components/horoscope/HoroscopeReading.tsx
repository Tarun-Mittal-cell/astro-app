import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Sun, Moon, Sparkles } from "lucide-react";

interface HoroscopeReadingProps {
  sign: string;
  reading: {
    dailyReading: string;
    luckyNumber: number;
    color: string;
    mood: string;
  } | undefined;
  isLoading: boolean;
}

export default function HoroscopeReading({ sign, reading, isLoading }: HoroscopeReadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12"
    >
      <Card className="bg-white/90 backdrop-blur-sm overflow-hidden relative">
        {/* Animated Background */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-[#FF7E1D]/5"
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Decorative Elements */}
        <motion.div
          className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-[#FF7E1D]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <CardContent className="p-8 relative">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <motion.div
              className="w-12 h-12"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full h-full rounded-full bg-gradient-to-r from-purple-600 to-[#FF7E1D] p-0.5">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                  {/* Sparkle Effects */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      background: [
                        "radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.2), transparent)",
                        "radial-gradient(circle at 70% 70%, rgba(255, 126, 29, 0.2), transparent)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  <Star className="w-6 h-6 text-[#FF7E1D] relative z-10" />
                </div>
              </div>
            </motion.div>

            <div>
              <motion.h2
                className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                {sign} Horoscope
              </motion.h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Sun className="w-4 h-4" />
                <span>Today's Cosmic Guidance</span>
              </div>
            </div>
          </div>

          {/* Content */}
          {isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <motion.div
                className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                {/* Decorative Quote Marks */}
                <div className="absolute -top-4 -left-2 text-6xl font-serif text-purple-200 select-none">
                  "
                </div>
                <div className="absolute -bottom-8 -right-2 text-6xl font-serif text-[#FF7E1D]/20 select-none rotate-180">
                  "
                </div>

                {/* Reading Text */}
                <p className="text-gray-700 leading-relaxed relative z-10 px-4">
                  {reading?.dailyReading || "Your daily horoscope will appear here..."}
                </p>
                {reading && (
                  <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-purple-600 font-medium">Lucky Number</div>
                      <div className="text-gray-700">{reading.luckyNumber}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-600 font-medium">Color</div>
                      <div className="text-gray-700">{reading.color}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-purple-600 font-medium">Mood</div>
                      <div className="text-gray-700">{reading.mood}</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Elements */}
              <div className="mt-8 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  <span>Updated Daily</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  <span>Cosmic Insights</span>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}