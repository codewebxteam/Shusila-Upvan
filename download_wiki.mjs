import https from 'https';
import fs from 'fs';
import path from 'path';

const queries = {
  // Dairy
  milk: 'Milk',
  ghee: 'Ghee',
  curd: 'Curd',
  butter: 'Butter',
  paneer: 'Paneer',
  yogurt: 'Yogurt',
  cream: 'Cream',
  flavored_milk: 'Flavored_milk',

  // Mushrooms
  mushroom_button: 'Agaricus_bisporus',
  mushroom_oyster: 'Pleurotus_ostreatus',
  mushroom_milky: 'Calocybe_indica',
  mushroom_shiitake: 'Shiitake',
  mushroom_portobello: 'Agaricus_bisporus', // Portobello is mature button
  mushroom_enoki: 'Enokitake',
  mushroom_porcini: 'Boletus_edulis',
  mushroom_kingoyster: 'Pleurotus_eryngii',
  mushroom_maitake: 'Grifola_frondosa',
  mushroom_chanterelle: 'Chanterelle',
  mushroom_lionsmane: 'Hericium_erinaceus'
};

const getImageUrl = (title) => {
  return new Promise((resolve, reject) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${title}&pithumbsize=800&format=json`;
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Failed to download ${url}: ${res.statusCode}`));
        return;
      }
      const writeStream = fs.createWriteStream(filepath);
      res.pipe(writeStream);
      writeStream.on('finish', () => {
        writeStream.close();
        console.log(`Downloaded: ${filepath}`);
        resolve();
      });
    }).on('error', reject);
  });
};

const main = async () => {
  const baseDir = path.resolve('d:/Shusila-Upvan-main/src/assets');
  if (!fs.existsSync(path.join(baseDir, 'dairy'))) fs.mkdirSync(path.join(baseDir, 'dairy'), { recursive: true });
  if (!fs.existsSync(path.join(baseDir, 'mushroom'))) fs.mkdirSync(path.join(baseDir, 'mushroom'), { recursive: true });

  for (const [name, title] of Object.entries(queries)) {
    try {
      console.log(`Fetching URL for ${title}...`);
      const url = await getImageUrl(title);
      if (url) {
        const ext = '.jpg';
        const folder = name.startsWith('mushroom_') ? 'mushroom' : 'dairy';
        const filename = name.replace('mushroom_', '') + ext;
        const filepath = path.join(baseDir, folder, filename);
        await downloadImage(url, filepath);
      } else {
        console.log(`No image found for ${title}`);
      }
    } catch (e) {
      console.error(`Error on ${name}: ${e.message}`);
    }
  }
};

main();
