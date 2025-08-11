import React from 'react';
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressIndicatorProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({ 
  steps, 
  currentStep,
  className 
}) => {
  return (
    <div className={cn("w-full py-4", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          
          return (
            <React.Fragment key={index}>
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <div className={cn(
                  "relative flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200",
                  isCompleted ? "bg-primary" : 
                  isCurrent ? "bg-white border-2 border-primary" : 
                  "bg-white border-2 border-muted"
                )}>
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-white" />
                  ) : (
                    <span className={cn(
                      "text-sm font-medium",
                      isCurrent ? "text-primary" : "text-muted-foreground"
                    )}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <span className={cn(
                  "mt-2 text-xs font-medium",
                  isCompleted ? "text-primary" : 
                  isCurrent ? "text-foreground" : 
                  "text-muted-foreground"
                )}>
                  {step}
                </span>
              </div>
              
              {/* Connector line between steps */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-2">
                  <div className={cn(
                    "h-1 rounded-full transition-all duration-200",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )} />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;
