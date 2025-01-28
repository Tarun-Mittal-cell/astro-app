import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, Users, Sparkles, Heart, ScrollText, Calendar, Phone, Clock, Gift, Coffee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from 'react';

// Import enhanced components
import HeroBackground from "@/components/home/HeroBackground";
import EnhancedZodiacWheel from "@/components/home/EnhancedZodiacWheel";
import AstrologerCard from "@/components/home/AstrologerCard";
import FeatureCard from "@/components/home/FeatureCard";
import TestimonialCard from "@/components/home/TestimonialCard";
import QuickAccessTool from "@/components/home/QuickAccessTool";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const astrologers = [
  {
    name: "Pandit Rajesh Kumar",
    specialty: "Vedic Astrology",
    experience: "15+ years",
    rating: 4.9,
    consultations: "10,000+",
    languages: ["English", "Hindi", "Sanskrit"],
    expertise: ["Kundali Analysis", "Relationship", "Career"],
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60",
    availability: "Available Now"
  },
  {
    name: "Dr. Lakshmi Devi",
    specialty: "Numerology & Vedic",
    experience: "12+ years",
    rating: 4.8,
    consultations: "8,500+",
    languages: ["English", "Tamil", "Telugu"],
    expertise: ["Numerology", "Horoscope", "Gemology"],
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60",
    availability: "Available in 10 mins"
  },
  {
    name: "Acharya Amit Singh",
    specialty: "KP Astrology",
    experience: "20+ years",
    rating: 5.0,
    consultations: "15,000+",
    languages: ["English", "Hindi", "Gujarati"],
    expertise: ["KP System", "Muhurat", "Predictions"],
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60",
    availability: "Available Now"
  }
];

const quickTools = [
  { name: "Today's Horoscope", icon: <Calendar className="w-6 h-6" />, path: "/horoscope" },
  { name: "Love Compatibility", icon: <Heart className="w-6 h-6" />, path: "/compatibility" },
  { name: "Birth Chart", icon: <Star className="w-6 h-6" />, path: "/birth-chart" },
  { name: "Live Consultation", icon: <Phone className="w-6 h-6" />, path: "/astrologers" },
];

const features = [
  {
    title: "24/7 Expert Consultation",
    description: "Connect instantly with experienced astrologers anytime, anywhere.",
    icon: <Phone className="w-10 h-10" />
  },
  {
    title: "Vedic Astrology",
    description: "Authentic predictions based on ancient Vedic principles and calculations.",
    icon: <ScrollText className="w-10 h-10" />
  },
  {
    title: "Relationship Guidance",
    description: "Navigate your relationships with celestial insights and guidance.",
    icon: <Heart className="w-10 h-10" />
  },
  {
    title: "Career Predictions",
    description: "Make informed decisions about your professional journey.",
    icon: <Star className="w-10 h-10" />
  },
  {
    title: "Daily Horoscopes",
    description: "Personalized daily predictions for all zodiac signs.",
    icon: <Calendar className="w-10 h-10" />
  },
  {
    title: "Remedial Solutions",
    description: "Effective remedies to overcome life's challenges.",
    icon: <Sparkles className="w-10 h-10" />
  }
];

const benefits = [
  { icon: <Clock className="w-6 h-6" />, text: "Instant Consultations" },
  { icon: <Users className="w-6 h-6" />, text: "Verified Experts" },
  { icon: <Gift className="w-6 h-6" />, text: "100% Satisfaction" },
  { icon: <Coffee className="w-6 h-6" />, text: "Private & Confidential" },
];

const testimonials = [
  {
    name: "Priya Sharma",
    text: "The predictions were incredibly accurate. The remedies suggested by Pandit Rajesh helped me overcome my career obstacles.",
    rating: 5,
    date: "2 days ago",
    image: "https://i.pravatar.cc/150?img=44"
  },
  {
    name: "Raj Kumar",
    text: "Dr. Lakshmi's numerology consultation was eye-opening. Her insights helped me make better business decisions.",
    rating: 5,
    date: "1 week ago",
    image: "https://i.pravatar.cc/150?img=32"
  },
  {
    name: "Anjali Patel",
    text: "The compatibility analysis was spot on! Thanks to Acharya Amit's guidance, I have a better understanding of my relationship.",
    rating: 5,
    date: "3 days ago",
    image: "https://i.pravatar.cc/150?img=45"
  }
];

