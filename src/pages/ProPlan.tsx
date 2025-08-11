
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Globe, Flag, Smartphone, MailOpen, LineChart, Users, Check } from "lucide-react";

const ProPlan = () => {
  useVisitorTracking('/pro-plan');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              DietPlan <span className="text-primary">Pro</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-6">For Health & Fitness Professionals</p>
            <p className="text-2xl max-w-3xl mx-auto mb-10">
              Powerful, fast meal planning to level up your business.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 h-auto">
              <Link to="/auth">Learn More</Link>
            </Button>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              DietPlan Pro Features
            </h2>
            
            <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
              {/* Feature 1 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 bg-secondary/20 p-3 rounded-full h-14 w-14 flex items-center justify-center">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Plan Meals Based On Goals</h3>
                  <p className="text-muted-foreground">
                    Fully customizable plans according to a range of caloric and macro goals, preferences, and restrictions.
                  </p>
                </div>
              </div>
              
              {/* Feature 2 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 bg-secondary/20 p-3 rounded-full h-14 w-14 flex items-center justify-center">
                  <Flag className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Add Your Own Branding</h3>
                  <p className="text-muted-foreground">
                    Create a consistent feel with your services by adding your logo to the plans you share. The DietPlan watermark and logo will be removed from your PDFs.
                  </p>
                </div>
              </div>
              
              {/* Feature 3 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 bg-secondary/20 p-3 rounded-full h-14 w-14 flex items-center justify-center">
                  <Smartphone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Provide App Access To Your Clients</h3>
                  <p className="text-muted-foreground">
                    Allow your clients to stay engaged with their meal plans on our web and mobile apps.
                  </p>
                </div>
              </div>
              
              {/* Feature 4 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 bg-secondary/20 p-3 rounded-full h-14 w-14 flex items-center justify-center">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Save Meal Plans For Easy Re-Use</h3>
                  <p className="text-muted-foreground">
                    Generate plans based on the past selections from your account or your client's account.
                  </p>
                </div>
              </div>
              
              {/* Feature 5 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 bg-secondary/20 p-3 rounded-full h-14 w-14 flex items-center justify-center">
                  <MailOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Email Plans To Your Clients</h3>
                  <p className="text-muted-foreground">
                    Send your clients their latest meal plans and recipes via email or PDF. View a sample email.
                  </p>
                </div>
              </div>
              
              {/* Feature 6 */}
              <div className="flex gap-6">
                <div className="flex-shrink-0 bg-secondary/20 p-3 rounded-full h-14 w-14 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-3">Service Your Clients In One Spot</h3>
                  <p className="text-muted-foreground">
                    Use the admin dashboard to quickly jump between client accounts and make updates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section className="py-16 md:py-24 bg-background border-t">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Whether you're a personal trainer, dietitian, or gym owner, our professional plans scale with your business.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Starter Plan */}
              <div className="border rounded-xl p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-center mb-2">Starter</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">$29</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-center text-muted-foreground mb-6">Perfect for independent trainers</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Up to 10 clients</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Basic customization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button variant="outline" className="mt-auto">Get Started</Button>
              </div>
              
              {/* Professional Plan */}
              <div className="border rounded-xl p-8 flex flex-col relative bg-card shadow-lg">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
                <h3 className="text-2xl font-bold text-center mb-2">Professional</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">$49</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-center text-muted-foreground mb-6">For growing practices</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Up to 30 clients</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Advanced customization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Priority support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>White-label PDF exports</span>
                  </li>
                </ul>
                <Button className="mt-auto">Get Started</Button>
              </div>
              
              {/* Enterprise Plan */}
              <div className="border rounded-xl p-8 flex flex-col">
                <h3 className="text-2xl font-bold text-center mb-2">Enterprise</h3>
                <div className="text-center mb-6">
                  <span className="text-4xl font-bold">$99</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <p className="text-center text-muted-foreground mb-6">For clinics and facilities</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Unlimited clients</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Full customization</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="h-5 w-5 text-primary mr-2" />
                    <span>API access</span>
                  </li>
                </ul>
                <Button variant="outline" className="mt-auto">Contact Sales</Button>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Button asChild size="lg">
                <Link to="/auth">Sign Up For Professional Account</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ProPlan;
