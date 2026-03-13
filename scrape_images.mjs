import https from 'https';
import fs from 'fs';
import path from 'path';

const searchImage = (query) => {
  return new Promise((resolve, reject) => {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' "white background"')}`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const match = data.match(/src="\/\/external-content\.duckduckgo\.com\/iu\/\?u=([^&"']+)/);
        if (match && match[1]) {
          resolve(decodeURIComponent(match[1]));
        } else {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
};

const items = {
  milk: 'glass of pouring milk',
  ghee: 'ghee in a glass jar',
  curd: 'thick plain curd in white bowl',
  butter: 'block of yellow butter',
  paneer: 'fresh paneer cubes',
  yogurt: 'plain thick greek yogurt in bowl',
  cream: 'fresh pouring cream in bowl',
  flavored_milk: 'glass bottle of yellow flavored milk',
  mushroom_button: 'fresh button mushrooms',
  mushroom_oyster: 'raw oyster mushrooms',
  mushroom_milky: 'milky mushrooms',
  mushroom_shiitake: 'raw shiitake mushrooms',
  mushroom_portobello: 'raw portobello mushroom',
  mushroom_enoki: 'fresh enoki mushrooms',
  mushroom_porcini: 'fresh porcini mushrooms',
  mushroom_kingoyster: 'king oyster mushroom',
  mushroom_maitake: 'maitake mushroom',
  mushroom_chanterelle: 'chanterelle mushroom',
  mushroom_lionsmane: 'lions mane mushroom'
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadImage(res.headers.location, filepath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${res.statusCode}`));
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => file.close(resolve));
    }).on('error', reject);
  });
};

const main = async () => {
  const baseDir = path.resolve('d:/Shusila-Upvan-main/src/assets');
  if (!fs.existsSync(path.join(baseDir, 'dairy_new'))) fs.mkdirSync(path.join(baseDir, 'dairy_new'), { recursive: true });
  if (!fs.existsSync(path.join(baseDir, 'mushroom_new'))) fs.mkdirSync(path.join(baseDir, 'mushroom_new'), { recursive: true });

  for (const [key, query] of Object.entries(items)) {
    console.log(`Searching for: ${key}...`);
    try {
      const url = await searchImage(query);
      if (url) {
        console.log(`Found ${key}: ${url}`);
        const folder = key.startsWith('mushroom_') ? 'mushroom_new' : 'dairy_new';
        const ext = '.jpg';
        const filename = key.replace('mushroom_', '') + ext;
        const filepath = path.join(baseDir, folder, filename);
        await downloadImage(url, filepath);
        console.log(`Saved ${key} to ${filepath}`);
      } else {
        console.log(`No image found for ${key}`);
      }
    } catch (e) {
      console.error(`Error on ${key}: ${e.message}`);
    }
  }
};

main();
