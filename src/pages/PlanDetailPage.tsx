
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download, Clipboard } from "lucide-react";

const PlanDetailPage = () => {
  const [loading, setLoading] = useState(true);
  const [plan, setPlan] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSessionAndFetchPlan = async () => {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData.session) {
        navigate("/auth");
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from("diet_plans")
          .select("*")
          .eq("id", id)
          .single();
          
        if (error) throw error;
        
        if (!data) {
          toast({
            title: "Plan not found",
            description: "The requested diet plan could not be found",
            variant: "destructive",
          });
          navigate("/dashboard");
          return;
        }
        
        setPlan(data);
      } catch (fetchError: any) {
        console.error("Error fetching plan:", fetchError);
        toast({
          title: "Error loading diet plan",
          description: fetchError.message,
          variant: "destructive",
        });
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };
    
    checkSessionAndFetchPlan();
  }, [id, navigate, toast]);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleCopyToClipboard = () => {
    if (plan?.plan_data) {
      const planText = Object.entries(plan.plan_data)
        .map(([key, value]) => `${key.replace(/_/g, ' ').toUpperCase()}\n${value}`)
        .join('\n\n');
        
      navigator.clipboard.writeText(planText);
      setCopied(true);
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };
  
  const handleDownload = () => {
    if (plan?.plan_data) {
      const planText = Object.entries(plan.plan_data)
        .map(([key, value]) => `# ${key.replace(/_/g, ' ').toUpperCase()}\n${value}`)
        .join('\n\n');
        
      const element = document.createElement("a");
      const file = new Blob([planText], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `diet_plan_${plan.id}.md`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // For demo purposes, let's create some sample data if plan_data isn't available
  const planData = plan.plan_data || {
    nutritional_requirements: `
- Daily Caloric Needs: 2,100 calories
- Protein: 120-150g (25-30% of total calories)
- Carbohydrates: 210-260g (40-50% of total calories)
- Fats: 58-70g (25-30% of total calories)
- Water: Minimum 3 liters daily
    `,
    medical_considerations: `
- Limited Sodium: Keep below 2,000mg daily
- Increased Potassium: Aim for 3,500-4,700mg daily
- Moderate Glycemic Index: Focus on low GI carbohydrates
- Avoid: Processed foods with artificial preservatives
    `,
    meal_plan: `
### Day 1

**Breakfast:**
- Overnight oats with almond milk, berries, and 1 tbsp flaxseeds
- 1 medium apple
- Green tea (unsweetened)

**Lunch:**
- Grilled chicken salad with mixed greens, cherry tomatoes, cucumber
- 1/2 cup brown rice
- 8oz water with lemon

**Dinner:**
- Baked salmon (4oz) with dill and lemon
- Steamed broccoli and carrots
- Small sweet potato
    `,
    grocery_list: `
### Proteins:
- Chicken breast (organic if possible)
- Wild-caught salmon
- Ground turkey (lean)
- Tofu (firm)
- Greek yogurt
- Eggs

### Vegetables:
- Spinach
- Broccoli
- Zucchini
- Carrots
- Mixed greens
    `,
    supplementation: `
Based on your profile, consider these supplements (consult with your healthcare provider first):
- Vitamin D3: 1000-2000 IU daily
- Magnesium: 300mg daily
- Omega-3: 1000mg daily
    `
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="outline" onClick={handleBack} className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Your Diet Plan</h1>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold mb-2 capitalize">{plan.goal.replace(/-/g, ' ')} Plan</h2>
          <p className="text-gray-500 mb-6">
            Created on {new Date(plan.created_at).toLocaleDateString()}
          </p>
          
          <Tabs defaultValue="nutritional" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="nutritional" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800">
                Nutritional Requirements
              </TabsTrigger>
              <TabsTrigger value="medical" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800">
                Medical Considerations
              </TabsTrigger>
              <TabsTrigger value="meal" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800">
                Meal Plan
              </TabsTrigger>
              <TabsTrigger value="grocery" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800">
                Grocery List
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="nutritional" className="mt-0">
              <div className="prose max-w-none prose-blue prose-headings:font-semibold whitespace-pre-line">
                <h2>Nutritional Requirements</h2>
                {planData.nutritional_requirements}
              </div>
            </TabsContent>
            
            <TabsContent value="medical" className="mt-0">
              <div className="prose max-w-none prose-blue prose-headings:font-semibold whitespace-pre-line">
                <h2>Medical Considerations</h2>
                {planData.medical_considerations}
              </div>
            </TabsContent>
            
            <TabsContent value="meal" className="mt-0">
              <div className="prose max-w-none prose-blue prose-headings:font-semibold whitespace-pre-line">
                <h2>Meal Plan</h2>
                {planData.meal_plan}
              </div>
            </TabsContent>
            
            <TabsContent value="grocery" className="mt-0">
              <div className="prose max-w-none prose-blue prose-headings:font-semibold whitespace-pre-line">
                <h2>Grocery List</h2>
                {planData.grocery_list}
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator className="my-6" />
          
          <div className="flex justify-end mt-6 space-x-3">
            <Button
              variant="outline"
              onClick={handleCopyToClipboard}
              className="rounded-full bg-white"
            >
              <Clipboard className="h-4 w-4 mr-2" />
              {copied ? "Copied!" : "Copy Plan"}
            </Button>
            <Button
              onClick={handleDownload}
              className="rounded-full"
            >
              <Download className="h-4 w-4 mr-2" />
              Download Plan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanDetailPage;
