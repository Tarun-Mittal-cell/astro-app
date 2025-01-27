import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  location: string;
  testimonial: string;
  imageUrl: string;
}

export default function TestimonialCard({
  name,
  location,
  testimonial,
  imageUrl
}: TestimonialCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <Quote className="w-8 h-8 text-primary/20 mb-4" />
        <p className="text-sm text-muted-foreground mb-6">{testimonial}</p>
        
        <div className="flex items-center gap-3">
          <img
            src={imageUrl}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="font-semibold">{name}</h4>
            <p className="text-sm text-muted-foreground">{location}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
