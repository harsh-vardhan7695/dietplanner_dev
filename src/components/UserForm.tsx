import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import InfoCard from './InfoCard';
import ProgressIndicator from './ProgressIndicator';
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface UserFormProps {
  onComplete: (data: UserData) => void;
  initialData?: UserData;
  className?: string;
}

export interface UserData {
  // Basic Information
  age: number;
  gender: string;
  height: string;
  weight: string;
  activityLevel: string;
  goals: string[];
  
  // Health Information
  medicalConditions: string;
  medications: string;
  allergies: string;
  
  // Preferences & Lifestyle
  foodPreferences: string;
  cookingAbility: string;
  budget: string;
  culturalFactors: string;
  planDuration: number; // New field for plan duration in days
}

const ACTIVITY_LEVELS = [
  "Sedentary", 
  "Lightly Active", 
  "Moderately Active", 
  "Very Active", 
  "Extremely Active"
];

const NUTRITION_GOALS = [
  "Weight Loss", 
  "Weight Gain", 
  "Maintenance", 
  "Muscle Building", 
  "Better Energy", 
  "Improved Athletic Performance", 
  "Disease Management", 
  "General Health"
];

const COOKING_SKILLS = [
  "Very Limited", 
  "Basic/Quick Meals", 
  "Average", 
  "Advanced/Can Spend Time", 
  "Professional Level"
];

const BUDGET_LEVELS = [
  "Very Limited", 
  "Budget Conscious", 
  "Moderate", 
  "Flexible", 
  "No Constraints"
];

const PLAN_DURATIONS = [1, 2, 3, 4, 5, 6, 7];

const FORM_STEPS = [
  "Basic Info", 
  "Health Details", 
  "Preferences"
];

