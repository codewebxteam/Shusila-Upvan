import https from 'https';
import fs from 'fs';
import path from 'path';

const images = {
  // Dairy (Light Background)
  milk: 'https://images.unsplash.com/photo-1563636619-e910bd493996?w=800&q=80',
  ghee: 'https://images.unsplash.com/photo-1628157773289-42b442b43f9a?w=800&q=80',
  curd: 'https://images.unsplash.com/photo-1488477181946-6428a0259777?w=800&q=80',
  butter: 'https://images.unsplash.com/photo-1552590635-27c2c2128b15?w=800&q=80',
  paneer: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&q=80',
  yogurt: 'https://images.unsplash.com/photo-1571212515416-fef01fc43637?w=800&q=80',
  cream: 'https://images.unsplash.com/photo-1528498033373-3c6c08e93d79?w=800&q=80',
  flavored_milk: 'https://images.unsplash.com/photo-1556767667-07146e37990c?w=800&q=80',

  // Mushrooms (Light Background)
  mushroom_button: 'https://images.unsplash.com/photo-1563201502-1823eb582379?w=800&q=80',
  mushroom_oyster: 'https://images.unsplash.com/photo-1615485245479-70962986bb60?w=800&q=80',
  mushroom_milky: 'https://images.unsplash.com/photo-1615485500704-8e990f9900f7?w=800&q=80',
  mushroom_shiitake: 'https://images.unsplash.com/photo-1615485499978-1123497e889b?w=800&q=80',
  mushroom_portobello: 'https://images.unsplash.com/photo-1615485244917-270f80727142?w=800&q=80',
  mushroom_enoki: 'https://images.unsplash.com/photo-1615485245849-f4726e642512?w=800&q=80',
  mushroom_porcini: 'https://images.unsplash.com/photo-1615485245133-c1f061e5f03d?w=800&q=80',
  mushroom_kingoyster: 'https://images.unsplash.com/photo-1615485245258-48b4f4c2e5b6?w=800&q=80',
  mushroom_maitake: 'https://images.unsplash.com/photo-1615485245381-8b8b3b48f6c4?w=800&q=80',
  mushroom_chanterelle: 'https://images.unsplash.com/photo-1504309325608-f40a1fb86a34?w=800&q=80',
  mushroom_lionsmane: 'https://images.unsplash.com/photo-1641031383827-0cf075e7a9b0?w=800&q=80'
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
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

const main = async () => {
  const baseDir = path.resolve('d:/Shusila-Upvan-main/src/assets');
  if (!fs.existsSync(path.join(baseDir, 'dairy'))) fs.mkdirSync(path.join(baseDir, 'dairy'), { recursive: true });
  if (!fs.existsSync(path.join(baseDir, 'mushroom'))) fs.mkdirSync(path.join(baseDir, 'mushroom'), { recursive: true });

  for (const [name, url] of Object.entries(images)) {
    const ext = '.jpg';
    const folder = name.startsWith('mushroom_') ? 'mushroom' : 'dairy';
    const filename = name.replace('mushroom_', '') + ext;
    const filepath = path.join(baseDir, folder, filename);
    
    try {
      await downloadImage(url, filepath);
    } catch (e) {
      console.error(`Failed on ${name}: ${e.message}`);
    }
  }
};

main();
