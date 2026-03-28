import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const outDir = path.join(root, 'assets', 'images');

await mkdir(outDir, { recursive: true });

const images = [
  {
    src: path.join(root, 'white-truck-crossing-bridge-sunset-urban-logistics-motion.jpg'),
    out: path.join(outDir, 'truck-bridge.webp'),
    label: 'truck-bridge',
  },
  {
    src: path.join(root, 'truck fleet.jpg'),
    out: path.join(outDir, 'truck-fleet.webp'),
    label: 'truck-fleet',
  },
  {
    src: path.join(root, 'truck-driver-opening-reservoir-tank-refuel-truck-holding-thumbs-up.jpg'),
    out: path.join(outDir, 'truck-driver.webp'),
    label: 'truck-driver',
  },
];

for (const img of images) {
  process.stdout.write(`Compressing ${img.label}...`);
  const info = await sharp(img.src)
    .resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(img.out);
  const kb = Math.round(info.size / 1024);
  console.log(` done — ${kb} KB`);
}

console.log('\nAll images compressed to assets/images/');
