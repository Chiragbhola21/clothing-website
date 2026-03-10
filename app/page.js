import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import CategoryChips from '@/components/CategoryChips';
import ProductGrid from '@/components/ProductGrid';
import BrandBanner from '@/components/BrandBanner';
import Footer from '@/components/Footer';
import { products } from '@/data/products';

export default function Home() {
  const newArrivals = products.filter(p => p.badge === 'NEW' || p.badge === 'TRENDING').slice(0, 8);
  const mensCollection = products.filter(p => p.gender === 'Men').slice(0, 8);

  return (
    <>
      <Header />
      <main>
        <HeroBanner />
        <CategoryChips />
        <ProductGrid title="New Arrivals" products={newArrivals} />
        <BrandBanner />
        <ProductGrid title="Men's Collection" products={mensCollection} viewAllLink="/products" />
      </main>
      <Footer />
    </>
  );
}
