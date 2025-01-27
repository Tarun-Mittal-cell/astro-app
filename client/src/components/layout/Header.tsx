import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Stars, Sun, Moon, Phone, ShoppingBag, UserCircle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const isActiveLink = (path: string) => location === path;

  const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <Link href={href}>
      <span className={className}>
        {children}
      </span>
    </Link>
  );

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Brand */}
          <Link href="/">
            <div className="flex items-center cursor-pointer group">
              <div className="relative">
                <span className="text-3xl md:text-4xl text-[#FF7E1D] leading-none transition-transform group-hover:scale-110 duration-300">
                  ॐ
                </span>
                <div className="absolute -inset-2 bg-orange-100 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
              </div>
              <div className="ml-2.5 flex flex-col justify-center">
                <span className="text-xl md:text-2xl font-semibold tracking-tight leading-none">
                  <span className="bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                    Divine
                  </span>
                  <span className="text-[#FF7E1D]">Vaani</span>
                </span>
                <span className="text-xs text-gray-500 mt-0.5">
                  Vedic Astrology & Guidance
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <div className="flex items-center space-x-1">
              <NavLink 
                href="/about"
                className={`px-3 py-2 rounded-md text-[15px] font-medium transition-colors ${
                  isActiveLink('/about')
                    ? 'text-[#FF7E1D] bg-orange-50'
                    : 'text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50'
                }`}
              >
                About Us
              </NavLink>

              <DropdownMenu>
                <DropdownMenuTrigger className="px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors inline-flex items-center">
                  <Sun className="w-4 h-4 mr-1" />
                  Horoscopes
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/horoscope">Daily Horoscope</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/weekly-horoscope">Weekly Forecast</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/monthly-horoscope">Monthly Insights</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger className="px-3 py-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors inline-flex items-center">
                  <Moon className="w-4 h-4 mr-1" />
                  Birth Charts
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/birth-chart">Free Birth Chart</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/birth-chart-analysis">Professional Analysis</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/compatibility">Compatibility Check</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <NavLink
                href="/astrologers"
                className={`px-3 py-2 rounded-md text-[15px] font-medium transition-colors inline-flex items-center ${
                  isActiveLink('/astrologers')
                    ? 'text-[#FF7E1D] bg-orange-50'
                    : 'text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50'
                }`}
              >
                <Phone className="w-4 h-4 mr-1" />
                Live Consultation
              </NavLink>

              <NavLink
                href="/vedic-insights"
                className={`px-3 py-2 rounded-md text-[15px] font-medium transition-colors ${
                  isActiveLink('/vedic-insights')
                    ? 'text-[#FF7E1D] bg-orange-50'
                    : 'text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50'
                }`}
              >
                Vedic Insights
              </NavLink>

              <NavLink
                href="/planetary-alignments"
                className={`px-3 py-2 rounded-md text-[15px] font-medium transition-colors ${
                  isActiveLink('/planetary-alignments')
                    ? 'text-[#FF7E1D] bg-orange-50'
                    : 'text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50'
                }`}
              >
                Planetary Alignments
              </NavLink>

              <NavLink
                href="/predictions"
                className={`px-3 py-2 rounded-md text-[15px] font-medium transition-colors inline-flex items-center ${
                  isActiveLink('/predictions')
                    ? 'text-[#FF7E1D] bg-orange-50'
                    : 'text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50'
                }`}
              >
                <Stars className="w-4 h-4 mr-1" />
                AI Predictions
              </NavLink>

              <NavLink
                href="/shop"
                className={`px-3 py-2 rounded-md text-[15px] font-medium transition-colors inline-flex items-center ${
                  isActiveLink('/shop')
                    ? 'text-[#FF7E1D] bg-orange-50'
                    : 'text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50'
                }`}
              >
                <ShoppingBag className="w-4 h-4 mr-1" />
                Shop
              </NavLink>
            </div>

            <div className="flex items-center gap-4 ml-6">
              <Button asChild variant="outline" size="sm"
                className="h-9 px-4 border-[#FF7E1D] text-gray-700 hover:text-[#FF7E1D] text-[14px] font-medium"
              >
                <Link href="/sign-in">
                  <span className="flex items-center">
                    <UserCircle className="w-4 h-4 mr-1.5" />
                    Sign In
                  </span>
                </Link>
              </Button>
              <Button asChild size="sm"
                className="h-9 px-4 bg-[#FF7E1D] hover:bg-[#FF7E1D]/90 text-white text-[14px] font-medium"
              >
                <Link href="/astrologers">Talk to Astrologer</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700 hover:text-[#FF7E1D] transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100 animate-in slide-in-from-top">
            <nav className="flex flex-col gap-2">
              <NavLink
                href="/about"
                className="p-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors"
              >
                About Us
              </NavLink>

              <div className="p-2 text-[15px] font-medium text-gray-500">Horoscopes</div>
              <NavLink
                href="/horoscope"
                className="pl-4 p-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors"
              >
                Daily Horoscope
              </NavLink>
              <NavLink
                href="/weekly-horoscope"
                className="pl-4 p-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors"
              >
                Weekly Forecast
              </NavLink>
              <NavLink
                href="/monthly-horoscope"
                className="pl-4 p-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors"
              >
                Monthly Insights
              </NavLink>

              <div className="p-2 text-[15px] font-medium text-gray-500">Birth Charts</div>
              <NavLink
                href="/birth-chart"
                className="pl-4 p-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors"
              >
                Free Birth Chart
              </NavLink>
              <NavLink
                href="/birth-chart-analysis"
                className="pl-4 p-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors"
              >
                Professional Analysis
              </NavLink>
              <NavLink
                href="/compatibility"
                className="pl-4 p-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors"
              >
                Compatibility Check
              </NavLink>

              <NavLink
                href="/astrologers"
                className="p-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors inline-flex items-center"
              >
                <Phone className="w-4 h-4 mr-1.5" />
                Live Consultation
              </NavLink>

              <NavLink
                href="/vedic-insights"
                className="p-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors"
              >
                Vedic Insights
              </NavLink>

              <NavLink
                href="/planetary-alignments"
                className="p-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors"
              >
                Planetary Alignments
              </NavLink>

              <NavLink
                href="/predictions"
                className="p-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors inline-flex items-center"
              >
                <Stars className="w-4 h-4 mr-1.5" />
                AI Predictions
              </NavLink>

              <NavLink
                href="/shop"
                className="p-2 rounded-md text-[15px] font-medium text-gray-700 hover:text-[#FF7E1D] hover:bg-orange-50 transition-colors inline-flex items-center"
              >
                <ShoppingBag className="w-4 h-4 mr-1.5" />
                Shop
              </NavLink>

              <div className="mt-4 flex flex-col gap-3 px-2">
                <Button asChild variant="outline"
                  className="w-full justify-center border-[#FF7E1D] text-gray-700 hover:text-[#FF7E1D] text-[14px] font-medium"
                >
                  <Link href="/sign-in">
                    <span className="flex items-center justify-center w-full">
                      <UserCircle className="w-4 h-4 mr-1.5" />
                      Sign In
                    </span>
                  </Link>
                </Button>
                <Button asChild
                  className="w-full justify-center bg-[#FF7E1D] hover:bg-[#FF7E1D]/90 text-white text-[14px] font-medium"
                >
                  <Link href="/astrologers">Talk to Astrologer</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </nav>
    </header>
  );
}