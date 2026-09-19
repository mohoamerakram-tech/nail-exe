import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart/CartProvider';
import { WishlistProvider } from '@/lib/cart/WishlistContext';
import Navbar from '@/app/components/navigation/Navbar';
import CartDrawer from '@/app/components/cart/CartDrawer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Walls Have Mouths ♡ nail.exe // PRESS ON NAILS',
  description:
    'Handmade salon-quality reusable press-on nails. Pretty hands, brighter days. Made with love in Morocco ♡',
  keywords: [
    'Press on nails',
    'Walls have mouths',
    'nail.exe',
    'coquette nails',
    'alt girl nails',
    'handmade press-ons',
    'Morocco press on nails',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        suppressHydrationWarning
        className="bg-[#fdf5f8] text-[#4a3856] min-h-screen flex flex-col selection:bg-[#f472b6] selection:text-white"
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
