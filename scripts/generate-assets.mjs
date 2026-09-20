import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const PUBLIC_DIR = path.resolve(process.cwd(), 'public');

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper to draw realistic press on nails hand fingers
function generateNailsSvg(theme) {
  // Theme options:
  // starry: pink jelly base with silver cross stars
  // coquette: pink base with black bows & cross stars
  // nightfall: glossy black with silver galaxy chrome stars
  // hearts: sheer nude with micro black hearts
  // sweet: pastel pink with 3D white pearls & bows
  // itgirl: almond french with black bows & glitter
  // cherry: blush with red cherries
  // cyber: lilac chrome with cross stars

  const isDark = theme === 'nightfall';
  const nailBg = isDark ? '#09090b' : theme === 'cyber' ? '#d8b4fe' : '#ffd1dc';

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="700" height="700" viewBox="0 0 700 700">
    <defs>
      <radialGradient id="bgGrad" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="#fff5f7"/>
        <stop offset="60%" stop-color="#fee2e9"/>
        <stop offset="100%" stop-color="#ffd5e2"/>
      </radialGradient>
      <linearGradient id="skinGrad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffe8df"/>
        <stop offset="50%" stop-color="#ffd8ce"/>
        <stop offset="100%" stop-color="#f8c8be"/>
      </linearGradient>
      <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="3" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
      <filter id="nailShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#b08898" flood-opacity="0.35"/>
      </filter>
    </defs>

    <!-- Background Pastel Glow -->
    <rect width="700" height="700" fill="url(#bgGrad)"/>

    <!-- Subtle Soft Sparkles in Background -->
    <g fill="#f472b6" opacity="0.4">
      <path d="M120 140 Q130 140 130 130 Q130 140 140 140 Q130 140 130 150 Q130 140 120 140 Z"/>
      <path d="M580 180 Q590 180 590 170 Q590 180 600 180 Q590 180 590 190 Q590 180 580 180 Z"/>
      <path d="M100 520 Q110 520 110 510 Q110 520 120 520 Q110 520 110 530 Q110 520 100 520 Z"/>
      <path d="M600 540 Q610 540 610 530 Q610 540 620 540 Q610 540 610 550 Q610 540 600 540 Z"/>
      <circle cx="200" cy="100" r="3"/>
      <circle cx="500" cy="120" r="2.5"/>
      <circle cx="560" cy="450" r="2"/>
    </g>

    <!-- Hand & Fingers Base -->
    <g filter="url(#nailShadow)">
      <!-- Palm/Wrist Base Silhouette (Soft Peach Tone) -->
      <path d="M220 700 C200 550 240 450 280 400 C340 380 460 380 520 450 C540 550 500 700 480 700 Z" fill="url(#skinGrad)"/>

      <!-- Finger 1 (Index) -->
      <path d="M240 420 C230 350 220 280 230 210 C235 170 275 170 280 210 C290 280 295 350 290 420 Z" fill="url(#skinGrad)"/>
      <!-- Finger 2 (Middle) -->
      <path d="M310 400 C310 320 310 230 320 160 C325 120 375 120 380 160 C390 230 385 320 380 400 Z" fill="url(#skinGrad)"/>
      <!-- Finger 3 (Ring) -->
      <path d="M400 410 C405 340 410 260 420 190 C425 150 470 150 475 190 C480 260 470 340 465 410 Z" fill="url(#skinGrad)"/>
      <!-- Finger 4 (Pinky) -->
      <path d="M485 440 C495 380 505 320 520 260 C525 220 565 220 568 260 C570 320 550 380 545 440 Z" fill="url(#skinGrad)"/>
    </g>

    <!-- Cute Y2K Silver Rings on Hand -->
    <g stroke="#ffffff" stroke-width="4" fill="none" filter="url(#softGlow)">
      <!-- Ring on middle finger -->
      <path d="M320 240 C340 250 365 250 385 240" stroke="#cbd5e1" stroke-width="5"/>
      <path d="M345 235 L355 245 L365 235 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>
      <!-- Ribbon bow ring on ring finger -->
      <path d="M415 260 C435 270 460 270 478 260" stroke="#cbd5e1" stroke-width="4"/>
    </g>

    <!-- PRESS ON NAILS SUITE -->
    <!-- Nail 1 (Index Finger) -->
    <g transform="translate(233, 150)" filter="url(#nailShadow)">
      <path d="M0 65 C0 20 10 0 25 0 C40 0 50 20 50 65 C50 75 0 75 0 65 Z" fill="${nailBg}"/>
      <!-- Glossy Reflection -->
      <path d="M6 55 C6 25 12 10 20 5 C15 15 12 35 12 55 Z" fill="#ffffff" opacity="0.6"/>
      ${renderNailArt(theme, 25, 30)}
    </g>

    <!-- Nail 2 (Middle Finger) -->
    <g transform="translate(325, 100)" filter="url(#nailShadow)">
      <path d="M0 75 C0 25 12 0 28 0 C44 0 56 25 56 75 C56 85 0 85 0 75 Z" fill="${nailBg}"/>
      <!-- Glossy Reflection -->
      <path d="M7 65 C7 30 15 12 24 6 C18 18 15 42 15 65 Z" fill="#ffffff" opacity="0.65"/>
      ${renderNailArt(theme, 28, 38)}
    </g>

    <!-- Nail 3 (Ring Finger) -->
    <g transform="translate(423, 130)" filter="url(#nailShadow)">
      <path d="M0 70 C0 22 11 0 26 0 C41 0 52 22 52 70 C52 80 0 80 0 70 Z" fill="${nailBg}"/>
      <!-- Glossy Reflection -->
      <path d="M6 60 C6 28 13 10 22 5 C16 16 13 38 13 60 Z" fill="#ffffff" opacity="0.6"/>
      ${renderNailArt(theme, 26, 35)}
    </g>

    <!-- Nail 4 (Pinky Finger) -->
    <g transform="translate(522, 200)" filter="url(#nailShadow)">
      <path d="M0 58 C0 18 9 0 22 0 C35 0 44 18 44 58 C44 68 0 68 0 58 Z" fill="${nailBg}"/>
      <!-- Glossy Reflection -->
      <path d="M5 48 C5 22 10 8 18 4 C13 14 10 32 10 48 Z" fill="#ffffff" opacity="0.55"/>
      ${renderNailArt(theme, 22, 28)}
    </g>

    <!-- Retro Window Border & Kawaii Stamp -->
    <rect x="16" y="16" width="668" height="668" rx="8" fill="none" stroke="#d8b4fe" stroke-width="4"/>
    <rect x="22" y="22" width="656" height="656" rx="6" fill="none" stroke="#fbcfe8" stroke-width="2"/>
    
    <!-- Little Heart Stamp bottom right -->
    <g transform="translate(620, 620)">
      <path d="M15 5 C10 0 0 0 0 10 C0 18 15 28 15 28 C15 28 30 18 30 10 C30 0 20 0 15 5 Z" fill="#f472b6"/>
    </g>
  </svg>`;
}

function renderNailArt(theme, cx, cy) {
  if (theme === 'starry') {
    return `
      <!-- Silver Cross Star & Cosmic Glitter -->
      <g transform="translate(${cx}, ${cy})">
        <path d="M0 -18 L0 18 M-12 0 L12 0" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
        <circle cx="0" cy="0" r="2" fill="#ffffff"/>
        <circle cx="-6" cy="-8" r="1" fill="#ffffff"/>
        <circle cx="7" cy="10" r="1.5" fill="#ffffff"/>
        <path d="M-8 12 L-8 16 M-10 14 L-6 14" stroke="#ffffff" stroke-width="1.5"/>
      </g>
    `;
  }
  if (theme === 'coquette' || theme === 'itgirl') {
    return `
      <!-- Delicate Hand-Tied Ribbon Bow -->
      <g transform="translate(${cx}, ${cy})">
        <!-- Bow Center Knot -->
        <circle cx="0" cy="0" r="2.5" fill="#18181b"/>
        <!-- Bow Left Loop -->
        <path d="M0 0 C-10 -10 -12 4 0 0 Z" fill="#18181b"/>
        <!-- Bow Right Loop -->
        <path d="M0 0 C10 -10 12 4 0 0 Z" fill="#18181b"/>
        <!-- Bow Ribbon Tails -->
        <path d="M-1 2 Q-6 12 -10 16" stroke="#18181b" stroke-width="2" fill="none"/>
        <path d="M1 2 Q6 12 10 16" stroke="#18181b" stroke-width="2" fill="none"/>
        <!-- Little Sparkle Stars around -->
        <path d="M-8 -10 L-8 -6 M-10 -8 L-6 -8" stroke="#ffffff" stroke-width="1.5"/>
        <circle cx="8" cy="-8" r="1.5" fill="#ffffff"/>
      </g>
    `;
  }
  if (theme === 'nightfall') {
    return `
      <!-- Silver Chrome Starbursts on Black -->
      <g transform="translate(${cx}, ${cy})">
        <path d="M0 -22 L0 22 M-14 0 L14 0" stroke="#e2e8f0" stroke-width="3" stroke-linecap="round"/>
        <circle cx="0" cy="0" r="3" fill="#ffffff"/>
        <circle cx="-7" cy="12" r="1.5" fill="#ffffff"/>
        <circle cx="8" cy="-10" r="1.5" fill="#ffffff"/>
        <path d="M6 10 L6 16 M3 13 L9 13" stroke="#cbd5e1" stroke-width="1.5"/>
      </g>
    `;
  }
  if (theme === 'hearts') {
    return `
      <!-- Micro Black Hearts -->
      <g transform="translate(${cx}, ${cy})">
        <path d="M0 -6 C-3 -10 -8 -6 -5 -2 L0 3 L5 -2 C8 -6 3 -10 0 -6 Z" fill="#18181b"/>
        <path d="M-6 10 C-8 8 -11 10 -9 12 L-6 15 L-3 12 C-1 10 -4 8 -6 10 Z" fill="#18181b" transform="scale(0.8)"/>
      </g>
    `;
  }
  if (theme === 'sweet') {
    return `
      <!-- 3D White Bow & Baby Pearls -->
      <g transform="translate(${cx}, ${cy})">
        <circle cx="0" cy="0" r="3" fill="#ffffff" stroke="#fbcfe8"/>
        <path d="M0 0 C-10 -8 -10 6 0 0 Z" fill="#ffffff" stroke="#f472b6" stroke-width="0.8"/>
        <path d="M0 0 C10 -8 10 6 0 0 Z" fill="#ffffff" stroke="#f472b6" stroke-width="0.8"/>
        <!-- Pearls -->
        <circle cx="-6" cy="-12" r="2" fill="#ffffff"/>
        <circle cx="7" cy="12" r="2.5" fill="#ffffff"/>
      </g>
    `;
  }
  if (theme === 'cherry') {
    return `
      <!-- Cute Red Cherries -->
      <g transform="translate(${cx}, ${cy})">
        <circle cx="-4" cy="5" r="4" fill="#e11d48"/>
        <circle cx="5" cy="7" r="4" fill="#e11d48"/>
        <path d="M-4 2 C-2 -4 0 -8 0 -8 C0 -8 3 -4 5 4" stroke="#15803d" stroke-width="1.5" fill="none"/>
        <path d="M0 -8 Q-6 -10 -4 -6 Z" fill="#22c55e"/>
      </g>
    `;
  }
  // Default: cyber star crosses
  return `
    <g transform="translate(${cx}, ${cy})">
      <path d="M0 -18 L0 18 M-10 0 L10 0" stroke="#ffffff" stroke-width="2.5"/>
      <circle cx="0" cy="0" r="2" fill="#ffffff"/>
      <circle cx="-5" cy="8" r="1.5" fill="#ffffff"/>
    </g>
  `;
}

// Pixel art mascot generator: Sleeping Grey Cat on Cloud with Wings & Hearts
function generateCatSvg(variant = 'grey') {
  const isCalico = variant === 'calico';
  const furBase = isCalico ? '#fdf2e9' : '#8e8d9c';
  const earInner = '#fbcfe8';
  const spotColor = isCalico ? '#c26d40' : '#686777';

  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="300" height="240" viewBox="0 0 300 240">
    <!-- Fluffy Cloud -->
    <g fill="#ffffff" opacity="0.95">
      <ellipse cx="150" cy="170" rx="100" ry="35"/>
      <circle cx="100" cy="155" r="40"/>
      <circle cx="150" cy="140" r="45"/>
      <circle cx="200" cy="155" r="40"/>
      <circle cx="230" cy="170" r="25"/>
      <circle cx="70" cy="170" r="25"/>
    </g>

    <!-- Sleeping Kitty -->
    <g transform="translate(85, 80)">
      <!-- Left Ear -->
      <polygon points="25,45 10,15 45,30" fill="${furBase}"/>
      <polygon points="23,40 14,20 38,30" fill="${earInner}"/>
      <!-- Right Ear -->
      <polygon points="85,45 105,15 70,30" fill="${furBase}"/>
      <polygon points="83,40 98,20 73,30" fill="${earInner}"/>

      <!-- Body / Head -->
      <ellipse cx="60" cy="55" rx="42" ry="32" fill="${furBase}"/>

      ${isCalico ? `
        <!-- Calico spots -->
        <path d="M22 35 Q40 30 35 60 Q20 50 22 35 Z" fill="${spotColor}"/>
        <path d="M85 40 Q95 60 75 65 Q70 45 85 40 Z" fill="#2d2b33"/>
      ` : `
        <!-- Grey stripes -->
        <path d="M45 28 L50 38 M60 26 L60 38 M75 28 L70 38" stroke="${spotColor}" stroke-width="2.5" stroke-linecap="round"/>
      `}

      <!-- Sleeping Eyes ^_^ -->
      <path d="M38 56 Q46 64 54 56" stroke="#2d2b33" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      <path d="M66 56 Q74 64 82 56" stroke="#2d2b33" stroke-width="2.5" fill="none" stroke-linecap="round"/>

      <!-- Pink Nose -->
      <polygon points="60,63 57,60 63,60" fill="#f472b6"/>

      <!-- Smile -->
      <path d="M60 63 Q56 68 53 66 M60 63 Q64 68 67 66" stroke="#2d2b33" stroke-width="2" fill="none"/>

      <!-- Blush Cheeks -->
      <ellipse cx="32" cy="62" rx="6" ry="3" fill="#fbcfe8"/>
      <ellipse cx="88" cy="62" rx="6" ry="3" fill="#fbcfe8"/>

      <!-- Paws resting -->
      <ellipse cx="45" cy="80" rx="9" ry="6" fill="#ffffff"/>
      <ellipse cx="65" cy="80" rx="9" ry="6" fill="#ffffff"/>
    </g>

    <!-- Floating Pink Heart -->
    <g transform="translate(195, 45)">
      <path d="M12 4 C8 0 0 0 0 8 C0 14 12 22 12 22 C12 22 24 14 24 8 C24 0 16 0 12 4 Z" fill="#f472b6"/>
    </g>
  </svg>`;
}

