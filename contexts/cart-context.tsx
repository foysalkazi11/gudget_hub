"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

// Define types
export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  slug: string;
  discount?: number;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (product: any, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
};

// Create context with default values
const CartContext = createContext<CartContextType>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: any, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        // Product already in cart, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity updated in your cart.`,
        });
        
        return updatedItems;
      } else {
        // Product not in cart, add it
        const newCartItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity,
          slug: product.slug,
          discount: product.discount,
        };
        
        toast({
          title: "Item added",
          description: `${product.name} added to your cart.`,
        });
        
        return [...prevItems, newCartItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find(item => item.id === id);
      
      if (itemToRemove) {
        toast({
          title: "Item removed",
          description: `${itemToRemove.name} removed from your cart.`,
        });
      }
      
      return prevItems.filter((item) => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  // Calculate cart total
  const cartTotal = cartItems.reduce((total, item) => {
    const itemPrice = item.discount 
      ? item.price * (1 - (item.discount / 100)) 
      : item.price;
    return total + itemPrice * item.quantity;
  }, 0);

  // Calculate total number of items
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartCount,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);