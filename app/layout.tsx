import type { Metadata } from 'next';
import './globals.css';
import { PlayerProvider } from './context/PlayerContext';
import { CartProvider } from './context/CartContext';

export const metadata: Metadata = {
  title: 'The Legendary Africans',
  description: 'Cultural platform, music, and custom merchandise.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <PlayerProvider>
            {children}
          </PlayerProvider>
        </CartProvider>
      </body>
    </html>
  );
}
