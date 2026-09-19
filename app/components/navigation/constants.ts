export interface NavRoute {
  label: string;
  japaneseLabel: string;
  href: string;
  badge?: string;
}

export const NAV_ROUTES: NavRoute[] = [
  { label: 'ARCHIVE', japaneseLabel: '全記録', href: '/shop' },
  { label: 'CUSTOM STUDIO', japaneseLabel: '刺繍工房', href: '/custom-studio', badge: 'LIVE 2D' },
  { label: 'BESPOKE INTAKE', japaneseLabel: '特注依頼', href: '/custom-studio?tab=bespoke' },
  { label: 'MANGA LORE', japaneseLabel: '世界観', href: '/#lore' },
  { label: 'CHECKOUT', japaneseLabel: '精算所', href: '/checkout' },
];

export interface PartnerAnime {
  id: string;
  name: string;
  japaneseName: string;
  tagline: string;
  year: string;
}

export const PARTNER_ANIMES: PartnerAnime[] = [
  { id: 'berserk', name: 'BERSERK', japaneseName: 'ベルセルク', tagline: 'THE BLACK SWORDSMAN // VOL. 1-42', year: '1989' },
  { id: 'evangelion', name: 'NEON GENESIS', japaneseName: '新世紀エヴァンゲリオン', tagline: 'HUMAN INSTRUMENTALITY PROJECT', year: '1995' },
  { id: 'serial-experiments', name: 'LAIN: EXPERIMENTS', japaneseName: 'シリアルエクスペリメンツレイン', tagline: 'WIRED PROTOCOL // CLOSE THE WORLD', year: '1998' },
  { id: 'akira', name: 'NEO-TOKYO AKIRA', japaneseName: 'アキラ // 大友克洋', tagline: 'KANEDA MOTOR BIKE ATELIER', year: '1982' },
  { id: 'blame', name: 'BLAME! // TSUTOMU', japaneseName: 'ブラム! // ネット端末遺伝子', tagline: 'MEGABYTE GRAVITATIONAL BEAM', year: '1997' },
  { id: 'chainsaw', name: 'HELL CHAINSAW', japaneseName: 'チェンソーマン', tagline: 'PUBLIC SAFETY SPECIAL DIVISION 4', year: '2018' },
];
