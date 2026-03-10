import styles from './BrandBanner.module.css';

export default function BrandBanner() {
  return (
    <section className={styles.banner}>
      <div className={styles.content}>
        <div className={styles.statsRow}>
          <div className={styles.stat}>
            <span className={styles.statNumber}>6M+</span>
            <span className={styles.statLabel}>Happy Customers</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>10K+</span>
            <span className={styles.statLabel}>Unique Designs</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.stat}>
            <span className={styles.statNumber}>500+</span>
            <span className={styles.statLabel}>New Arrivals Weekly</span>
          </div>
        </div>
        <h2 className={styles.heading}>Homegrown Indian Brand</h2>
        <p className={styles.subheading}>Proudly designed, crafted and shipped from India</p>
      </div>
      <div className={styles.bgPattern} />
    </section>
  );
}
