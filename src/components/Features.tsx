
import { Check, ListChecks, ShoppingCart, Brain } from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-muted/30">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Smarter Meal Planning
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            AI-powered features that make nutrition planning effortless
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="feature-card animate-fade-in" style={{ animationDelay: "0ms" }}>
            <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10">
              <Check className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Personalized Diet Plans</h3>
            <p className="text-muted-foreground">
              No more one-size-fits-all nutrition. Get meal plans tailored to your body's needs.
            </p>
          </div>
          
          <div className="feature-card animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10">
              <ListChecks className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Macros & Meal Prep</h3>
            <p className="text-muted-foreground">
              We crunch the numbers so you don't have to. Perfect macros for your goals.
            </p>
          </div>
          
          <div className="feature-card animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Automated Grocery Lists</h3>
            <p className="text-muted-foreground">
              Because meal planning should be effortless. Shop smarter, not harder.
            </p>
          </div>
          
          <div className="feature-card animate-fade-in" style={{ animationDelay: "450ms" }}>
            <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI-Powered Insights</h3>
            <p className="text-muted-foreground">
              Smarter decisions, better results. Let AI do the thinking for your diet.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
