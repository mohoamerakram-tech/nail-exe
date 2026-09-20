import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';

// Turn the supplied green-screen frames into small, transparent website assets.
for (const sequence of [3, 4, 5, 6, 7, 8]) {
  const source = `public/images/sequence${sequence}`;
  const destination = `public/images/home-animations/sequence${sequence}`;
  const files = (await readdir(source)).filter((name) => /^guts_\d+\.webp$/.test(name)).sort();
  if (files.length !== 30) throw new Error(`Expected 30 frames in ${source}`);
  await mkdir(destination, { recursive: true });
  for (const name of files) {
    const { data, info } = await sharp(`${source}/${name}`)
      .resize(640, 360).removeAlpha().raw().toBuffer({ resolveWithObject: true });
    const rgba = Buffer.alloc(info.width * info.height * 4);
    const backdrop = [16, 195, 32];
    for (let pixel = 0; pixel < info.width * info.height; pixel++) {
      const sourceOffset = pixel * 3;
      const outputOffset = pixel * 4;
      const r = data[sourceOffset];
      const g = data[sourceOffset + 1];
      const b = data[sourceOffset + 2];
      const greenExcess = g - Math.max(r, b);
      const alpha = Math.max(0, Math.min(1, (78 - greenExcess) / 68));
      rgba[outputOffset + 3] = Math.round(alpha * 255);
      if (alpha < 0.01) continue;
      for (let channel = 0; channel < 3; channel++) {
        const observed = data[sourceOffset + channel];
        rgba[outputOffset + channel] = Math.max(0, Math.min(255,
          Math.round((observed - (1 - alpha) * backdrop[channel]) / alpha)));
      }
    }
    await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
      .webp({ quality: 88, alphaQuality: 100 })
      .toFile(`${destination}/${name}`);
  }
  console.log(`Optimized sequence ${sequence}: ${files.length} frames`);
}
