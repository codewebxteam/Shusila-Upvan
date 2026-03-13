import https from 'https';

const ingredients = [
  'Milk', 'Butter', 'Yogurt', 'Heavy Cream', 'Double Cream', 'Cream', 
  'Mushrooms', 'Paneer', 'Ghee', 'Saffron', 'Curd', 'Cheese'
];

ingredients.forEach(ing => {
  const url = `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ing)}.png`;
  https.get(url, (res) => {
    console.log(`${ing}: ${res.statusCode}`);
  }).on('error', (e) => {
    console.error(`${ing}: ${e.message}`);
  });
});
