import https from 'https';
import fs from 'fs';
import path from 'path';

const queries = {
  // Dairy
  milk: 'intitle:Milk',
  ghee: 'intitle:Ghee',
  curd: 'intitle:Curd',
  butter: 'intitle:Butter',
  paneer: 'intitle:Paneer',
  yogurt: 'intitle:Yogurt',
  cream: 'intitle:Cream',
  flavored_milk: 'intitle:Flavored milk',

  // Mushrooms
  mushroom_button: 'intitle:Agaricus bisporus',
  mushroom_oyster: 'intitle:Pleurotus ostreatus',
  mushroom_milky: 'intitle:Calocybe indica',
  mushroom_shiitake: 'intitle:Shiitake',
  mushroom_portobello: 'intitle:Portobello mushroom',
  mushroom_enoki: 'intitle:Enokitake',
  mushroom_porcini: 'intitle:Boletus edulis',
  mushroom_kingoyster: 'intitle:Pleurotus eryngii',
  mushroom_maitake: 'intitle:Grifola frondosa',
  mushroom_chanterelle: 'intitle:Chanterelle',
  mushroom_lionsmane: 'intitle:Hericium erinaceus'
};

const getImageUrl = (query) => {
  return new Promise((resolve, reject) => {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&prop=pageimages&pithumbsize=800&format=json`;
    https.get(searchUrl, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.query && json.query.pages) {
            const pages = Object.values(json.query.pages);
            const pageWithImg = pages.find(p => p.thumbnail && p.thumbnail.source);
            if (pageWithImg) {
              resolve(pageWithImg.thumbnail.source);
            } else {
              resolve(null);
            }
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

  for (const [name, query] of Object.entries(queries)) {
    try {
      console.log(`Fetching URL for ${query}...`);
      const url = await getImageUrl(query);
      if (url) {
        const ext = '.jpg';
        const folder = name.startsWith('mushroom_') ? 'mushroom' : 'dairy';
        const filename = name.replace('mushroom_', '') + ext;
        const filepath = path.join(baseDir, folder, filename);
        await downloadImage(url, filepath);
      } else {
        console.log(`No image found for ${query}`);
      }
    } catch (e) {
      console.error(`Error on ${name}: ${e.message}`);
    }
  }
};

main();
