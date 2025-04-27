"use client";

import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const WhatsAppButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling down a bit
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const openWhatsApp = () => {
    window.open(
      `https://wa.me/1234567890?text=${encodeURIComponent(
        "Hello! I have a question about GadgetHub products."
      )}`,
      "_blank"
    );
  };

  return (
    <Button
      onClick={openWhatsApp}
      className={cn(
        "fixed right-4 bottom-4 z-40 rounded-full h-14 w-14 shadow-lg bg-green-500 hover:bg-green-600 text-white transition-all duration-300 transform",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      )}
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  );
};

export default WhatsAppButton;