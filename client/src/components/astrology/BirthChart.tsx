import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

interface Aspect {
  planet1: string;
  planet2: string;
  type: string;
  orb: number;
  nature: "Beneficial" | "Challenging";
}

interface Planet {
  name: string;
  sign: string;
  degree: number;
  house: number;
  retrograde: boolean;
  dignity: string;
  aspects: Aspect[];
  longitude: number;
}

interface HouseCusp {
  house: number;
  sign: string;
  degree: number;
  longitude: number;
}

interface BirthChartProps {
  birthDate: Date;
  birthTime: string;
  birthPlace: string;
  latitude: number;
  longitude: number;
  planets: Planet[];
  houseCusps: HouseCusp[];
  ayanamsa: string;
}

const ZODIAC_SIGNS = [
  "Aries", "Taurus", "Gemini", "Cancer",
  "Leo", "Virgo", "Libra", "Scorpio",
  "Sagittarius", "Capricorn", "Aquarius", "Pisces"
] as const;

const ASPECT_SYMBOLS = {
  Conjunction: "☌",
  Opposition: "☍",
  Trine: "△",
  Square: "□",
  Sextile: "⚹"
} as const;

const PLANET_SYMBOLS = {
  Sun: "☉",
  Moon: "☽",
  Mercury: "☿",
  Venus: "♀",
  Mars: "♂",
  Jupiter: "♃",
  Saturn: "♄",
  Uranus: "⛢",
  Neptune: "♆",
  Pluto: "♇",
  "North Node": "☊",
  "South Node": "☋"
} as const;

