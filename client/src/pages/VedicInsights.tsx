import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Book, Flower, Star, Sparkles, Sun, Moon } from "lucide-react";

const INSIGHTS = [
  {
    title: "Understanding Karma",
    description: "Explore the cosmic law of cause and effect and how it shapes your destiny. Learn about different types of karma and ways to balance your karmic debt.",
    icon: Flower,
    color: "text-purple-600"
  },
  {
    title: "The Power of Mantras",
    description: "Discover sacred Sanskrit sounds that can transform your consciousness. Learn proper chanting techniques and the meaning behind powerful mantras.",
    icon: Star,
    color: "text-[#FF7E1D]"
  },
  {
    title: "Planetary Influences",
    description: "Understand how the nine planets (Navagraha) affect different aspects of your life and learn remedies to harmonize their energies.",
    icon: Sun,
    color: "text-purple-600"
  },
  {
    title: "Vedic Numerology",
    description: "Unlock the mystical significance of numbers in your life. Calculate your life path number and understand its deeper spiritual meaning.",
    icon: Sparkles,
    color: "text-[#FF7E1D]"
  },
  {
    title: "Chakra Balancing",
    description: "Learn about the seven major energy centers in your body. Discover techniques to activate and balance your chakras for optimal wellbeing.",
    icon: Moon,
    color: "text-purple-600"
  },
  {
    title: "Ayurvedic Wisdom",
    description: "Explore the ancient science of life through understanding your unique constitution (dosha) and natural healing practices.",
    icon: Book,
    color: "text-[#FF7E1D]"
  }
];

export default function VedicInsights() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF]">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
            Vedic Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
            Ancient wisdom for modern living: Explore the profound teachings of Vedic knowledge
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INSIGHTS.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group h-full bg-white/90 backdrop-blur-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                  <CardContent className="p-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-[#FF7E1D] p-0.5">
                          <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                            <Icon className={`w-8 h-8 ${insight.color}`} />
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                          {insight.title}
                        </h3>
                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {insight.description}
                        </p>
                        <Button 
                          variant="outline"
                          className="w-full hover:bg-gradient-to-r hover:from-purple-600 hover:to-[#FF7E1D] hover:text-white transition-all duration-300"
                        >
                          Explore More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}