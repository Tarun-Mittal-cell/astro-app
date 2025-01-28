import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ShoppingBag, Filter, Star, X, ShoppingCart, Gem, BookText, Sparkle } from "lucide-react";
import type { Product } from "@db/schema";

const CATEGORIES = [
  "Crystal Sets",
  "Rudraksha Malas",
  "Tarot Decks",
  "Sacred Books",
  "Meditation Tools",
  "Healing Crystals",
  "Ritual Items",
  "Divination Tools"
];

const SAMPLE_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Crystal Healing Set",
    price: "2999",
    description: "A complete set of healing crystals including Amethyst, Rose Quartz, Clear Quartz, and Black Tourmaline. Perfect for chakra balancing and energy healing.",
    category: "Crystal Sets",
    imageUrl: "crystal-set",
    rating: 4.9,
    reviews: 128
  },
  {
    id: 2,
    name: "Panchmukhi Rudraksha Mala",
    price: "5999",
    description: "Sacred 108-bead Rudraksha mala, traditionally blessed and energetically purified. Ideal for spiritual practices and meditation.",
    category: "Rudraksha Malas",
    imageUrl: "mala",
    rating: 5.0,
    reviews: 89
  },
  {
    id: 3,
    name: "Mystic Tarot Deck",
    price: "1999",
    description: "Premium tarot deck with gold-foil embellishments, featuring stunning artwork and a comprehensive guidebook for readings.",
    category: "Tarot Decks",
    imageUrl: "tarot",
    rating: 4.8,
    reviews: 256
  },
  {
    id: 4,
    name: "Healing Crystals Collection",
    price: "3499",
    description: "Curated collection of rare healing crystals including Moldavite, Celestite, and Labradorite. Each crystal is ethically sourced.",
    category: "Healing Crystals",
    imageUrl: "crystals",
    rating: 4.7,
    reviews: 167
  },
  {
    id: 5,
    name: "Sacred Geometry Crystal Grid",
    price: "4299",
    description: "Handcrafted crystal grid with sacred geometry patterns, perfect for amplifying crystal energy and meditation practices.",
    category: "Crystal Sets",
    imageUrl: "grid",
    rating: 4.9,
    reviews: 73
  }
];

const ProductIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "crystal-set":
    case "crystals":
      return <Gem className="w-12 h-12 text-purple-500" />;
    case "mala":
      return <div className="w-12 h-12 rounded-full border-2 border-orange-500 flex items-center justify-center">
        <span className="text-orange-500 font-bold">ॐ</span>
      </div>;
    case "tarot":
      return <BookText className="w-12 h-12 text-purple-500" />;
    case "grid":
      return <Sparkle className="w-12 h-12 text-purple-500" />;
    default:
      return <Gem className="w-12 h-12 text-purple-500" />;
  }
};

const ProductCard = ({ id, name, price, description, category, imageUrl, rating, reviews, onQuickView }: Product & { onQuickView: () => void }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <CardContent className="p-6">
        <div className="aspect-square mb-4 rounded-lg bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center">
          <ProductIcon type={imageUrl} />
        </div>
        <div>
          <span className="text-sm text-purple-600 mb-1 block">{category}</span>
          <h3 className="font-semibold text-lg mb-2 group-hover:text-purple-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">({reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
              ₹{price.toLocaleString('en-IN')}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={onQuickView}
              className="hover:bg-purple-50"
            >
              Quick View
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // For now, use sample data
  const { data: products = SAMPLE_PRODUCTS } = useQuery<Product[]>({
    queryKey: ["/api/products"],
    enabled: false // Disable actual API call for now
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF]">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent mb-6">
            Sacred Treasures
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our curated collection of spiritual artifacts and tools for your journey
          </p>
        </motion.div>

        {/* Featured Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12"
        >
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => setActiveCategory(category === activeCategory ? null : category)}
            >
              <Card className={`h-full hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm cursor-pointer group 
                ${activeCategory === category ? 'ring-2 ring-purple-500' : ''}`}>
                <CardContent className="p-4 text-center">
                  <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent group-hover:opacity-80">
                    {category}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <Card className="flex-grow bg-white/90 backdrop-blur-sm">
            <CardContent className="py-2 px-4">
              <div className="flex items-center">
                <Search className="w-5 h-5 text-purple-400 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search sacred items..."
                  className="w-full bg-transparent border-none focus:outline-none text-gray-700 placeholder-gray-400 ml-2"
                />
              </div>
            </CardContent>
          </Card>
          <Button variant="outline" className="flex items-center gap-2 hover:bg-purple-50">
            <Filter className="w-4 h-4 text-purple-500" />
            Filters
          </Button>
          <Button variant="outline" className="flex items-center gap-2 hover:bg-purple-50 relative">
            <ShoppingBag className="w-4 h-4 text-purple-500" />
            Cart
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center">
              0
            </span>
          </Button>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {(activeCategory
            ? products.filter(p => p.category === activeCategory)
            : products
          ).map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onQuickView={() => setSelectedProduct(product)}
            />
          ))}
        </div>

        {/* Quick View Modal */}
        <AnimatePresence>
          {selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProduct(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="grid md:grid-cols-2 gap-6 p-6">
                  <div className="relative">
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="absolute -right-3 -top-3 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-purple-50 to-orange-50 flex items-center justify-center">
                      <ProductIcon type={selectedProduct.imageUrl} />
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-purple-600 mb-2 block">
                      {selectedProduct.category}
                    </span>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent mb-2">
                      {selectedProduct.name}
                    </h2>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(selectedProduct.rating) ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">({selectedProduct.reviews}+ Reviews)</span>
                    </div>
                    <p className="text-gray-600 mb-6">{selectedProduct.description}</p>
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                        ₹{selectedProduct.price.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded">In Stock</span>
                    </div>
                    <div className="grid gap-4">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button variant="outline" className="w-full">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-24 text-center"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-[#FF7E1D] p-0.5">
            <CardContent className="bg-white/95 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent mb-4">
                Stay Connected with Divine Updates
              </h2>
              <p className="text-gray-600 mb-6">
                Subscribe to receive updates about new spiritual products and exclusive offers
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}