
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const diets = [
  {
    name: "Ketogenic",
    description: "High-fat, adequate-protein, low-carbohydrate diet that forces the body to burn fats rather than carbohydrates.",
    features: ["Fat: 70-80%", "Protein: 20-25%", "Carbs: 5-10%"]
  },
  {
    name: "Paleo",
    description: "Based on foods similar to what might have been eaten during the Paleolithic era, consisting mainly of meat, fish, vegetables, and fruit.",
    features: ["Whole foods", "No processed foods", "No grains or dairy"]
  },
  {
    name: "Vegetarian",
    description: "Excludes meat, and sometimes other animal products, while focusing on plant-based foods for ethical, environmental, or health reasons.",
    features: ["Plant-based proteins", "Dairy and eggs allowed", "Rich in fruits and vegetables"]
  },
  {
    name: "Vegan",
    description: "Excludes all animal products, including meat, dairy, eggs, and honey, focused entirely on plant-based nutrition.",
    features: ["100% plant-based", "No animal products", "High in legumes and nuts"]
  },
  {
    name: "Mediterranean",
    description: "Based on the traditional foods that people used to eat in countries like Italy and Greece, rich in healthy fats, vegetables, and whole grains.",
    features: ["Olive oil", "Lean proteins", "Fresh produce"]
  },
  {
    name: "Gluten-Free",
    description: "Eliminates gluten, a mixture of proteins found in wheat and related grains, including barley, rye, oat, and all their species and hybrids.",
    features: ["No wheat products", "Alternative grains", "Specialized recipes"]
  }
];

const SupportedDiets = () => {
  useVisitorTracking('/supported-diets');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <div className="bg-background text-foreground py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Supported Diets</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                DietPlanner supports a wide variety of dietary preferences and restrictions. 
                Our AI customizes meal plans for each of these diets with delicious, varied options.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {diets.map((diet, index) => (
                <div key={index} className="feature-card">
                  <h2 className="text-2xl font-bold mb-3">{diet.name}</h2>
                  <p className="text-muted-foreground mb-4">{diet.description}</p>
                  <ul className="space-y-2">
                    {diet.features.map((feature, i) => (
                      <li key={i} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <p className="text-lg mb-6">Don't see your specific dietary needs? Our system can customize meal plans for almost any requirement.</p>
              <Button asChild size="lg">
                <Link to="/auth">Create Your Custom Plan</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SupportedDiets;
