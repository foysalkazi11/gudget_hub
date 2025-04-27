"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  {
    id: 1,
    name: "Phone Cases",
    description: "Stylish protection for your device",
    image: "https://images.pexels.com/photos/3082341/pexels-photo-3082341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    productCount: 42,
    slug: "phone-cases",
  },
  {
    id: 2,
    name: "Headphones",
    description: "Premium audio experience",
    image: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    productCount: 35,
    slug: "headphones",
  },
  {
    id: 3,
    name: "Chargers",
    description: "Fast charging solutions",
    image: "https://images.pexels.com/photos/5082573/pexels-photo-5082573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    productCount: 28,
    slug: "chargers",
  },
  {
    id: 4,
    name: "Screen Protectors",
    description: "Ultimate screen protection",
    image: "https://images.pexels.com/photos/6598/coffee-desk-laptop-notebook.jpg?auto=compress&cs=tinysrgb&w=1260&h=750",
    productCount: 15,
    slug: "screen-protectors",
  },
  {
    id: 5,
    name: "Power Banks",
    description: "Portable power solutions",
    image: "https://images.pexels.com/photos/4526400/pexels-photo-4526400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    productCount: 23,
    slug: "power-banks",
  },
  {
    id: 6,
    name: "Bluetooth Speakers",
    description: "Wireless audio freedom",
    image: "https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    productCount: 18,
    slug: "bluetooth-speakers",
  },
  {
    id: 7,
    name: "Smartphone Stands",
    description: "Ergonomic viewing angles",
    image: "https://images.pexels.com/photos/193004/pexels-photo-193004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    productCount: 12,
    slug: "smartphone-stands",
  },
  {
    id: 8,
    name: "Camera Accessories",
    description: "Enhance your photography",
    image: "https://images.pexels.com/photos/3497065/pexels-photo-3497065.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    productCount: 20,
    slug: "camera-accessories",
  },
];

export default function CategoriesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Product Categories</h1>
        <p className="text-lg text-muted-foreground">
          Explore our wide range of smartphone accessories and gadgets, carefully curated for your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/shop?category=${category.slug}`}
            className="group block"
          >
            <div className="relative h-64 overflow-hidden rounded-lg">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-semibold text-white mb-1">
                  {category.name}
                </h3>
                <p className="text-white/90 text-sm mb-3">
                  {category.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-white/80 text-sm">
                    {category.productCount} Products
                  </span>
                  <ArrowRight className="h-5 w-5 text-white transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button asChild size="lg">
          <Link href="/shop">
            View All Products
          </Link>
        </Button>
      </div>
    </div>
  );
}