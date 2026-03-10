'use client';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

export default function ProductCard({ product }) {
  const [wishlisted, setWishlisted] = useState(false);
  const [imageError, setImageError] = useState(false);

  const isExternal = product.image.startsWith('http');

  return (
    <div className={styles.card}>
      <Link href={`/products/${product.id}`} className={styles.imageWrapper}>
        <Image
          src={imageError ? '/images/product1.png' : product.image}
          alt={product.name}
          fill
          className={styles.image}
          sizes="(max-width: 768px) 50vw, 25vw"
          onError={() => setImageError(true)}
          {...(isExternal ? { unoptimized: true } : {})}
        />
        {product.badge && (
          <span className={`${styles.badge} ${styles[`badge${product.badge.replace(/\s/g, '')}`] || ''}`}>
            {product.badge}
          </span>
        )}
        <button
          className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
          onClick={(e) => { e.preventDefault(); setWishlisted(!wishlisted); }}
          aria-label="Add to wishlist"
        >
          <svg viewBox="0 0 24 24" fill={wishlisted ? '#e41b23' : 'none'} stroke={wishlisted ? '#e41b23' : 'currentColor'} strokeWidth="2" width="20" height="20">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </Link>

      <Link href={`/products/${product.id}`} className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.category}>{product.category}</p>
        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <>
              <span className={styles.originalPrice}>₹{product.originalPrice.toLocaleString()}</span>
              <span className={styles.discount}>{product.discount}% OFF</span>
            </>
          )}
        </div>
      </Link>
    </div>
  );
}
