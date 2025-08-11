import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { UserData } from './UserForm';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import InfoCard from './InfoCard';
import RatingDialog from './RatingDialog';
// import { PlanService } from '@/integrations/api/plan-service';
import { supabase } from '@/integrations/supabase/client';
import { 
  ArrowLeft, 
  Clipboard, 
  Download, 
  FileText, 
  List, 
  MessageSquare, 
  ShoppingBag, 
  Apple, 
  Pill, 
  HeartPulse, 
  Utensils, 
  Salad,
  Clock,
  Loader2,
  Beef,
  Wheat,
  Milk,
  Fish,
  Carrot,
  Coffee,
  Moon,
  Egg,
  Bed,
  CircleDot,
  Cookie,
  Droplets,
  Nut,
  Package,
  Leaf,
  Trees,
  Calendar,
  Sun,
  Dumbbell,
  Activity,
  CircleUser,
  CircleOff,
  Bean,
  GalleryVerticalEnd,
  Brain,
  Palmtree,
  Bell,
  Banana
} from "lucide-react";
import ReactMarkdown from 'react-markdown';

interface ResultsDisplayProps {
  userData: UserData;
  onBack: () => void;
  className?: string;
}

// Modify the fallback nutrition plan to include user data
const getFallbackNutritionPlan = (userData: UserData) => {
  // Calculate estimated caloric needs using Mifflin-St Jeor Equation
  const { age, gender, height, weight, activityLevel } = userData;
  
  // Convert height to cm and weight to kg if needed
  const heightInCm = parseFloat(height);
  const weightInKg = parseFloat(weight);
  
  // Base BMR calculation
  let bmr = 0;
  if (gender === "Male") {
    bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * parseInt(age.toString()) + 5;
  } else {
    bmr = 10 * weightInKg + 6.25 * heightInCm - 5 * parseInt(age.toString()) - 161;
  }
  
  // Apply activity multiplier
  let activityMultiplier = 1.2; // Default to sedentary
  switch (activityLevel) {
    case "Sedentary":
      activityMultiplier = 1.2;
      break;
    case "Lightly Active":
      activityMultiplier = 1.375;
      break;
    case "Moderately Active":
      activityMultiplier = 1.55;
      break;
    case "Very Active":
      activityMultiplier = 1.725;
      break;
    case "Extremely Active":
      activityMultiplier = 1.9;
      break;
  }
  
  // Calculate TDEE (Total Daily Energy Expenditure)
  const tdee = Math.round(bmr * activityMultiplier);
  
  // Adjust calories based on goals
  let goalCalories = tdee;
  let goalDescription = "maintenance";
  
  if (userData.goals.includes("Weight Loss")) {
    goalCalories = Math.round(tdee * 0.8); // 20% deficit
    goalDescription = "weight loss";
  } else if (userData.goals.includes("Muscle Gain")) {
    goalCalories = Math.round(tdee * 1.1); // 10% surplus
    goalDescription = "muscle gain";
  }
  
  // Calculate macros
  const protein = Math.round((goalCalories * 0.3) / 4); // 30% of calories from protein, 4 calories per gram
  const carbs = Math.round((goalCalories * 0.4) / 4);   // 40% of calories from carbs, 4 calories per gram
  const fats = Math.round((goalCalories * 0.3) / 9);    // 30% of calories from fat, 9 calories per gram
  
  return `
# Personalized Nutrition Plan for ${userData.age}-year-old ${userData.gender}

## Nutritional Requirements

Based on your demographics and activity level (${userData.activityLevel}), here are your nutritional requirements for ${goalDescription}:

- **Daily Caloric Needs**: ${goalCalories} calories
- **Protein**: ${protein}g (30% of total calories)
- **Carbohydrates**: ${carbs}g (40% of total calories)
- **Fats**: ${fats}g (30% of total calories)
- **Water**: Minimum ${Math.round(weightInKg * 0.033)} liters daily

## Medical Considerations

Given your health information, here are specific nutritional adjustments:

${userData.goals.includes("Gut Health") ? "- Focus on probiotic-rich foods (yogurt, kefir, fermented vegetables)\n- Include prebiotic fiber sources (garlic, onions, bananas, oats)\n" : ""}
${userData.goals.includes("Heart Health") ? "- Limit sodium intake to less than 2,300mg daily\n- Increase intake of omega-3 fatty acids (fatty fish, flaxseeds, walnuts)\n" : ""}
${userData.goals.includes("Weight Loss") ? "- Create a moderate calorie deficit of approximately 500 calories per day\n- Focus on high protein foods to maintain muscle mass during weight loss\n" : ""}
${userData.goals.includes("Muscle Gain") ? "- Ensure adequate protein intake spread throughout the day\n- Time protein consumption around workouts\n" : ""}
- Include antioxidant-rich foods (berries, leafy greens, nuts)
- Focus on low glycemic index carbohydrates
- Distribute protein intake evenly throughout the day

## 7-Day Meal Plan

### Day 1

**Breakfast**:
- Spinach and mushroom omelet (3 egg whites, 1 whole egg)
- 1/2 cup steel-cut oats with berries
- 1 cup green tea

**Lunch**:
- Grilled chicken breast (5oz)
- Large mixed salad with olive oil dressing
- 1/2 cup quinoa

**Dinner**:
- Baked salmon (5oz)
- Roasted brussels sprouts and sweet potatoes
- Small side salad

**Snacks**:
- Greek yogurt with honey
- Apple with 1 tbsp almond butter

### Day 2-7 (similar pattern with varied protein sources and vegetables)

## Grocery List

### Proteins:
- Chicken breast
- Salmon
- Turkey breast
- Eggs
- Greek yogurt
- Tofu

### Carbohydrates:
- Quinoa
- Steel-cut oats
- Sweet potatoes
- Brown rice
- Ezekiel bread

### Fruits & Vegetables:
- Spinach
- Kale
- Mixed berries
- Apples
- Brussels sprouts
- Bell peppers
- Mushrooms
- Carrots
- Cucumber

### Healthy Fats:
- Olive oil
- Avocados
- Almonds
- Walnuts
- Flaxseeds

### Others:
- Green tea
- Almond milk
- Herbs and spices
- Honey (small amount)

## Implementation Strategies

- Meal prep on weekends for 3-4 days at a time
- Carry healthy snacks when traveling
- Drink water throughout the day
- Eat slowly and mindfully
- Schedule meals at consistent times
- Listen to your body's hunger cues

## Progress Tracking

- Weigh yourself 1-2 times per week at the same time of day
- Track energy levels and hunger patterns
- Take progress photos every 2 weeks
- Schedule a follow-up assessment in 4 weeks

## Adjustments

This plan may need adjustment based on your progress and how you feel. Stay hydrated throughout the day and listen to your body's hunger and fullness cues.
`;
};

