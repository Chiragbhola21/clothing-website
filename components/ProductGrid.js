import Link from 'next/link';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ title, products, columns = 4, viewAllLink }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {title && (
          <div className={styles.header}>
            <div className={styles.titleWrapper}>
              <div>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.titleLine} />
              </div>
              {viewAllLink && (
                <Link href={viewAllLink} className={styles.viewAllBtn}>
                  View All
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              )}
            </div>
          </div>
        )}
        <div className={styles.grid} style={{ '--columns': columns }}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
