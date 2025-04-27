import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// These types help TypeScript understand the shape of your database
type Database = {
  public: {
    tables: {
      products: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string;
          price: number;
          category: string;
          image_url: string;
          inventory: number;
          slug: string;
          is_featured: boolean;
          is_new: boolean;
          discount?: number;
          rating?: number;
          reviews?: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description: string;
          price: number;
          category: string;
          image_url: string;
          inventory: number;
          slug: string;
          is_featured?: boolean;
          is_new?: boolean;
          discount?: number;
          rating?: number;
          reviews?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string;
          price?: number;
          category?: string;
          image_url?: string;
          inventory?: number;
          slug?: string;
          is_featured?: boolean;
          is_new?: boolean;
          discount?: number;
          rating?: number;
          reviews?: number;
        };
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          email: string;
          name: string;
          avatar_url?: string;
          phone?: string;
          address?: string;
        };
        Insert: {
          id: string;
          created_at?: string;
          email: string;
          name: string;
          avatar_url?: string;
          phone?: string;
          address?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          email?: string;
          name?: string;
          avatar_url?: string;
          phone?: string;
          address?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          status: string;
          total: number;
          shipping_address: string;
          payment_method: string;
          contact_number: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          status: string;
          total: number;
          shipping_address: string;
          payment_method: string;
          contact_number: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          user_id?: string;
          status?: string;
          total?: number;
          shipping_address?: string;
          payment_method?: string;
          contact_number?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          created_at: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
        };
      };
    };
  };
};

// Create a single supabase client for interacting with your database
export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables');
  }

  return createSupabaseClient<Database>(supabaseUrl, supabaseAnonKey);
};