import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, SHOP_VIBES } from '@/lib/products';
import ProductCard from '@/app/components/shop/ProductCard';
import InteractiveLogo from '@/app/components/navigation/InteractiveLogo';
import AnimatedCat from '@/app/components/home/AnimatedCat';
import HomeAnimation from '@/app/components/home/HomeAnimation';

export default function HomePage() {
  // Keep the homepage grid short; the full catalog lives on /shop.
  const featuredProducts = PRODUCTS.slice(0, 6);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-5xl px-3 sm:px-6 py-6 flex flex-col gap-8">
        <div className="retro-pixel-window w-full">
          <div className="retro-window-header">
            <div className="flex items-center gap-2">
              <span className="text-[#db2777]">♡</span>
              <span className="font-pixel-title text-xs font-bold text-[#4a3856]">
                nail.exe // window
              </span>
            </div>
            <div className="retro-btn-box">
              <button type="button" className="retro-btn">—</button>
              <button type="button" className="retro-btn">❐</button>
              <button type="button" className="retro-btn hover:!bg-[#db2777] hover:!text-white">✕</button>
            </div>
          </div>

          {/* Layer the hand, desktop decorations, and interactive kitten inside one window. */}
          <div className="relative w-full h-[380px] sm:h-[480px] overflow-hidden bg-gradient-to-b from-[#bce0fd] via-[#fce7f3] to-[#fdf4f7] pixel-grid-canvas">
            <div className="absolute inset-0 pointer-events-none opacity-80">
              <div className="absolute -top-10 -left-10 w-64 h-48 bg-white/70 rounded-full blur-xl" />
              <div className="absolute top-10 right-10 w-80 h-56 bg-white/70 rounded-full blur-xl" />
            </div>

            <div className="absolute top-12 left-1/4 text-[#db2777] text-xl animate-pixel-twinkle">✦</div>
            <div className="absolute top-20 right-1/3 text-white text-lg animate-pixel-twinkle" style={{ animationDelay: '1s' }}>✨</div>
            <div className="absolute top-10 right-48 text-[#db2777] text-2xl animate-pixel-twinkle" style={{ animationDelay: '0.5s' }}>♡</div>

            <div className="absolute top-6 sm:top-8 left-6 sm:left-10 z-20 flex flex-col gap-2.5 sm:gap-3">
              <div className="flex flex-col gap-1">
                <InteractiveLogo variant="hero" className="w-[230px] sm:w-[300px]" />
              </div>

              <div className="bg-white/95 pixel-card rounded-xl p-3 max-w-[210px] flex flex-col gap-1.5 backdrop-blur-xs">
                <div className="flex items-center justify-between font-pixel-title text-[9px] border-b-2 border-[#fbcfe8] pb-1">
                  <span className="text-[#db2777]">♡ about.me</span>
                  <span className="text-[#57446d]">✕</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-base text-[#f472b6]">💖</span>
                  <p className="font-pixel-title text-[10px] text-[#3b2b4e] leading-snug">
                    PRETTY HANDS <br />BRIGHTER DAYS &lt;3
                  </p>
                </div>
              </div>

              <div className="bg-white/95 pixel-card rounded-xl px-3.5 py-2 font-pixel-body text-xs text-[#3b2b4e] flex flex-col items-center max-w-[210px] backdrop-blur-xs">
                <span>same girl...</span>
                <span className="font-bold text-[#db2777]">different nails &lt;3</span>
              </div>
            </div>

            <div className="absolute inset-y-0 right-0 sm:right-16 w-[340px] sm:w-[480px] z-10 pointer-events-none">
              <Image
                src="/images/nails/hero-hand.jpg"
                alt="Model hand wearing press on nails"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-contain object-bottom sm:object-center"
              />
            </div>

            <div className="hidden lg:flex absolute top-8 right-6 z-20 flex-col gap-3">
              {[
                'NAILS', 'SELF LOVE', 'CUTE STUFF', 'HAPPIER DAYS',
              ].map((label) => (
                <Link
                  key={label}
                  href="/shop"
                  className="flex items-center gap-2 px-2 py-1 bg-white/90 border-2 border-[#57446d] rounded-lg font-pixel-title text-[9px] text-[#3b2b4e] hover:bg-[#fbcfe8] transition-colors shadow-[2px_2px_0px_0px_#57446d]"
                >
                  <span>📁</span>
                  <span>[{label}]</span>
                </Link>
              ))}
            </div>

            {/* The hero kitten loops at rest and finishes its greeting after hover. */}
            <AnimatedCat />
          </div>
        </div>

        {/* Repeat the ticker content so its CSS marquee can scroll without a gap. */}
        <div className="w-full bg-[#fce7f3] border-y-2 border-[#57446d] py-2 overflow-hidden select-none">
          <div className="animate-marquee-kawaii flex items-center gap-8 whitespace-nowrap font-pixel-title text-[10px] text-[#3b2b4e]">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="text-[#db2777]">✧ ★</span>
                <span>WORLDWIDE SHIPPING</span>
                <span className="text-[#db2777]">♡</span>
                <span>HANDMADE WITH LOVE</span>
                <span className="text-[#db2777]">♡</span>
                <span>HIGH QUALITY &amp; REUSABLE</span>
                <span className="text-[#db2777]">★ ✧</span>
              </div>
            ))}
          </div>
        </div>

        {/* Sequence 6 loops beside the title; sequence 4 starts on hover and loops frames 23–25. */}
        <section id="vibe" className="flex flex-col items-center gap-5">
          <div className="relative flex w-full min-h-[175px] items-end pb-4 sm:min-h-[150px]">
            <div className="relative z-10">
              <span className="font-pixel-body text-xs text-[#db2777]">a set for every side of you ♡</span>
              <h2 className="font-pixel-title text-lg sm:text-xl uppercase font-bold text-[#3b2b4e] mt-2">Shop by vibe</h2>
            </div>
            <div className="absolute left-0 top-0 w-[175px] sm:bottom-0 sm:left-[205px] sm:top-auto sm:w-[220px] lg:left-[240px] lg:w-[270px]">
              <HomeAnimation sequence={6} label="the stargazing cat" alt="Gray cat blinking among little stars next to Shop by vibe" />
            </div>
            <div className="absolute right-0 top-0 w-[175px] sm:-bottom-2 sm:right-2 sm:top-auto sm:w-[230px] lg:w-[270px] z-10">
              <HomeAnimation sequence={4} label="the curious cat" alt="Calico cat playing with a toy mouse beside the nail collections" />
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            {SHOP_VIBES.map((card) => (
              <Link
                key={card.id}
                href={`/shop?vibe=${card.id}`}
                className="pixel-mini-window group flex flex-col transition-all hover:-translate-y-1"
              >
                <div className="bg-[#ede7f6] px-2.5 py-1.5 border-b-2 border-[#57446d] flex items-center justify-between font-pixel-title text-[9px] text-[#57446d]">
                  <span>vibe.exe</span>
                  <div className="flex gap-1.5">
                    <span>—</span>
                    <span>✕</span>
                  </div>
                </div>

                <div className="relative w-full aspect-square bg-[#fff5f7] border-b-2 border-[#57446d] overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-2.5 bg-white flex items-center justify-between font-pixel-title text-[11px] text-[#3b2b4e]">
                  <span>[{card.label.toUpperCase()}]</span>
                  <span className="text-[#db2777]">➔</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="flex w-full min-h-[70px] items-center justify-center">
            <Link href="/shop" className="pixel-btn-pink relative z-10 px-6 py-2.5 text-xs rounded-xl">
              [ VIEW ALL VIBES ➔ ]
            </Link>
          </div>
        </section>

        {/* Sequence 7 plays on hover, then loops frames 19–26; sequence 3 loops on its own. */}
        <section className="relative flex flex-col gap-4 pt-12 sm:pt-16">
          <div className="relative flex min-h-[155px] items-end justify-between border-b-2 border-[#57446d] pb-2 lg:min-h-[130px]">
            <div className="absolute left-0 top-0 w-[175px] lg:bottom-0 lg:left-[250px] lg:top-auto lg:w-[270px] z-10">
              <HomeAnimation sequence={7} label="the yarn cat" alt="Gray cat playing with pink yarn next to Trending Nails" />
            </div>
            <div className="absolute right-0 top-0 w-[175px] lg:bottom-0 lg:right-[150px] lg:top-auto lg:w-[240px] z-10">
              <HomeAnimation sequence={3} label="the happy cat" alt="Calico cat tilting its head above the trending nails" />
            </div>
            <div className="relative z-10 flex items-center gap-2">
              <h2 className="font-pixel-title text-base sm:text-lg font-bold text-[#3b2b4e]">
                Trending Nails ♡
              </h2>
            </div>
            <Link
              href="/shop"
              className="relative z-10 hidden sm:block font-pixel text-xs text-[#db2777] hover:underline"
            >
              [ View all sets ➔ ]
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          {/* Sequence 8 loops after its first hover; sequence 5 plays once and holds. */}
          <div className="relative flex min-h-[170px] items-start justify-center pt-3 sm:min-h-[155px] sm:items-center sm:pt-0">
            <div className="absolute bottom-0 left-0 w-[190px] sm:left-8 sm:w-[270px]">
              <HomeAnimation sequence={8} label="the heart cat" alt="Gray cat surrounded by pink hearts beside the nail collection" />
            </div>
            <Link href="/shop" className="relative z-10 font-pixel-title text-[10px] sm:text-xs text-[#db2777] hover:underline">Find your next favorite ➔</Link>
            <div className="absolute bottom-0 right-0 w-[215px] sm:right-8 sm:w-[270px]">
              <HomeAnimation sequence={5} label="the playful cat" alt="Calico cat surrounded by hearts and sparkles" />
            </div>
          </div>
        </section>

      </div>

      <footer className="w-full gingham-pattern border-t-2 border-[#57446d] mt-12 pt-10 pb-4 px-4">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="font-pixel-title font-bold text-xl text-[#3b2b4e] block">
                nail.exe // PRESS ON NAILS
              </span>
              <span className="block font-pixel-arcade text-[8px] tracking-widest text-[#db2777] mt-1">
                SALON QUALITY HANDMADE WITH LOVE ♡
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 font-pixel text-[11px] font-bold text-[#3b2b4e]">
              <Link href="/" className="hover:text-[#db2777] whitespace-nowrap">[ Home ]</Link>
              <Link href="/shop" className="hover:text-[#db2777] whitespace-nowrap">[ Shop ]</Link>
              <Link href="/#vibe" className="hover:text-[#db2777] whitespace-nowrap">[ Vibes ]</Link>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-[#db2777] whitespace-nowrap">[ IG ]</a>
            </div>

            <div className="flex flex-col gap-1.5 w-full sm:w-auto">
              <span className="font-pixel-title text-[10px] text-[#3b2b4e]">
                Join the mailing list ♡
              </span>
              <div className="flex items-center bg-white border-2 border-[#57446d] rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_#57446d]">
                <input
                  type="email"
                  placeholder="your email..."
                  className="px-3 py-1.5 text-xs font-pixel-body outline-none text-[#3b2b4e] placeholder-[#a79bbd]"
                />
                <button
                  type="button"
                  className="px-3 py-1.5 bg-[#fbcfe8] text-[#3b2b4e] font-pixel text-xs hover:bg-[#f472b6] hover:text-white transition-colors"
                >
                  ➔
                </button>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t-2 border-[#57446d] flex items-center justify-between font-pixel text-[10px] text-[#57446d]">
            <span>♡ made with love in morocco</span>
            <span className="font-bold text-[#db2777]">nail.exe [ONLINE]</span>
            <div className="flex items-center gap-2">
              <span>📶 🔋</span>
              <span>11:11</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
