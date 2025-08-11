import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <div className="flex justify-center py-12">
          <Button size="lg" className="button-hover-effect" onClick={() => navigate('/dashboard')}>
            Get Started
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
