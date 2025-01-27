import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[#FFF5E9] via-white to-[#FFF0F5] pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Section */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold text-[#FF7E1D]">
                ॐ
              </span>
              <span className="text-xl font-bold text-[#FF7E1D]">Divine Vaani</span>
            </div>
            <p className="text-[15px] leading-relaxed text-gray-600 mb-4">
              Unlocking cosmic wisdom for your spiritual journey and personal growth.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-[#FF7E1D] hover:text-[#FF7E1D]/80 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#FF7E1D] hover:text-[#FF7E1D]/80 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#FF7E1D] hover:text-[#FF7E1D]/80 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-[#FF7E1D] hover:text-[#FF7E1D]/80 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h3 className="text-[17px] font-bold text-[#FF7E1D] mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2.5">
              <Link href="/horoscope" className="text-[15px] text-gray-600 hover:text-[#FF7E1D] transition-colors">
                Daily Horoscope
              </Link>
              <Link href="/astrologers" className="text-[15px] text-gray-600 hover:text-[#FF7E1D] transition-colors">
                Our Astrologers
              </Link>
              <Link href="/vedic-insights" className="text-[15px] text-gray-600 hover:text-[#FF7E1D] transition-colors">
                Vedic Insights
              </Link>
              <Link href="/about" className="text-[15px] text-gray-600 hover:text-[#FF7E1D] transition-colors">
                About Us
              </Link>
              <Link href="/contact" className="text-[15px] text-gray-600 hover:text-[#FF7E1D] transition-colors">
                Contact Us
              </Link>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h3 className="text-[17px] font-bold text-[#FF7E1D] mb-4">Services</h3>
            <div className="flex flex-col gap-2.5">
              <span className="text-[15px] text-gray-600">Kundli Analysis</span>
              <span className="text-[15px] text-gray-600">Vedic Matchmaking</span>
              <span className="text-[15px] text-gray-600">Gemstone Recommendations</span>
              <span className="text-[15px] text-gray-600">Numerology</span>
              <span className="text-[15px] text-gray-600">Vastu Consultation</span>
            </div>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <h3 className="text-[17px] font-bold text-[#FF7E1D] mb-4">Newsletter</h3>
            <p className="text-[15px] text-gray-600 mb-4">
              Subscribe to our newsletter for cosmic insights and special offers.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Your email address"
                className="flex-1 h-10 px-3 rounded-md border border-gray-200 text-[15px] focus:outline-none focus:ring-2 focus:ring-[#FF7E1D]/20 focus:border-[#FF7E1D]"
              />
              <Button size="sm" className="h-10 bg-[#FF7E1D] hover:bg-[#FF7E1D]/90 text-white">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-[14px] text-gray-600">
            © {new Date().getFullYear()} Divine Vaani. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}