const UserForm: React.FC<UserFormProps> = ({ 
  onComplete,
  initialData,
  className 
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form data state
  const [userData, setUserData] = useState<UserData>(initialData || {
    age: 30,
    gender: "Male",
    height: "",
    weight: "",
    activityLevel: "Moderately Active",
    goals: ["General Health"],
    medicalConditions: "",
    medications: "",
    allergies: "",
    foodPreferences: "",
    cookingAbility: "Average",
    budget: "Moderate",
    culturalFactors: "",
    planDuration: 3 // Default to 3 days
  });

  // Use useEffect to update userData when initialData changes
  useEffect(() => {
    if (initialData) {
      setUserData(initialData);
    }
  }, [initialData]);

  // Handle input changes
  const handleChange = (field: keyof UserData, value: any) => {
    setUserData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle goal selection (multi-select)
  const toggleGoal = (goal: string) => {
    setUserData(prev => {
      const goals = [...prev.goals];
      const index = goals.indexOf(goal);
      
      if (index >= 0) {
        goals.splice(index, 1);
      } else {
        goals.push(goal);
      }
      
      return {
        ...prev,
        goals
      };
    });
  };

  // Navigation functions
  const goToNextStep = () => {
    if (currentStep < FORM_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onComplete(userData);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-panel p-6">
        <div className="space-y-8">
          <Tabs defaultValue="basic-info" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 bg-muted/50">
              {FORM_STEPS.map((step, index) => (
                <TabsTrigger
                  key={step}
                  value={`step-${index}`}
                  disabled={currentStep !== index}
                  className={cn(
                    "rounded-none text-base font-semibold transition-colors",
                    currentStep === index
                      ? "bg-primary text-primary-foreground shadow"
                      : "bg-card text-foreground hover:bg-muted/80"
                  )}
                >
                  {step}
                </TabsTrigger>
              ))}
            </TabsList>

            <div className="bg-card/95 backdrop-blur-sm rounded-lg border border-border/20">
              <div className="space-y-6 p-6">
                {currentStep === 0 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-2xl font-semibold text-foreground">Basic Information</h2>
                    <p className="text-muted-foreground">Let's start with some basic information about you.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Age</Label>
                        <Input
                          type="number"
                          placeholder="Enter your age"
                          value={userData.age}
                          onChange={(e) => handleChange('age', parseInt(e.target.value))}
                          className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup 
                          value={userData.gender} 
                          onValueChange={(value) => handleChange('gender', value)}
                          className="flex space-x-4"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Male" id="male" className="form-radio" />
                            <Label htmlFor="male" className="cursor-pointer text-foreground">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Female" id="female" className="form-radio" />
                            <Label htmlFor="female" className="cursor-pointer text-foreground">Female</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Other" id="other" className="form-radio" />
                            <Label htmlFor="other" className="cursor-pointer text-foreground">Other</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="space-y-2">
                        <Label>Height (cm)</Label>
                        <Input
                          placeholder="Enter your height"
                          value={userData.height}
                          onChange={(e) => handleChange('height', e.target.value)}
                          className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Weight (kg)</Label>
                        <Input
                          placeholder="Enter your weight"
                          value={userData.weight}
                          onChange={(e) => handleChange('weight', e.target.value)}
                          className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Activity Level</Label>
                      <Select
                        value={userData.activityLevel}
                        onValueChange={(value) => handleChange('activityLevel', value)}
                      >
                        <SelectTrigger className="form-select bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70">
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          {ACTIVITY_LEVELS.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label>Nutrition Goals (Select all that apply)</Label>
                      <div className="flex flex-wrap gap-2">
                        {NUTRITION_GOALS.map((goal) => (
                          <Button
                            key={goal}
                            type="button"
                            variant={userData.goals.includes(goal) ? "default" : "outline"}
                            size="sm"
                            className={cn(
                              "goal-chip bg-secondary/50 hover:bg-secondary/70",
                              userData.goals.includes(goal) && "bg-primary/20 text-primary"
                            )}
                            onClick={() => toggleGoal(goal)}
                          >
                            {goal}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button 
                        onClick={goToNextStep}
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Next: Health Details
                      </Button>
                    </div>
                  </div>
                )}
                
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-2xl font-semibold text-foreground">Health Information</h2>
                    <p className="text-muted-foreground">Help us understand your health context for better recommendations.</p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="medicalConditions">Medical Conditions (separate with commas)</Label>
                        <Textarea
                          id="medicalConditions"
                          placeholder="E.g., Diabetes Type 2, Hypertension, Hypothyroidism..."
                          value={userData.medicalConditions}
                          onChange={(e) => handleChange('medicalConditions', e.target.value)}
                          className="focus-ring min-h-[100px]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="medications">Current Medications (separate with commas)</Label>
                        <Textarea
                          id="medications"
                          placeholder="E.g., Metformin, Lisinopril, Levothyroxine..."
                          value={userData.medications}
                          onChange={(e) => handleChange('medications', e.target.value)}
                          className="focus-ring min-h-[100px]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="allergies">Food Allergies/Intolerances (separate with commas)</Label>
                        <Textarea
                          id="allergies"
                          placeholder="E.g., Lactose, Gluten, Shellfish, Peanuts..."
                          value={userData.allergies}
                          onChange={(e) => handleChange('allergies', e.target.value)}
                          className="focus-ring min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h2 className="text-2xl font-semibold text-foreground">Preferences & Lifestyle</h2>
                    <p className="text-muted-foreground">Tell us about your preferences to personalize your plan.</p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="foodPreferences">Food Preferences & Dislikes</Label>
                        <Textarea
                          id="foodPreferences"
                          placeholder="E.g., Prefer plant-based, dislike seafood..."
                          value={userData.foodPreferences}
                          onChange={(e) => handleChange('foodPreferences', e.target.value)}
                          className="focus-ring min-h-[100px]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Cooking Skills & Available Time</Label>
                        <Select
                          value={userData.cookingAbility}
                          onValueChange={(value) => handleChange('cookingAbility', value)}
                        >
                          <SelectTrigger className="form-select bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70">
                            <SelectValue placeholder="Select cooking level" />
                          </SelectTrigger>
                          <SelectContent>
                            {COOKING_SKILLS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Budget Considerations</Label>
                        <Select
                          value={userData.budget}
                          onValueChange={(value) => handleChange('budget', value)}
                        >
                          <SelectTrigger className="form-select bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70">
                            <SelectValue placeholder="Select budget level" />
                          </SelectTrigger>
                          <SelectContent>
                            {BUDGET_LEVELS.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* New Plan Duration Dropdown */}
                      <div className="space-y-2">
                        <Label>Plan Duration (Days)</Label>
                        <Select
                          value={userData.planDuration.toString()}
                          onValueChange={(value) => handleChange('planDuration', parseInt(value))}
                        >
                          <SelectTrigger className="form-select bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70">
                            <SelectValue placeholder="Select plan duration" />
                          </SelectTrigger>
                          <SelectContent>
                            {PLAN_DURATIONS.map((days) => (
                              <SelectItem key={days} value={days.toString()}>
                                {days} {days === 1 ? 'Day' : 'Days'}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="culturalFactors">Cultural or Religious Dietary Factors</Label>
                        <Textarea
                          id="culturalFactors"
                          placeholder="E.g., Halal, Kosher, Mediterranean tradition..."
                          value={userData.culturalFactors}
                          onChange={(e) => handleChange('culturalFactors', e.target.value)}
                          className="focus-ring min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Tabs>
        </div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={goToPrevStep}
          disabled={currentStep === 0 || isSubmitting}
          className={cn(
            "rounded-full px-6 py-5 text-base bg-card text-foreground border border-border shadow-sm hover:bg-muted/80 focus-ring transition-all",
            currentStep === 0 ? "opacity-0 pointer-events-none" : ""
          )}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        {currentStep < FORM_STEPS.length - 1 ? (
          <Button
            onClick={goToNextStep}
            className="rounded-full px-6 py-5 text-base bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 focus-ring transition-all"
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="rounded-full px-6 py-5 text-base bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 focus-ring transition-all"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing
              </>
            ) : (
              'Generate Plan'
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserForm;
