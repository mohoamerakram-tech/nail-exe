import type { Product, NailVibe, NailShape, NailLength, ShopVibe } from './types';

// Shop and homepage category links share one set of ids, labels, and images.
export const SHOP_VIBES: { id: NailVibe; label: string; image: string }[] = [
  { id: 'coquette', label: 'Coquette', image: '/images/nails/coquette-bow.jpg' },
  { id: 'alt-girl', label: 'Alt Girl', image: '/images/nails/nightfall.jpg' },
  { id: 'minimal', label: 'Minimal', image: '/images/nails/little-hearts.jpg' },
  { id: 'custom-sets', label: 'Custom Sets', image: '/images/nails/it-girl.jpg' },
];

export function parseShopVibe(value: string | undefined): ShopVibe {
  return SHOP_VIBES.find((vibe) => vibe.id === value)?.id ?? 'all';
}

export const ALL_SHAPES: { id: NailShape; name: string; icon: string }[] = [
  { id: 'almond', name: 'Almond', icon: '🌰' },
  { id: 'coffin', name: 'Coffin', icon: '⚰️' },
  { id: 'stiletto', name: 'Stiletto', icon: '🗡️' },
  { id: 'square', name: 'Square', icon: '⏹️' },
  { id: 'oval', name: 'Oval', icon: '🥚' },
  { id: 'round', name: 'Round', icon: '⚪' },
];

