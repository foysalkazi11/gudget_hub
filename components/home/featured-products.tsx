"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  Star, 
  ShoppingCart, 
  Heart,
  ChevronRight,
  ChevronLeft 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";

// Mock data - would come from API/database
const featuredProducts = [
  {
    id: "1",
    name: "Premium Leather Phone Case",
    price: 39.99,
    rating: 4.7,
    reviews: 128,
    image: "https://images.pexels.com/photos/1736222/pexels-photo-1736222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "premium-leather-phone-case",
    isNew: true,
    discount: 0,
  },
  {
    id: "2",
    name: "Wireless Earbuds Pro",
    price: 149.99,
    rating: 4.9,
    reviews: 342,
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "wireless-earbuds-pro",
    isNew: false,
    discount: 15,
  },
  {
    id: "3",
    name: "Fast Wireless Charger",
    price: 49.99,
    rating: 4.5,
    reviews: 87,
    image: "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "fast-wireless-charger",
    isNew: true,
    discount: 0,
  },
  {
    id: "4",
    name: "Ultra-Slim Power Bank",
    price: 59.99,
    rating: 4.6,
    reviews: 203,
    image: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "ultra-slim-power-bank",
    isNew: false,
    discount: 10,
  },
  {
    id: "5",
    name: "MagSafe Compatible Car Mount",
    price: 34.99,
    rating: 4.4,
    reviews: 156,
    image: "https://images.pexels.com/photos/1036808/pexels-photo-1036808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "magsafe-compatible-car-mount",
    isNew: false,
    discount: 0,
  },
  {
    id: "6",
    name: "Tempered Glass Screen Protector",
    price: 19.99,
    rating: 4.3,
    reviews: 421,
    image: "https://images.pexels.com/photos/193004/pexels-photo-193004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "tempered-glass-screen-protector",
    isNew: false,
    discount: 25,
  },
];

const FeaturedProducts = () => {
  const [startIndex, setStartIndex] = useState(0);
  const { addToCart } = useCart();
  
  const visibleProducts = featuredProducts.slice(startIndex, startIndex + 4);
  
  const nextProducts = () => {
    setStartIndex((prevIndex) => 
      prevIndex + 4 >= featuredProducts.length ? 0 : prevIndex + 4
    );
  };
  
  const prevProducts = () => {
    setStartIndex((prevIndex) => 
      prevIndex === 0 ? Math.max(0, featuredProducts.length - 4) : prevIndex - 4
    );
  };

  return (
    <section className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Featured Products</h2>
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevProducts}
            disabled={featuredProducts.length <= 4}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextProducts}
            disabled={featuredProducts.length <= 4}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
          <Link 
            href="/shop" 
            className="ml-2 text-sm font-medium text-primary hover:underline hidden sm:inline-block"
          >
            View All Products
          </Link>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => (
          <div 
            key={product.id} 
            className="group bg-white dark:bg-gray-950 rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative h-60 overflow-hidden">
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              
              {product.isNew && (
                <Badge className="absolute top-2 left-2 bg-blue-500">New</Badge>
              )}
              
              {product.discount > 0 && (
                <Badge className="absolute top-2 right-2 bg-red-500">
                  {product.discount}% OFF
                </Badge>
              )}
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-2 right-2 bg-white/80 text-gray-700 hover:bg-white hover:text-gray-900 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Add to wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="p-4">
              <Link 
                href={`/product/${product.slug}`}
                className="block mb-1 text-base font-semibold line-clamp-2 hover:text-primary transition-colors"
              >
                {product.name}
              </Link>
              
              <div className="flex items-center mb-2">
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm font-medium">{product.rating}</span>
                </div>
                <span className="text-xs text-muted-foreground ml-1">
                  ({product.reviews} reviews)
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  {product.discount > 0 ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold">
                        ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                      </span>
                      <span className="text-sm text-muted-foreground line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-lg font-bold">
                      ${product.price.toFixed(2)}
                    </span>
                  )}
                </div>
                
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => addToCart(product)}
                  aria-label="Add to cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center md:hidden">
        <Button asChild variant="outline">
          <Link href="/shop">View All Products</Link>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedProducts;