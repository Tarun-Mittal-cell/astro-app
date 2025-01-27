import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <span className="text-2xl mr-2">ॐ</span>
                <span className="font-semibold text-xl">Divine Vaani</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link href="/horoscope">
              <div className="text-gray-700 hover:text-gray-900 cursor-pointer">Horoscope</div>
            </Link>
            <Link href="/astrologers">
              <div className="text-gray-700 hover:text-gray-900 cursor-pointer">Astrologers</div>
            </Link>
            <Link href="/vedic-insights">
              <div className="text-gray-700 hover:text-gray-900 cursor-pointer">Vedic Insights</div>
            </Link>
            <Link href="/shop">
              <div className="text-gray-700 hover:text-gray-900 cursor-pointer">Shop</div>
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
