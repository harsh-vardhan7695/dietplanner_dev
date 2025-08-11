
import { ThemeToggle } from "@/components/ThemeToggle";
import { Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img 
                src="/lovable-uploads/710efea7-9af4-413e-aefb-421c4f794365.png" 
                alt="DietPlanner Logo" 
                className="h-16 w-auto"
              />
              <span className="text-primary font-bold text-xl">DietPlanner</span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-powered nutrition planning for a healthier life.
            </p>
            <div className="flex items-center">
              <ThemeToggle />
              <span className="ml-2 text-sm text-muted-foreground">Toggle theme</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-foreground">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-foreground">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#waitlist" className="text-muted-foreground hover:text-foreground">
                  Join Waitlist
                </a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="text-sm font-medium">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a 
                  href="https://www.linkedin.com/company/dietplanner" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} DietPlanner. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
