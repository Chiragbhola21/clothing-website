import './globals.css';
import { CartProvider } from '@/context/CartContext';
import CartSidebar from '@/components/CartSidebar';

export const metadata = {
  title: 'SOULED | Premium Streetwear & Fashion',
  description: 'Discover the latest in streetwear, casual fashion, sneakers and more. Premium quality clothing with bold designs, delivered across India.',
  keywords: 'clothing, streetwear, fashion, t-shirts, sneakers, hoodies, online shopping',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