export default function BirthChart({ 
  birthDate, 
  birthTime, 
  birthPlace,
  latitude,
  longitude, 
  planets = [],
  houseCusps = [],
  ayanamsa = "Lahiri"
}: BirthChartProps) {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet | null>(null);
  const [selectedHouse, setSelectedHouse] = useState<HouseCusp | null>(null);
  const [isRotating, setIsRotating] = useState(false);
  const [chartSize, setChartSize] = useState({ width: 600, height: 600 });

  useEffect(() => {
    const updateChartSize = () => {
      const width = Math.min(window.innerWidth - 40, 600);
      setChartSize({ width, height: width });
    };

    updateChartSize();
    window.addEventListener('resize', updateChartSize);
    return () => window.removeEventListener('resize', updateChartSize);
  }, []);

  const chartConfig = {
    centerX: chartSize.width / 2,
    centerY: chartSize.height / 2,
    radius: (chartSize.width / 2) - 30,
    innerRadius: ((chartSize.width / 2) - 30) * 0.6,
  };

  const calculatePosition = (degree: number, radius: number) => {
    const angleInRadians = (degree - 90) * (Math.PI / 180);
    return {
      x: chartConfig.centerX + Math.cos(angleInRadians) * radius,
      y: chartConfig.centerY + Math.sin(angleInRadians) * radius
    };
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm">
      <div className="text-center mb-4 space-y-2">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
          Vedic Birth Chart
        </h3>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <Badge variant="outline" className="bg-purple-50">
            {new Date(birthDate).toLocaleDateString()}
          </Badge>
          <Badge variant="outline" className="bg-purple-50">
            {birthTime}
          </Badge>
          <Badge variant="outline" className="bg-purple-50">
            {birthPlace}
          </Badge>
        </div>
        <p className="text-sm text-gray-500">
          Coordinates: {latitude}°N, {longitude}°E | Ayanamsa: {ayanamsa}
        </p>
      </div>

      <motion.div 
        className="relative"
        animate={{ rotate: isRotating ? 360 : 0 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg 
          width={chartSize.width} 
          height={chartSize.height}
          className="transform-gpu"
          viewBox={`0 0 ${chartSize.width} ${chartSize.height}`}
        >
          {/* Outer Circle */}
          <circle
            cx={chartConfig.centerX}
            cy={chartConfig.centerY}
            r={chartConfig.radius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="2"
            className="filter drop-shadow-sm"
          />

          {/* Inner Circle */}
          <circle
            cx={chartConfig.centerX}
            cy={chartConfig.centerY}
            r={chartConfig.innerRadius}
            fill="none"
            stroke="hsl(var(--border))"
            strokeWidth="1"
            strokeDasharray="4 4"
          />

          {/* Zodiac Signs */}
          {ZODIAC_SIGNS.map((sign, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const radius = chartConfig.radius - 25;
            const x = chartConfig.centerX + Math.cos(angle) * radius;
            const y = chartConfig.centerY + Math.sin(angle) * radius;

            return (
              <g key={sign}>
                <motion.text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  className="fill-current text-sm font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {sign}
                </motion.text>
              </g>
            );
          })}

          {/* House Cusps */}
          {houseCusps?.map((house, index) => {
            const startPos = calculatePosition(house.longitude, chartConfig.radius);
            return (
              <g key={`house-${house.house}-${index}`}
                onMouseEnter={() => setSelectedHouse(house)}
                onMouseLeave={() => setSelectedHouse(null)}
              >
                <line
                  x1={chartConfig.centerX}
                  y1={chartConfig.centerY}
                  x2={startPos.x}
                  y2={startPos.y}
                  stroke="hsl(var(--border))"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={calculatePosition(house.longitude + 2, chartConfig.innerRadius - 20).x}
                  y={calculatePosition(house.longitude + 2, chartConfig.innerRadius - 20).y}
                  className="fill-current text-xs font-medium"
                >
                  {house.house}
                </text>
              </g>
            );
          })}

          {/* Planets */}
          {planets?.map((planet, index) => {
            const pos = calculatePosition(planet.longitude, chartConfig.innerRadius - (40 + index * 15));

            return (
              <motion.g
                key={`planet-${planet.name}-${index}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                onMouseEnter={() => setSelectedPlanet(planet)}
                onMouseLeave={() => setSelectedPlanet(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={10}
                  className={`${planet.retrograde ? 'fill-orange-100' : 'fill-purple-100'} stroke-2 ${
                    planet.retrograde ? 'stroke-orange-500' : 'stroke-purple-600'
                  }`}
                />
                <text
                  x={pos.x}
                  y={pos.y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className={`text-sm ${planet.retrograde ? 'fill-orange-500' : 'fill-purple-600'}`}
                >
                  {PLANET_SYMBOLS[planet.name as keyof typeof PLANET_SYMBOLS]}
                </text>
                <text
                  x={pos.x}
                  y={pos.y + 20}
                  textAnchor="middle"
                  className="fill-current text-xs font-medium"
                >
                  {planet.degree.toFixed(1)}°
                </text>
              </motion.g>
            );
          })}

          {/* Aspect Lines */}
          {selectedPlanet?.aspects.map((aspect, index) => {
            const planet2 = planets.find(p => p.name === aspect.planet2);
            if (!planet2) return null;

            const pos1 = calculatePosition(selectedPlanet.longitude, chartConfig.innerRadius - 40);
            const pos2 = calculatePosition(planet2.longitude, chartConfig.innerRadius - 40);

            return (
              <motion.g
                key={`aspect-${index}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.5 }}
                exit={{ opacity: 0 }}
              >
                <line
                  x1={pos1.x}
                  y1={pos1.y}
                  x2={pos2.x}
                  y2={pos2.y}
                  stroke={aspect.nature === "Beneficial" ? "#059669" : "#DC2626"}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={(pos1.x + pos2.x) / 2}
                  y={(pos1.y + pos2.y) / 2}
                  textAnchor="middle"
                  className="fill-current text-xs"
                >
                  {ASPECT_SYMBOLS[aspect.type as keyof typeof ASPECT_SYMBOLS]}
                </text>
              </motion.g>
            );
          })}
        </svg>

        {/* Tooltips */}
        {selectedPlanet && (
          <div className="absolute top-0 left-0 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-purple-100">
            <h4 className="font-semibold text-purple-600">
              {selectedPlanet.name} {selectedPlanet.retrograde && "(R)"}
            </h4>
            <p className="text-sm text-gray-600">
              {selectedPlanet.sign} {selectedPlanet.degree.toFixed(1)}°
              <br />
              House {selectedPlanet.house}
              <br />
              Dignity: {selectedPlanet.dignity}
            </p>
          </div>
        )}

        {selectedHouse && (
          <div className="absolute top-0 right-0 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg border border-purple-100">
            <h4 className="font-semibold text-purple-600">House {selectedHouse.house}</h4>
            <p className="text-sm text-gray-600">
              {selectedHouse.sign} {selectedHouse.degree.toFixed(1)}°
            </p>
          </div>
        )}
      </motion.div>

      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => setIsRotating(!isRotating)}
          className="px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
        >
          {isRotating ? "Pause Rotation" : "Start Rotation"}
        </button>
      </div>
    </Card>
  );
}