import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import BirthChart from "@/components/astrology/BirthChart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { ChartPDF } from "@/components/astrology/ChartPDF";
import { Badge } from "@/components/ui/badge";
import { Loader2, Info, MapPin, Calendar, Clock, Download } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  birthDate: z.string().min(1, "Birth date is required"),
  birthTime: z.string().min(1, "Birth time is required"),
  birthPlace: z.string().min(1, "Birth place is required"),
  latitude: z.coerce.number().min(-90).max(90),
  longitude: z.coerce.number().min(-180).max(180)
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: FormValues = {
  name: "",
  birthDate: "",
  birthTime: "",
  birthPlace: "",
  latitude: 0,
  longitude: 0
};

export default function BirthChartPage() {
  const [chartData, setChartData] = useState<any>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const mutation = useMutation({
    mutationFn: async (values: FormValues) => {
      const res = await fetch("/api/birth-charts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      if (!res.ok) throw new Error("Failed to generate birth chart");
      return res.json();
    },
    onSuccess: (data) => {
      setChartData(data);
      toast({
        title: "Success",
        description: "Birth chart generated successfully!"
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to generate birth chart. Please try again.",
        variant: "destructive"
      });
    }
  });

  function onSubmit(values: FormValues) {
    mutation.mutate(values);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF5E9] via-[#FFF0F5] to-[#F8F1FF] py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-purple-100 text-purple-600 hover:bg-purple-100 px-4 py-1">
            Birth Chart Calculator
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
            Discover Your Cosmic Blueprint
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mt-4">
            Generate your personalized birth chart using precise astrological calculations based on your birth details
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="bg-white/90 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Enter Your Birth Details</CardTitle>
                <CardDescription>
                  Please provide accurate information for the most precise calculations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="Enter your full name" 
                                className="pl-10" 
                                {...field}
                              />
                              <Info className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="birthDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Birth Date</FormLabel>
                            <FormControl>
                              <div className="relative">
                                <Input 
                                  type="date" 
                                  className="pl-10" 
                                  {...field}
                                />
                                <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="birthTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Birth Time</FormLabel>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <FormControl>
                                    <div className="relative">
                                      <Input 
                                        type="time" 
                                        className="pl-10" 
                                        {...field}
                                      />
                                      <Clock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                                    </div>
                                  </FormControl>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Enter time in 24-hour format for accuracy</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="birthPlace"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birth Place</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input 
                                placeholder="City, Country" 
                                className="pl-10" 
                                {...field}
                              />
                              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <FormControl>
                                    <Input 
                                      placeholder="e.g., 28.6139" 
                                      type="number"
                                      step="any"
                                      {...field}
                                    />
                                  </FormControl>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Enter latitude in decimal degrees (-90 to 90)</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <FormControl>
                                    <Input 
                                      placeholder="e.g., 77.2090" 
                                      type="number"
                                      step="any"
                                      {...field}
                                    />
                                  </FormControl>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Enter longitude in decimal degrees (-180 to 180)</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-purple-600 to-[#FF7E1D] hover:opacity-90 text-white"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Generating Chart...
                        </>
                      ) : (
                        "Generate Birth Chart"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:sticky lg:top-24"
          >
            <AnimatePresence mode="wait">
              {chartData ? (
                <motion.div
                  key="chart"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <BirthChart {...chartData} />
                  <ChartPDF data={chartData} />
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="h-full bg-white/90 backdrop-blur-sm p-8 flex items-center justify-center text-center">
                    <div className="max-w-sm">
                      <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-purple-100 flex items-center justify-center">
                        <Info className="w-8 h-8 text-purple-600" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-purple-600 to-[#FF7E1D] bg-clip-text text-transparent">
                        Enter Your Details
                      </h3>
                      <p className="text-gray-600">
                        Fill in your birth details to generate your personalized birth chart and discover your cosmic blueprint.
                      </p>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Additional Birth Chart Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 grid md:grid-cols-3 gap-8"
        >
          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-purple-600">What is a Birth Chart?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                A birth chart, also known as a natal chart, is a snapshot of the sky at the exact moment of your birth. It reveals the positions of the Sun, Moon, planets, and other astrological points in relation to Earth.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-[#FF7E1D]">Why is it Important?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Your birth chart serves as your cosmic fingerprint, offering deep insights into your personality, strengths, challenges, and life path. It's a powerful tool for self-discovery and personal growth.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl text-purple-600">How to Read It?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our detailed analysis breaks down each element of your chart, including planetary positions, houses, and aspects, providing you with clear and actionable insights into your astrological makeup.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}