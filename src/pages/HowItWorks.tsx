
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { User, ChefHat, ShoppingCart, LineChart, Settings } from "lucide-react";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

const HowItWorks = () => {
  useVisitorTracking('/how-it-works');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-background text-foreground py-16 md:py-24">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How DietPlan Works</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started with DietPlan in just a few simple steps. Our AI-powered platform makes 
              healthy eating easy and personalized to your needs.
            </p>
            
            <div className="mt-16 md:mt-24 max-w-4xl mx-auto space-y-16">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-left">
                <div className="bg-primary/10 p-4 rounded-full">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Step 1: Create Your Account</h2>
                  <p className="text-muted-foreground">
                    Sign up or log in to create your DietPlan account and start your journey to better nutrition.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-left">
                <div className="bg-primary/10 p-4 rounded-full">
                  <Settings className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Step 2: Set Your Preferences</h2>
                  <p className="text-muted-foreground">
                    Enter your food preferences, dietary restrictions, budget, and schedule in the app to get personalized recommendations.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-left">
                <div className="bg-primary/10 p-4 rounded-full">
                  <ChefHat className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Step 3: Get Your Meal Plan</h2>
                  <p className="text-muted-foreground">
                    Receive a personalized meal plan tailored to your goals, including calorie tracking and weekly meal suggestions.
                  </p>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-left">
                <div className="bg-primary/10 p-4 rounded-full">
                  <ShoppingCart className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Step 4: Smart Shopping</h2>
                  <p className="text-muted-foreground">
                    Explore AI-powered recipes and generate smart grocery lists to make shopping easier and more efficient.
                  </p>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-left">
                <div className="bg-primary/10 p-4 rounded-full">
                  <LineChart className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">Step 5: Track Progress</h2>
                  <p className="text-muted-foreground">
                    Follow your meal plan, track your progress, and adjust as needed to meet your nutritional goals.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-16">
              <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
                <Link to="/auth">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
