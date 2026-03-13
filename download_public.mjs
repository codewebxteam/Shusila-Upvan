i wanimport https from 'https';
import fs from 'fs';
import path from 'path';

const urls = {
  // Mushrooms
  m1: 'https://upload.wikimedia.org/wikipedia/commons/0/01/Champignon_mushroom.jpg',
  m2: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Pleurotus_ostreatus_2.jpg',
  m3: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Calocybe_indica.jpg',
  m4: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Dried_mushrooms.jpg',
  m5: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Shiitake_mushroom.jpg',
  m6: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Portobello_mushroom.jpg',
  m7: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Enokitake_mushrooms.jpg',
  m8: 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Boletus_edulis.jpg',
  m9: 'https://upload.wikimedia.org/wikipedia/commons/5/52/Pleurotus_eryngii_mushrooms.jpg',
  m10: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Grifola_frondosa_mushrooms.jpg',
  m11: 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Cantharellus_cibarius_mushrooms.jpg',
  m12: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Hericium_erinaceus_mushrooms.jpg',

  // Dairy
  d1: 'https://upload.wikimedia.org/wikipedia/commons/c/c8/Oat_milk_glass_and_jug.jpg',
  d2: 'https://upload.wikimedia.org/wikipedia/commons/1/14/Ghee.jpg',
  d3: 'https://upload.wikimedia.org/wikipedia/commons/2/25/Yogurt_with_spoon.jpg',
  d4: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Butter_block.jpg',
  d5: 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Paneer_%28cottage_cheese%29.jpg',
  d6: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Bowl_of_Yogurt.jpg',
  d7: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Bowl_of_whipped_cream.jpg',
  d8: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Strawberry_milk.jpg'
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
};

const main = async () => {
  const dir = path.resolve('d:/Shusila-Upvan-main/public/images/products');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const [id, url] of Object.entries(urls)) {
    const ext = url.split('.').pop();
    const filepath = path.join(dir, `${id}.${ext}`);
    try {
      await downloadImage(url, filepath);
      console.log(`Saved ${id}.${ext}`);
    } catch (e) {
      console.error(`Failed ${id}:`, e.message);
    }
  }
};

main();
