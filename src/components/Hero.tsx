import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="hero-gradient py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-secondary/20 px-3 py-1 text-sm dark:bg-secondary/30">
              AI-Powered Nutrition
            </div>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Your Personal AI Nutritionist
            </h1>
            <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Tired of generic diet advice? DietPlanner crafts personalized meal plans based on your health goals, medical conditions, and preferences.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="button-hover-effect" onClick={() => navigate('/dashboard')}>
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="button-hover-effect" asChild>
                <a href="#how-it-works">Learn More</a>
              </Button>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-full max-w-[500px] aspect-square rounded-full bg-muted overflow-hidden animate-pulse-slow">
              <img 
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2853&auto=format&fit=crop&ixlib=rb-4.0.3"
                alt="Healthy food being prepared" 
                className="absolute inset-0 object-cover w-full h-full mix-blend-overlay opacity-40"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 rounded-full bg-primary/10 flex items-center justify-center backdrop-blur-sm border border-primary/20">
                  <div className="text-center p-6">
                    <h3 className="text-2xl font-semibold mb-2">AI-Powered</h3>
                    <p className="text-sm text-muted-foreground">Personalized nutrition plans tailored just for you</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
