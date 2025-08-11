import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
  className?: string;
}

const Hero: React.FC<HeroProps> = ({ 
  onGetStarted,
  className 
}) => {
  return (
    <div className="container py-16 items-center">
      <div className="flex flex-col space-y-6 max-w-2xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
          Put your diet on <span className="text-primary">autopilot.</span>
        </h1>
        
        <p className="text-lg text-muted-foreground">
          DietPlan creates personalized meal plans based on your food preferences, budget, and schedule. Reach your diet and nutritional goals with our calorie calculator, weekly meal plans, grocery lists and more.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
          <Button 
            size="lg" 
            className="rounded-md text-base font-medium"
            onClick={onGetStarted}
          >
            Get Started
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-md text-base font-medium"
            asChild
          >
            <Link to="/professionals">Learn More</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
