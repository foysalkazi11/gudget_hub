import { createClient } from "@/lib/supabase/client";
import ProductClient from "./product-client";
import Link from "next/link";

async function getProduct(slug: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) throw error;
  return data;
}

export async function generateStaticParams() {
  const supabase = createClient();
  const { data: products } = await supabase
    .from("products")
    .select("slug");

  return (products ?? []).map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/shop">Continue Shopping</Link>
      </div>
    );
  }

  return <ProductClient product={product} />;
}