export default function Home() {
  return (
    <div className="overflow-hidden selection:bg-purple-200 selection:text-purple-900">
      {/* Hero Section */}
      <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF] overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-32 md:py-40">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              className="text-left space-y-6"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent leading-[1.1] tracking-tight">
                Discover Your
                <br />
                Cosmic Path
              </h1>
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-medium text-gray-700 tracking-tight">
                Expert Vedic Guidance & Live Consultations
              </h2>
              <p className="text-xl xl:text-2xl text-gray-600 max-w-xl font-medium leading-relaxed">
                Connect with India's most trusted astrologers for personalized predictions and life-changing insights.
              </p>

              {/* Quick Access Tools */}
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
                {quickTools.map((tool) => (
                  <QuickAccessTool key={tool.name} tool={tool} />
                ))}
              </div>

              <div className="mt-14 flex flex-col sm:flex-row gap-6">
                <Button asChild size="lg"
                  className="bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90 text-white px-10 h-16 text-lg font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                  <Link href="/astrologers">Talk to Astrologer</Link>
                </Button>
                <Button asChild size="lg" variant="outline"
                  className="text-purple-600 hover:bg-purple-50 border-purple-600 border-2 px-10 h-16 text-lg font-medium tracking-wide shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl">
                  <Link href="/birth-chart">Free Birth Chart</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-16 flex flex-wrap items-center gap-6 text-gray-600">
                {benefits.map((benefit) => (
                  <div 
                    key={benefit.text} 
                    className="flex items-center gap-3 bg-white/60 hover:bg-white/80 px-5 py-3 rounded-2xl shadow-sm backdrop-blur-sm transition-all duration-300"
                  >
                    <div className="text-[#FF7E1D]">{benefit.icon}</div>
                    <span className="text-sm font-medium tracking-wide">{benefit.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full max-w-[min(85vw,42rem)] mx-auto mt-8 lg:mt-0"
            >
              <EnhancedZodiacWheel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Astrologers Section */}
      <section className="py-32 md:py-40 bg-gradient-to-br from-white via-purple-50/50 to-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center space-y-6 mb-24"
          >
            <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100 px-6 py-2 text-sm tracking-wide rounded-full">
              Expert Astrologers
            </Badge>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent tracking-tight">
              Connect with Top Vedic Experts
            </h2>
            <p className="text-xl xl:text-2xl text-gray-600 max-w-3xl mx-auto">
              Our handpicked astrologers with proven expertise and thousands of satisfied clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
            {astrologers.map((astrologer, index) => (
              <AstrologerCard key={astrologer.name} astrologer={astrologer} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 md:py-40 bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center space-y-6 mb-24"
          >
            <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100 px-6 py-2 text-sm tracking-wide rounded-full">
              Our Services
            </Badge>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent tracking-tight">
              Comprehensive Astrological Solutions
            </h2>
            <p className="text-xl xl:text-2xl text-gray-600 max-w-3xl mx-auto">
              Discover ancient wisdom for modern life guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
            {features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 md:py-40 bg-gradient-to-br from-white via-purple-50/50 to-white">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center space-y-6 mb-24"
          >
            <Badge className="bg-purple-100 text-purple-600 hover:bg-purple-100 px-6 py-2 text-sm tracking-wide rounded-full">
              Testimonials
            </Badge>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent tracking-tight">
              What Our Clients Say
            </h2>
            <p className="text-xl xl:text-2xl text-gray-600 max-w-3xl mx-auto">Real experiences from our valued clients</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-40 bg-gradient-to-r from-purple-600 to-[#FF7E1D]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center text-white space-y-8"
          >
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight">Begin Your Spiritual Journey Today</h2>
            <p className="text-xl xl:text-2xl opacity-90 max-w-3xl mx-auto">
              Get personalized guidance from our expert astrologers
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
              <Button asChild size="lg" variant="secondary"
                className="bg-white text-purple-600 hover:bg-purple-50 border-2 border-white px-10 h-16 text-lg font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl">
                <Link href="/astrologers">Connect with an Astrologer</Link>
              </Button>
              <Button asChild size="lg" variant="outline"
                className="border-white text-white hover:bg-white/10 px-10 h-16 text-lg font-medium tracking-wide rounded-2xl">
                <Link href="/horoscope">Get Free Horoscope</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}