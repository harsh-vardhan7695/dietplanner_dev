import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import UserForm, { UserData } from "@/components/UserForm";
import ResultsDisplay from "@/components/ResultsDisplay";
import Layout from "@/components/Layout";
import { ArrowLeft, Loader2 } from "lucide-react";

const HealthFormPage = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [formCompleted, setFormCompleted] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [generatingPlan, setGeneratingPlan] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session) {
        navigate("/auth");
        return;
      }
      
      setUser(data.session.user);
      
      // Check if user already has health info
      try {
        const { data: healthData, error: healthError } = await supabase
          .from("user_health_info")
          .select("*")
          .eq("user_id", data.session.user.id)
          .maybeSingle();
          
        if (healthError) throw healthError;
        
        if (healthData) {
          // Convert the JSONB goals to string array if needed
          const goalsArray = Array.isArray(healthData.goals) 
            ? healthData.goals 
            : (typeof healthData.goals === 'object' ? Object.values(healthData.goals) : []);
            
          setUserData({
            age: healthData.age || 30,
            gender: healthData.gender || "Male",
            height: healthData.height || "",
            weight: healthData.weight || "",
            activityLevel: healthData.activity_level || "Moderately Active",
            goals: goalsArray as string[],
            medicalConditions: healthData.medical_conditions || "",
            medications: healthData.medications || "",
            allergies: healthData.allergies || "",
            foodPreferences: healthData.food_preferences || "",
            cookingAbility: healthData.cooking_ability || "Average",
            budget: healthData.budget || "Moderate",
            culturalFactors: healthData.cultural_factors || "",
            planDuration: healthData.plan_duration || 3
          });
        }
      } catch (fetchError) {
        console.error("Error fetching health info:", fetchError);
      }
      
      setLoading(false);
    };
    
    checkSession();
  }, [navigate]);

  const handleFormComplete = async (data: UserData) => {
    try {
      setGeneratingPlan(true);
      
      // Save health info to Supabase
      const { error } = await supabase
        .from("user_health_info")
        .upsert({
          user_id: user.id,
          age: data.age,
          gender: data.gender,
          height: data.height,
          weight: data.weight,
          activity_level: data.activityLevel,
          goals: data.goals,
          medical_conditions: data.medicalConditions,
          medications: data.medications,
          allergies: data.allergies,
          food_preferences: data.foodPreferences,
          cooking_ability: data.cookingAbility,
          budget: data.budget,
          cultural_factors: data.culturalFactors,
          plan_duration: data.planDuration,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' });
        
      if (error) throw error;
      
      // Show success toast
      toast({
        title: "Health information saved",
        description: "Your health profile has been updated and your personalized plan is being generated",
      });
      
      // Store user data for the results display to use
      setUserData(data);
      
      // Mark the form as completed to show the results
      // Note: ResultsDisplay component has its own loading state now
      setFormCompleted(true);
    } catch (error: any) {
      console.error("Error saving health info:", error);
      toast({
        title: "Error saving health information",
        description: error.message,
        variant: "destructive",
      });
      setGeneratingPlan(false);
    }
  };

  const handleBackToForm = () => {
    setFormCompleted(false);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center p-8 rounded-xl bg-white/80 backdrop-blur-sm shadow-lg border border-blue-100">
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin mb-4" />
            <p className="text-blue-700 font-medium">Loading your health profile...</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-6">
        {!formCompleted && (
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex items-center">
              <Button 
                variant="outline" 
                onClick={handleBackToDashboard} 
                className="mr-4 rounded-full px-4 py-2 shadow-sm hover:shadow-md bg-white/90 backdrop-blur-sm"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                Health Assessment
              </h1>
            </div>
            <p className="mt-2 text-muted-foreground max-w-2xl ml-14">
              Complete this assessment to receive a personalized nutrition plan based on your unique health profile and goals.
            </p>
          </div>
        )}
        
        {!formCompleted ? (
          <UserForm 
            onComplete={handleFormComplete} 
            initialData={userData || undefined}
          />
        ) : (
          userData && <ResultsDisplay userData={userData} onBack={handleBackToForm} />
        )}
      </div>
    </Layout>
  );
};

export default HealthFormPage;
