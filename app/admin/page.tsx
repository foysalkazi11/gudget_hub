"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { 
  Package, 
  Users, 
  ShoppingBag, 
  AlertTriangle, 
  ChevronRight, 
  DollarSign, 
  TrendingUp, 
  Clock,
  BarChart3
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, ResponsiveContainer, XAxis, YAxis, Bar, Tooltip } from "recharts";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);

  // Mock data - would come from API in a real app
  const pendingOrders = 12;
  const failedDeliveries = 3;
  const productsOutOfStock = 5;
  const totalSales = 5290.75;
  
  const analyticsData = [
    { name: "Jan", value: 1200 },
    { name: "Feb", value: 1800 },
    { name: "Mar", value: 1400 },
    { name: "Apr", value: 2200 },
    { name: "May", value: 1900 },
    { name: "Jun", value: 3200 },
    { name: "Jul", value: 2800 },
  ];

  const recentOrders = [
    { 
      id: "ORD-001245", 
      customer: "John Smith", 
      date: "2025-01-15", 
      total: 129.99, 
      status: "Delivered" 
    },
    { 
      id: "ORD-001244", 
      customer: "Emily Johnson", 
      date: "2025-01-14", 
      total: 79.99, 
      status: "Shipped" 
    },
    { 
      id: "ORD-001243", 
      customer: "Michael Chen", 
      date: "2025-01-14", 
      total: 199.99, 
      status: "Processing" 
    },
    { 
      id: "ORD-001242", 
      customer: "Sarah Wilson", 
      date: "2025-01-13", 
      total: 59.99, 
      status: "Failed" 
    },
    { 
      id: "ORD-001241", 
      customer: "Robert Garcia", 
      date: "2025-01-13", 
      total: 149.99, 
      status: "Delivered" 
    },
  ];

  const popularProducts = [
    {
      id: "1",
      name: "Premium Leather Phone Case",
      image: "https://images.pexels.com/photos/1736222/pexels-photo-1736222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      price: 39.99,
      sold: 156,
      stock: 42
    },
    {
      id: "2",
      name: "Wireless Earbuds Pro",
      image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      price: 149.99,
      sold: 128,
      stock: 35
    },
    {
      id: "3",
      name: "Fast Wireless Charger",
      image: "https://images.pexels.com/photos/4526407/pexels-photo-4526407.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
      price: 49.99,
      sold: 94,
      stock: 0
    }
  ];

  // Check if user is authorized (admin)
  useEffect(() => {
    // This is a mock check - in a real app, you'd check for admin role
    if (!loading) {
      if (!user) {
        toast({
          title: "Access denied",
          description: "You need to be logged in as an admin to access this area.",
          variant: "destructive",
        });
        router.push("/auth");
      } else {
        // Mock admin check - in real app, check user roles from database
        setIsAdmin(true);
      }
    }
  }, [user, loading, router, toast]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Redirect happens via useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button asChild>
          <Link href="/admin/products/new">
            Add New Product
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Pending Orders</p>
                <h3 className="text-2xl font-bold">{pendingOrders}</h3>
              </div>
              <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-300" />
              </div>
            </div>
            <Link 
              href="/admin/orders?status=pending" 
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center mt-4"
            >
              View all pending orders <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Failed Deliveries</p>
                <h3 className="text-2xl font-bold">{failedDeliveries}</h3>
              </div>
              <div className="rounded-full p-2 bg-red-100 dark:bg-red-900">
                <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-300" />
              </div>
            </div>
            <Link 
              href="/admin/orders?status=failed" 
              className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center mt-4"
            >
              View all failed deliveries <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Out of Stock Items</p>
                <h3 className="text-2xl font-bold">{productsOutOfStock}</h3>
              </div>
              <div className="rounded-full p-2 bg-amber-100 dark:bg-amber-900">
                <Package className="h-5 w-5 text-amber-600 dark:text-amber-300" />
              </div>
            </div>
            <Link 
              href="/admin/products?outOfStock=true" 
              className="text-sm text-amber-600 dark:text-amber-400 hover:underline flex items-center mt-4"
            >
              View all out of stock items <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Total Sales</p>
                <h3 className="text-2xl font-bold">${totalSales.toFixed(2)}</h3>
              </div>
              <div className="rounded-full p-2 bg-green-100 dark:bg-green-900">
                <DollarSign className="h-5 w-5 text-green-600 dark:text-green-300" />
              </div>
            </div>
            <div className="flex items-center text-green-600 dark:text-green-400 mt-4 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12.5% from last month</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sales Analytics</CardTitle>
            <CardDescription>Monthly sales performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={analyticsData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--chart-1))" name="Sales ($)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Manage your store</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/products">
                <Package className="mr-2 h-4 w-4" />
                Manage Products
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/orders">
                <ShoppingBag className="mr-2 h-4 w-4" />
                View All Orders
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/customers">
                <Users className="mr-2 h-4 w-4" />
                Customer List
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link href="/admin/analytics">
                <BarChart3 className="mr-2 h-4 w-4" />
                Full Analytics
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="orders">
        <TabsList className="mb-4">
          <TabsTrigger value="orders">Recent Orders</TabsTrigger>
          <TabsTrigger value="products">Popular Products</TabsTrigger>
        </TabsList>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>Showing the latest 5 orders</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left">
                      <th className="pb-3 font-medium">Order ID</th>
                      <th className="pb-3 font-medium">Customer</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium sr-only">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOrders.map((order) => (
                      <tr key={order.id} className="border-t">
                        <td className="py-3 pr-4">{order.id}</td>
                        <td className="py-3 pr-4">{order.customer}</td>
                        <td className="py-3 pr-4">{order.date}</td>
                        <td className="py-3 pr-4">${order.total.toFixed(2)}</td>
                        <td className="py-3 pr-4">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                              : order.status === "Processing"
                              ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 text-right">
                          <Button asChild variant="ghost" size="sm">
                            <Link href={`/admin/orders/${order.id}`}>
                              View
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex justify-end mt-4">
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin/orders">
                    View All Orders
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle>Popular Products</CardTitle>
              <CardDescription>Products with the highest sales</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {popularProducts.map((product) => (
                  <div key={product.id} className="flex items-center">
                    <div className="relative h-16 w-16 rounded overflow-hidden mr-4">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">${product.price.toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{product.sold} sold</p>
                      <p className={`text-sm ${
                        product.stock === 0 
                          ? "text-red-600 dark:text-red-400" 
                          : product.stock < 10 
                            ? "text-amber-600 dark:text-amber-400"
                            : "text-green-600 dark:text-green-400"
                      }`}>
                        {product.stock === 0 
                          ? "Out of stock" 
                          : `${product.stock} in stock`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-end mt-6">
                <Button asChild variant="outline" size="sm">
                  <Link href="/admin/products">
                    Manage Inventory
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}