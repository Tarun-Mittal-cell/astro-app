import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';

interface HoroscopeData {
  zodiacSign: string;
  dailyReading: string;
  date: string;
  mood: string;
  color: string;
  luckyNumber: number;
}

export default function HoroscopeAnimation() {
  const [currentSign, setCurrentSign] = useState<string>('aries');
  const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];

  const { data: horoscopeData, isLoading, error } = useQuery<HoroscopeData>({
    queryKey: ['horoscope', currentSign],
    queryFn: async () => {
      const response = await fetch(`/api/horoscope/${currentSign}`);
      if (!response.ok) {
        throw new Error('Failed to fetch horoscope');
      }
      return response.json();
    },
    enabled: !!currentSign,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = signs.indexOf(currentSign);
      const nextIndex = (currentIndex + 1) % signs.length;
      setCurrentSign(signs[nextIndex]);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSign]);

  if (error) {
    return (
      <div className="relative w-full min-h-[400px] flex items-center justify-center">
        <p className="text-red-500 font-semibold">Failed to load horoscope. Please try again.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[400px]">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          </motion.div>
        ) : horoscopeData ? (
          <motion.div
            key={currentSign}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200, damping: 20 }}
            className="absolute inset-0"
          >
            <Card className="h-full bg-white/90 backdrop-blur-sm p-8">
              <motion.div
                initial={{ scale: 0.8, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 200, 
                  damping: 15,
                  duration: 0.8 
                }}
                className="flex flex-col items-center"
              >
                <div className="w-32 h-32 mb-6">
                  <ZodiacSymbol sign={currentSign} />
                </div>
                <h2 className="text-3xl font-bold capitalize mb-4 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                  {currentSign}
                </h2>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-gray-600 text-center mb-6"
                >
                  {horoscopeData.dailyReading}
                </motion.p>
                <div className="grid grid-cols-3 gap-4 w-full max-w-md">
                  <InfoCard title="Mood" value={horoscopeData.mood} delay={0.4} />
                  <InfoCard title="Color" value={horoscopeData.color} delay={0.5} />
                  <InfoCard title="Lucky Number" value={horoscopeData.luckyNumber.toString()} delay={0.6} />
                </div>
              </motion.div>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="flex gap-2">
          {signs.map((sign) => (
            <motion.button
              key={sign}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setCurrentSign(sign)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                currentSign === sign ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoCard({ title, value, delay }: { title: string; value: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
    >
      <h3 className="text-sm font-semibold text-gray-500 mb-1">{title}</h3>
      <p className="text-purple-600 font-medium">{value}</p>
    </motion.div>
  );
}

function ZodiacSymbol({ sign }: { sign: string }) {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full text-purple-600"
      initial={{ rotate: -30, scale: 0.8 }}
      animate={{ 
        rotate: 0, 
        scale: 1,
      }}
      transition={{ 
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.8
      }}
    >
      <motion.path
        d={getZodiacPath(sign)}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

function getZodiacPath(sign: string): string {
  const paths: Record<string, string> = {
    aries: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5",
    taurus: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z",
    gemini: "M6 3v18M18 3v18M6 12h12",
    cancer: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
    leo: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5",
    virgo: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
    libra: "M6 12h12M6 6h12M12 18V6",
    scorpio: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
    sagittarius: "M13 3l9 9-2 2-9-9v7H9V3h4zM4 19l5-5 2 2-5 5H4v-2z",
    capricorn: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z",
    aquarius: "M6 12h12M6 6h12M6 18h12",
    pisces: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
  };

  return paths[sign] || paths.aries;
}