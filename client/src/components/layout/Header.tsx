import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Stars, Sun, Moon, Phone, ShoppingBag, UserCircle, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActiveLink = (path: string) => location === path;

  const NavLink = ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <Link href={href}>
      <motion.span
        className={cn(
          "relative inline-block",
          className
        )}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
        {isActiveLink(href) && (
          <motion.span
            className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-[#FF7E1D]"
            layoutId="underline"
          />
        )}
      </motion.span>
    </Link>
  );

  return (
    <motion.header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-b border-purple-100 shadow-sm" 
          : "bg-transparent"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo and Brand */}
          <Link href="/">
            <motion.div 
              className="flex items-center cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="relative"
                whileHover={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 0.5 }}
              >
                <span className="text-4xl md:text-5xl text-[#FF7E1D] leading-none filter drop-shadow-lg">
                  ॐ
                </span>
                <motion.div 
                  className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-orange-400/20 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileHover={{ opacity: 1, scale: 1.2 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
              <motion.div className="ml-3 flex flex-col justify-center">
                <motion.span 
                  className="text-2xl md:text-3xl font-bold tracking-tight leading-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <span className="bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                    Divine
                  </span>
                  <span className="bg-gradient-to-r from-[#FF7E1D] to-orange-500 bg-clip-text text-transparent">
                    Vaani
                  </span>
                </motion.span>
                <motion.span 
                  className="text-sm text-gray-600 mt-1 font-medium"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Vedic Astrology & AI Guidance
                </motion.span>
              </motion.div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden lg:flex items-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center space-x-2">
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
                <DropdownMenuTrigger asChild>
                  <motion.button
                    className={cn(
                      "px-3 py-2 rounded-lg text-[15px] font-medium transition-all",
                      "inline-flex items-center gap-1.5",
                      "bg-white/50 hover:bg-white/80",
                      "border border-purple-100/50 hover:border-purple-200",
                      "text-gray-700 hover:text-[#FF7E1D]",
                      "shadow-sm hover:shadow"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Sun className="w-4 h-4" />
                    Horoscopes
                    <ChevronDown className="w-3.5 h-3.5 opacity-50" />
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-48 animate-in fade-in-0 zoom-in-95"
                  align="center"
                >
                  <DropdownMenuItem asChild>
                    <Link href="/horoscope" className="w-full flex items-center gap-2">
                      <Sun className="w-4 h-4 text-orange-500" />
                      <span>Daily Horoscope</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/weekly-horoscope" className="w-full flex items-center gap-2">
                      <Stars className="w-4 h-4 text-purple-500" />
                      <span>Weekly Forecast</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/monthly-horoscope" className="w-full flex items-center gap-2">
                      <Moon className="w-4 h-4 text-blue-500" />
                      <span>Monthly Insights</span>
                    </Link>
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

            <motion.div className="flex items-center gap-4 ml-8">
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild variant="outline" size="sm"
                  className={cn(
                    "h-10 px-4 text-[14px] font-medium",
                    "bg-white/50 hover:bg-white/80",
                    "border-purple-200 hover:border-purple-300",
                    "text-gray-700 hover:text-purple-600",
                    "shadow-sm hover:shadow"
                  )}
                >
                  <Link href="/sign-in">
                    <span className="flex items-center gap-1.5">
                      <UserCircle className="w-4 h-4" />
                      Sign In
                    </span>
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild size="sm"
                  className={cn(
                    "h-10 px-4 text-[14px] font-medium",
                    "bg-gradient-to-r from-purple-600 to-[#FF7E1D]",
                    "hover:from-purple-500 hover:to-[#FF7E1D]",
                    "text-white shadow-md hover:shadow-lg",
                    "border-0"
                  )}
                >
                  <Link href="/astrologers" className="flex items-center gap-1.5">
                    <Phone className="w-4 h-4" />
                    Talk to Astrologer
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={cn(
              "lg:hidden p-2.5 rounded-lg transition-colors",
              "bg-white/50 hover:bg-white/80",
              "border border-purple-100/50 hover:border-purple-200",
              "text-gray-700 hover:text-[#FF7E1D]",
              "shadow-sm hover:shadow"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden border-t border-purple-100/50 bg-white/95 backdrop-blur-sm"
            >
              <motion.nav 
                className="flex flex-col gap-2 p-4"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
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
            </motion.nav>
          </motion.div>
        )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}