import Link from "next/link";
import { Button } from "@/components/ui/button";

const CTA = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="bg-gradient-to-r from-blue-600 to-violet-600 rounded-lg overflow-hidden">
        <div className="px-6 py-12 md:py-24 md:px-12 text-center text-white">
          <h2 className="text-2xl md:text-4xl font-bold mb-4">Ready to Enhance Your Smartphone Experience?</h2>
          <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Explore our collection of premium smartphone gadgets and accessories. 
            Free shipping on orders over $50 and cash on delivery available.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              <Link href="/shop">
                Shop Now
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10"
            >
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;