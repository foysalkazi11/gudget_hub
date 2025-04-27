"use client";

import { useState } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock testimonials data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Tech Enthusiast",
    image: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    quote: "GadgetHub has become my go-to place for all smartphone accessories. The quality of their products and the quick delivery have made me a loyal customer!",
    rating: 5,
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Professional Photographer",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    quote: "As someone who uses their phone for professional photography, having reliable accessories is crucial. The phone lenses and mounts I bought from GadgetHub have exceeded my expectations.",
    rating: 5,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Business Professional",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    quote: "I ordered a power bank for my business trips, and I'm impressed with how long it holds a charge. The cash on delivery option made the purchase process very convenient.",
    rating: 4,
  },
  {
    id: 4,
    name: "David Thompson",
    role: "Student",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    quote: "The durable phone case I bought from GadgetHub has saved my phone multiple times. Great product at a reasonable price!",
    rating: 5,
  },
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12">What Our Customers Say</h2>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div 
                  key={testimonial.id} 
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center">
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <div className="relative h-16 w-16 md:h-20 md:w-20 rounded-full overflow-hidden">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={cn(
                                "h-4 w-4 mr-1",
                                i < testimonial.rating 
                                  ? "text-amber-500 fill-amber-500" 
                                  : "text-gray-300 dark:text-gray-600"
                              )}
                            />
                          ))}
                        </div>
                        
                        <blockquote className="text-lg mb-4 italic">
                          "{testimonial.quote}"
                        </blockquote>
                        
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-6 space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevTestimonial}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
            
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextTestimonial}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
          
          <div className="flex justify-center mt-4 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all",
                  index === activeIndex 
                    ? "bg-primary w-6" 
                    : "bg-gray-300 dark:bg-gray-600"
                )}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;