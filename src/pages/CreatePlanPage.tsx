import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { PlanService } from "@/integrations/api/plan-service";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

const CreatePlanPage = () => {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("basic");
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm({
    defaultValues: {
      // Basic information
      goal: "weight-loss",
      dietaryRestrictions: "",
      allergies: "",
      additionalNotes: "",
      
      // Detailed user information for CrewAI
      age: "30-40",
      gender: "not-specified",
      height: "",
      weight: "",
      activity_level: "moderate",
      medical_conditions: "",
      medications: "",
      food_preferences: "",
      cooking_ability: "intermediate",
      budget: "medium",
      cultural_factors: "",
    },
  });

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        navigate("/auth");
        return;
      }
      
      setUser(data.session.user);
      setLoading(false);
    };
    
    checkSession();
  }, [navigate]);

  const onSubmit = async (values: any) => {
    setSubmitting(true);
    
    try {
      // Format the user info for the CrewAI backend
      const userInfo = {
        age: values.age,
        gender: values.gender,
        height: values.height,
        weight: values.weight,
        activity_level: values.activity_level,
        goals: values.goal,
        medical_conditions: values.medical_conditions || "None",
        medications: values.medications || "None",
        allergies: values.allergies || "None",
        food_preferences: values.food_preferences || values.dietaryRestrictions || "No specific preferences",
        cooking_ability: values.cooking_ability,
        budget: values.budget,
        cultural_factors: values.cultural_factors || "None specified",
      };
      
      // Save the diet plan to Supabase
      const { data, error } = await supabase
        .from("diet_plans")
        .insert({
          user_id: user.id,
          goal: values.goal,
          dietary_restrictions: values.dietaryRestrictions,
          allergies: values.allergies,
          additional_notes: values.additionalNotes,
          status: 'processing'
        })
        .select()
        .single();
        
      if (error) throw error;
      
      toast({
        title: "Diet plan request submitted",
        description: "Our AI nutritionists are creating your personalized plan. This may take a few minutes.",
      });
      
      // Call the CrewAI backend to generate the plan
      try {
        const planResult = await PlanService.generatePlan({
          user_id: user.id,
          goal: values.goal,
          dietary_restrictions: values.dietaryRestrictions,
          allergies: values.allergies,
          additional_notes: values.additionalNotes,
          user_info: userInfo
        });
        
        // Update the plan in Supabase with the AI-generated content
        await supabase
          .from("diet_plans")
          .update({
            content: planResult.plan,
            status: 'completed'
          })
          .eq("id", data.id);
          
        toast({
          title: "Diet plan generated",
          description: "Your personalized nutrition plan is ready!",
        });
      } catch (aiError: any) {
        console.error("Error generating plan with AI:", aiError);
        
        // Update status to error
        await supabase
          .from("diet_plans")
          .update({
            status: 'error'
          })
          .eq("id", data.id);
          
        toast({
          title: "Error generating plan",
          description: "We had trouble creating your plan with AI. Our team will review it.",
          variant: "destructive",
        });
      }
      
      // Navigate to the plan details page
      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Error creating diet plan",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const nextTab = () => {
    if (activeTab === "basic") {
      setActiveTab("detailed");
    }
  };

  const prevTab = () => {
    if (activeTab === "detailed") {
      setActiveTab("basic");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-background">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center mb-8">
          <Button variant="outline" onClick={handleBack} className="mr-4">
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-foreground">Create New Diet Plan</h1>
        </div>
        
        <div className="glass-panel p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6 bg-muted/50">
                  <TabsTrigger value="basic" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Basic Information</TabsTrigger>
                  <TabsTrigger value="detailed" className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary">Detailed Information</TabsTrigger>
                </TabsList>
                
                <div className="bg-card/95 backdrop-blur-sm rounded-lg border border-border/20">
                  <TabsContent value="basic" className="space-y-6 p-6">
                    <FormField
                      control={form.control}
                      name="goal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Your Goal</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="form-select bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70">
                                <SelectValue placeholder="Select your goal" />
                              </SelectTrigger>
                              <SelectContent className="bg-popover text-popover-foreground">
                                <SelectItem value="weight-loss">Weight Loss</SelectItem>
                                <SelectItem value="muscle-gain">Muscle Gain</SelectItem>
                                <SelectItem value="maintenance">Maintenance</SelectItem>
                                <SelectItem value="general-health">General Health</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormDescription className="text-muted-foreground">
                            Select the primary goal for your diet plan
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dietaryRestrictions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Dietary Restrictions</FormLabel>
                          <FormControl>
                            <Input 
                              className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70"
                              placeholder="Vegetarian, vegan, keto, etc."
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-muted-foreground">
                            List any dietary restrictions or specific diets you follow
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="allergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Food Allergies</FormLabel>
                          <FormControl>
                            <Input 
                              className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70"
                              placeholder="Nuts, dairy, gluten, etc."
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-muted-foreground">
                            List any food allergies or intolerances
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Additional Notes</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70"
                              placeholder="Any other information you'd like to share"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-muted-foreground">
                            Add any other relevant information about your diet plan
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-end pt-4">
                      <Button 
                        type="button" 
                        onClick={nextTab}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Next: Detailed Information
                      </Button>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="detailed" className="space-y-6 p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="age"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Age Range</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="form-select bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70">
                                  <SelectValue placeholder="Select your age range" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover text-popover-foreground">
                                  <SelectItem value="18-24">18-24 years</SelectItem>
                                  <SelectItem value="25-34">25-34 years</SelectItem>
                                  <SelectItem value="35-44">35-44 years</SelectItem>
                                  <SelectItem value="45-54">45-54 years</SelectItem>
                                  <SelectItem value="55+">55+ years</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Gender</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="form-select bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70">
                                  <SelectValue placeholder="Select your gender" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover text-popover-foreground">
                                  <SelectItem value="male">Male</SelectItem>
                                  <SelectItem value="female">Female</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                  <SelectItem value="not-specified">Prefer not to say</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="height"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Height (cm)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70"
                                placeholder="Height in centimeters"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="weight"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Weight (kg)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number"
                                className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70"
                                placeholder="Weight in kilograms"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="activity_level"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Activity Level</FormLabel>
                          <FormControl>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <SelectTrigger className="form-select bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70">
                                <SelectValue placeholder="Select your activity level" />
                              </SelectTrigger>
                              <SelectContent className="bg-popover text-popover-foreground">
                                <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                                <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                                <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                                <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                                <SelectItem value="very-active">Very Active (hard exercise daily)</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage className="text-destructive" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="medical_conditions"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Medical Conditions</FormLabel>
                          <FormControl>
                            <Input 
                              className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70"
                              placeholder="Diabetes, hypertension, etc."
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-muted-foreground">
                            List any medical conditions that may affect your diet
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="medications"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Current Medications</FormLabel>
                          <FormControl>
                            <Input 
                              className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70"
                              placeholder="List any medications you're currently taking"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-muted-foreground">
                            Include any medications that might interact with your diet
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="food_preferences"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Food Preferences</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70"
                              placeholder="Foods you particularly enjoy or dislike"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-muted-foreground">
                            Tell us about your food preferences to help customize your plan
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="cooking_ability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Cooking Skill Level</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="form-select bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70">
                                  <SelectValue placeholder="Select your cooking skill" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover text-popover-foreground">
                                  <SelectItem value="beginner">Beginner (simple recipes only)</SelectItem>
                                  <SelectItem value="intermediate">Intermediate (comfortable cooking)</SelectItem>
                                  <SelectItem value="advanced">Advanced (enjoy complex recipes)</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Food Budget</FormLabel>
                            <FormControl>
                              <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                              >
                                <SelectTrigger className="form-select bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70">
                                  <SelectValue placeholder="Select your budget" />
                                </SelectTrigger>
                                <SelectContent className="bg-popover text-popover-foreground">
                                  <SelectItem value="low">Budget-conscious</SelectItem>
                                  <SelectItem value="medium">Moderate budget</SelectItem>
                                  <SelectItem value="high">Flexible budget</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage className="text-destructive" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="cultural_factors"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-foreground">Cultural/Religious Considerations</FormLabel>
                          <FormControl>
                            <Input 
                              className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70"
                              placeholder="Any cultural or religious dietary practices"
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription className="text-muted-foreground">
                            Share any cultural or religious factors that influence your diet
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={prevTab}
                        className="bg-secondary/50 hover:bg-secondary/70 text-foreground"
                      >
                        Back to Basic Information
                      </Button>
                      <Button 
                        type="submit" 
                        disabled={submitting}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        {submitting ? "Creating Plan..." : "Create Diet Plan"}
                      </Button>
                    </div>
                  </TabsContent>
                </div>
              </Tabs>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePlanPage;
