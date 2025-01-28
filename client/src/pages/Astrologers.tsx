import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { PageLayout } from "@/components/layout/PageLayout";
import {
  Star,
  Clock,
  Medal,
  Phone,
  MessageCircle,
  Calendar,
} from "lucide-react";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const services = [
  {
    title: "Live Consultation",
    description:
      "Connect with our expert astrologers through video call for personalized guidance.",
    icon: <Phone className="w-10 h-10" />,
    color: "from-purple-500 to-purple-600",
  },
  {
    title: "Chat Sessions",
    description:
      "Get instant answers to your queries through our chat platform.",
    icon: <MessageCircle className="w-10 h-10" />,
    color: "from-orange-500 to-[#FF7E1D]",
  },
  {
    title: "Scheduled Reading",
    description:
      "Book a session at your convenient time for in-depth analysis.",
    icon: <Calendar className="w-10 h-10" />,
    color: "from-purple-500 to-[#FF7E1D]",
  },
];

const astrologers = [
  {
    name: "Tarot Simpi",
    specialty: "Tarot Reading & Spiritual Healing",
    experience: "4+ years",
    rating: 5.0,
    reviews: 350,
    languages: ["Hindi", "English"],
    expertise: ["Tarot Reading", "Spiritual Healing", "Life Path Guidance"],
    availability: "Available Now",
    image:
      "/images/simpi.png",
    price: "₹899/session",
    location: "Allahabad",
    description:
      "A gifted Tarot reader from Allahabad with a natural ability to provide clarity and guidance. Specializes in life path readings and spiritual healing through ancient Tarot wisdom.",
  },
  {
    name: "Pandit Rajesh Kumar",
    specialty: "Vedic Astrology",
    experience: "15+ years",
    rating: 4.9,
    reviews: 1250,
    languages: ["English", "Hindi", "Sanskrit"],
    expertise: ["Numerology", "Palmistry", "Gemology"],
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500&auto=format&fit=crop&q=60",
    price: "₹999/session",
  },
  {
    name: "Dr. Lakshmi Devi",
    specialty: "Numerology",
    experience: "12+ years",
    rating: 4.8,
    reviews: 890,
    languages: ["English", "Tamil", "Telugu"],
    expertise: ["Vastu", "Birth Chart", "Career"],
    availability: "Available in 30 mins",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=500&auto=format&fit=crop&q=60",
    price: "₹899/session",
  },
  {
    name: "Acharya Amit Singh",
    specialty: "Tarot Reading",
    experience: "20+ years",
    rating: 5.0,
    reviews: 2100,
    languages: ["English", "Hindi", "Punjabi"],
    expertise: ["Tarot", "Crystal Healing", "Astrology"],
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=500&auto=format&fit=crop&q=60",
    price: "₹1299/session",
  },
  {
    name: "Dr. Priya Sharma",
    specialty: "Nadi Astrology",
    experience: "18+ years",
    rating: 4.7,
    reviews: 1500,
    languages: ["English", "Hindi", "Marathi"],
    expertise: ["Face Reading", "Birth Time Rectification", "Relationship"],
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1546961329-78bef0414d7c?w=500&auto=format&fit=crop&q=60",
    price: "₹1199/session",
  },
  {
    name: "Guru Mohan Das",
    specialty: "KP Astrology",
    experience: "25+ years",
    rating: 4.9,
    reviews: 2500,
    languages: ["English", "Hindi", "Bengali"],
    expertise: ["Horary", "Muhurta", "Financial"],
    availability: "Available in 15 mins",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=500&auto=format&fit=crop&q=60",
    price: "₹1499/session",
  },
  {
    name: "Dr. Neha Gupta",
    specialty: "Psychic Reading",
    experience: "10+ years",
    rating: 4.8,
    reviews: 750,
    languages: ["English", "Hindi"],
    expertise: ["Crystal Healing", "Aura Reading", "Past Life"],
    availability: "Available Now",
    image:
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=500&auto=format&fit=crop&q=60",
    price: "₹999/session",
  },
];

export default function Astrologers() {
  return (
    <PageLayout
      title="Connect with Expert Astrologers"
      subtitle="Get personalized guidance from India's most experienced astrologers through live consultation"
      badge="Expert Guidance"
    >
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {[
          "4.9+ Rated Astrologers",
          "100% Verified Experts",
          "Private & Confidential",
        ].map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md"
          >
            <Medal className="w-5 h-5 text-[#FF7E1D]" />
            <span className="text-sm font-medium text-gray-700">
              {feature}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="h-full hover:shadow-xl transition-all duration-500 bg-white/90 backdrop-blur-sm border-t-4 border-transparent hover:-translate-y-2">
              <CardContent className="p-8">
                <div
                  className={`w-16 h-16 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-r ${service.color} text-white transform hover:scale-110 transition-transform duration-300`}
                >
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Astrologers Grid */}
      <section className="py-20 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {astrologers.map((astrologer, index) => (
              <motion.div
                key={astrologer.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-500 bg-white/80 backdrop-blur-sm hover:-translate-y-2 group">
                  <CardContent className="p-6">
                    <div className="relative mb-6">
                      <img
                        src={astrologer.image}
                        alt={astrologer.name}
                        className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-purple-100 group-hover:border-[#FF7E1D] transition-colors duration-300"
                      />
                      <span
                        className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${
                          astrologer.availability.includes("Now")
                            ? "bg-green-100 text-green-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {astrologer.availability}
                      </span>
                      {astrologer.location && (
                        <span className="absolute bottom-2 right-2 px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {astrologer.location}
                        </span>
                      )}
                    </div>

                    <div className="text-center mb-6">
                      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                        {astrologer.name}
                      </h3>
                      <p className="text-purple-600 font-medium mb-1">
                        {astrologer.specialty}
                      </p>
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {astrologer.experience}
                        </span>
                      </div>
                      <div className="flex items-center justify-center gap-1 mb-4">
                        <span className="text-lg font-semibold text-[#FF7E1D]">
                          {astrologer.rating}
                        </span>
                        <Star className="w-5 h-5 fill-current text-[#FF7E1D]" />
                        <span className="text-sm text-gray-500">
                          ({astrologer.reviews})
                        </span>
                      </div>
                      {astrologer.description && (
                        <p className="text-sm text-gray-600 italic mb-4">
                          "{astrologer.description}"
                        </p>
                      )}
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Languages
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {astrologer.languages.map((lang) => (
                            <span
                              key={lang}
                              className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-xs font-medium"
                            >
                              {lang}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-2">
                          Expertise
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {astrologer.expertise.map((exp) => (
                            <span
                              key={exp}
                              className="px-2 py-1 bg-orange-50 text-[#FF7E1D] rounded-full text-xs font-medium"
                            >
                              {exp}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-lg font-semibold text-purple-600">
                        {astrologer.price}
                      </span>
                      <Button className="bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90 text-white">
                        Book Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
}