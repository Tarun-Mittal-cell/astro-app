import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: React.ReactNode;
  };
  index: number;
}

export default function FeatureCard({ feature, index }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <Card className="group h-full hover:shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-sm border-purple-100/50 hover:border-purple-200/70">
        <CardContent className="p-8 relative overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-[#FF7E1D]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Animated Icon */}
          <motion.div
            className="mb-6 text-purple-600 group-hover:text-[#FF7E1D] transition-colors duration-300 relative z-10"
            whileHover={{ scale: 1.1, rotate: [0, 5, -5, 0] }}
            transition={{ duration: 0.5 }}
          >
            {feature.icon}
          </motion.div>

          {/* Content */}
          <div className="relative z-10">
            <motion.h3
              className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent"
              whileHover={{ scale: 1.02 }}
            >
              {feature.title}
            </motion.h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>

          {/* Decorative Elements */}
          <motion.div
            className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-[#FF7E1D]/10 rounded-tl-full"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className="absolute top-4 right-4 text-purple-200 opacity-20 transform rotate-45"
            initial={{ scale: 0.5 }}
            whileHover={{ scale: 1, rotate: 90 }}
            transition={{ duration: 0.3 }}
          >
            ✧
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
}