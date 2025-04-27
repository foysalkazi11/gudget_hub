"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Premium Smartphone Accessories",
    description: "Elevate your mobile experience with our curated collection of high-quality gadgets",
    cta: "Shop Now",
    image: "https://images.pexels.com/photos/3178938/pexels-photo-3178938.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    link: "/shop",
  },
  {
    id: 2,
    title: "New Arrivals",
    description: "Discover the latest tech accessories for your smartphone",
    cta: "Explore",
    image: "https://images.pexels.com/photos/1647976/pexels-photo-1647976.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    link: "/new-arrivals",
  },
  {
    id: 3,
    title: "Special Offers",
    description: "Limited time deals on our bestselling products",
    cta: "View Deals",
    image: "https://images.pexels.com/photos/5081401/pexels-photo-5081401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    link: "/deals",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out transform ${
            index === currentSlide ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-center items-start p-8 md:p-16 text-white">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 max-w-2xl">{slide.title}</h1>
              <p className="text-lg md:text-xl mb-8 max-w-xl">{slide.description}</p>
              <Button asChild size="lg" className="bg-white text-black hover:bg-gray-200">
                <Link href={slide.link}>{slide.cta}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          onClick={prevSlide}
          variant="ghost"
          size="icon"
          className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
        >
          <ChevronLeft className="h-6 w-6" />
          <span className="sr-only">Previous slide</span>
        </Button>
      </div>

      <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
        <Button
          onClick={nextSlide}
          variant="ghost"
          size="icon" 
          className="rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
        >
          <ChevronRight className="h-6 w-6" />
          <span className="sr-only">Next slide</span>
        </Button>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-white w-6" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;