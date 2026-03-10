'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import styles from './CartSidebar.module.css';

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, isOpen, closeCart } = useCart();

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} onClick={closeCart} />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" x2="21" y1="6" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Your Cart ({totalItems})
          </h2>
          <button className={styles.closeBtn} onClick={closeCart} aria-label="Close cart">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="22" height="22">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className={styles.empty}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="56" height="56" className={styles.emptyIcon}>
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" x2="21" y1="6" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            <p className={styles.emptyText}>Your cart is empty</p>
            <Link href="/products" className={styles.shopBtn} onClick={closeCart}>
              CONTINUE SHOPPING
            </Link>
          </div>
        ) : (
          <>
            <div className={styles.itemsList}>
              {items.map((item) => {
                const isExternal = item.image?.startsWith('http');
                return (
                  <div key={`${item.id}-${item.size}`} className={styles.item}>
                    <div className={styles.itemImage}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="80px"
                        className={styles.itemImg}
                        {...(isExternal ? { unoptimized: true } : {})}
                      />
                    </div>
                    <div className={styles.itemInfo}>
                      <Link href={`/products/${item.id}`} className={styles.itemName} onClick={closeCart}>
                        {item.name}
                      </Link>
                      <p className={styles.itemMeta}>Size: {item.size}</p>
                      <div className={styles.itemPriceRow}>
                        <span className={styles.itemPrice}>₹{item.price.toLocaleString()}</span>
                        <div className={styles.itemQty}>
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                        </div>
                      </div>
                    </div>
                    <button
                      className={styles.removeBtn}
                      onClick={() => removeItem(item.id, item.size)}
                      aria-label="Remove item"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
                        <path d="M18 6 6 18M6 6l12 12"/>
                      </svg>
                    </button>
                  </div>
                );
              })}
            </div>

            <div className={styles.footer}>
              <div className={styles.totalRow}>
                <span>Subtotal</span>
                <span className={styles.totalPrice}>₹{totalPrice.toLocaleString()}</span>
              </div>
              <p className={styles.shippingNote}>Shipping calculated at checkout</p>
              <button className={styles.checkoutBtn}>PROCEED TO CHECKOUT</button>
              <Link href="/products" className={styles.continueLink} onClick={closeCart}>
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
