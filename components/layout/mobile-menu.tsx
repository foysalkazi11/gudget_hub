"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: Array<{ name: string; path: string }>;
}

const MobileMenu = ({ isOpen, onClose, navItems }: MobileMenuProps) => {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search logic here
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <Link href="/" className="flex items-center space-x-2" onClick={onClose}>
          <span className="font-bold text-xl">GadgetHub</span>
        </Link>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
          <span className="sr-only">Close menu</span>
        </Button>
      </div>

      <div className="p-4 border-b">
        <form onSubmit={handleSearch} className="relative w-full">
          <Input
            type="search"
            placeholder="Search products..."
            className="pr-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
      </div>

      <nav className="flex-1 overflow-auto p-4">
        <ul className="space-y-4">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={cn(
                  "block py-2 text-base font-medium transition-colors hover:text-primary",
                  pathname === item.path 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
                onClick={onClose}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t">
        <div className="flex flex-col space-y-3">
          <Button asChild variant="default" className="w-full">
            <Link href="/auth" onClick={onClose}>
              Sign In
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth?tab=register" onClick={onClose}>
              Create Account
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;