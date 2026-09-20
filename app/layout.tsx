import type { Metadata } from 'next';
import { Silkscreen, Pixelify_Sans, Press_Start_2P } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart/CartProvider';
import { WishlistProvider } from '@/lib/cart/WishlistContext';
import Navbar from '@/app/components/navigation/Navbar';
import CartDrawer from '@/app/components/cart/CartDrawer';

const silkscreen = Silkscreen({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-pixel-silk',
  display: 'swap',
});

const pixelifySans = Pixelify_Sans({
  subsets: ['latin'],
  variable: '--font-pixel-sans',
  display: 'swap',
});

const pressStart2P = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pixel-arcade',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'nail.exe // PRESS ON NAILS ♡ Handmade Salon Quality',
  description:
    'Handmade salon-quality reusable press-on nails. Pretty hands, brighter days. Made with love in Morocco ♡',
  keywords: [
    'Press on nails',
    'nail.exe',
    'coquette nails',
    'alt girl nails',
    'handmade press-ons',
    'Morocco press on nails',
    'pixel aesthetic',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pixelifySans.variable} ${silkscreen.variable} ${pressStart2P.variable}`}
    >
      <body
        className="pixel-grid-bg text-[#4a3856] min-h-screen flex flex-col font-pixel-body selection:bg-[#f472b6] selection:text-white"
      >
        <WishlistProvider>
          <CartProvider>
            <Navbar />
            <CartDrawer />
            <main className="flex-1 w-full">{children}</main>
          </CartProvider>
        </WishlistProvider>
      </body>
    </html>
  );
}
