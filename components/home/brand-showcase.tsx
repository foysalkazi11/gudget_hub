import Image from "next/image";

// Mock brand logos (in real implementation, replace with actual brand logos)
const brands = [
  {
    id: 1,
    name: "Apple",
    logo: "https://images.pexels.com/photos/1294886/pexels-photo-1294886.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    name: "Samsung",
    logo: "https://images.pexels.com/photos/1482061/pexels-photo-1482061.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 3,
    name: "Sony",
    logo: "https://images.pexels.com/photos/983831/pexels-photo-983831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    name: "Google",
    logo: "https://images.pexels.com/photos/218717/pexels-photo-218717.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 5,
    name: "Xiaomi",
    logo: "https://images.pexels.com/photos/341523/pexels-photo-341523.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 6,
    name: "OnePlus",
    logo: "https://images.pexels.com/photos/210660/pexels-photo-210660.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
];

const BrandShowcase = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-12">Top Brands We Carry</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {brands.map((brand) => (
            <div
              key={brand.id}
              className="flex justify-center filter grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="relative h-16 w-16 md:h-20 md:w-20 flex items-center justify-center">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;