// Define proper type for parsed sections
interface ParsedSections {
  nutritionSection: string;
  mealSection: string;
  grocerySection: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ 
  userData,
  onBack,
  className 
}) => {
  const [activeTab, setActiveTab] = useState("plan");
  const [copied, setCopied] = useState(false);
  const [showRatingDialog, setShowRatingDialog] = useState(false);
  const [nutritionPlan, setNutritionPlan] = useState<string>("");
  const [mealPlan, setMealPlan] = useState<string>("");
  const [groceryList, setGroceryList] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Function to parse a markdown string and extract sections
  const parseApiResponse = (markdown: string): ParsedSections => {
    console.log("Original API response to parse:", markdown.substring(0, 500) + "...");
    
    // Instead of complex filtering, just keep the entire content in the nutritionSection
    // and use basic regex to extract just the meal plan and grocery list if needed
    const nutritionSection = markdown;
    
    // Extract meal plan - look for the Meal Plan section if it exists
    const mealPlanMatch = markdown.match(/(?:##|###)\s*(?:Meal Plan|7-Day Meal Plan|Day 1|Breakfast|Daily Meals)([\s\S]*?)(?=(?:##|###)\s*(?:Grocery|Shopping|$))/i);
    let mealSection = mealPlanMatch ? mealPlanMatch[0] : markdown;
    
    // Extract grocery list - look for the Grocery List section if it exists
    const groceryMatch = markdown.match(/(?:##|###)\s*(?:Grocery List|Shopping List)([\s\S]*?)(?=(?:##|###)|$)/i);
    let grocerySection = groceryMatch ? groceryMatch[0] : markdown;
    
    console.log("Parsing complete. Section lengths:", {
      nutrition: nutritionSection.length,
      meal: mealSection.length,
      grocery: grocerySection.length
    });
    
    return {
      nutritionSection: nutritionSection.trim() || "# Nutritional Requirements\n\nNo nutrition data found. Please try regenerating the plan.",
      mealSection: mealSection.trim() || "# 7-Day Meal Plan\n\nNo meal plan found. Please try regenerating the plan.",
      grocerySection: grocerySection.trim() || "# Grocery List\n\nNo grocery list found. Please try regenerating the plan."
    };
  };
  
  // *** IMPORTANT: ALL USEEFFECT HOOKS MUST BE DEFINED IN THE SAME ORDER EVERY RENDER ***
  // First useEffect - Main one for generating the plan
  useEffect(() => {
    // Store current userData in localStorage for API call access
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('userId', 'user-' + Date.now());
    
    // Generate personalized nutrition plan using the CrewAI backend
    const generatePlan = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log("Preparing to make API call to generate nutrition plan with saved data");
        
        // Get the saved user data from localStorage
        const savedUserData = localStorage.getItem('userData');
        const userId = localStorage.getItem('userId') || `user-${Date.now()}`;
        
        if (!savedUserData) {
          console.error("No user data found in localStorage");
          setError("User data not found. Please complete the form first.");
          setIsLoading(false);
          return;
        }
        
        try {
          const userData = JSON.parse(savedUserData);
          
          // Import the PlanService
          const { PlanService } = await import('@/integrations/api/plan-service');
          
          // Make the API call
          console.log("Making API call with user data:", userData);
          const response = await PlanService.generateHealthPlan(userData, userId);
          
          console.log("Received API response:", response);
          
          // Parse the response
          const planContent = response.plan;
          console.log("Original API response to parse:", planContent.substring(0, 500) + "...");
          
          const parsedSections = parseApiResponse(planContent);
          console.log("Parsed API response sections:", {
            nutritionLength: parsedSections.nutritionSection.length,
            mealLength: parsedSections.mealSection.length,
            groceryLength: parsedSections.grocerySection.length,
            nutritionContent: parsedSections.nutritionSection.substring(0, 40) + "..."
          });
          
          // Set the state with the parsed sections
          setNutritionPlan(parsedSections.nutritionSection);
          setMealPlan(parsedSections.mealSection);
          setGroceryList(parsedSections.grocerySection);
          
          // Debug state updates
          console.log("=== DEBUGGING STATE UPDATES ===");
          console.log("State should be set to:", {
            nutritionPlan: parsedSections.nutritionSection.substring(0, 40) + "...",
            mealPlan: parsedSections.mealSection.substring(0, 40) + "...",
            groceryList: parsedSections.grocerySection.substring(0, 40) + "..."
          });
          
        } catch (error) {
          console.error("Failed to make API call:", error);
          setError("Failed to generate plan: " + (error.message || "Unknown error"));
          
          // Fallback to sample data in case of error
          console.log("FALLBACK: Using sample data due to API error");
          const samplePlanData = `
# Personalized Nutrition Plan

## Nutritional Requirements  
- **Calories**: 2,100 calories
- **Protein**: 120-150g
- **Carbohydrates**: 210-260g
- **Fats**: 58-70g
- **Water**: 3+ liters daily
- **Vitamin D3**: 1000-2000 IU daily
- **Magnesium**: 300mg daily
- **Omega-3**: 1000mg daily

## Medical Considerations
- Limited Sodium: Keep below 2,000mg daily
- Increased Potassium: Aim for 3,500-4,700mg daily
- Moderate Glycemic Index: Focus on low GI carbohydrates
- Avoid: Processed foods with artificial preservatives

## 7-Day Meal Plan

### Day 1

**Breakfast**:
- Overnight oats with almond milk, berries, and 1 tbsp flaxseeds
- 1 medium apple
- Green tea (unsweetened)

**Lunch**:
- Grilled chicken salad with mixed greens, cherry tomatoes, cucumber, and olive oil dressing
- 1/2 cup brown rice
- 8oz water with lemon

**Dinner**:
- Baked salmon (4oz) with dill and lemon
- Steamed broccoli and carrots
- Small sweet potato
- Sparkling water

**Snack**:
- Greek yogurt with honey and walnuts
- Herbal tea

### Day 2

**Breakfast**:
- Vegetable omelet (2 eggs, spinach, tomatoes, mushrooms)
- 1 slice whole grain toast
- 1/2 avocado
- Black coffee (if desired)

**Lunch**:
- Quinoa bowl with roasted vegetables and grilled tofu
- Mixed green side salad
- Water with cucumber slices

**Dinner**:
- Baked chicken breast with herbs
- Roasted brussels sprouts
- Sweet potato mash
- Herbal tea

**Snack**:
- Apple slices with almond butter
- Sparkling water

## Grocery List

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
- Cherry tomatoes
- Cucumber
- Bell peppers
- Mushrooms

### Fruits:
- Apples
- Berries (mixed)
- Lemons
- Avocados
- Bananas

### Grains & Starches:
- Brown rice
- Quinoa
- Sweet potatoes
- Whole grain bread
- Oats (steel-cut or rolled)`;
          
          const parsedSections = parseApiResponse(samplePlanData);
          setNutritionPlan(parsedSections.nutritionSection);
          setMealPlan(parsedSections.mealSection);
          setGroceryList(parsedSections.grocerySection);
        }
        
        setIsLoading(false);
      } catch (error: any) {
        setError(error.message || "Failed to generate nutrition plan");
        setIsLoading(false);
      }
    };
    
    generatePlan();
  }, []);
  
  // Third useEffect - For handling tab changes
  useEffect(() => {
    // Log when tabs change
    console.log("Tab changed to:", activeTab);
  }, [activeTab]);
  
  // Handler functions should come after all hooks
  const handleForceRefresh = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Instead of direct DOM manipulation, properly update the state
      setTimeout(() => {
        // Use React state to control the UI instead of direct DOM manipulation
        if (nutritionPlan && mealPlan && groceryList) {
          setIsLoading(false);
        } else {
          // Set default values if needed
          setNutritionPlan(nutritionPlan || "Nutrition plan information will appear here.");
          setMealPlan(mealPlan || "Meal plan information will appear here.");
          setGroceryList(groceryList || "Grocery list information will appear here.");
          setIsLoading(false);
        }
      }, 200);
    } catch (error: any) {
      setError(error.message || "Failed to generate nutrition plan");
      setIsLoading(false);
    }
  };
  
  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(nutritionPlan);
    setCopied(true);
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([nutritionPlan], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = "my_nutrition_plan.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Render nutrition plan tab using the actual state data
  const renderNutritionPlanTab = () => {
    // Calculate macros based on user data (you can replace these with actual values from your API)
    const { age, gender, height, weight, activityLevel, goals } = userData;
    const heightInCm = parseFloat(height.toString());
    const weightInKg = parseFloat(weight.toString());
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = gender === "Male" 
      ? (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseInt(age.toString())) + 5
      : (10 * weightInKg) + (6.25 * heightInCm) - (5 * parseInt(age.toString())) - 161;

    // Activity multiplier
    const activityMultipliers = {
      "Sedentary": 1.2,
      "Lightly Active": 1.375,
      "Moderately Active": 1.55,
      "Very Active": 1.725,
      "Extremely Active": 1.9
    };
    
    const multiplier = activityMultipliers[activityLevel as keyof typeof activityMultipliers] || 1.2;
    const tdee = Math.round(bmr * multiplier);
    
    // Adjust based on goals
    let targetCalories = tdee;
    if (goals.includes("Weight Loss")) {
      targetCalories = Math.round(tdee * 0.8); // 20% deficit
    } else if (goals.includes("Muscle Gain")) {
      targetCalories = Math.round(tdee * 1.1); // 10% surplus
    }

    return (
      <div className="nutrition-plan-container">
        <div className="section-box">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">
              <FileText className="h-5 w-5 text-blue-500" />
              Your Complete Nutrition Plan
            </h2>
            <div className="action-buttons">
              <button className="action-button primary-button" onClick={handleCopyToClipboard}>
                <Clipboard className="h-4 w-4" />
                {copied ? "Copied!" : "Copy Plan"}
              </button>
              <button className="action-button secondary-button" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                Download Plan
              </button>
            </div>
          </div>

          {/* Macros Overview Section */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-500" />
              Daily Nutritional Requirements
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {targetCalories.toString()}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Calories</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-500 dark:text-red-400">
                  {Math.round(targetCalories * 0.3 / 4).toString()}g
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Protein</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-amber-500 dark:text-amber-400">
                  {Math.round(targetCalories * 0.4 / 4).toString()}g
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Carbs</div>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-purple-500 dark:text-purple-400">
                  {Math.round(targetCalories * 0.3 / 9).toString()}g
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">Fats</div>
              </div>
            </div>
          </div>

          {/* Food Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="food-category protein-category">
              <h4 className="category-title">
                <Beef className="h-5 w-5 text-red-500" />
                Protein Sources
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Non-Veg:</h5>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                      <Fish className="h-4 w-4 text-blue-400" />
                      <span>Chicken breast (150g/day)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                      <Egg className="h-4 w-4 text-yellow-400" />
                      <span>Eggs (2 whole + 3 whites/day)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                      <Fish className="h-4 w-4 text-blue-400" />
                      <span>Fish (100g/day, 3x/week)</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">Veg:</h5>
                  <div className="grid gap-2">
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                      <Milk className="h-4 w-4 text-gray-400" />
                      <span>Paneer (100g/day)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                      <Salad className="h-4 w-4 text-green-400" />
                      <span>Soy chunks (50g/day)</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                      <Milk className="h-4 w-4 text-gray-400" />
                      <span>Greek yogurt (200g/day)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="food-category carbs-category">
              <h4 className="category-title">
                <Wheat className="h-5 w-5 text-amber-500" />
                Carbs Sources
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Bed className="h-4 w-4 text-amber-400" />
                  <span>Roti (2-3/meal)</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <CircleDot className="h-4 w-4 text-amber-400" />
                  <span>Rice (1 cup/meal)</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Wheat className="h-4 w-4 text-amber-400" />
                  <span>Oats (50g/day)</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Cookie className="h-4 w-4 text-amber-400" />
                  <span>Sweet potato (1 medium)</span>
                </div>
              </div>
            </div>

            <div className="food-category fats-category">
              <h4 className="category-title">
                <Droplets className="h-5 w-5 text-purple-500" />
                Fats Sources
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Droplets className="h-4 w-4 text-yellow-400" />
                  <span>Ghee (1 tbsp/day)</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Nut className="h-4 w-4 text-brown-400" />
                  <span>Almonds (10-12/day)</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Package className="h-4 w-4 text-brown-400" />
                  <span>Peanut butter (1 tbsp)</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Milk className="h-4 w-4 text-gray-400" />
                  <span>Coconut milk (½ cup)</span>
                </div>
              </div>
            </div>

            <div className="food-category veggies-category">
              <h4 className="category-title">
                <Carrot className="h-5 w-5 text-green-500" />
                Vegetables & Fruits
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Leaf className="h-4 w-4 text-green-400" />
                  <span>Spinach</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Trees className="h-4 w-4 text-green-400" />
                  <span>Broccoli</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Bell className="h-4 w-4 text-red-400" />
                  <span>Bell peppers</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Banana className="h-4 w-4 text-yellow-400" />
                  <span>Bananas</span>
                </div>
                <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                  <Apple className="h-4 w-4 text-red-400" />
                  <span>Apples</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render meal plan tab using the actual state data
  const renderMealPlanTab = () => {
    return (
      <div className="meal-plan-container">
        <div className="section-box">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">
              <Utensils className="h-5 w-5 text-blue-500" />
              7-Day Meal Plan with Recipes
            </h2>
            <div className="action-buttons">
              <button className="action-button primary-button" onClick={() => handleCopyContent(mealPlan)}>
                <Clipboard className="h-4 w-4" />
                Copy Plan
              </button>
              <button className="action-button secondary-button" onClick={() => handleDownloadContent(mealPlan, 'meal-plan.txt')}>
                <Download className="h-4 w-4" />
                Download Plan
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Day 1 */}
            <div className="day-plan">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Day 1 (Monday)
              </h3>
              <div className="meals-list space-y-4">
                <div className="meal-item">
                  <h4 className="flex items-center gap-2 text-blue-600 mb-2">
                    <Sun className="h-4 w-4" />Breakfast (7:00 AM)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>3 Egg white omelet with spinach and mushrooms</li>
                    <li>2 whole grain toast</li>
                    <li>1 medium banana</li>
                    <li>Green tea (unsweetened)</li>
                  </ul>
                </div>
                <div className="meal-item">
                  <h4 className="flex items-center gap-2 text-amber-600 mb-2">
                    <Apple className="h-4 w-4" />Mid-Morning (10:00 AM)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>1 cup Greek yogurt (0% fat)</li>
                    <li>1 handful mixed berries</li>
                    <li>10 almonds</li>
                  </ul>
                </div>
                <div className="meal-item">
                  <h4 className="flex items-center gap-2 text-orange-600 mb-2">
                    <Sun className="h-4 w-4" />Lunch (1:00 PM)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>150g grilled chicken breast</li>
                    <li>1 cup brown rice</li>
                    <li>Mixed salad with olive oil dressing</li>
                    <li>1 apple</li>
                  </ul>
                </div>
                <div className="meal-item">
                  <h4 className="flex items-center gap-2 text-purple-600 mb-2">
                    <Dumbbell className="h-4 w-4" />Pre-Workout (4:00 PM)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>1 banana</li>
                    <li>1 scoop whey protein</li>
                    <li>1 cup black coffee (optional)</li>
                  </ul>
                </div>
                <div className="meal-item">
                  <h4 className="flex items-center gap-2 text-green-600 mb-2">
                    <Activity className="h-4 w-4" />Post-Workout (6:00 PM)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>1.5 scoop whey protein</li>
                    <li>1 cup oatmeal</li>
                    <li>1 tbsp honey</li>
                  </ul>
                </div>
                <div className="meal-item">
                  <h4 className="flex items-center gap-2 text-indigo-600 mb-2">
                    <Moon className="h-4 w-4" />Dinner (8:00 PM)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>200g grilled fish/tofu</li>
                    <li>1 cup quinoa</li>
                    <li>Steamed vegetables</li>
                    <li>1 tbsp olive oil</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Day 2 */}
            <div className="day-plan">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Calendar className="h-5 w-5 text-blue-500" />
                Day 2 (Tuesday)
              </h3>
              <div className="meals-list space-y-4">
                <div className="meal-item">
                  <h4 className="flex items-center gap-2 text-blue-600 mb-2">
                    <Sun className="h-4 w-4" />Breakfast (7:00 AM)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Overnight oats with almond milk</li>
                    <li>1 scoop whey protein</li>
                    <li>1 tbsp chia seeds</li>
                    <li>Mixed berries</li>
                  </ul>
                </div>
                <div className="meal-item">
                  <h4 className="flex items-center gap-2 text-amber-600 mb-2">
                    <Apple className="h-4 w-4" />Mid-Morning (10:00 AM)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>2 rice cakes</li>
                    <li>2 tbsp almond butter</li>
                    <li>1 orange</li>
                  </ul>
                </div>
                <div className="meal-item">
                  <h4 className="flex items-center gap-2 text-orange-600 mb-2">
                    <Sun className="h-4 w-4" />Lunch (1:00 PM)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>Turkey and avocado wrap</li>
                    <li>Mixed green salad</li>
                    <li>1 cup vegetable soup</li>
                  </ul>
                </div>
                <div className="meal-item">
                  <h4 className="flex items-center gap-2 text-purple-600 mb-2">
                    <Dumbbell className="h-4 w-4" />Pre-Workout (4:00 PM)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>1 apple</li>
                    <li>20g almonds</li>
                    <li>Green tea</li>
                  </ul>
                </div>
                <div className="meal-item">
                  <h4 className="flex items-center gap-2 text-green-600 mb-2">
                    <Activity className="h-4 w-4" />Post-Workout (6:00 PM)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>1.5 scoop whey protein</li>
                    <li>1 banana</li>
                    <li>1 cup coconut water</li>
                  </ul>
                </div>
                <div className="meal-item">
                  <h4 className="flex items-center gap-2 text-indigo-600 mb-2">
                    <Moon className="h-4 w-4" />Dinner (8:00 PM)
                  </h4>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600">
                    <li>200g lean beef stir-fry</li>
                    <li>1 cup brown rice</li>
                    <li>Mixed vegetables</li>
                    <li>1 tbsp sesame oil</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Meal Prep Tips */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-500" />
              Meal Prep Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-blue-600 mb-2">Preparation</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Prep meals for 3-4 days at a time</li>
                  <li>Store meals in airtight containers</li>
                  <li>Label containers with dates</li>
                  <li>Keep fresh ingredients separate</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-blue-600 mb-2">Time Management</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Dedicate 2-3 hours on Sunday</li>
                  <li>Prep proteins in bulk</li>
                  <li>Wash and cut vegetables ahead</li>
                  <li>Cook grains in batches</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Supplements Section */}
          <div className="supplements-section mt-8">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Pill className="h-5 w-5 text-blue-500" />
              Supplement Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-blue-600 mb-2">Essential</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Whey Protein: 1-1.5 scoops post-workout</li>
                  <li>Multivitamin: 1 serving daily</li>
                  <li>Omega-3: 1-2g daily</li>
                  <li>Vitamin D3: 2000-4000 IU daily</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-blue-600 mb-2">Optional</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Creatine Monohydrate: 5g daily</li>
                  <li>BCAAs: During workouts</li>
                  <li>Magnesium: 400mg before bed</li>
                  <li>ZMA: For better recovery</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render grocery list tab using the actual state data
  const renderGroceryListTab = () => {
    return (
      <div className="grocery-list-container">
        <div className="section-box">
          <div className="flex justify-between items-center mb-6">
            <h2 className="section-title">
              <ShoppingBag className="h-5 w-5 text-blue-500" />
              Weekly Grocery List
            </h2>
            <div className="action-buttons">
              <button className="action-button primary-button" onClick={() => handleCopyContent(groceryList)}>
                <Clipboard className="h-4 w-4" />
                Copy List
              </button>
              <button className="action-button secondary-button" onClick={() => handleDownloadContent(groceryList, 'grocery-list.txt')}>
                <Download className="h-4 w-4" />
                Download List
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Proteins */}
            <div className="grocery-category">
              <h3 className="category-title flex items-center gap-2">
                <Beef className="h-5 w-5 text-red-500" />
                Proteins
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Fish className="h-4 w-4 text-orange-400" />
                    <span className="flex-grow">Chicken breast</span>
                    <span className="text-gray-500">1kg</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Egg className="h-4 w-4 text-yellow-400" />
                    <span className="flex-grow">Eggs</span>
                    <span className="text-gray-500">30 pieces</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Fish className="h-4 w-4 text-blue-400" />
                    <span className="flex-grow">Salmon/Fish</span>
                    <span className="text-gray-500">500g</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Milk className="h-4 w-4 text-gray-400" />
                    <span className="flex-grow">Greek yogurt</span>
                    <span className="text-gray-500">1kg</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Bean className="h-4 w-4 text-green-400" />
                    <span className="flex-grow">Tofu</span>
                    <span className="text-gray-500">400g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Carbs */}
            <div className="grocery-category">
              <h3 className="category-title flex items-center gap-2">
                <Wheat className="h-5 w-5 text-amber-500" />
                Carbohydrates
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Wheat className="h-4 w-4 text-amber-400" />
                    <span className="flex-grow">Brown rice</span>
                    <span className="text-gray-500">2kg</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <GalleryVerticalEnd className="h-4 w-4 text-amber-400" />
                    <span className="flex-grow">Quinoa</span>
                    <span className="text-gray-500">500g</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Wheat className="h-4 w-4 text-amber-400" />
                    <span className="flex-grow">Oats</span>
                    <span className="text-gray-500">1kg</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Cookie className="h-4 w-4 text-amber-400" />
                    <span className="flex-grow">Sweet potatoes</span>
                    <span className="text-gray-500">1kg</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Wheat className="h-4 w-4 text-amber-400" />
                    <span className="flex-grow">Whole grain bread</span>
                    <span className="text-gray-500">2 loaves</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Fruits & Vegetables */}
            <div className="grocery-category">
              <h3 className="category-title flex items-center gap-2">
                <Apple className="h-5 w-5 text-green-500" />
                Fruits & Vegetables
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Leaf className="h-4 w-4 text-green-400" />
                    <span className="flex-grow">Spinach</span>
                    <span className="text-gray-500">500g</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Carrot className="h-4 w-4 text-orange-400" />
                    <span className="flex-grow">Mixed vegetables</span>
                    <span className="text-gray-500">1kg</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Apple className="h-4 w-4 text-red-400" />
                    <span className="flex-grow">Apples</span>
                    <span className="text-gray-500">1kg</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Banana className="h-4 w-4 text-yellow-400" />
                    <span className="flex-grow">Bananas</span>
                    <span className="text-gray-500">1kg</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Apple className="h-4 w-4 text-purple-400" />
                    <span className="flex-grow">Mixed berries</span>
                    <span className="text-gray-500">500g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Healthy Fats */}
            <div className="grocery-category">
              <h3 className="category-title flex items-center gap-2">
                <Droplets className="h-5 w-5 text-purple-500" />
                Healthy Fats
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Droplets className="h-4 w-4 text-yellow-400" />
                    <span className="flex-grow">Olive oil</span>
                    <span className="text-gray-500">500ml</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Nut className="h-4 w-4 text-brown-400" />
                    <span className="flex-grow">Almonds</span>
                    <span className="text-gray-500">500g</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Package className="h-4 w-4 text-brown-400" />
                    <span className="flex-grow">Peanut butter</span>
                    <span className="text-gray-500">500g</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Nut className="h-4 w-4 text-brown-400" />
                    <span className="flex-grow">Chia seeds</span>
                    <span className="text-gray-500">200g</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Supplements */}
            <div className="grocery-category">
              <h3 className="category-title flex items-center gap-2">
                <Pill className="h-5 w-5 text-blue-500" />
                Supplements
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Activity className="h-4 w-4 text-blue-400" />
                    <span className="flex-grow">Whey protein</span>
                    <span className="text-gray-500">2kg</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Dumbbell className="h-4 w-4 text-red-400" />
                    <span className="flex-grow">Creatine</span>
                    <span className="text-gray-500">300g</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Sun className="h-4 w-4 text-yellow-400" />
                    <span className="flex-grow">Vitamin D3</span>
                    <span className="text-gray-500">60 caps</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Fish className="h-4 w-4 text-blue-400" />
                    <span className="flex-grow">Fish oil</span>
                    <span className="text-gray-500">90 caps</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Others */}
            <div className="grocery-category">
              <h3 className="category-title flex items-center gap-2">
                <Package className="h-5 w-5 text-gray-500" />
                Others
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Coffee className="h-4 w-4 text-brown-400" />
                    <span className="flex-grow">Green tea</span>
                    <span className="text-gray-500">50 bags</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Milk className="h-4 w-4 text-blue-400" />
                    <span className="flex-grow">Almond milk</span>
                    <span className="text-gray-500">2L</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="flex-grow">Herbs & spices</span>
                    <span className="text-gray-500">As needed</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg">
                    <Package className="h-4 w-4 text-yellow-400" />
                    <span className="flex-grow">Honey</span>
                    <span className="text-gray-500">250g</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Shopping Tips */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-500" />
              Shopping Tips
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-blue-600 mb-2">Best Practices</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Shop the perimeter of the store first</li>
                  <li>Buy in bulk when possible</li>
                  <li>Choose seasonal produce</li>
                  <li>Compare prices per unit</li>
                </ul>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-blue-600 mb-2">Storage Tips</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-600">
                  <li>Store fruits and vegetables properly</li>
                  <li>Keep proteins in the freezer</li>
                  <li>Use airtight containers</li>
                  <li>Check expiration dates</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  // Add helper functions for grocery list actions
  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    // Optionally add toast/notification
    alert('Copied to clipboard!');
  };

  const handleDownloadContent = (content: string, filename: string) => {
    const element = document.createElement('a');
    const file = new Blob([content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const renderActiveTabContent = () => {
    if (isLoading) {
      return <div className="py-12 flex justify-center"><div className="animate-spin w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full"></div></div>;
    }
    
    if (error) {
      return <div className="py-6 text-red-500">{error}</div>;
    }
    
    switch (activeTab) {
      case "plan":
        return renderNutritionPlanTab();
      case "meal":
        return renderMealPlanTab();
      case "grocery":
        return renderGroceryListTab();
      default:
        return renderNutritionPlanTab();
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={cn("w-full max-w-4xl mx-auto pt-8 animate-fade-in", className)}>
        <Button
          variant="outline"
          onClick={onBack}
          className="mb-6 rounded-full px-6 py-5 text-base bg-white shadow-sm hover:shadow-md focus-ring"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Start Over
        </Button>
        
        <div className="text-center mb-10 animate-slide-down">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            Creating Your Personalized Nutrition Plan
          </h1>
          <p className="text-muted-foreground mt-2">
            Our AI nutritionists are analyzing your data and crafting a plan just for you
          </p>
        </div>
        
        <div className="flex flex-col items-center justify-center p-16">
          <Loader2 className="h-12 w-12 text-blue-500 animate-spin mb-4" />
          <p className="text-lg text-blue-700 font-medium">
            Creating your personalized nutrition plan...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This may take up to a minute as our AI agents analyze your unique needs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full max-w-4xl mx-auto pt-8 animate-fade-in", className)}>
      <Button
        variant="outline"
        onClick={onBack}
        className="mb-6 rounded-full px-6 py-5 text-base bg-white shadow-sm hover:shadow-md focus-ring"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Start Over
      </Button>
      
      <div className="text-center mb-10 animate-slide-down">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
          Your Personalized Nutrition Plan
        </h1>
        <p className="text-muted-foreground mt-2">
          Carefully crafted for your unique needs and preferences
        </p>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-800">
          <p className="flex items-center">
            <span className="mr-2">⚠️</span>
            {error}
            <Button
              variant="outline"
              size="sm"
              className="ml-4"
              onClick={handleForceRefresh}
            >
              <div className="mr-2 h-4 w-4">🔄</div>
              Try Again
            </Button>
          </p>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-10">
        <div className="flex justify-end p-4">
          <Button
            variant="default"
            size="sm"
            className="mr-2 bg-blue-600 hover:bg-blue-700"
            onClick={handleForceRefresh}
          >
            <div className="mr-2 h-4 w-4">🔄</div>
            Get Latest Plan
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="mr-2"
            onClick={handleCopyToClipboard}
          >
            <Clipboard className="mr-2 h-4 w-4" />
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleDownload}
          >
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
        
        {/* Add a Demo Data button */}
        {error && (
          <div className="flex justify-center items-center pb-4">
            <Button
              variant="secondary"
              size="lg"
              className="bg-green-600 text-white hover:bg-green-700 px-8"
              onClick={handleForceRefresh}
            >
              <div className="mr-2 h-4 w-4">✨</div>
              Load Sample Plan (Skip API)
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
        <Card className="lg:col-span-1 overflow-hidden border-none shadow-md bg-gradient-to-br from-blue-50 to-white">
          <CardContent className="p-5">
            <h3 className="font-medium text-lg mb-4 flex items-center text-blue-700">
              <HeartPulse className="h-5 w-5 mr-2 text-blue-500" />
              About You
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                <span className="text-muted-foreground">Age:</span> 
                <span className="font-medium">{userData.age}</span>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                <span className="text-muted-foreground">Gender:</span> 
                <span className="font-medium">{userData.gender}</span>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                <span className="text-muted-foreground">Height:</span> 
                <span className="font-medium">{userData.height}</span>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                <span className="text-muted-foreground">Weight:</span> 
                <span className="font-medium">{userData.weight}</span>
              </div>
              <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-sm">
                <span className="text-muted-foreground">Activity:</span> 
                <span className="font-medium">{userData.activityLevel}</span>
              </div>
              <Separator className="my-2" />
              <div>
                <span className="text-muted-foreground flex items-center mb-2">
                  <Salad className="h-4 w-4 mr-1 text-green-500" />
                  Goals:
                </span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {userData.goals.map(goal => (
                    <span 
                      key={goal} 
                      className="inline-flex items-center rounded-full bg-gradient-to-r from-blue-50 to-blue-100 px-3 py-1 text-xs font-medium text-blue-700 border border-blue-200"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <InfoCard className="lg:col-span-3 shadow-lg border-none overflow-hidden" highlight>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center p-12">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-4" />
                <p className="text-muted-foreground">Creating your personalized nutrition plan...</p>
              </div>
            ) : (
          <Tabs defaultValue="plan" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 p-1 bg-blue-50 rounded-xl">
              <TabsTrigger 
                value="plan" 
                className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md"
              >
                <FileText className="h-4 w-4 mr-2" />
                Nutrition Plan
              </TabsTrigger>
              <TabsTrigger 
                    value="meal" 
                className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md"
              >
                <Utensils className="h-4 w-4 mr-2" />
                Meal Plan
              </TabsTrigger>
              <TabsTrigger 
                value="grocery" 
                className="rounded-lg py-3 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Grocery List
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="plan" className="mt-0 animate-fade-in">
                  {renderNutritionPlanTab()}
            </TabsContent>
            
                <TabsContent value="meal" className="mt-0 animate-fade-in">
                  {renderMealPlanTab()}
            </TabsContent>
            
            <TabsContent value="grocery" className="mt-0 animate-fade-in">
                  {renderGroceryListTab()}
            </TabsContent>
          </Tabs>
            )}
        </InfoCard>
        </div>
      </div>
      
      <Card className="mb-10 bg-gradient-to-r from-blue-50 to-white border-none shadow-md overflow-hidden">
        <CardContent className="p-5 flex items-center">
          <MessageSquare className="h-5 w-5 mr-3 text-blue-500 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">Expert Tip:</span> This nutrition plan is a starting point. 
            Pay attention to how your body responds and make adjustments as needed. 
            Consider consulting with a registered dietitian for ongoing support.
          </p>
        </CardContent>
      </Card>
      
      {/* Rating Dialog */}
      <RatingDialog 
        open={showRatingDialog} 
        onOpenChange={setShowRatingDialog} 
      />

      <div className="text-center mb-6">
        <Button
          variant="default"
          size="lg"
          className="bg-red-600 hover:bg-red-700 px-8"
          onClick={() => window.location.reload()}
        >
          <div className="mr-2 h-4 w-4">🔄</div>
          Restart App (Full Refresh)
        </Button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
