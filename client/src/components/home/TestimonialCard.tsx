import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: {
    name: string;
    text: string;
    rating: number;
    date: string;
    image: string;
  };
  index: number;
}

export default function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <Card className="group h-full hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm border-purple-100/50 hover:border-purple-200/70 relative overflow-hidden">
        <CardContent className="p-8">
          {/* Decorative Quote Mark */}
          <div className="absolute top-4 right-4 text-6xl font-serif text-purple-100 select-none">
            "
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4 mb-6 relative z-10">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-[#FF7E1D] rounded-full blur-md opacity-50" />
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover border-4 border-white relative z-10"
              />
            </motion.div>
            <div>
              <motion.h4 
                className="font-semibold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                {testimonial.name}
              </motion.h4>
              <p className="text-sm text-gray-500">{testimonial.date}</p>
            </div>
          </div>

          {/* Rating Stars */}
          <div className="mb-4 flex gap-0.5">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.2, rotate: [0, 15, -15, 0] }}
              >
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
              </motion.div>
            ))}
          </div>

          {/* Testimonial Text */}
          <motion.p 
            className="text-gray-600 italic relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            "{testimonial.text}"
          </motion.p>

          {/* Decorative Background Elements */}
          <motion.div
            className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/5 to-[#FF7E1D]/5 rounded-tl-full"
            initial={{ scale: 0 }}
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.3 }}
          />
          
          <motion.div
            className="absolute top-1/2 left-4 w-2 h-2 bg-purple-200 rounded-full"
            animate={{
              y: [0, -10, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
}