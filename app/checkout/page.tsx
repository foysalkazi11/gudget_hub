"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Building, MapPin, Check, Clock, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";

// Form schema
const checkoutSchema = z.object({
  fullName: z.string().min(3, { message: "Full name is required" }),
  email: z.string().email({ message: "Valid email is required" }),
  phone: z.string().min(10, { message: "Valid phone number is required" }),
  address: z.string().min(5, { message: "Address is required" }),
  city: z.string().min(2, { message: "City is required" }),
  state: z.string().min(2, { message: "State is required" }),
  postalCode: z.string().min(4, { message: "Postal code is required" }),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [processingOrder, setProcessingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useAuth();

  // Define shipping cost and order total
  const shippingCost = cartItems.length > 0 ? 5.00 : 0;
  const orderTotal = cartTotal + shippingCost;

  // Initialize form
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: user?.email || "",
      phone: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      notes: "",
    },
  });

  // Redirect if cart is empty
  if (cartItems.length === 0 && !orderPlaced) {
    toast({
      title: "Your cart is empty",
      description: "Add some items to your cart before checkout.",
      variant: "destructive",
    });
    router.push("/shop");
  }

  const onSubmit = async (data: CheckoutFormValues) => {
    setProcessingOrder(true);
    
    try {
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      
      // Generate random order number
      const randomOrderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);
      setOrderNumber(randomOrderNumber);
      
      // Clear cart and show success
      clearCart();
      setOrderPlaced(true);
      
      toast({
        title: "Order placed successfully!",
        description: `Your order #${randomOrderNumber} has been confirmed.`,
      });
    } catch (error) {
      toast({
        title: "Error placing order",
        description: "There was a problem processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingOrder(false);
    }
  };

  // Show confirmation screen if order placed
  if (orderPlaced) {
    return (
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="rounded-full bg-green-100 dark:bg-green-900 p-3">
              <Check className="h-8 w-8 text-green-600 dark:text-green-300" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-lg mb-8">
            Your order <span className="font-semibold">#{orderNumber}</span> has been placed successfully.
            We'll send you a confirmation email with order details shortly.
          </p>
          
          <div className="bg-white dark:bg-gray-950 border rounded-lg p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <Clock className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">Estimated Delivery Time</p>
                  <p className="text-sm text-muted-foreground">
                    3-5 business days
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <Phone className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">Contact</p>
                  <p className="text-sm text-muted-foreground">
                    Our delivery partner will contact you before delivery
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mt-0.5 mr-2 flex-shrink-0 text-muted-foreground" />
                <div>
                  <p className="font-medium">Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Cash on Delivery - ${orderTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/shop">
                Continue Shopping
              </Link>
            </Button>
            <Button asChild>
              <Link href="/account/orders">
                View Orders
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-2">Checkout</h1>
      <div className="text-sm text-muted-foreground mb-8 flex items-center">
        <Link href="/cart" className="hover:underline">
          Cart
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span>Checkout</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="your@email.com" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your phone number" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Street address, apartment, suite, etc." 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="City" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="state"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input placeholder="State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="postalCode"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Postal Code</FormLabel>
                          <FormControl>
                            <Input placeholder="Postal code" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Notes (Optional)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Notes about your order, e.g. special delivery instructions" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-white dark:bg-gray-950 rounded-lg border shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                <div className="flex items-center space-x-2 p-3 bg-blue-50 dark:bg-blue-950 rounded-md border border-blue-200 dark:border-blue-800">
                  <div className="flex-1">
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-muted-foreground">
                      Pay when your order arrives
                    </p>
                  </div>
                  <Check className="h-5 w-5 text-blue-600" />
                </div>
              </div>
              
              <div className="lg:hidden">
                <OrderSummary 
                  cartItems={cartItems} 
                  cartTotal={cartTotal} 
                  shippingCost={shippingCost} 
                />
              </div>

              <div className="flex justify-between items-center">
                <Button 
                  type="button" 
                  variant="outline" 
                  asChild
                >
                  <Link href="/cart">
                    Back to Cart
                  </Link>
                </Button>
                <Button 
                  type="submit" 
                  size="lg" 
                  disabled={processingOrder}
                >
                  {processingOrder ? "Processing..." : "Place Order"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
        
        <div className="hidden lg:block">
          <OrderSummary 
            cartItems={cartItems} 
            cartTotal={cartTotal} 
            shippingCost={shippingCost} 
          />
        </div>
      </div>
    </div>
  );
};

// Order summary component
interface OrderSummaryProps {
  cartItems: any[];
  cartTotal: number;
  shippingCost: number;
}

const OrderSummary = ({ cartItems, cartTotal, shippingCost }: OrderSummaryProps) => {
  const orderTotal = cartTotal + shippingCost;
  
  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="max-h-60 overflow-y-auto space-y-4">
          {cartItems.map((item) => {
            const itemPrice = item.discount 
              ? item.price * (1 - (item.discount / 100)) 
              : item.price;
            const itemTotal = itemPrice * item.quantity;
            
            return (
              <div key={item.id} className="flex gap-3">
                <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {item.quantity}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-sm text-muted-foreground">
                      ${itemPrice.toFixed(2)} {item.discount ? `(-${item.discount}%)` : ''}
                    </p>
                    <p className="text-sm font-medium">${itemTotal.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span>${shippingCost.toFixed(2)}</span>
          </div>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${orderTotal.toFixed(2)}</span>
        </div>
        
        <div className="flex items-center gap-2 p-2 text-xs bg-gray-50 dark:bg-gray-900 rounded">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span>Cash on Delivery - Pay when your order arrives</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CheckoutPage;