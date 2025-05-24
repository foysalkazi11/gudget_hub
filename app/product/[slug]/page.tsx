"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, Star, ChevronRight, Package, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCart } from "@/contexts/cart-context";
import { createClient } from "@/lib/supabase/client";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  image_url: string;
  additional_images?: string[];
  features?: string[];
  specifications?: Record<string, string>;
  inventory: number;
  rating?: number;
  reviews_count?: number;
  is_new?: boolean;
  slug: string;
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const supabase = createClient();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("slug", params.slug)
          .single();

        if (error) throw error;
        if (data) setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Button asChild>
          <Link href="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? product.price * (1 - product.discount / 100)
    : product.price;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image_url,
      slug: product.slug,
      discount: product.discount,
      quantity,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/shop" className="hover:text-primary">
          Shop
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
          {product.is_new && (
            <Badge className="absolute top-4 left-4 bg-blue-500">New</Badge>
          )}
          {product.discount && product.discount > 0 && (
            <Badge className="absolute top-4 right-4 bg-red-500">
              {product.discount}% OFF
            </Badge>
          )}
        </div>

        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center">
              {product.rating && (
                <>
                  <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                  <span className="ml-1 font-medium">{product.rating}</span>
                </>
              )}
              {product.reviews_count && (
                <span className="text-muted-foreground ml-1">
                  ({product.reviews_count} reviews)
                </span>
              )}
            </div>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-muted-foreground">
              {product.inventory > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </div>

          <div className="mb-6">
            {product.discount && product.discount > 0 ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-xl text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-3xl font-bold">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="flex gap-4 mb-8">
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 py-2 hover:bg-muted"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                className="px-3 py-2 hover:bg-muted"
                onClick={() => setQuantity(quantity + 1)}
                disabled={quantity >= product.inventory}
              >
                +
              </button>
            </div>

            <Button
              className="flex-1"
              onClick={handleAddToCart}
              disabled={product.inventory === 0}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>

            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-4 border rounded-lg">
              <Package className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Free Shipping</p>
                <p className="text-muted-foreground">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 border rounded-lg">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Secure Payment</p>
                <p className="text-muted-foreground">100% secure checkout</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-4 border rounded-lg">
              <RefreshCw className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm">
                <p className="font-medium">Easy Returns</p>
                <p className="text-muted-foreground">30 day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mt-12">
        <TabsList className="w-full justify-start border-b rounded-none">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Returns</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            <p>{product.description}</p>
            {product.features && (
              <>
                <h3 className="text-lg font-semibold mt-4 mb-2">Key Features</h3>
                <ul className="list-disc pl-6 space-y-1">
                  {(product.features as string[]).map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          {product.specifications && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(product.specifications as Record<string, string>).map(
                ([key, value]) => (
                  <div key={key} className="flex border-b pb-4">
                    <span className="font-medium w-1/3">{key}</span>
                    <span className="text-muted-foreground">{value}</span>
                  </div>
                )
              )}
            </div>
          )}
        </TabsContent>
        <TabsContent value="shipping" className="mt-6">
          <div className="prose dark:prose-invert max-w-none">
            <h3 className="text-lg font-semibold mb-4">Shipping Information</h3>
            <p>
              We offer free shipping on all orders over $50. Standard shipping
              typically takes 3-5 business days. Express shipping options are
              available at checkout.
            </p>

            <h3 className="text-lg font-semibold mt-6 mb-4">Return Policy</h3>
            <p>
              We accept returns within 30 days of delivery. Items must be unused
              and in their original packaging. Please contact our customer service
              team to initiate a return.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}