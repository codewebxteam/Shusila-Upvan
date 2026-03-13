import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const images = [
  path.join(__dirname, 'src/assets/dairy/ghee.webp'),
  path.join(__dirname, 'src/assets/dairy/curd.webp')
];

async function changeBackgroundToWhite(imagePath) {
  try {
    // Read image and get metadata
    const image = sharp(imagePath);
    const metadata = await image.metadata();

    // Create a white background
    const whiteBackground = sharp({
      create: {
        width: metadata.width,
        height: metadata.height,
        channels: 3,
        background: { r: 255, g: 255, b: 255 }
      }
    });

    const tempPath = imagePath + '.tmp.webp';

    // Composite: put image on white background (removes black bg)
    await whiteBackground
      .composite([
        {
          input: imagePath,
          blend: 'over'
        }
      ])
      .webp()
      .toFile(tempPath);

    // Delete original and rename temp
    fs.unlinkSync(imagePath);
    fs.renameSync(tempPath, imagePath);

    console.log(`✓ Successfully processed: ${imagePath}`);
  } catch (error) {
    console.error(`✗ Error processing ${imagePath}:`, error.message);
  }
}

async function processAllImages() {
  console.log('Starting background conversion to white...\n');
  
  for (const img of images) {
    await changeBackgroundToWhite(img);
  }
  
  console.log('\nDone!');
}

processAllImages();
