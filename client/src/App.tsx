import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Home from "@/pages/Home";
import Horoscope from "@/pages/Horoscope";
import Astrologers from "@/pages/Astrologers";
import BirthChart from "@/pages/BirthChart";
import VedicInsights from "@/pages/VedicInsights";
import Shop from "@/pages/Shop";
import About from "@/pages/About";
import Consultation from "@/pages/Consultation";
import PlanetaryAlignments from "@/pages/PlanetaryAlignments";
import Predictions from "@/pages/predictions";
import NotFound from "@/pages/not-found";
import Chatbot from "@/components/chat/Chatbot";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/horoscope" component={Horoscope}/>
      <Route path="/astrologers" component={Astrologers} />
      <Route path="/birth-chart" component={BirthChart} />
      <Route path="/vedic-insights" component={VedicInsights} />
      <Route path="/shop" component={Shop} />
      <Route path="/consultation/:id" component={Consultation} />
      <Route path="/planetary-alignments" component={PlanetaryAlignments} />
      <Route path="/predictions" component={Predictions} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow pt-20 md:pt-24">
          <Router />
        </main>
        <Footer />
        <Chatbot />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;