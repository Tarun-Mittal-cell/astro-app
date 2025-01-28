import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import HoroscopeAnimation from "@/components/astrology/HoroscopeAnimation";
import ZodiacCard from "@/components/horoscope/ZodiacCard";
import HoroscopeReading from "@/components/horoscope/HoroscopeReading";
import HoroscopeBackground from "@/components/horoscope/HoroscopeBackground";
import { Star, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

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
    queryKey: ["horoscope", selectedSign?.toLowerCase()],
    queryFn: async () => {
      if (!selectedSign) return null;
      try {
        console.log('Fetching horoscope for:', selectedSign.toLowerCase());
        const response = await fetch(`/api/horoscope/${selectedSign.toLowerCase()}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Horoscope data:', data);
        return data;
      } catch (error) {
        console.error('Error fetching horoscope:', error);
        throw error;
      }
    },
    enabled: !!selectedSign,
    retry: 1
  });

  return (
    <div className="min-h-screen relative">
      <HoroscopeBackground />
      
      <div className="relative container mx-auto px-4 py-12">
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
            <ZodiacCard
              key={zodiac.sign}
              zodiac={zodiac}
              isSelected={selectedSign === zodiac.sign}
              onSelect={() => setSelectedSign(zodiac.sign)}
              index={index}
            />
          ))}
        </div>

        {selectedSign && (
          <HoroscopeReading
            sign={selectedSign}
            reading={horoscope}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}