import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

// Normalize the two source canvases to the same small, borderless playback size.
for (const sequence of [1, 2]) {
  const source = `public/images/sequence${sequence}`;
  const destination = `public/images/cat-animation/sequence${sequence}`;
  await mkdir(destination, { recursive: true });
  const { info } = await sharp(`${source}/guts_01.webp`)
    .trim({ background: '#000000', threshold: 20 })
    .toBuffer({ resolveWithObject: true });
  for (let frame = 1; frame <= 30; frame++) {
    const name = `guts_${String(frame).padStart(2, '0')}.webp`;
    await sharp(`${source}/${name}`)
      .extract({ left: -info.trimOffsetLeft, top: -info.trimOffsetTop, width: info.width, height: info.height })
      .resize(360, 230, { fit: 'fill' })
      .webp({ quality: 85 })
      .toFile(`${destination}/${name}`);
  }
}
