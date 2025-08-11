// Service for interacting with the NutriPlan API (CrewAI backend)

interface UserInfo {
    age: string;
    gender: string;
    height: string;
    weight: string;
    activity_level: string;
    goals: string;
    medical_conditions: string;
    medications: string;
    allergies: string;
    food_preferences: string;
    cooking_ability: string;
    budget: string;
    cultural_factors: string;
  }
  
  interface PlanRequest {
    user_id: string;
    goal: string;
    dietary_restrictions: string;
    allergies: string;
    additional_notes: string;
    user_info?: UserInfo;
  }
  
  interface PlanResponse {
    plan: string;
    status: string;
  }
  
  // The base URL of the backend API
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001';
  
  // Log the API base URL at load time for debugging
  console.log('API_BASE_URL configured as:', API_BASE_URL);
  
  // Generate a fallback plan when the API is unavailable
  const generateFallbackPlan = (planData: PlanRequest): string => {
    const userInfo = planData.user_info || {} as UserInfo;
    const goals = userInfo.goals ? userInfo.goals.split(',').map(g => g.trim()) : [];
    
    return `
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
  };
  
  export const PlanService = {
    /**
     * Generate a personalized nutrition plan using the CrewAI backend
     */
    generatePlan: async (planData: PlanRequest): Promise<PlanResponse> => {
      try {
        console.log('Making API request to:', `${API_BASE_URL}/api/generate-plan`);
        console.log('With data:', JSON.stringify(planData, null, 2));
        
        // Try to make a request, but use fallback if CORS or other network issues occur
        try {
          const response = await fetch(`${API_BASE_URL}/api/generate-plan`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(planData),
          });
  
          console.log('Response status:', response.status);
          
          if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            try {
              const errorData = JSON.parse(errorText);
              throw new Error(errorData.detail || 'Failed to generate plan');
            } catch (e) {
              throw new Error(`Failed to generate plan: ${errorText}`);
            }
          }
  
          const data = await response.json();
          console.log('API Response:', JSON.stringify(data, null, 2));
          
          // Extract the actual plan content from the complex response structure
          let planContent = '';
          
          // Try to get the plan from different possible response formats
          if (data && data.plan && data.plan.tasks_output && Array.isArray(data.plan.tasks_output) && data.plan.tasks_output.length >= 3) {
            // Extract from the last task which is the Diet Planner's output
            planContent = data.plan.tasks_output[2].raw || '';
          } else if (data && data.plan && data.plan.raw) {
            // Fallback to the top level raw field
            planContent = data.plan.raw;
          } else if (data && data.plan && typeof data.plan === 'string') {
            // Handle the case where plan is a direct string
            planContent = data.plan;
          } else {
            console.error('Unexpected API response format:', data);
            throw new Error('Unexpected API response format');
          }
          
          return {
            plan: planContent,
            status: data.status || 'success'
          };
        } catch (fetchError) {
          console.error('Fetch error with backend, using fallback data:', fetchError);
          // Return fallback data since the backend couldn't be reached
          return {
            plan: generateFallbackPlan(planData),
            status: 'success-fallback'
          };
        }
      } catch (error) {
        console.error('Error generating plan:', error);
        throw error;
      }
    },
  
    /**
     * Generate a personalized nutrition plan from health assessment data
     */
    generateHealthPlan: async (userData: any, userId: string): Promise<PlanResponse> => {
      try {
        // Format user data for the CrewAI backend
        const userInfo: UserInfo = {
          age: userData.age.toString(),
          gender: userData.gender,
          height: userData.height,
          weight: userData.weight,
          activity_level: userData.activityLevel,
          goals: Array.isArray(userData.goals) ? userData.goals.join(', ') : userData.goals,
          medical_conditions: userData.medicalConditions || "None",
          medications: userData.medications || "None",
          allergies: userData.allergies || "None",
          food_preferences: userData.foodPreferences || "No specific preferences",
          cooking_ability: userData.cookingAbility,
          budget: userData.budget,
          cultural_factors: userData.culturalFactors || "None specified",
        };
  
        // Create the plan request
        const planRequest: PlanRequest = {
          user_id: userId,
          goal: Array.isArray(userData.goals) ? userData.goals[0] : "general-health",
          dietary_restrictions: userData.foodPreferences || "",
          allergies: userData.allergies || "",
          additional_notes: `Plan Duration: ${userData.planDuration || 7} days`,
          user_info: userInfo
        };
  
        // Call the API to generate the plan
        return await PlanService.generatePlan(planRequest);
      } catch (error) {
        console.error('Error generating health plan:', error);
        throw error;
      }
    },
  
    /**
     * Check if the API is healthy
     */
    checkHealth: async (): Promise<boolean> => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/health`);
        
        if (!response.ok) {
          return false;
        }
        
        const data = await response.json();
        return data.status === 'healthy';
      } catch (error) {
        console.error('API health check failed:', error);
        return false;
      }
    }
  }; 