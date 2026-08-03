import sharp from "sharp";

/**
 * Builds the hero portrait: an exact 4:5 frame, padded with true black, with
 * the subject fully inside it and never touching an edge. Because the page
 * background is also pure black the frame edges are invisible, so the portrait
 * reads as if it sits directly on the page — no mask or vignette needed.
 */

// Run from the project root: node scripts/prepare-portrait.mjs
const SOURCE = "public/images/aman-mittal.png";
const OUTPUT = "public/images/aman-portrait.png";

// Measured subject bounds in the source.
const SUBJECT = { minX: 244, maxX: 799 };
const SIDE_MARGIN = 66;
const BLACK_FLOOR = 12; // crush near-black noise so it matches #000 exactly

const src = sharp(SOURCE);
const meta = await src.metadata();

const left = Math.max(0, SUBJECT.minX - SIDE_MARGIN);
const width = Math.min(meta.width - left, SUBJECT.maxX + SIDE_MARGIN - left);
const height = Math.round(width * (5 / 4));
const topPad = height - meta.height;

if (topPad < 0) {
  throw new Error("Source is taller than the target frame; widen the crop.");
}

const cropped = await src
  .extract({ left, top: 0, width, height: meta.height })
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { data, info } = cropped;
for (let i = 0; i < data.length; i += info.channels) {
  if (
    data[i] <= BLACK_FLOOR &&
    data[i + 1] <= BLACK_FLOOR &&
    data[i + 2] <= BLACK_FLOOR
  ) {
    data[i] = 0;
    data[i + 1] = 0;
    data[i + 2] = 0;
  }
}

const flattened = await sharp(data, {
  raw: { width: info.width, height: info.height, channels: info.channels },
})
  .png()
  .toBuffer();

// Headroom above the subject; the torso keeps running off the bottom edge.
await sharp({
  create: {
    width,
    height,
    channels: 4,
    background: { r: 0, g: 0, b: 0, alpha: 1 },
  },
})
  .composite([{ input: flattened, top: topPad, left: 0 }])
  .png({ compressionLevel: 9 })
  .toFile(OUTPUT);

const out = await sharp(OUTPUT).metadata();
console.log(
  `crop x${left}+${width} of ${meta.width}x${meta.height}, ${topPad}px headroom`
);
console.log(`wrote ${OUTPUT} ${out.width}x${out.height} (${out.width / out.height})`);
