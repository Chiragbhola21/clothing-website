'use client';
import { useState } from 'react';
import { categories } from '@/data/products';
import styles from './CategoryChips.module.css';

export default function CategoryChips({ onCategoryChange, activeCategory = 'trending' }) {
  const [active, setActive] = useState(activeCategory);

  const handleClick = (categoryId) => {
    setActive(categoryId);
    if (onCategoryChange) onCategoryChange(categoryId);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.chips}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`${styles.chip} ${active === cat.id ? styles.active : ''}`}
              onClick={() => handleClick(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