// Generate Hero Hand Photo on dreamy cloud background
function generateHeroHandSvg() {
  return `
  <svg xmlns="http://www.w3.org/2000/svg" width="900" height="700" viewBox="0 0 900 700">
    <defs>
      <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#bce0fd"/>
        <stop offset="40%" stop-color="#fed7e2"/>
        <stop offset="100%" stop-color="#fdf2f8"/>
      </linearGradient>
      <filter id="glow" x="-10%" y="-10%" width="120%" height="120%">
        <feGaussianBlur stdDeviation="4" result="blur"/>
        <feComposite in="SourceGraphic" in2="blur" operator="over"/>
      </filter>
    </defs>

    <rect width="900" height="700" fill="url(#skyGrad)"/>

    <!-- Dreamy Clouds Background -->
    <g fill="#ffffff" opacity="0.85">
      <circle cx="150" cy="180" r="100"/>
      <circle cx="280" cy="150" r="120"/>
      <circle cx="750" cy="220" r="110"/>
      <circle cx="850" cy="160" r="90"/>
      <circle cx="120" cy="550" r="120"/>
      <circle cx="780" cy="580" r="140"/>
    </g>

    <!-- Sparkle Stars -->
    <g fill="#ffffff" filter="url(#glow)">
      <path d="M220 80 Q230 80 230 70 Q230 80 240 80 Q230 80 230 90 Q230 80 220 80 Z"/>
      <path d="M680 120 Q690 120 690 110 Q690 120 700 120 Q690 120 690 130 Q690 120 680 120 Z"/>
      <path d="M180 340 Q190 340 190 330 Q190 340 200 340 Q190 340 190 350 Q190 340 180 340 Z"/>
      <path d="M720 380 Q730 380 730 370 Q730 380 740 380 Q730 380 730 390 Q730 380 720 380 Z"/>
    </g>

    <!-- Model Hand with Knit Sweater Cuff -->
    <g transform="translate(180, 50)">
      <!-- Soft White Knitted Ribbed Sleeve Cuff -->
      <path d="M200 650 C180 500 240 430 340 430 C440 430 500 500 480 650 Z" fill="#ffffff" stroke="#f1f5f9" stroke-width="4"/>
      <!-- Rib lines on sleeve -->
      <line x1="260" y1="460" x2="250" y2="650" stroke="#e2e8f0" stroke-width="3"/>
      <line x1="300" y1="440" x2="295" y2="650" stroke="#e2e8f0" stroke-width="3"/>
      <line x1="340" y1="435" x2="340" y2="650" stroke="#e2e8f0" stroke-width="3"/>
      <line x1="380" y1="440" x2="385" y2="650" stroke="#e2e8f0" stroke-width="3"/>
      <line x1="420" y1="460" x2="430" y2="650" stroke="#e2e8f0" stroke-width="3"/>

      <!-- Hand Skin Tone -->
      <path d="M250 440 C230 340 220 280 230 200 C235 150 280 150 285 200 C295 280 300 340 300 420 Z" fill="#ffd8ce"/>
      <path d="M310 420 C310 320 315 220 325 140 C330 90 380 90 385 140 C395 220 390 320 385 410 Z" fill="#ffd8ce"/>
      <path d="M395 420 C400 330 410 240 420 170 C425 120 475 120 480 170 C485 240 475 330 470 420 Z" fill="#ffd8ce"/>
      <path d="M480 440 C490 370 500 300 515 240 C520 190 565 190 568 240 C570 300 550 370 545 440 Z" fill="#ffd8ce"/>

      <!-- Silver Y2K Bow Rings -->
      <path d="M320 230 C340 240 370 240 390 230" stroke="#cbd5e1" stroke-width="6"/>
      <path d="M345 225 L355 235 L365 225 Z" fill="#ffffff" stroke="#94a3b8" stroke-width="1.5"/>

      <path d="M415 250 C435 260 465 260 482 250" stroke="#cbd5e1" stroke-width="5"/>

      <!-- Nails on Fingers -->
      <!-- Nail 1 -->
      <g transform="translate(233, 140)">
        <path d="M0 65 C0 20 10 0 25 0 C40 0 50 20 50 65 C50 75 0 75 0 65 Z" fill="#ffd1dc"/>
        <path d="M6 55 C6 25 12 10 20 5 C15 15 12 35 12 55 Z" fill="#ffffff" opacity="0.6"/>
        <path d="M25 18 L25 42 M15 30 L35 30" stroke="#ffffff" stroke-width="2.5"/>
      </g>
      <!-- Nail 2 -->
      <g transform="translate(328, 80)">
        <path d="M0 75 C0 25 12 0 28 0 C44 0 56 25 56 75 C56 85 0 85 0 75 Z" fill="#ffd1dc"/>
        <path d="M7 65 C7 30 15 12 24 6 C18 18 15 42 15 65 Z" fill="#ffffff" opacity="0.65"/>
        <path d="M28 20 L28 50 M16 35 L40 35" stroke="#ffffff" stroke-width="3"/>
      </g>
      <!-- Nail 3 -->
      <g transform="translate(425, 110)">
        <path d="M0 70 C0 22 11 0 26 0 C41 0 52 22 52 70 C52 80 0 80 0 70 Z" fill="#ffd1dc"/>
        <path d="M6 60 C6 28 13 10 22 5 C16 16 13 38 13 60 Z" fill="#ffffff" opacity="0.6"/>
        <path d="M26 18 L26 44 M15 31 L37 31" stroke="#ffffff" stroke-width="2.5"/>
      </g>
      <!-- Nail 4 -->
      <g transform="translate(522, 180)">
        <path d="M0 58 C0 18 9 0 22 0 C35 0 44 18 44 58 C44 68 0 68 0 58 Z" fill="#ffd1dc"/>
        <path d="M5 48 C5 22 10 8 18 4 C13 14 10 32 10 48 Z" fill="#ffffff" opacity="0.55"/>
        <path d="M22 14 L22 36 M13 25 L31 25" stroke="#ffffff" stroke-width="2"/>
      </g>
    </g>
  </svg>`;
}

