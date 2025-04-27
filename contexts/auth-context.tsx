"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from '@/lib/supabase/client';

// Define types
type User = {
  id: string;
  email?: string;
  name?: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: any, user: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signIn: async () => ({ error: null }),
  signUp: async () => ({ error: null, user: null }),
  signOut: async () => {},
  resetPassword: async () => ({ error: null }),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // Check active session and set user
    const checkUser = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error checking auth session:", error);
          return;
        }
        
        if (session?.user) {
          const { id, email } = session.user;
          
          // Get additional user data from profiles table if needed
          const { data: profileData } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', id)
            .single();
            
          setUser({
            id,
            email: email || undefined,
            name: profileData?.name,
          });
        }
      } catch (error) {
        console.error("Unexpected error during auth check:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
    
    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          const { id, email } = session.user;
          
          // Get additional user data from profiles table if needed
          const { data: profileData } = await supabase
            .from('profiles')
            .select('name')
            .eq('id', id)
            .single();
            
          setUser({
            id,
            email: email || undefined,
            name: profileData?.name,
          });
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
      }
    );
    
    // Clean up subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      return { error };
    } catch (error) {
      console.error("Error signing in:", error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (!error && data?.user) {
        // Create a profile record
        await supabase.from('profiles').insert({
          id: data.user.id,
          email,
          name,
          created_at: new Date().toISOString(),
        });
      }
      
      return { error, user: data?.user || null };
    } catch (error) {
      console.error("Error signing up:", error);
      return { error, user: null };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      return { error };
    } catch (error) {
      console.error("Error resetting password:", error);
      return { error };
    }
  };

  const contextValue = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);