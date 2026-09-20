import type { Metadata } from 'next';
import { Geist, Geist_Mono, Silkscreen, Pixelify_Sans, Press_Start_2P } from 'next/font/google';
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
      className={`${pixelifySans.variable} ${silkscreen.variable} ${pressStart2P.variable} ${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400;500;600;700&family=Press+Start+2P&family=Silkscreen:wght@400;700&family=VT323&display=swap"
        />
      </head>
      <body
        suppressHydrationWarning
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
