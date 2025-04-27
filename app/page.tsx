import Hero from '@/components/home/hero';
import FeaturedProducts from '@/components/home/featured-products';
import CategoryGrid from '@/components/home/category-grid';
import BrandShowcase from '@/components/home/brand-showcase';
import NewArrivals from '@/components/home/new-arrivals';
import Testimonials from '@/components/home/testimonials';
import CTA from '@/components/home/cta';

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <BrandShowcase />
      <NewArrivals />
      <Testimonials />
      <CTA />
    </div>
  );
}