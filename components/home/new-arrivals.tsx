import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data - would come from API/database
const newArrivals = [
  {
    id: "1",
    name: "MagSafe Compatible Ring Holder",
    price: 29.99,
    image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "magsafe-compatible-ring-holder",
    colors: ["#000000", "#FFFFFF", "#B76E79"],
  },
  {
    id: "2",
    name: "Ultra-Thin Privacy Screen Protector",
    price: 24.99,
    image: "https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "ultra-thin-privacy-screen-protector",
    colors: ["#000000"],
  },
  {
    id: "3",
    name: "Smart Wireless Earbuds with ANC",
    price: 129.99,
    image: "https://images.pexels.com/photos/7054656/pexels-photo-7054656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "smart-wireless-earbuds-with-anc",
    colors: ["#000000", "#FFFFFF", "#6082B6"],
  },
];

const NewArrivals = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">New Arrivals</h2>
        <Link 
          href="/new-arrivals" 
          className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
        >
          View All <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {newArrivals.map((product) => (
          <div 
            key={product.id} 
            className="group bg-white dark:bg-gray-950 rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-all"
          >
            <div className="relative h-72 overflow-hidden">
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              
              <Badge className="absolute top-2 left-2 bg-blue-500">New</Badge>
            </div>
            
            <div className="p-4">
              <Link 
                href={`/product/${product.slug}`}
                className="block mb-2 text-base font-semibold hover:text-primary transition-colors"
              >
                {product.name}
              </Link>
              
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  ${product.price.toFixed(2)}
                </span>
                
                <div className="flex items-center space-x-1">
                  {product.colors.map((color) => (
                    <div 
                      key={color} 
                      className="h-4 w-4 rounded-full border"
                      style={{ backgroundColor: color }}
                      title={color === "#000000" ? "Black" : color === "#FFFFFF" ? "White" : "Other"}
                    />
                  ))}
                </div>
              </div>
              
              <Button className="w-full mt-4" asChild>
                <Link href={`/product/${product.slug}`}>
                  View Details
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;