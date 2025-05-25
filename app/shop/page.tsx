import { createServerClient } from "@/lib/supabase/server";
import ShopClient from "./shop-client";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  rating: number;
  reviews: number;
  category_id: number;
  categories: {
    name: string;
    slug: string;
  };
  slug: string;
  is_new?: boolean;
  discount?: number;
}

async function getProducts(category?: string, minPrice?: string, maxPrice?: string): Promise<Product[]> {
  try {
    const supabase = createServerClient();
    
    let query = supabase
      .from("products")
      .select(`
        *,
        categories!inner (
          name,
          slug
        )
      `);

    if (category && category !== "all") {
      query = query.eq("categories.slug", category);
    }

    if (minPrice) {
      query = query.gte("price", Number(minPrice));
    }

    if (maxPrice) {
      query = query.lte("price", Number(maxPrice));
    }

    const { data: products, error } = await query;

    if (error) {
      console.error("Error fetching products:", error);
      throw error;
    }

    return products as Product[];
  } catch (error) {
    console.error("Error in getProducts:", error);
    throw error;
  }
}

async function getCategories(): Promise<Category[]> {
  try {
    const supabase = createServerClient();
    const { data: categories, error } = await supabase
      .from("categories")
      .select("*");

    if (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }

    return categories as Category[];
  } catch (error) {
    console.error("Error in getCategories:", error);
    throw error;
  }
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 space-y-6">
          <Skeleton className="h-8 w-full" />
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="aspect-square" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string; minPrice?: string; maxPrice?: string };
}) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ShopPageContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ShopPageContent({
  searchParams,
}: {
  searchParams: { category?: string; minPrice?: string; maxPrice?: string };
}) {
  try {
    const [products, categories] = await Promise.all([
      getProducts(searchParams.category, searchParams.minPrice, searchParams.maxPrice),
      getCategories(),
    ]);

    return <ShopClient products={products} categories={categories} />;
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="text-gray-600">
            We&apos;re having trouble loading the products. Please try again later.
          </p>
        </div>
      </div>
    );
  }
}