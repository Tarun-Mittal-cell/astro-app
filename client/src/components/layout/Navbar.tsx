import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b" role="navigation" aria-label="Main navigation">
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" aria-label="Home">
              <div className="flex items-center cursor-pointer">
                <span className="text-3xl mr-2 text-[#FF7E1D]" aria-hidden="true">ॐ</span>
                <span className="font-semibold text-xl tracking-wide">Divine Vaani</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/horoscope">
              <span className="text-gray-700 hover:text-purple-600 font-medium tracking-wide transition-colors duration-200">
                Horoscope
              </span>
            </Link>
            <Link href="/astrologers">
              <span className="text-gray-700 hover:text-purple-600 font-medium tracking-wide transition-colors duration-200">
                Astrologers
              </span>
            </Link>
            <Link href="/vedic-insights">
              <span className="text-gray-700 hover:text-purple-600 font-medium tracking-wide transition-colors duration-200">
                Vedic Insights
              </span>
            </Link>
            <Link href="/shop">
              <span className="text-gray-700 hover:text-purple-600 font-medium tracking-wide transition-colors duration-200">
                Shop
              </span>
            </Link>
            
            <Button 
              asChild 
              variant="outline" 
              className="hover:bg-purple-50 border-purple-600 text-purple-600 font-medium tracking-wide px-6"
            >
              <Link href="/horoscope">Get Free Horoscope</Link>
            </Button>
            <Button 
              asChild 
              className="bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90 font-medium tracking-wide px-6"
            >
              <Link href="/astrologers">Talk to Astrologer</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-purple-600 transition-colors duration-200"
              aria-expanded={isMenuOpen}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-4">
            <Link href="/horoscope">
              <span className="block py-2 text-gray-700 hover:text-purple-600 font-medium tracking-wide transition-colors duration-200">
                Horoscope
              </span>
            </Link>
            <Link href="/astrologers">
              <span className="block py-2 text-gray-700 hover:text-purple-600 font-medium tracking-wide transition-colors duration-200">
                Astrologers
              </span>
            </Link>
            <Link href="/vedic-insights">
              <span className="block py-2 text-gray-700 hover:text-purple-600 font-medium tracking-wide transition-colors duration-200">
                Vedic Insights
              </span>
            </Link>
            <Link href="/shop">
              <span className="block py-2 text-gray-700 hover:text-purple-600 font-medium tracking-wide transition-colors duration-200">
                Shop
              </span>
            </Link>
            
            <div className="space-y-3 pt-2">
              <Button 
                asChild 
                variant="outline" 
                className="w-full hover:bg-purple-50 border-purple-600 text-purple-600 font-medium tracking-wide"
              >
                <Link href="/horoscope">Get Free Horoscope</Link>
              </Button>
              <Button 
                asChild 
                className="w-full bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90 font-medium tracking-wide"
              >
                <Link href="/astrologers">Talk to Astrologer</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
