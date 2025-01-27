import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface AstrologerCardProps {
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  languages: string;
  price: number;
  imageUrl: string;
}

export default function AstrologerCard({
  name,
  specialty,
  experience,
  rating,
  reviews,
  languages,
  price,
  imageUrl
}: AstrologerCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex gap-4">
          <img
            src={imageUrl}
            alt={name}
            className="w-24 h-24 rounded-full object-cover"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{name}</h3>
            <p className="text-sm text-muted-foreground">{specialty}</p>
            
            <div className="flex items-center gap-1 mt-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
              <span className="text-sm text-muted-foreground">({reviews} reviews)</span>
            </div>
            
            <p className="text-sm mt-2">{experience} years experience</p>
            <p className="text-sm text-muted-foreground">Languages: {languages}</p>
            
            <div className="flex items-center justify-between mt-4">
              <span className="text-lg font-semibold">₹{price}</span>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Call</Button>
                <Button size="sm">Chat</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
