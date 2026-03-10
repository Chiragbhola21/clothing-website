'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import styles from './productDetail.module.css';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();

  if (!product) {
    return (
      <>
        <Header />
        <div className={styles.notFound}>
          <h2>Product Not Found</h2>
          <Link href="/products" className={styles.backLink}>Back to Products</Link>
        </div>
        <Footer />
      </>
    );
  }

  const relatedProducts = products
    .filter(p => p.categoryId === product.categoryId && p.id !== product.id)
    .slice(0, 4);

  const isExternal = product.images[selectedImage]?.startsWith('http');

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addItem(product, selectedSize, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const renderStars = (rating) => {
    const stars = [];
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    for (let i = 0; i < 5; i++) {
      if (i < full) {
        stars.push(<span key={i} className={styles.starFull}>&#9733;</span>);
      } else if (i === full && hasHalf) {
        stars.push(<span key={i} className={styles.starHalf}>&#9733;</span>);
      } else {
        stars.push(<span key={i} className={styles.starEmpty}>&#9733;</span>);
      }
    }
    return stars;
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/products">Products</Link>
            <span>/</span>
            <span>{product.name}</span>
          </div>

          <div className={styles.layout}>
            {/* Images */}
            <div className={styles.imagesSection}>
              <div className={styles.mainImage}>
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className={styles.productImage}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  {...(isExternal ? { unoptimized: true } : {})}
                />
                {product.badge && (
                  <span className={styles.badge}>{product.badge}</span>
                )}
              </div>
              {product.images.length > 1 && (
                <div className={styles.thumbnails}>
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      className={`${styles.thumb} ${selectedImage === idx ? styles.thumbActive : ''}`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        fill
                        className={styles.thumbImg}
                        sizes="80px"
                        {...(img.startsWith('http') ? { unoptimized: true } : {})}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className={styles.infoSection}>
              <h1 className={styles.productName}>{product.name}</h1>
              <p className={styles.categoryLabel}>{product.category} &middot; {product.gender}</p>

              <div className={styles.ratingRow}>
                <div className={styles.stars}>{renderStars(product.rating)}</div>
                <span className={styles.ratingText}>{product.rating}</span>
                <span className={styles.reviewCount}>({product.reviews.toLocaleString()} reviews)</span>
              </div>

              <div className={styles.priceBlock}>
                <span className={styles.currentPrice}>&#8377;{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className={styles.mrp}>MRP <s>&#8377;{product.originalPrice.toLocaleString()}</s></span>
                    <span className={styles.discountBadge}>{product.discount}% OFF</span>
                  </>
                )}
              </div>
              <p className={styles.taxInfo}>Inclusive of all taxes</p>

              {/* Colors */}
              {product.colors && (
                <div className={styles.optionBlock}>
                  <h3 className={styles.optionTitle}>COLOR</h3>
                  <div className={styles.colorOptions}>
                    {product.colors.map(color => (
                      <span key={color} className={styles.colorChip}>{color}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              <div className={styles.optionBlock}>
                <div className={styles.sizeHeader}>
                  <h3 className={styles.optionTitle}>SELECT SIZE</h3>
                  <button className={styles.sizeGuide}>Size Guide</button>
                </div>
                <div className={styles.sizeOptions}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      className={`${styles.sizeChip} ${selectedSize === size ? styles.sizeActive : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className={styles.optionBlock}>
                <h3 className={styles.optionTitle}>QUANTITY</h3>
                <div className={styles.quantityPicker}>
                  <button className={styles.qtyBtn} onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span className={styles.qtyValue}>{quantity}</span>
                  <button className={styles.qtyBtn} onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              {/* Actions */}
              <div className={styles.actions}>
                <button
                  className={`${styles.addToCart} ${addedToCart ? styles.added : ''}`}
                  onClick={handleAddToCart}
                >
                  {addedToCart ? (
                    <>ADDED TO CART</>
                  ) : (
                    <>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" x2="21" y1="6" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                      </svg>
                      ADD TO CART
                    </>
                  )}
                </button>
                <button
                  className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
                  onClick={() => setWishlisted(!wishlisted)}
                >
                  <svg viewBox="0 0 24 24" fill={wishlisted ? '#e41b23' : 'none'} stroke={wishlisted ? '#e41b23' : 'currentColor'} strokeWidth="2" width="20" height="20">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                  WISHLIST
                </button>
              </div>

              {/* Description */}
              <div className={styles.description}>
                <h3 className={styles.descTitle}>Product Description</h3>
                <p className={styles.descText}>{product.description}</p>
              </div>

              {/* Delivery Info */}
              <div className={styles.deliveryInfo}>
                <div className={styles.deliveryItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <rect x="1" y="3" width="15" height="13" rx="2"/>
                    <path d="M16 8h4l3 5v5h-7V8z"/>
                    <circle cx="5.5" cy="18.5" r="2.5"/>
                    <circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                  <div>
                    <strong>Free Delivery</strong>
                    <p>On orders above ₹799</p>
                  </div>
                </div>
                <div className={styles.deliveryItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <polyline points="1 4 1 10 7 10"/>
                    <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
                  </svg>
                  <div>
                    <strong>Easy Returns</strong>
                    <p>15-day return policy</p>
                  </div>
                </div>
                <div className={styles.deliveryItem}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <div>
                    <strong>Quality Assured</strong>
                    <p>100% original products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <section className={styles.relatedSection}>
              <h2 className={styles.relatedTitle}>YOU MAY ALSO LIKE</h2>
              <div className={styles.relatedGrid}>
                {relatedProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
