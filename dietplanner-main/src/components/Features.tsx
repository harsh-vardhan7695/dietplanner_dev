import React from 'react';
import { Calendar, Utensils, ShoppingCart } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="heading-primary text-4xl text-center mb-6 max-w-2xl mx-auto">
          Create your meal plan right here in seconds
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {/* Feature 1 */}
          <div className="feature-card card-hover">
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent rounded-xl"></div>
              <div className="relative">
                <div className="feature-icon-wrapper">
                  <Calendar className="feature-icon" />
                </div>
                <h3 className="heading-secondary text-xl mb-3">Personalized Plans</h3>
                <p className="body-text">
                  Get meal plans tailored to your health goals, dietary restrictions, and food preferences.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="feature-card card-hover">
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent rounded-xl"></div>
              <div className="relative">
                <div className="feature-icon-wrapper">
                  <Utensils className="feature-icon" />
                </div>
                <h3 className="heading-secondary text-xl mb-3">AI-Powered Recipes</h3>
                <p className="body-text">
                  Discover delicious recipes that match your nutritional needs and cooking skill level.
                </p>
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="feature-card card-hover">
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent rounded-xl"></div>
              <div className="relative">
                <div className="feature-icon-wrapper">
                  <ShoppingCart className="feature-icon" />
                </div>
                <h3 className="heading-secondary text-xl mb-3">Smart Grocery Lists</h3>
                <p className="body-text">
                  Automatically generate shopping lists based on your meal plan to save time and reduce waste.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features; 