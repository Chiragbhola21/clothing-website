import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ title, products, columns = 4 }) {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {title && (
          <div className={styles.header}>
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.titleLine} />
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
