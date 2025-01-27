import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar(): JSX.Element {
  return (
    <nav className="bg-white shadow-sm border-b" role="navigation" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" aria-label="Home">
              <div className="flex items-center cursor-pointer">
                <span className="text-2xl mr-2" aria-hidden="true">ॐ</span>
                <span className="font-semibold text-xl">Divine Vaani</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/horoscope">
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">Horoscope</span>
            </Link>
            <Link href="/astrologers">
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">Astrologers</span>
            </Link>
            <Link href="/vedic-insights">
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">Vedic Insights</span>
            </Link>
            <Link href="/shop">
              <span className="text-gray-700 hover:text-gray-900 cursor-pointer">Shop</span>
            </Link>
            
            <Button asChild variant="outline" className="hover:bg-purple-50">
              <Link href="/horoscope">Get Free Horoscope</Link>
            </Button>
            <Button asChild className="bg-[#FF7E1D] hover:bg-[#FF7E1D]/90">
              <Link href="/astrologers">Talk to Astrologer</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
