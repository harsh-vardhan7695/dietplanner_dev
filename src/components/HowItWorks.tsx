
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { WavyBackground } from "@/components/ui/wavy-background";

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 relative overflow-hidden">
      <WavyBackground 
        containerClassName="absolute inset-0 h-full"
        colors={["#1A1F2C", "#403E43", "#221F26", "#222222", "#333333"]} 
        backgroundFill="#1A1F2C"
        blur={10}
        speed="slow"
        waveWidth={40}
        waveOpacity={0.3}
      >
        {/* Empty - using this for background only */}
      </WavyBackground>
      
      <div className="section-container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
            How DietPlanner Works
          </h2>
          <p className="mt-4 text-xl text-white/80">
            Simple steps to your personalized nutrition plan
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="relative">
            <div className="feature-card h-full bg-black/50 text-white">
              <div className="absolute -top-10 left-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4 mt-4">Share Your Details</h3>
              <p className="text-white/70">
                Tell us about your health goals, dietary restrictions, medical conditions, and food preferences.
              </p>
            </div>
            <div className="hidden md:block absolute top-1/2 right-0 -mr-4 transform translate-x-1/2">
              <ArrowRight className="h-8 w-8 text-white/50" />
            </div>
          </div>
          
          <div className="relative">
            <div className="feature-card h-full bg-black/50 text-white">
              <div className="absolute -top-10 left-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4 mt-4">AI Creates Your Plan</h3>
              <p className="text-white/70">
                Our AI analyzes your information and generates a customized meal plan optimized for your specific needs.
              </p>
            </div>
            <div className="hidden md:block absolute top-1/2 right-0 -mr-4 transform translate-x-1/2">
              <ArrowRight className="h-8 w-8 text-white/50" />
            </div>
          </div>
          
          <div className="relative">
            <div className="feature-card h-full bg-black/50 text-white">
              <div className="absolute -top-10 left-0 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4 mt-4">Eat Smarter, Live Better</h3>
              <p className="text-white/70">
                Follow your personalized plan, track your progress, and adjust as your needs change over time.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild size="lg" className="mt-8">
            <Link to="/auth">Create Account</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
