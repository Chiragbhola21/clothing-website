'use client';
import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { products, categories } from '@/data/products';
import styles from './products.module.css';
import { Suspense } from 'react';

function ProductListingInner() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const genderParam = searchParams.get('gender') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState('all');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedCategory) {
      filtered = filtered.filter(p =>
        p.categoryId === selectedCategory || p.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    if (genderParam) {
      filtered = filtered.filter(p => p.gender === genderParam);
    }

    if (priceRange !== 'all') {
      const [min, max] = priceRange.split('-').map(Number);
      filtered = filtered.filter(p => p.price >= min && (max ? p.price <= max : true));
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'discount':
        filtered.sort((a, b) => b.discount - a.discount);
        break;
      default:
        filtered.sort((a, b) => b.rating - a.rating);
    }

    return filtered;
  }, [selectedCategory, sortBy, priceRange, genderParam]);

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <a href="/">Home</a>
            <span>/</span>
            <span>{genderParam || 'All Products'}</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span>{categories.find(c => c.id === selectedCategory)?.name || selectedCategory}</span>
              </>
            )}
          </div>

          <div className={styles.layout}>
            {/* Sidebar / Mobile Drawer */}
            <div className={`${styles.sidebarOverlay} ${isMobileFiltersOpen ? styles.open : ''}`} onClick={() => setIsMobileFiltersOpen(false)} />
            <aside className={`${styles.sidebar} ${isMobileFiltersOpen ? styles.open : ''}`}>
              <div className={styles.sidebarHeader}>
                <h2>Filters</h2>
                <button className={styles.closeBtn} onClick={() => setIsMobileFiltersOpen(false)}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><path d="M18 6 6 18M6 6l12 12"/></svg>
                </button>
              </div>
              <div className={styles.sidebarScroll}>
              <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>CATEGORIES</h3>
                <button
                  className={`${styles.filterOption} ${!selectedCategory ? styles.filterActive : ''}`}
                  onClick={() => setSelectedCategory('')}
                >
                  All Products
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    className={`${styles.filterOption} ${selectedCategory === cat.id ? styles.filterActive : ''}`}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              <div className={styles.filterSection}>
                <h3 className={styles.filterTitle}>PRICE RANGE</h3>
                {[
                  { label: 'All Prices', value: 'all' },
                  { label: 'Under ₹799', value: '0-799' },
                  { label: '₹800 - ₹1,299', value: '800-1299' },
                  { label: '₹1,300 - ₹1,999', value: '1300-1999' },
                  { label: '₹2,000+', value: '2000-99999' },
                ].map(item => (
                  <button
                    key={item.value}
                    className={`${styles.filterOption} ${priceRange === item.value ? styles.filterActive : ''}`}
                    onClick={() => setPriceRange(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              </div>
            </aside>

            {/* Products */}
            <div className={styles.productsArea}>
              <div className={styles.toolbar}>
                <div className={styles.toolbarLeft}>
                  <p className={styles.resultCount}>{filteredProducts.length} Products</p>
                  <button className={styles.mobileFilterBtn} onClick={() => setIsMobileFiltersOpen(true)}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
                    </svg>
                    Filters
                  </button>
                </div>
                <select
                  className={styles.sortSelect}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="popular">Popular</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="discount">Biggest Discount</option>
                </select>
              </div>

              {filteredProducts.length > 0 ? (
                <div className={styles.grid}>
                  {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className={styles.empty}>
                  <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="48" height="48"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                  <h3>No products found</h3>
                  <p>Try adjusting your filters or browse all products.</p>
                  <button className={styles.clearBtn} onClick={() => { setSelectedCategory(''); setPriceRange('all'); }}>
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductListingInner />
    </Suspense>
  );
}
