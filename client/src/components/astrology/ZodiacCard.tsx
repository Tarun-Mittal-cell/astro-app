import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ZodiacCardProps {
  sign: string;
  imageUrl: string;
}

export default function ZodiacCard({ sign, imageUrl }: ZodiacCardProps) {
  return (
    <Card className="hover-lift glass-effect animate-shimmer">
      <CardContent className="pt-6 text-center relative overflow-hidden">
        <img
          src={imageUrl}
          alt={sign}
          className="w-24 h-24 mx-auto mb-4"
        />
        <h3 className="font-semibold text-lg mb-2">{sign}</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Select your zodiac sign to read your daily horoscope.
        </p>
        <Button variant="outline" className="w-full">
          Read Horoscope
        </Button>
      </CardContent>
    </Card>
  );
}
