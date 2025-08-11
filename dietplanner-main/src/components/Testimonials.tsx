import React from "react";
import { Star } from "lucide-react";

const Testimonials: React.FC = () => {
  return (
    <section className="w-full py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="heading-primary text-4xl text-center mb-4">
          What Our Users Are Saying
        </h2>
        <p className="text-muted text-center mb-12 max-w-2xl mx-auto text-lg">
          Join thousands of happy users who have transformed their nutrition with DietPlan
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Testimonial 1 */}
          <div className="testimonial-card card-hover">
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent rounded-xl"></div>
              <div className="relative">
                <div className="flex star-rating mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "DietPlan completely transformed my meal planning. I've saved so much time and money while eating healthier!"
                </p>
                <div>
                  <h4 className="testimonial-author">Sarah J.</h4>
                  <p className="testimonial-role">Weight Loss Plan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="testimonial-card card-hover">
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent rounded-xl"></div>
              <div className="relative">
                <div className="flex star-rating mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="testimonial-text">
                  "As someone who hates meal planning, this app is a game-changer. The recipes are delicious and easy to follow."
                </p>
                <div>
                  <h4 className="testimonial-author">Michael T.</h4>
                  <p className="testimonial-role">Muscle Gain Plan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="testimonial-card card-hover">
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/20 to-transparent rounded-xl"></div>
              <div className="relative">
                <div className="flex mb-4">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 star-rating fill-current" />
                  ))}
                  <Star className="w-5 h-5 text-muted" />
                </div>
                <p className="testimonial-text">
                  "I love how the app adapts to my dietary restrictions. Vegetarian meal planning has never been easier."
                </p>
                <div>
                  <h4 className="testimonial-author">Priya K.</h4>
                  <p className="testimonial-role">Vegetarian Plan</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="rating-wrapper glass-panel inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 star-rating fill-current" />
              ))}
            </div>
            <span className="rating-text ml-2">4.8 out of 5</span>
            <span className="rating-count ml-2">based on 2,400+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
