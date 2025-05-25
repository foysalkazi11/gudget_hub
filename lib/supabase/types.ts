export type Database = {
  public: {
    tables: {
      products: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          description: string;
          price: number;
          category_id: string;
          image_url: string;
          inventory: number;
          slug: string;
          is_featured: boolean;
          is_new: boolean;
          discount?: number;
          rating?: number;
          reviews_count?: number;
          features?: string[];
          specifications?: Record<string, string>;
          additional_images?: string[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          description: string;
          price: number;
          category_id: string;
          image_url: string;
          inventory: number;
          slug: string;
          is_featured?: boolean;
          is_new?: boolean;
          discount?: number;
          rating?: number;
          reviews_count?: number;
          features?: string[];
          specifications?: Record<string, string>;
          additional_images?: string[];
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          description?: string;
          price?: number;
          category_id?: string;
          image_url?: string;
          inventory?: number;
          slug?: string;
          is_featured?: boolean;
          is_new?: boolean;
          discount?: number;
          rating?: number;
          reviews_count?: number;
          features?: string[];
          specifications?: Record<string, string>;
          additional_images?: string[];
        };
      };
    };
  };
}; 