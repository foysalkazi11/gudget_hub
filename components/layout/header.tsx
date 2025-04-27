"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import MobileMenu from "./mobile-menu";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories" },
    { name: "Deals", path: "/deals" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled 
          ? "bg-white/90 backdrop-blur-md border-b shadow-sm dark:bg-gray-950/90" 
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden mr-2" 
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open mobile menu</span>
            </Button>
            
            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-xl">GadgetHub</span>
            </Link>

            <nav className="hidden md:ml-10 md:flex md:space-x-4 lg:space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary relative py-1",
                    isActive(item.path)
                      ? "text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <form className="hidden md:flex relative w-full max-w-[200px] lg:max-w-[300px]">
              <Input
                type="search"
                placeholder="Search products..."
                className="pr-8"
              />
              <Button 
                type="submit" 
                variant="ghost" 
                size="icon" 
                className="absolute right-0 top-0"
              >
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>

            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/search">
                  <Search className="h-5 w-5 md:hidden" />
                  <span className="sr-only">Search</span>
                </Link>
              </Button>
              
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">User menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/account">My Account</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/auth">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Sign in</span>
                  </Link>
                </Button>
              )}
              
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative" 
                asChild
              >
                <Link href="/cart">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItems.length > 0 && (
                    <Badge 
                      variant="destructive" 
                      className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs"
                    >
                      {cartItems.length}
                    </Badge>
                  )}
                  <span className="sr-only">Shopping cart</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)}
        navItems={navItems}
      />
    </header>
  );
};

export default Header;