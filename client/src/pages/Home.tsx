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

const animations = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" }
  },
  slideIn: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.7, ease: "easeOut" }
  },
  staggerContainer: {
    animate: { transition: { staggerChildren: 0.1 } }
  }
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
      <section className="relative min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-6rem)] flex items-center bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF] overflow-hidden">
        <HeroBackground />
        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 py-16 md:py-20">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              className="text-left space-y-6"
              initial="initial"
              animate="animate"
              variants={animations.staggerContainer}
            >
              <motion.div variants={animations.slideIn}>
                <Badge className="bg-purple-100/80 backdrop-blur-sm text-purple-600 hover:bg-purple-100 px-6 py-2.5 text-sm tracking-wide rounded-full inline-flex items-center gap-2 mb-8">
                  <span className="inline-block w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
                  Live Astrologers Available
                </Badge>
              </motion.div>
              
              <motion.h1 
                variants={animations.slideIn}
                className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent leading-[1.1] tracking-tight"
              >
                Discover Your
                <br />
                <span className="relative inline-block">
                  Cosmic Path
                  <motion.span
                    className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-[#FF7E1D] rounded-full"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </span>
              </motion.h1>
              
              <motion.h2 
                variants={animations.slideIn}
                className="text-3xl md:text-4xl xl:text-5xl font-medium text-gray-700 tracking-tight"
              >
                Expert Vedic Guidance & Live Consultations
              </motion.h2>
              
              <motion.p 
                variants={animations.fadeIn}
                className="text-xl xl:text-2xl text-gray-600 max-w-xl font-medium leading-relaxed"
              >
                Connect with India's most trusted astrologers for personalized predictions and life-changing insights.
              </motion.p>

              {/* Quick Access Tools */}
              <motion.div 
                variants={animations.scaleIn}
                className="mt-12"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {quickTools.map((tool, index) => (
                    <motion.div
                      key={tool.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <QuickAccessTool tool={tool} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                variants={animations.fadeIn}
                className="mt-14 flex flex-col sm:flex-row gap-6"
              >
                <Button asChild size="lg"
                  className="group bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90 text-white px-10 h-16 text-lg font-medium tracking-wide shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl relative overflow-hidden"
                >
                  <Link href="/astrologers" className="flex items-center gap-2">
                    <span>Talk to Astrologer</span>
                    <motion.span
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      →
                    </motion.span>
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline"
                  className="group text-purple-600 hover:bg-purple-50 border-purple-600 border-2 px-10 h-16 text-lg font-medium tracking-wide shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl"
                >
                  <Link href="/birth-chart" className="flex items-center gap-2">
                    <span>Free Birth Chart</span>
                    <motion.span
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      →
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div 
                variants={animations.fadeIn}
                className="mt-16"
              >
                <div className="flex flex-wrap items-center gap-6 text-gray-600">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.text}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 bg-white/60 hover:bg-white/80 px-5 py-3 rounded-2xl shadow-sm backdrop-blur-sm transition-all duration-300 hover:scale-105"
                    >
                      <div className="text-[#FF7E1D]">{benefit.icon}</div>
                      <span className="text-sm font-medium tracking-wide">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-full max-w-[min(85vw,42rem)] mx-auto mt-8 lg:mt-0"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-orange-500/20 blur-3xl rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <EnhancedZodiacWheel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Astrologers Section */}
      <section className="relative py-32 md:py-40 bg-gradient-to-br from-white via-purple-50/50 to-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-purple-500/5 to-orange-500/5 rounded-full blur-3xl transform rotate-12" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-orange-500/5 to-purple-500/5 rounded-full blur-3xl transform -rotate-12" />
        </div>
        
        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={animations.staggerContainer}
            className="text-center space-y-6 mb-24"
          >
            <motion.div variants={animations.fadeIn}>
              <Badge className="bg-purple-100/80 backdrop-blur-sm text-purple-600 hover:bg-purple-100 px-6 py-2.5 text-sm tracking-wide rounded-full inline-flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
                Expert Astrologers
              </Badge>
            </motion.div>
            
            <motion.h2 
              variants={animations.slideIn}
              className="text-4xl md:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent tracking-tight"
            >
              Connect with Top Vedic Experts
            </motion.h2>
            
            <motion.p 
              variants={animations.fadeIn}
              className="text-xl xl:text-2xl text-gray-600 max-w-3xl mx-auto"
            >
              Our handpicked astrologers with proven expertise and thousands of satisfied clients
            </motion.p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={animations.staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12"
          >
            {astrologers.map((astrologer, index) => (
              <motion.div
                key={astrologer.name}
                variants={animations.scaleIn}
                custom={index}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <AstrologerCard astrologer={astrologer} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-32 md:py-40 bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF] overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-purple-500/10 to-transparent rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-orange-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={animations.staggerContainer}
            className="text-center space-y-6 mb-24"
          >
            <motion.div variants={animations.fadeIn}>
              <Badge className="bg-purple-100/80 backdrop-blur-sm text-purple-600 hover:bg-purple-100 px-6 py-2.5 text-sm tracking-wide rounded-full inline-flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
                Our Services
              </Badge>
            </motion.div>

            <motion.h2 
              variants={animations.slideIn}
              className="text-4xl md:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent tracking-tight relative"
            >
              Comprehensive Astrological Solutions
              <motion.span
                className="absolute -bottom-2 left-1/2 w-1/3 h-1 bg-gradient-to-r from-purple-600 to-[#FF7E1D] rounded-full transform -translate-x-1/2"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.h2>

            <motion.p 
              variants={animations.fadeIn}
              className="text-xl xl:text-2xl text-gray-600 max-w-3xl mx-auto"
            >
              Discover ancient wisdom for modern life guidance
            </motion.p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={animations.staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                variants={animations.scaleIn}
                custom={index}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.2 }}
              >
                <FeatureCard feature={feature} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-32 md:py-40 bg-gradient-to-br from-white via-purple-50/50 to-white overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-full blur-3xl"
            animate={{
              y: [0, 20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-orange-500/10 to-transparent rounded-full blur-3xl"
            animate={{
              y: [0, -20, 0],
              rotate: [0, -5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={animations.staggerContainer}
            className="text-center space-y-6 mb-24"
          >
            <motion.div variants={animations.fadeIn}>
              <Badge className="bg-purple-100/80 backdrop-blur-sm text-purple-600 hover:bg-purple-100 px-6 py-2.5 text-sm tracking-wide rounded-full inline-flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
                Testimonials
              </Badge>
            </motion.div>

            <motion.h2 
              variants={animations.slideIn}
              className="text-4xl md:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent tracking-tight relative"
            >
              What Our Clients Say
              <motion.span
                className="absolute -bottom-2 left-1/2 w-1/3 h-1 bg-gradient-to-r from-purple-600 to-[#FF7E1D] rounded-full transform -translate-x-1/2"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
              />
            </motion.h2>

            <motion.p 
              variants={animations.fadeIn}
              className="text-xl xl:text-2xl text-gray-600 max-w-3xl mx-auto"
            >
              Real experiences from our valued clients
            </motion.p>
          </motion.div>

          <motion.div 
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
            variants={animations.staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 xl:gap-12"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                variants={animations.scaleIn}
                custom={index}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 10px 30px -10px rgba(0,0,0,0.1)"
                }}
                transition={{ duration: 0.2 }}
              >
                <TestimonialCard testimonial={testimonial} index={index} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 md:py-40 bg-gradient-to-r from-purple-600 to-[#FF7E1D]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={animations.fadeIn}
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