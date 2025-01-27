import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Sun, Moon, Info, Download } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { ChartPDF } from "./ChartPDF";

interface Planet {
  name: string;
  position: number;
  symbol: string;
  color: string;
  retrograde: boolean;
  house: number;
  zodiacSign: string;
}

interface AlignmentPrediction {
  date: string;
  planets: string[];
  alignmentType: string;
  degree: number;
  influence: string;
  startTime: string;
  peakTime: string;
  endTime: string;
  significance: string | number;
}

const PLANETS: Planet[] = [
  { name: "Sun", position: 0, symbol: "☉", color: "#FFD700", retrograde: false, house: 1, zodiacSign: "Aries" },
  { name: "Moon", position: 30, symbol: "☽", color: "#C0C0C0", retrograde: false, house: 2, zodiacSign: "Taurus" },
  { name: "Mercury", position: 60, symbol: "☿", color: "#B87333", retrograde: true, house: 3, zodiacSign: "Gemini" },
  { name: "Venus", position: 90, symbol: "♀", color: "#FFC0CB", retrograde: false, house: 4, zodiacSign: "Cancer" },
  { name: "Mars", position: 120, symbol: "♂", color: "#FF4500", retrograde: false, house: 5, zodiacSign: "Leo" },
  { name: "Jupiter", position: 150, symbol: "♃", color: "#FFA500", retrograde: false, house: 6, zodiacSign: "Virgo" },
  { name: "Saturn", position: 180, symbol: "♄", color: "#808080", retrograde: true, house: 7, zodiacSign: "Libra" },
  { name: "Uranus", position: 210, symbol: "⛢", color: "#40E0D0", retrograde: false, house: 8, zodiacSign: "Scorpio" },
  { name: "Neptune", position: 240, symbol: "♆", color: "#000080", retrograde: false, house: 9, zodiacSign: "Sagittarius" },
  { name: "Pluto", position: 270, symbol: "♇", color: "#800080", retrograde: true, house: 10, zodiacSign: "Capricorn" }
];

const ZODIAC_SIGNS = [
  { symbol: "♈", color: "#FF4136", degrees: Array.from({ length: 30 }, (_, i) => i) },
  { symbol: "♉", color: "#2ECC40", degrees: Array.from({ length: 30 }, (_, i) => i + 30) },
  { symbol: "♊", color: "#FFDC00", degrees: Array.from({ length: 30 }, (_, i) => i + 60) },
  { symbol: "♋", color: "#B10DC9", degrees: Array.from({ length: 30 }, (_, i) => i + 90) },
  { symbol: "♌", color: "#FF4136", degrees: Array.from({ length: 30 }, (_, i) => i + 120) },
  { symbol: "♍", color: "#2ECC40", degrees: Array.from({ length: 30 }, (_, i) => i + 150) },
  { symbol: "♎", color: "#FFDC00", degrees: Array.from({ length: 30 }, (_, i) => i + 180) },
  { symbol: "♏", color: "#B10DC9", degrees: Array.from({ length: 30 }, (_, i) => i + 210) },
  { symbol: "♐", color: "#FF4136", degrees: Array.from({ length: 30 }, (_, i) => i + 240) },
  { symbol: "♑", color: "#2ECC40", degrees: Array.from({ length: 30 }, (_, i) => i + 270) },
  { symbol: "♒", color: "#FFDC00", degrees: Array.from({ length: 30 }, (_, i) => i + 300) },
  { symbol: "♓", color: "#B10DC9", degrees: Array.from({ length: 30 }, (_, i) => i + 330) }
];

const ASPECTS = [
  { name: "Conjunction", angle: 0, color: "#FFD700", orb: 10 },
  { name: "Sextile", angle: 60, color: "#98FB98", orb: 6 },
  { name: "Square", angle: 90, color: "#FF4500", orb: 8 },
  { name: "Trine", angle: 120, color: "#4169E1", orb: 8 },
  { name: "Opposition", angle: 180, color: "#DC143C", orb: 10 }
];