export const ALL_LENGTHS: { id: NailLength; name: string }[] = [
  { id: 'short', name: 'Short (Everyday Natural)' },
  { id: 'medium', name: 'Medium (Chic & Elegant)' },
  { id: 'long', name: 'Long (Dramatic Baddie)' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'nail-001',
    slug: 'starry',
    name: 'STARRY',
    priceDH: 220,
    priceUSD: 22,
    vibe: 'coquette',
    shapes: ['almond', 'oval', 'coffin', 'round'],
    lengths: ['short', 'medium', 'long'],
    images: ['/images/nails/starry.jpg', '/images/nails/starry-hand.jpg'],
    tagline: 'Milky jelly blush with delicate silver cross stars & cosmic shimmer dust.',
    description: 'A soft dreamscape for your fingertips. Formulated with a sheer petal blush jelly base, hand-painted silver chrome four-point starbursts, and micro-glitter accents that catch the sunlight effortlessly.',
    details: [
      '10 Custom Reusable Handcrafted Press-On Nails',
      'Free Nail Prep Application Kit Included (Glue, Tabs, Buffer, File, Cuticle Stick, Prep Pad)',
      '100% High-Grade Salon Soft Gel & Multi-Layer UV Gel Polish',
      'Up to 3+ weeks wear with glue, or 3-5 days reusable with adhesive tabs',
      'Non-damaging removal in warm water with cuticle oil',
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 142,
    isBestSeller: true,
  },
  {
    id: 'nail-002',
    slug: 'coquette-bow',
    name: 'COQUETTE BOW',
    priceDH: 240,
    priceUSD: 24,
    vibe: 'coquette',
    shapes: ['almond', 'oval', 'coffin', 'square'],
    lengths: ['short', 'medium', 'long'],
    images: ['/images/nails/coquette-bow.jpg', '/images/nails/coquette-detail.jpg'],
    tagline: 'Sheer glossy nude with hand-tied black ribbons & sparkling stars.',
    description: 'The definitive coquette aesthetic. Glossy translucent glass nail base crowned with delicate black ribbon bows and scattered stardust. Pairs seamlessly with vintage lace, silver rings, and soft cardigans.',
    details: [
      '10 Reusable Salon-Grade Press-On Nails',
      'Free Deluxe Application Kit Included',
      '3D Hand-painted Ribbon Bows sealed with ultra-gloss top coat',
      'Reusable up to 5+ applications with proper care',
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 218,
    isBestSeller: true,
  },
  {
    id: 'nail-003',
    slug: 'nightfall',
    name: 'NIGHTFALL',
    priceDH: 260,
    priceUSD: 26,
    vibe: 'alt-girl',
    shapes: ['stiletto', 'almond', 'coffin'],
    lengths: ['medium', 'long'],
    images: ['/images/nails/nightfall.jpg', '/images/nails/nightfall-hand.jpg'],
    tagline: 'Mirror-finish obsidian black with gleaming liquid chrome starlight.',
    description: 'Dark, alluring, and effortlessly cool. Ultra-reflective jet black gloss adorned with razor-sharp chrome stars and galactic cross flares. Engineered for alt girls, rock nights, and midnight aesthetics.',
    details: [
      '10 Hard Gel Reinforced Press-On Nails',
      'Free Complete Prep Kit Included',
      'Genuine Liquid Chrome powder sealed with chip-resistant top coat',
      'Extra reinforced apex structure for maximum strength',
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 96,
    isNew: true,
  },
  {
    id: 'nail-004',
    slug: 'little-hearts',
    name: 'LITTLE HEARTS',
    priceDH: 220,
    priceUSD: 22,
    vibe: 'minimal',
    shapes: ['almond', 'oval', 'round', 'square'],
    lengths: ['short', 'medium'],
    images: ['/images/nails/little-hearts.jpg', '/images/nails/little-hearts-detail.jpg'],
    tagline: 'Glazed donut milky finish with subtle micro black hearts.',
    description: 'Understated romance for everyday elegance. A glazed semi-translucent nude blush base accented with precision micro hearts. Professional enough for school or the office, yet undeniably cute.',
    details: [
      '10 Hand-crafted Salon Quality Press-Ons',
      'Free Application Prep Kit Included',
      'Ultra-natural cuticle contour for seamless flush fit',
      'Durable, waterproof, and reusable',
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 84,
  },
  {
    id: 'nail-005',
    slug: 'sweet-mess',
    name: 'SWEET MESS',
    priceDH: 230,
    priceUSD: 23,
    vibe: 'coquette',
    shapes: ['almond', 'oval', 'coffin'],
    lengths: ['short', 'medium', 'long'],
    images: ['/images/nails/sweet-mess.jpg', '/images/nails/sweet-mess-hand.jpg'],
    tagline: 'Blush pink aura French with 3D sculpted pearls & puffy bows.',
    description: 'Like a strawberry milkshake in an ethereal dream. Features sculpted 3D relief bows, baby faux pearls, and chrome fairy dust. Designed to make your hands look delicate and glowing.',
    details: [
      '10 Sculpted 3D Handcrafted Press-On Nails',
      'Free Deluxe Application Kit Included',
      '3D sculpted accents cured with industrial strength jewelry gel',
      '100% Cruelty-free vegan soft gel nails',
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 112,
  },
  {
    id: 'nail-006',
    slug: 'it-girl',
    name: 'IT GIRL',
    priceDH: 260,
    priceUSD: 26,
    vibe: 'custom-sets',
    shapes: ['almond', 'coffin', 'stiletto'],
    lengths: ['medium', 'long'],
    images: ['/images/nails/it-girl.jpg', '/images/nails/it-girl-detail.jpg'],
    tagline: 'The viral Pinterest set: Ribbon bows, holographic chrome, and fine glitter.',
    description: 'The set that everyone takes screenshots of. Combines coquette velvet bows, metallic silver line art, and holographic shimmer over an ultra-flattering sheer peach gradient.',
    details: [
      '10 Custom Luxury Press-On Nails',
      'Free Application Prep Kit Included',
      'Hand-painted by professional nail artists',
      'Reusable up to 5+ times',
    ],
    inStock: true,
    rating: 5.0,
    reviewsCount: 230,
    isBestSeller: true,
  },
  {
    id: 'nail-007',
    slug: 'cherry-baby',
    name: 'CHERRY BABY',
    priceDH: 230,
    priceUSD: 23,
    vibe: 'minimal',
    shapes: ['almond', 'oval', 'square', 'round'],
    lengths: ['short', 'medium'],
    images: ['/images/nails/cherry-baby.jpg'],
    tagline: 'Glossy milky blush with hand-painted 3D ripe red cherries.',
    description: 'Sweet, juicy, and playful. Translucent syrup pink base with vibrant red candied cherries and delicate green stems. Finished with a high-shine plump gel glaze.',
    details: [
      '10 Hand-painted Salon Press-On Nails',
      'Free Application Prep Kit Included',
      'Natural taper fit designed for comfortable typing and texting',
    ],
    inStock: true,
    rating: 4.8,
    reviewsCount: 73,
  },
  {
    id: 'nail-008',
    slug: 'cyber-angel',
    name: 'CYBER ANGEL',
    priceDH: 250,
    priceUSD: 25,
    vibe: 'alt-girl',
    shapes: ['almond', 'coffin', 'stiletto'],
    lengths: ['medium', 'long'],
    images: ['/images/nails/cyber-angel.jpg'],
    tagline: 'Lavender chrome aura with holographic gothic crosses & sparkles.',
    description: 'A Y2K digital diary tribute. Iridescent lilac chrome fade overlaid with silver cyber crosses, metallic starbursts, and diamond dust sparkles.',
    details: [
      '10 Multi-layer Gel Press-On Nails',
      'Free Deluxe Application Kit Included',
      'Stunning holographic color shift in natural sunlight',
    ],
    inStock: true,
    rating: 4.9,
    reviewsCount: 88,
    isNew: true,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getShopProducts(vibe: ShopVibe, query = '', products: Product[] = PRODUCTS): Product[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return products.filter((product) => {
    if (vibe !== 'all' && product.vibe !== vibe) return false;
    const searchable = `${product.name} ${product.vibe} ${product.tagline} ${product.description}`.toLowerCase();
    return terms.every((term) => searchable.includes(term));
  });
}
