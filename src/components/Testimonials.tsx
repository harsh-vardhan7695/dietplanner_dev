
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah M.",
    role: "Fitness Enthusiast",
    content: "DietPlanner changed how I approach nutrition. The AI recommendations are spot-on for my fitness goals!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    name: "Michael T.",
    role: "Busy Professional",
    content: "As someone with a hectic schedule, having my meals and grocery lists automated has been a game-changer.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    name: "Jessica K.",
    role: "Health Coach",
    content: "I recommend DietPlanner to all my clients. The personalization based on health conditions is impressive.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            What Our Early Users Say
          </h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Real stories from people who've tried our beta version
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="animate-fade-in" style={{ animationDelay: `${index * 150}ms` }}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