async function main() {
  console.log('=== NAIL.EXE PRESS-ON NAILS ASSET PIPELINE ===');

  const nailsDir = path.join(PUBLIC_DIR, 'images', 'nails');
  const iconsDir = path.join(PUBLIC_DIR, 'images', 'icons');
  ensureDir(nailsDir);
  ensureDir(iconsDir);

  // 1. Generate Product Photos
  const nailProducts = [
    { file: 'starry.jpg', theme: 'starry' },
    { file: 'starry-hand.jpg', theme: 'starry' },
    { file: 'coquette-bow.jpg', theme: 'coquette' },
    { file: 'coquette-detail.jpg', theme: 'coquette' },
    { file: 'nightfall.jpg', theme: 'nightfall' },
    { file: 'nightfall-hand.jpg', theme: 'nightfall' },
    { file: 'little-hearts.jpg', theme: 'hearts' },
    { file: 'little-hearts-detail.jpg', theme: 'hearts' },
    { file: 'sweet-mess.jpg', theme: 'sweet' },
    { file: 'sweet-mess-hand.jpg', theme: 'sweet' },
    { file: 'it-girl.jpg', theme: 'itgirl' },
    { file: 'it-girl-detail.jpg', theme: 'itgirl' },
    { file: 'cherry-baby.jpg', theme: 'cherry' },
    { file: 'cyber-angel.jpg', theme: 'cyber' },
  ];

  for (const item of nailProducts) {
    const svg = generateNailsSvg(item.theme);
    await sharp(Buffer.from(svg))
      .jpeg({ quality: 90 })
      .toFile(path.join(nailsDir, item.file));
    console.log(`✓ Rendered nail image: ${item.file}`);
  }

  // 2. Generate Hero Hand Model Image
  const heroSvg = generateHeroHandSvg();
  await sharp(Buffer.from(heroSvg))
    .jpeg({ quality: 90 })
    .toFile(path.join(nailsDir, 'hero-hand.jpg'));
  console.log('✓ Rendered hero hand image.');

  // 3. Generate Pixel Mascot Kitties
  await sharp(Buffer.from(generateCatSvg('grey')))
    .png()
    .toFile(path.join(iconsDir, 'cat-grey.png'));

  await sharp(Buffer.from(generateCatSvg('calico')))
    .png()
    .toFile(path.join(iconsDir, 'cat-calico.png'));
  console.log('✓ Rendered pixel cats.');

  console.log('=== ALL PRESS-ON NAIL ASSETS SUCCESSFULLY CREATED ===');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
