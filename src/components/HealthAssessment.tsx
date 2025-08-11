import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const nutritionGoals = [
  "Weight Loss",
  "Muscle Gain",
  "Maintenance",
  "Athletic Performance",
  "Better Nutrition",
  "General Health"
];

export function HealthAssessment() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-panel rounded-lg p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">Health Assessment</h2>
          <p className="text-muted-foreground">
            Complete this assessment to receive a personalized nutrition plan based on your unique
            health profile and goals.
          </p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Personal Information</h3>
            <p className="text-sm text-muted-foreground">Let's start with some basic information about you.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="form-label">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70" 
                  placeholder="Enter your age" 
                />
              </div>

              <div className="space-y-2">
                <Label className="form-label">Gender</Label>
                <RadioGroup defaultValue="male" className="flex space-x-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" className="form-radio" />
                    <Label htmlFor="male" className="text-foreground">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" className="form-radio" />
                    <Label htmlFor="female" className="text-foreground">Female</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="other" id="other" className="form-radio" />
                    <Label htmlFor="other" className="text-foreground">Other</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height" className="form-label">Height (in cm)</Label>
                <Input 
                  id="height" 
                  type="number" 
                  className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70" 
                  placeholder="Enter height in cm" 
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight" className="form-label">Weight (in kg)</Label>
                <Input 
                  id="weight" 
                  type="number" 
                  className="form-input bg-secondary/50 hover:bg-secondary/70 focus:bg-secondary/70" 
                  placeholder="Enter weight in kg" 
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Activity Level</h3>
            <div className="space-y-2">
              <Label htmlFor="activity" className="form-label">How active are you?</Label>
              <Select>
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
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Nutrition Goals</h3>
            <p className="text-sm text-muted-foreground">Select all that apply to your nutrition journey.</p>
            <div className="flex flex-wrap gap-2">
              {nutritionGoals.map((goal) => (
                <Button
                  key={goal}
                  variant="outline"
                  className="goal-chip bg-secondary/50 hover:bg-secondary/70"
                  data-state={goal === "Weight Loss" ? "checked" : "unchecked"}
                >
                  {goal}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <Button 
            variant="outline" 
            className="text-foreground hover:bg-accent bg-secondary/50"
          >
            Previous
          </Button>
          <Button 
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
} 