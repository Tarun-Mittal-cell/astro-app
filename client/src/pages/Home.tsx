import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import ZodiacWheel from "@/components/astrology/ZodiacWheel";
import { Star, Users, Sparkles, Heart, ScrollText, Calendar, Phone, Clock, Gift, Coffee } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import React from 'react';

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
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://ik.imagekit.io/astrovaani/hero-bg.jpg')] bg-cover bg-center opacity-5 animate-pulse-slow" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-orange-500/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="text-left"
              initial="initial"
              animate="animate"
              variants={fadeIn}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent leading-[1.1]">
                Discover Your
                <br />
                Cosmic Path
              </h1>
              <h2 className="text-3xl md:text-4xl font-medium mt-4 text-gray-700">
                Expert Vedic Guidance & Live Consultations
              </h2>
              <p className="mt-6 text-xl text-gray-600 max-w-xl font-medium leading-relaxed">
                Connect with India's most trusted astrologers for personalized predictions and life-changing insights.
              </p>

              {/* Quick Access Tools */}
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
                {quickTools.map((tool) => (
                  <Link key={tool.name} href={tool.path}>
                    <div className="group cursor-pointer bg-white shadow-sm hover:shadow-md rounded-lg p-6 text-center transition-all duration-300 h-[120px] flex flex-col items-center justify-center">
                      <div className="bg-purple-50 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-gradient-to-br from-purple-600/10 to-[#FF7E1D]/10 transition-all duration-300">
                        <div className="text-purple-600 group-hover:text-[#FF7E1D] transition-colors duration-300">
                          {React.cloneElement(tool.icon as React.ReactElement, {
                            size: 24,
                            className: "transition-transform duration-300 group-hover:scale-110"
                          })}
                        </div>
                      </div>
                      <div className="mt-3 text-[15px] font-medium text-gray-800 group-hover:text-[#FF7E1D] transition-colors duration-300">
                        {tool.name}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg"
                  className="bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90 text-white px-8 h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                  <Link href="/astrologers">Talk to Astrologer</Link>
                </Button>
                <Button asChild size="lg" variant="outline"
                  className="text-purple-600 hover:bg-purple-50 border-purple-600 border-2 px-8 h-14 text-lg shadow-md hover:shadow-lg transition-all duration-300">
                  <Link href="/birth-chart">Free Birth Chart</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 flex items-center gap-8 text-gray-600">
                {benefits.map((benefit) => (
                  <div key={benefit.text} className="flex items-center gap-2">
                    <div className="text-[#FF7E1D]">{benefit.icon}</div>
                    <span className="text-sm font-medium">{benefit.text}</span>
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
              <ZodiacWheel />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Astrologers Section */}
      <section className="py-24 bg-gradient-to-br from-white via-purple-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-600 hover:bg-purple-100 px-4 py-1">
              Expert Astrologers
            </Badge>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
              Connect with Top Vedic Experts
            </h2>
            <p className="text-xl text-gray-600">
              Our handpicked astrologers with proven expertise and thousands of satisfied clients
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {astrologers.map((astrologer, index) => (
              <motion.div
                key={astrologer.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <AspectRatio ratio={4 / 3}>
                        <img
                          src={astrologer.image}
                          alt={astrologer.name}
                          className="rounded-lg object-cover w-full h-full"
                        />
                      </AspectRatio>
                      <Badge className="absolute top-2 right-2 bg-green-500 text-white">
                        {astrologer.availability}
                      </Badge>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900">{astrologer.name}</h3>
                        <p className="text-[#FF7E1D]">{astrologer.specialty}</p>
                      </div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                          <span className="font-semibold">{astrologer.rating}</span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {astrologer.experience} experience
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {astrologer.expertise.map((exp) => (
                          <Badge key={exp} variant="secondary" className="bg-purple-50 text-purple-600">
                            {exp}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="text-sm text-gray-600">
                          {astrologer.consultations} consultations
                        </div>
                        <Button asChild size="sm" className="bg-[#FF7E1D] hover:bg-[#FF7E1D]/90">
                          <Link href={`/consultation/${index + 1}`}>
                            Consult Now
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-600 hover:bg-purple-100 px-4 py-1">
              Our Services
            </Badge>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
              Comprehensive Astrological Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Discover ancient wisdom for modern life guidance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 hover:-translate-y-2 group bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-8">
                    <div className="mb-6 text-purple-600 group-hover:text-[#FF7E1D] transition-all duration-300 transform group-hover:scale-110">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-white via-purple-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <Badge className="mb-4 bg-purple-100 text-purple-600 hover:bg-purple-100 px-4 py-1">
              Testimonials
            </Badge>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">Real experiences from our valued clients</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm hover:-translate-y-2">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-4 mb-6">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-purple-100"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.date}</p>
                      </div>
                    </div>

                    <div className="mb-4 flex gap-0.5 text-yellow-400">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current" />
                      ))}
                    </div>

                    <p className="text-gray-600 italic">"{testimonial.text}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-[#FF7E1D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center text-white"
          >
            <h2 className="text-4xl font-bold mb-6">Begin Your Spiritual Journey Today</h2>
            <p className="text-xl mb-10 opacity-90">
              Get personalized guidance from our expert astrologers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary"
                className="bg-white text-purple-600 hover:bg-purple-50 border-2 border-white px-8 h-14 text-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <Link href="/astrologers">Connect with an Astrologer</Link>
              </Button>
              <Button asChild size="lg" variant="outline"
                className="border-white text-white hover:bg-white/10 px-8 h-14 text-lg">
                <Link href="/horoscope">Get Free Horoscope</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}