export default function PlanetaryAlignment() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);

  const { data: alignments, isLoading } = useQuery<AlignmentPrediction[]>({
    queryKey: ['/api/planetary-alignments', format(selectedDate, 'yyyy-MM-dd')],
    enabled: !!selectedDate
  });

  const calculateAspects = (planet1: Planet, planet2: Planet) => {
    const angle = Math.abs(planet1.position - planet2.position);
    const normalizedAngle = angle > 180 ? 360 - angle : angle;
    return ASPECTS.find(aspect => Math.abs(normalizedAngle - aspect.angle) <= aspect.orb);
  };


  const chartData = {
    name: "Current Planetary Positions",
    birthDate: format(selectedDate, 'PPP'),
    birthTime: format(selectedDate, 'p'),
    birthPlace: "Global View",
    positions: PLANETS.map(planet => ({
      planet: planet.name,
      sign: planet.zodiacSign,
      degree: planet.position,
      house: planet.house,
      isRetrograde: planet.retrograde
    }))
  };

  return (
    <div className="w-full mx-auto p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent mb-4">
            Cosmic Planetary Alignments
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore the mystical dance of celestial bodies and their profound influence on your destiny
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="bg-white/95 backdrop-blur-sm border-2 border-purple-100">
            <CardContent className="p-8">
              <div className="absolute inset-0 pointer-events-none opacity-5">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute inset-0"
                    style={{
                      border: '1px solid currentColor',
                      borderRadius: '50%',
                      transform: `rotate(${i * 30}deg) scale(${0.8 + i * 0.05})`
                    }}
                    animate={{
                      rotate: [i * 30, i * 30 + 360],
                    }}
                    transition={{
                      duration: 200 + i * 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                ))}
              </div>

              <div className="relative w-full aspect-square max-w-2xl mx-auto">
                <div className="absolute inset-0 border-4 border-purple-200/50 rounded-full" />

                {Array.from({ length: 360 }, (_, i) => (
                  <div
                    key={`degree-${i}`}
                    className={`absolute top-0 left-1/2 w-px bg-gray-200/60 origin-bottom`}
                    style={{
                      height: i % 30 === 0 ? '12px' : i % 5 === 0 ? '8px' : '4px',
                      transform: `rotate(${i}deg) translateY(-50%)`,
                    }}
                  />
                ))}

                {ZODIAC_SIGNS.map((sign, index) => (
                  <div key={sign.symbol} className="absolute inset-0">
                    <div
                      className="absolute inset-0"
                      style={{
                        borderLeft: `2px solid ${sign.color}`,
                        transform: `rotate(${index * 30}deg)`,
                        transformOrigin: 'center',
                        opacity: 0.3
                      }}
                    />
                    <div
                      className="absolute text-2xl font-bold"
                      style={{
                        color: sign.color,
                        left: `${50 + 47 * Math.cos((index * 30 + 15) * Math.PI / 180)}%`,
                        top: `${50 + 47 * Math.sin((index * 30 + 15) * Math.PI / 180)}%`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      {sign.symbol}
                    </div>
                  </div>
                ))}

                {PLANETS.map((planet1, i) =>
                  PLANETS.slice(i + 1).map((planet2, j) => {
                    const aspect = calculateAspects(planet1, planet2);
                    if (aspect) {
                      const radius = 35;
                      return (
                        <motion.div
                          key={`${planet1.name}-${planet2.name}`}
                          className="absolute inset-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.3 }}
                        >
                          <svg className="w-full h-full">
                            <line
                              x1={`${50 + radius * Math.cos(planet1.position * Math.PI / 180)}%`}
                              y1={`${50 + radius * Math.sin(planet1.position * Math.PI / 180)}%`}
                              x2={`${50 + radius * Math.cos(planet2.position * Math.PI / 180)}%`}
                              y2={`${50 + radius * Math.sin(planet2.position * Math.PI / 180)}%`}
                              stroke={aspect.color}
                              strokeWidth="1"
                            />
                          </svg>
                        </motion.div>
                      );
                    }
                    return null;
                  })
                )}

                {PLANETS.map((planet, index) => {
                  const radius = 35;
                  const angle = (planet.position * Math.PI) / 180;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;

                  return (
                    <Drawer key={planet.name}>
                      <DrawerTrigger asChild>
                        <motion.button
                          className="absolute w-8 h-8 -ml-4 -mt-4 hover:scale-125 transition-transform"
                          style={{
                            left: `${50 + x}%`,
                            top: `${50 + y}%`,
                          }}
                          whileHover={{ scale: 1.2 }}
                        >
                          <div className="relative group">
                            <span
                              className="text-2xl transition-transform group-hover:scale-110"
                              style={{ color: planet.color }}
                            >
                              {planet.symbol}
                            </span>
                            {planet.retrograde && (
                              <span className="absolute -top-2 -right-2 text-xs text-red-500 font-bold">R</span>
                            )}
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white px-2 py-1 rounded-md shadow-lg text-xs whitespace-nowrap">
                              {planet.name} in {planet.zodiacSign}
                            </div>
                          </div>
                        </motion.button>
                      </DrawerTrigger>
                      <DrawerContent>
                        <DrawerHeader>
                          <DrawerTitle className="text-2xl font-bold flex items-center gap-2">
                            <span style={{ color: planet.color }}>{planet.symbol}</span>
                            {planet.name}
                          </DrawerTitle>
                          <div className="grid grid-cols-2 gap-4 mt-4">
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">Current Sign</p>
                              <p className="font-semibold">{planet.zodiacSign}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">House Position</p>
                              <p className="font-semibold">House {planet.house}</p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">Motion</p>
                              <p className="font-semibold text-red-500">
                                {planet.retrograde ? "Retrograde" : "Direct"}
                              </p>
                            </div>
                            <div className="space-y-2">
                              <p className="text-sm text-gray-600">Degree</p>
                              <p className="font-semibold">{planet.position}°</p>
                            </div>
                          </div>
                        </DrawerHeader>
                      </DrawerContent>
                    </Drawer>
                  );
                })}

                <div className="absolute inset-1/2 w-3 h-3 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-full h-full rounded-full bg-blue-400 animate-pulse" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-2 border-purple-100">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-purple-600" />
                  Celestial Alignments
                </h3>
                <ChartPDF data={chartData} />
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="space-y-6">
                  {alignments?.map((alignment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative"
                    >
                      <Card className="border-purple-100 hover:border-purple-300 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="text-xl font-semibold text-purple-600">
                                {alignment.alignmentType}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {format(new Date(alignment.startTime), 'PPP')}
                              </p>
                            </div>
                            <span className="px-3 py-1.5 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                              {Number(alignment.significance).toFixed(1)}° Alignment
                            </span>
                          </div>

                          <p className="text-gray-700 mb-4">{alignment.influence}</p>

                          <div className="flex flex-wrap gap-2">
                            {alignment.planets.map((planet) => (
                              <span
                                key={planet}
                                className="px-3 py-1.5 bg-white rounded-full text-sm font-medium text-gray-700 border border-purple-100"
                              >
                                {PLANETS.find(p => p.name === planet)?.symbol} {planet}
                              </span>
                            ))}
                          </div>

                          <div className="mt-4 grid grid-cols-3 gap-4 text-center text-sm">
                            <div>
                              <p className="text-gray-600">Starts</p>
                              <p className="font-medium">{format(new Date(alignment.startTime), 'p')}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Peaks</p>
                              <p className="font-medium text-purple-600">{format(new Date(alignment.peakTime), 'p')}</p>
                            </div>
                            <div>
                              <p className="text-gray-600">Ends</p>
                              <p className="font-medium">{format(new Date(alignment.endTime), 'p')}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 bg-white/95 backdrop-blur-sm border-2 border-purple-100">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-lg font-semibold text-purple-600 mb-2">Understanding Alignments</h4>
                <p className="text-gray-600">
                  Planetary alignments occur when celestial bodies form specific angular relationships,
                  creating powerful energetic influences that can affect various aspects of life.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-600 mb-2">Retrograde Motion</h4>
                <p className="text-gray-600">
                  When planets appear to move backward in their orbit, they enter a retrograde phase,
                  often bringing periods of reflection and internal growth.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-purple-600 mb-2">Astrological Houses</h4>
                <p className="text-gray-600">
                  The twelve houses represent different areas of life, and a planet's position in a
                  particular house influences how its energy manifests in your life.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}