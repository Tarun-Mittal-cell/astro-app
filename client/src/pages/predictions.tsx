import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Stars, ThumbsUp, ThumbsDown } from "lucide-react";

interface Prediction {
  id: number;
  predictionType: string;
  content: string;
  accuracy: number;
  validUntil: string;
  planetaryContext: Record<string, any>;
  userFeedback?: number;
}

export default function Predictions() {
  const [selectedType, setSelectedType] = useState<string>("career");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: predictions = [], isLoading: isLoadingPredictions } = useQuery<Prediction[]>({
    queryKey: ["/api/predictions"],
  });

  const generateMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/predictions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ predictionType: selectedType }),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/predictions"] });
      toast({
        title: "Prediction Generated",
        description: "Your personalized prediction is ready!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to generate prediction",
        variant: "destructive",
      });
    },
  });

  const feedbackMutation = useMutation({
    mutationFn: async ({ predictionId, feedback }: { predictionId: number; feedback: number }) => {
      const res = await fetch(`/api/predictions/${predictionId}/feedback`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback }),
      });
      if (!res.ok) throw new Error(await res.text());
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/predictions"] });
      toast({
        title: "Feedback Submitted",
        description: "Thank you for your feedback!",
      });
    },
  });

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">AI Astrological Predictions</h1>
        <p className="text-muted-foreground">
          Get personalized predictions powered by advanced AI and planetary positions
        </p>
      </div>

      <div className="flex gap-4 mb-8 justify-center">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="career">Career</SelectItem>
            <SelectItem value="love">Love</SelectItem>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="spiritual">Spiritual Growth</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={() => generateMutation.mutate()}
          disabled={generateMutation.isPending}
          className="bg-[#FF7E1D] hover:bg-[#FF7E1D]/90"
        >
          {generateMutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Stars className="mr-2 h-4 w-4" />
          )}
          Generate Prediction
        </Button>
      </div>

      {isLoadingPredictions ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF7E1D]" />
        </div>
      ) : predictions.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            No predictions yet. Generate your first prediction!
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {predictions.map((prediction: Prediction) => (
            <Card key={prediction.id} className="border-purple-100 hover:border-purple-200 transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  {prediction.predictionType.charAt(0).toUpperCase() + 
                   prediction.predictionType.slice(1)} Prediction
                  <span className="text-sm font-normal text-muted-foreground">
                    Valid until {new Date(prediction.validUntil).toLocaleDateString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-gray-700">{prediction.content}</p>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-purple-600 font-medium">
                    Accuracy: {Math.round(prediction.accuracy * 100)}%
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={feedbackMutation.isPending || prediction.userFeedback === 1}
                      onClick={() => feedbackMutation.mutate({ 
                        predictionId: prediction.id, 
                        feedback: 1 
                      })}
                      className={prediction.userFeedback === 1 ? "bg-green-50" : ""}
                    >
                      <ThumbsUp className={`h-4 w-4 ${prediction.userFeedback === 1 ? "text-green-600" : ""}`} />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={feedbackMutation.isPending || prediction.userFeedback === -1}
                      onClick={() => feedbackMutation.mutate({ 
                        predictionId: prediction.id, 
                        feedback: -1 
                      })}
                      className={prediction.userFeedback === -1 ? "bg-red-50" : ""}
                    >
                      <ThumbsDown className={`h-4 w-4 ${prediction.userFeedback === -1 ? "text-red-600" : ""}`} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}