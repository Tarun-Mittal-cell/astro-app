import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star } from "lucide-react";
import { Link } from "wouter";

interface AstrologerCardProps {
  astrologer: {
    name: string;
    specialty: string;
    experience: string;
    rating: number;
    consultations: string;
    languages: string[];
    expertise: string[];
    image: string;
    availability: string;
  };
  index: number;
}

export default function AstrologerCard({ astrologer, index }: AstrologerCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <Card className="group h-full overflow-hidden bg-white/80 backdrop-blur-sm border-purple-100/50 hover:border-purple-200/70 transition-all duration-500">
        <CardContent className="p-6">
          <div className="relative mb-6 overflow-hidden rounded-lg">
            <AspectRatio ratio={4 / 3}>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-[#FF7E1D]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                whileHover={{ scale: 1.1 }}
              />
              <motion.img
                src={astrologer.image}
                alt={astrologer.name}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            </AspectRatio>
            <Badge className="absolute top-2 right-2 bg-green-500/90 backdrop-blur-sm text-white border-0">
              {astrologer.availability}
            </Badge>
          </div>

          <div className="space-y-4">
            <div>
              <motion.h3 
                className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent"
                whileHover={{ scale: 1.02 }}
              >
                {astrologer.name}
              </motion.h3>
              <p className="text-[#FF7E1D]">{astrologer.specialty}</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1">
                <div className="flex -space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    </motion.div>
                  ))}
                </div>
                <span className="font-semibold ml-2">{astrologer.rating}</span>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {astrologer.experience}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {astrologer.expertise.map((exp) => (
                <Badge 
                  key={exp} 
                  variant="secondary" 
                  className="bg-purple-50 text-purple-600 hover:bg-purple-100 transition-colors duration-300"
                >
                  {exp}
                </Badge>
              ))}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-purple-100/50">
              <div className="text-sm text-gray-600">
                {astrologer.consultations} consultations
              </div>
              <Button 
                asChild 
                size="sm" 
                className="bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90 transition-opacity duration-300"
              >
                <Link href={`/consultation/${index + 1}`}>
                  Consult Now
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}