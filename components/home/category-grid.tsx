import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: 1,
    name: "Phone Cases",
    description: "Stylish protection",
    image: "https://images.pexels.com/photos/3082341/pexels-photo-3082341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    link: "/shop?category=phone-cases",
    className: "md:col-span-2 md:row-span-1",
  },
  {
    id: 2,
    name: "Headphones",
    description: "Premium audio",
    image: "https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    link: "/shop?category=headphones",
    className: "md:col-span-1 md:row-span-2",
  },
  {
    id: 3,
    name: "Chargers",
    description: "Fast charging",
    image: "https://images.pexels.com/photos/5082573/pexels-photo-5082573.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    link: "/shop?category=chargers",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 4,
    name: "Screen Protectors",
    description: "Ultimate protection",
    image: "https://images.pexels.com/photos/6598/coffee-desk-laptop-notebook.jpg?auto=compress&cs=tinysrgb&w=1260&h=750",
    link: "/shop?category=screen-protectors",
    className: "md:col-span-1 md:row-span-1",
  },
  {
    id: 5,
    name: "Power Banks",
    description: "Portable power",
    image: "https://images.pexels.com/photos/4526400/pexels-photo-4526400.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750",
    link: "/shop?category=power-banks",
    className: "md:col-span-2 md:row-span-1",
  },
];

const CategoryGrid = () => {
  return (
    <section className="container mx-auto px-4">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold">Shop by Category</h2>
        <Link 
          href="/categories" 
          className="text-sm font-medium text-primary hover:underline"
        >
          View All Categories
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {categories.map((category) => (
          <Link 
            key={category.id}
            href={category.link}
            className={cn(
              "group relative overflow-hidden rounded-lg transition-all hover:shadow-lg",
              category.className
            )}
          >
            <div className="relative h-60 w-full">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-4 text-white">
                <h3 className="text-xl font-semibold">{category.name}</h3>
                <p className="text-sm opacity-90">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;