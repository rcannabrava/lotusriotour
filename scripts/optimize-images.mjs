// Generates the optimized images used by the site. Run after adding or replacing a photo in src/assets:
//   npm run images
//
// - src/assets/optimized/<name>-<width>.webp  responsive variants (see ResponsiveImage)
// - public/og/<name>.jpg                      1200x630 social previews (under ~250 KB, WhatsApp limit is ~300 KB)
// - public/og-image.jpg                       branded default preview, generated from src/assets/brand/og-image.png (lossless design source)
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ASSETS = "src/assets";
const OUT = "src/assets/optimized";

// name: widths to generate
const responsive = {
  "hero-rio": [960, 1920],
  "about-rio": [640, 1280],
  "tour-christ": [640, 1280],
  "tour-sugarloaf": [640, 1280],
  "tour-nature": [640, 1280],
  "tour-helicopter": [640, 1280],
  "tour-carnaval": [640, 1280],
  "tour-boat": [640, 1280],
};

// social previews: output file -> source image
const social = {
  "public/og/rio-express.jpg": "tour-christ",
  "public/og/tailor-made.jpg": "tour-sugarloaf",
  "public/og/rio-nature.jpg": "tour-nature",
  "public/og/helicopter.jpg": "tour-helicopter",
  "public/og/carnaval.jpg": "tour-carnaval",
  "public/og/boat.jpg": "tour-boat",
};

// The branded og-image is a design (logo + tagline): always encode from the lossless source,
// never from the previous JPEG, so repeated runs do not accumulate compression artifacts.
async function compress(source, file) {
  let quality = 82;
  do {
    await sharp(source)
      .resize(1200, 630, { fit: "cover" })
      .jpeg({ quality, mozjpeg: true })
      .toFile(file);
    quality -= 6;
  } while ((await stat(file)).size > 250 * 1024 && quality > 40);
}

const kb = async (file) => `${Math.round((await stat(file)).size / 1024)} KB`;

await mkdir(OUT, { recursive: true });
await mkdir("public/og", { recursive: true });

for (const [name, widths] of Object.entries(responsive)) {
  const source = path.join(ASSETS, `${name}.jpg`);
  for (const width of widths) {
    const file = path.join(OUT, `${name}-${width}.webp`);
    await sharp(source)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(file);
    console.log(file, await kb(file));
  }
}

await compress("src/assets/brand/og-image.png", "public/og-image.jpg");
console.log("public/og-image.jpg", await kb("public/og-image.jpg"));

for (const [file, name] of Object.entries(social)) {
  let quality = 82;
  do {
    await sharp(path.join(ASSETS, `${name}.jpg`))
      .resize(1200, 630, { fit: "cover", position: "attention" })
      .jpeg({ quality, mozjpeg: true })
      .toFile(file);
    quality -= 6;
  } while ((await stat(file)).size > 250 * 1024 && quality > 40);
  console.log(file, await kb(file));
}
