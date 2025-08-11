
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('waitlist')
        .insert({ email });
      
      if (error) {
        throw error;
      }
      
      // Success toast
      toast.success("You've been added to our waitlist!");
      setEmail("");
    } catch (error) {
      console.error("Error adding to waitlist:", error);
      toast.error("Failed to join waitlist. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="waitlist" className="py-16 md:py-24 bg-secondary/10">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Join Our Waitlist
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Be the first to know when DietPlanner launches
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>
            <Button type="submit" className="w-full h-12" disabled={isSubmitting}>
              {isSubmitting ? "Joining..." : "Join Waitlist"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            By joining our waitlist, you'll receive updates about our launch and early access opportunities.
            We respect your privacy and will never share your information.
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitlistSection;
