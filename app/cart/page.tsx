"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCoupon = () => {
    if (!couponCode) {
      toast({
        title: "Error",
        description: "Please enter a coupon code",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Invalid coupon",
      description: "The coupon code you entered is invalid or expired.",
      variant: "destructive",
    });
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add some items to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    router.push("/checkout");
  };

  // Calculate order summary
  const subtotal = cartTotal;
  const shipping = cartItems.length > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="flex justify-center mb-6">
            <ShoppingBag className="h-20 w-20 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Looks like you haven&apos;t added anything to your cart yet. 
            Browse our products and find something you&apos;ll love!
          </p>
          <Button asChild size="lg">
            <Link href="/shop">
              Continue Shopping
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-4">Product</th>
                      <th className="text-center p-4 w-28">Quantity</th>
                      <th className="text-right p-4 w-24">Price</th>
                      <th className="text-right p-4 w-24">Total</th>
                      <th className="p-4 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => {
                      const itemPrice = item.discount 
                        ? item.price * (1 - (item.discount / 100)) 
                        : item.price;
                      const itemTotal = itemPrice * item.quantity;
                      
                      return (
                        <tr key={item.id} className="border-b last:border-b-0">
                          <td className="p-4">
                            <div className="flex items-center">
                              <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0 mr-4">
                                <Image
                                  src={item.image}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <Link 
                                  href={`/product/${item.slug}`} 
                                  className="font-medium hover:underline"
                                >
                                  {item.name}
                                </Link>
                                {item?.discount > 0 && (
                                  <div className="text-sm text-red-500">{item.discount}% off</div>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-10 text-center">{item.quantity}</span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            {item.discount > 0 ? (
                              <div>
                                <span className="font-medium">${itemPrice.toFixed(2)}</span>
                                <span className="text-sm text-muted-foreground line-through block">
                                  ${item.price.toFixed(2)}
                                </span>
                              </div>
                            ) : (
                              <span className="font-medium">${item.price.toFixed(2)}</span>
                            )}
                          </td>
                          <td className="p-4 text-right font-medium">
                            ${itemTotal.toFixed(2)}
                          </td>
                          <td className="p-4 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              
              <div className="p-4 flex justify-between items-center border-t">
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
                <Button asChild>
                  <Link href="/shop">
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">${shipping.toFixed(2)}</span>
                </div>
                
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleApplyCoupon}
                    variant="outline"
                  >
                    Apply
                  </Button>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  size="lg" 
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
            
            <div className="mt-6 bg-white dark:bg-gray-950 rounded-lg border shadow-sm p-4">
              <h3 className="font-semibold mb-2">We Accept</h3>
              <p className="text-sm text-muted-foreground">
                Cash on Delivery (COD) - Pay when your order arrives!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}