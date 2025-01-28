import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Calendar, Sparkles } from "lucide-react";

interface ZodiacCardProps {
  zodiac: {
    sign: string;
    imageUrl: string;
    element: string;
    date: string;
  };
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

const elementColors = {
  Fire: { from: "from-red-500", to: "to-orange-500", text: "text-orange-600" },
  Earth: { from: "from-green-500", to: "to-emerald-500", text: "text-emerald-600" },
  Air: { from: "from-blue-500", to: "to-cyan-500", text: "text-cyan-600" },
  Water: { from: "from-indigo-500", to: "to-purple-500", text: "text-purple-600" },
};

export default function ZodiacCard({ zodiac, isSelected, onSelect, index }: ZodiacCardProps) {
  const elementColor = elementColors[zodiac.element as keyof typeof elementColors];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      <Card 
        className={`group cursor-pointer transition-all duration-500 bg-white/90 backdrop-blur-sm overflow-hidden relative
          ${isSelected ? 'ring-2 ring-purple-500 ring-offset-2' : 'hover:shadow-xl'}`}
        onClick={onSelect}
      >
        <CardContent className="p-6 relative">
          {/* Animated Background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-[#FF7E1D]/5 opacity-0 group-hover:opacity-100"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />

          {/* Element-based Glow Effect */}
          <motion.div
            className={`absolute inset-0 bg-gradient-to-br ${elementColor.from} ${elementColor.to} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          />

          <div className="relative z-10">
            {/* Zodiac Symbol */}
            <motion.div
              className="w-16 h-16 mx-auto mb-4"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              <div className={`w-full h-full rounded-full bg-gradient-to-r ${elementColor.from} ${elementColor.to} p-0.5`}>
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
                  {/* Sparkle Effects */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100"
                    animate={{
                      background: [
                        `radial-gradient(circle at 30% 30%, ${elementColor.from}, transparent)`,
                        `radial-gradient(circle at 70% 70%, ${elementColor.to}, transparent)`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                  />
                  
                  <Star className={`w-8 h-8 ${elementColor.text} relative z-10`} />
                </div>
              </div>
            </motion.div>

            {/* Sign Name */}
            <motion.h3 
              className={`text-xl font-semibold mb-2 bg-gradient-to-r ${elementColor.from} ${elementColor.to} bg-clip-text text-transparent text-center`}
              whileHover={{ scale: 1.05 }}
            >
              {zodiac.sign}
            </motion.h3>

            {/* Date Range */}
            <motion.div 
              className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2"
              whileHover={{ scale: 1.05 }}
            >
              <Calendar className="w-4 h-4" />
              <span>{zodiac.date}</span>
            </motion.div>

            {/* Element */}
            <motion.div 
              className="flex items-center justify-center gap-1.5 text-sm"
              whileHover={{ scale: 1.05 }}
            >
              <Sparkles className={`w-4 h-4 ${elementColor.text}`} />
              <span className={`${elementColor.text}`}>{zodiac.element} Element</span>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className={`absolute top-2 right-2 text-sm ${elementColor.text} opacity-20`}
            animate={{
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            ✧
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}