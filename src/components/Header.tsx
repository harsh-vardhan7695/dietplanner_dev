
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/90 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/">
            <img 
              src="/lovable-uploads/710efea7-9af4-413e-aefb-421c4f794365.png" 
              alt="DietPlanner Logo" 
              className="h-16 w-auto"
            />
          </Link>
          <Link to="/" className="text-primary font-bold text-xl">DietPlanner</Link>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex gap-6">
            <Link to="/how-it-works" className="text-sm font-medium transition-colors hover:text-primary">
              How It Works
            </Link>
            <Link to="/supported-diets" className="text-sm font-medium transition-colors hover:text-primary">
              Supported Diets
            </Link>
            <Link to="/pro-plan" className="text-sm font-medium transition-colors hover:text-primary">
              DietPlanner Pro
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {session ? (
              <Button variant="outline" onClick={handleSignOut}>Sign Out</Button>
            ) : (
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <Link to="/auth?tab=signin">Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to="/auth?tab=signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <Button variant="outline" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="container md:hidden py-4 bg-background border-t">
          <nav className="flex flex-col gap-4">
            <Link 
              to="/how-it-works"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link 
              to="/supported-diets"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              Supported Diets
            </Link>
            <Link 
              to="/pro-plan"
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              DietPlanner Pro
            </Link>
            {session ? (
              <Button variant="outline" onClick={handleSignOut} className="justify-start">
                Sign Out
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Button variant="outline" asChild>
                  <Link to="/auth?tab=signin" onClick={() => setIsMenuOpen(false)}>
                    Sign In
                  </Link>
                </Button>
                <Button asChild>
                  <Link to="/auth?tab=signup" onClick={() => setIsMenuOpen(false)}>
                    Sign Up
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
