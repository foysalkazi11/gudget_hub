"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Filter, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/contexts/cart-context";

// Mock data - replace with actual data from Supabase
const products = [
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
  // Add more products...
];

const categories = [
  "All Categories",
  "Phone Cases",
  "Screen Protectors",
  "Chargers",
  "Power Banks",
  "Headphones",
  "Camera Accessories",
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("featured");
  const { addToCart } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="font-semibold mb-4">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Price Range</h3>
            <div className="space-y-2">
              <Input type="number" placeholder="Min Price" />
              <Input type="number" placeholder="Max Price" />
              <Button className="w-full">Apply Filter</Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold">All Products</h1>
            <div className="flex items-center gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
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
        </div>
      </div>
    </div>
  );
}