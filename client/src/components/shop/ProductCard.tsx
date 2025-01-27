import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShoppingCart, Star, Plus, Heart } from "lucide-react";

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  category?: string;
  rating?: number;
  onQuickView?: () => void;
}

export default function ProductCard({
  name,
  price,
  imageUrl,
  description,
  category,
  rating = 5,
  onQuickView
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm h-full">
        <CardContent className="p-0 h-full">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {category && (
              <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-purple-600">
                {category}
              </span>
            )}
            <button
              className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:text-red-500 transition-colors duration-300"
              aria-label="Add to wishlist"
            >
              <Heart className="w-4 h-4" />
            </button>
            <div className="absolute inset-x-4 bottom-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
                onClick={onQuickView}
                variant="secondary" 
                className="flex-1 bg-white/90 backdrop-blur-sm hover:bg-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Quick View
              </Button>
            </div>
          </div>

          <div className="p-6 flex flex-col h-[calc(100%-16rem)]">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                {name}
              </h3>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-600">{rating}</span>
              </div>
            </div>

            {description && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                {description}
              </p>
            )}

            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                ₹{price.toLocaleString('en-IN')}
              </span>
              <Button 
                className="bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}