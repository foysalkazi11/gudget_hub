"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Timer, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useCart } from "@/contexts/cart-context";

// Mock data - replace with actual data from Supabase
const deals = [
  {
    id: "1",
    name: "Wireless Earbuds Pro",
    originalPrice: 149.99,
    discountedPrice: 127.49,
    discount: 15,
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "wireless-earbuds-pro",
    soldCount: 342,
    totalStock: 500,
    endsIn: "2024-05-01",
  },
  {
    id: "2",
    name: "Tempered Glass Screen Protector",
    originalPrice: 19.99,
    discountedPrice: 14.99,
    discount: 25,
    image: "https://images.pexels.com/photos/193004/pexels-photo-193004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "tempered-glass-screen-protector",
    soldCount: 421,
    totalStock: 1000,
    endsIn: "2024-04-25",
  },
  {
    id: "3",
    name: "Rugged Outdoor Power Bank",
    originalPrice: 79.99,
    discountedPrice: 63.99,
    discount: 20,
    image: "https://images.pexels.com/photos/9105181/pexels-photo-9105181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "rugged-outdoor-power-bank",
    soldCount: 156,
    totalStock: 300,
    endsIn: "2024-04-30",
  },
  {
    id: "4",
    name: "65W GaN Charger",
    originalPrice: 59.99,
    discountedPrice: 53.99,
    discount: 10,
    image: "https://images.pexels.com/photos/4219862/pexels-photo-4219862.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    slug: "65w-gan-charger",
    soldCount: 89,
    totalStock: 200,
    endsIn: "2024-04-28",
  },
];

export default function DealsPage() {
  const { addToCart } = useCart();
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  // Calculate time left for each deal
  const calculateTimeLeft = (endDate: string) => {
    const end = new Date(endDate).getTime();
    const now = new Date().getTime();
    const distance = end - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Special Deals</h1>
        <p className="text-lg text-muted-foreground">
          Don&apos;t miss out on these limited-time offers on our most popular products.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {deals.map((deal) => {
          const stockLeft = deal.totalStock - deal.soldCount;
          const stockPercentage = (stockLeft / deal.totalStock) * 100;
          
          return (
            <div 
              key={deal.id}
              className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={deal.image}
                  alt={deal.name}
                  fill
                  className="object-cover"
                />
                <Badge 
                  className="absolute top-2 left-2 bg-red-500"
                >
                  {deal.discount}% OFF
                </Badge>
              </div>

              <div className="p-4">
                <Link 
                  href={`/product/${deal.slug}`}
                  className="block text-lg font-semibold mb-2 hover:text-primary transition-colors"
                >
                  {deal.name}
                </Link>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold">
                    ${deal.discountedPrice.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground line-through">
                    ${deal.originalPrice.toFixed(2)}
                  </span>
                </div>

                <div className="space-y-4 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Timer className="h-4 w-4 text-muted-foreground" />
                    <span>Ends in: {calculateTimeLeft(deal.endsIn)}</span>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span>{stockLeft} items left</span>
                      <span>{deal.soldCount} sold</span>
                    </div>
                    <Progress value={stockPercentage} className="h-2" />
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => addToCart({
                    id: deal.id,
                    name: deal.name,
                    price: deal.originalPrice,
                    image: deal.image,
                    slug: deal.slug,
                    discount: deal.discount,
                  })}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Button asChild size="lg" variant="outline">
          <Link href="/shop">
            View All Products
          </Link>
        </Button>
      </div>
    </div>
  );
}