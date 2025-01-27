import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Star, Calendar } from "lucide-react";
import HoroscopeAnimation from "@/components/astrology/HoroscopeAnimation";

const ZODIAC_SIGNS = [
  { sign: "Aries", imageUrl: "https://images.unsplash.com/photo-1712615966845-62b79e9829f6", element: "Fire", date: "Mar 21 - Apr 19" },
  { sign: "Taurus", imageUrl: "https://images.unsplash.com/photo-1586296526967-8011941e6853", element: "Earth", date: "Apr 20 - May 20" },
  { sign: "Gemini", imageUrl: "https://images.unsplash.com/photo-1629908887383-e467edf279a7", element: "Air", date: "May 21 - Jun 20" },
  { sign: "Cancer", imageUrl: "https://images.unsplash.com/photo-1694878982147-e52097b660ec", element: "Water", date: "Jun 21 - Jul 22" },
  { sign: "Leo", imageUrl: "https://images.unsplash.com/photo-1521579772986-45a33628a34e", element: "Fire", date: "Jul 23 - Aug 22" },
  { sign: "Virgo", imageUrl: "https://images.unsplash.com/photo-1720036236192-9607cc3f262b", element: "Earth", date: "Aug 23 - Sep 22" },
  { sign: "Libra", imageUrl: "https://images.unsplash.com/photo-1712615966845-62b79e9829f6", element: "Air", date: "Sep 23 - Oct 22" },
  { sign: "Scorpio", imageUrl: "https://images.unsplash.com/photo-1586296526967-8011941e6853", element: "Water", date: "Oct 23 - Nov 21" },
  { sign: "Sagittarius", imageUrl: "https://images.unsplash.com/photo-1629908887383-e467edf279a7", element: "Fire", date: "Nov 22 - Dec 21" },
  { sign: "Capricorn", imageUrl: "https://images.unsplash.com/photo-1694878982147-e52097b660ec", element: "Earth", date: "Dec 22 - Jan 19" },
  { sign: "Aquarius", imageUrl: "https://images.unsplash.com/photo-1521579772986-45a33628a34e", element: "Air", date: "Jan 20 - Feb 18" },
  { sign: "Pisces", imageUrl: "https://images.unsplash.com/photo-1720036236192-9607cc3f262b", element: "Water", date: "Feb 19 - Mar 20" }
];

export default function Horoscope() {
  const [selectedSign, setSelectedSign] = useState<string | null>(null);

  const { data: horoscope, isLoading } = useQuery({
    queryKey: ["/api/horoscopes", selectedSign],
    enabled: !!selectedSign
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF]">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
            Daily Horoscope
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover what the stars have aligned for you today. Select your zodiac sign below to receive personalized cosmic insights.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <HoroscopeAnimation />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {ZODIAC_SIGNS.map((zodiac, index) => (
            <motion.div
              key={zodiac.sign}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card 
                className={`group cursor-pointer hover:shadow-xl transition-all duration-500 hover:-translate-y-2 bg-white/90 backdrop-blur-sm overflow-hidden
                  ${selectedSign === zodiac.sign ? 'ring-2 ring-purple-500 ring-offset-2' : ''}`}
                onClick={() => setSelectedSign(zodiac.sign)}
              >
                <CardContent className="p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-600 to-[#FF7E1D] p-0.5">
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                        <Star className="w-8 h-8 text-[#FF7E1D]" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                      {zodiac.sign}
                    </h3>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mb-2">
                      <Calendar className="w-4 h-4" />
                      <span>{zodiac.date}</span>
                    </div>
                    <p className="text-sm text-gray-500">Element: {zodiac.element}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        {selectedSign && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-12"
          >
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-[#FF7E1D] p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <Star className="w-6 h-6 text-[#FF7E1D]" />
                    </div>
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                      {selectedSign} Horoscope
                    </h2>
                    <p className="text-sm text-gray-600">Today's Cosmic Guidance</p>
                  </div>
                </div>
                {isLoading ? (
                  <div className="h-24 flex items-center justify-center">
                    <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                  </div>
                ) : (
                  <p className="text-gray-700 leading-relaxed">{horoscope?.dailyReading || "Your daily horoscope will appear here..."}</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}