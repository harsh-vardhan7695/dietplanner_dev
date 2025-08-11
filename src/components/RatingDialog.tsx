
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { toast } from '@/hooks/use-toast';

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RatingDialog: React.FC<RatingDialogProps> = ({ open, onOpenChange }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  
  const handleSubmitRating = () => {
    if (rating) {
      toast({
        title: "Thank you for your feedback!",
        description: `You rated our meal plan ${rating} out of 5 stars.`,
      });
      onOpenChange(false);
    } else {
      toast({
        title: "Please select a rating",
        description: "Please select a rating before submitting your feedback.",
        variant: "destructive",
      });
    }
  };
  
  const handleRatingClick = (value: number) => {
    setRating(value);
  };
  
  const handleRatingHover = (value: number | null) => {
    setHoveredRating(value);
  };
  
  const displayValue = hoveredRating !== null ? hoveredRating : rating;
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">How would you rate your meal plan?</DialogTitle>
          <DialogDescription className="text-center">
            Your feedback helps us improve our service for everyone.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-6">
          <div className="flex justify-center space-x-1 mb-4">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                className="p-1 focus:outline-none transition-all duration-150"
                onClick={() => handleRatingClick(value)}
                onMouseEnter={() => handleRatingHover(value)}
                onMouseLeave={() => handleRatingHover(null)}
                aria-label={`Rate ${value} stars out of 5`}
              >
                <Star
                  className={`w-8 h-8 ${
                    (displayValue !== null && value <= displayValue)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            {rating ? (
              <>
                You selected <span className="font-medium text-blue-600">{rating} stars</span>
              </>
            ) : (
              "Select a rating to continue"
            )}
          </p>
        </div>
        
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Skip
          </Button>
          <Button onClick={handleSubmitRating} disabled={!rating}>
            Submit Rating
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RatingDialog;
