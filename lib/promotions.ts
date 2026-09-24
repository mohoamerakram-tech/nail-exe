import type { Promotion } from './types';

// Put the newest campaign first. The hero rotates through this list automatically.
export const PROMOTIONS: Promotion[] = [
  {
    id: 'cyber-angel-drop',
    eyebrow: 'NEW DROP // LIVE NOW',
    title: 'Cyber Angel has landed',
    description: 'Lavender chrome, holographic crosses, and a little main-character energy.',
    image: '/images/nails/cyber-angel.jpg',
    imageAlt: 'Cyber Angel lavender chrome press-on nails',
    href: '/shop/cyber-angel',
    action: 'See the new set',
    theme: 'from-[#c4b5fd]/90 via-[#fbcfe8]/75 to-[#fdf2f8]/30',
    active: true,
    sortOrder: 0,
  },
  {
    id: 'coquette-edit',
    eyebrow: 'TRENDING EDIT // COQUETTE',
    title: 'Soft bows, sharp details',
    description: 'Meet the romantic sets everyone keeps saving to their wishlist.',
    image: '/images/nails/coquette-bow.jpg',
    imageAlt: 'Coquette press-on nails with black ribbon details',
    href: '/shop?vibe=coquette',
    action: 'Shop the edit',
    theme: 'from-[#fecdd3]/90 via-[#fce7f3]/75 to-white/30',
    active: true,
    sortOrder: 1,
  },
  {
    id: 'custom-set-event',
    eyebrow: 'STUDIO EVENT // CUSTOM SETS',
    title: 'Made for your mood',
    description: 'Explore statement sets with bows, chrome, glitter, and hand-painted details.',
    image: '/images/nails/it-girl.jpg',
    imageAlt: 'Custom It Girl press-on nail set',
    href: '/shop?vibe=custom-sets',
    action: 'Explore custom sets',
    theme: 'from-[#bae6fd]/90 via-[#e9d5ff]/75 to-[#fdf2f8]/30',
    active: true,
    sortOrder: 2,
  },
];
