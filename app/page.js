import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CategoryChips from '@/components/CategoryChips';
import ProductGrid from '@/components/ProductGrid';
import BrandBanner from '@/components/BrandBanner';
import Footer from '@/components/Footer';
import { products } from '@/data/products';

export default function Home() {
  const newArrivals = products.filter(p => p.badge === 'NEW' || p.badge === 'TRENDING').slice(0, 8);
  const bestSellers = products.filter(p => p.badge === 'BESTSELLER' || p.rating >= 4.4).slice(0, 8);

  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <CategoryChips />
        <ProductGrid title="New Arrivals" products={newArrivals} />
        <BrandBanner />
        <ProductGrid title="Bestsellers" products={bestSellers} />
      </main>
      <Footer />
    </>
  );
}
