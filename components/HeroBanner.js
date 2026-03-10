'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { heroSlides } from '@/data/products';
import styles from './HeroBanner.module.css';

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback((index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrent(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning]);

  const next = useCallback(() => goTo((current + 1) % heroSlides.length), [current, goTo]);
  const prev = useCallback(() => goTo((current - 1 + heroSlides.length) % heroSlides.length), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className={styles.hero}>
      <div className={styles.slidesContainer}>
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`${styles.slide} ${index === current ? styles.active : ''}`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className={styles.slideImage}
              priority={index === 0}
              sizes="100vw"
            />
            <div className={styles.overlay} />
            <div className={styles.content}>
              <h2 className={styles.title}>{slide.title}</h2>
              <p className={styles.subtitle}>{slide.subtitle}</p>
              <Link href={slide.link} className={styles.cta}>
                {slide.cta}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next slide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      <div className={styles.dots}>
        {heroSlides.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === current ? styles.dotActive : ''}`}
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
