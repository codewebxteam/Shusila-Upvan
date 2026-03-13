import button_img from '../assets/mushroom/mushroom1.webp';
import oyster_img from '../assets/mushroom/mushroom2.webp';
import milky_img from '../assets/mushroom/milky.jpg';
import dry_img from '../assets/mushroom/mushroom4.webp';
import shiitake_img from '../assets/mushroom/shiitake.png';
import portobello_img from '../assets/mushroom/portobello.png';
import enoki_img from '../assets/mushroom/enoki.png';
import porcini_img from '../assets/mushroom/porcini.png';
import king_oyster_img from '../assets/mushroom/king_oyster.png';
import maitake_img from '../assets/mushroom/maitake.png';
import chanterelle_img from '../assets/mushroom/herofungi.webp';
import lions_mane_img from '../assets/mushroom/mushroom3.webp';

import milk_img from '../assets/dairy/milk_new.png';
import ghee_img from '../assets/dairy/ghee_new.png';
import curd_img from '../assets/dairy/curd_new.png';
import butter_img from '../assets/dairy/butter_new.png';
import paneer_img from '../assets/dairy/paneer_new.png';
import yogurt_img from '../assets/dairy/yogurt_new.png';
import cream_img from '../assets/dairy/cream_new.png';
import flavored_milk_img from '../assets/dairy/flavored_milk_new.png';

export const categories = {
    MUSHROOM: "Mushroom",
    DAIRY: "Dairy"
};

export const products = [
    // Mushrooms
    {
        id: "m1",
        category: categories.MUSHROOM,
        name: "Button Mushroom",
        price: 160,
        img: button_img,
        unit: "Kg",
        tag: "Daily Fresh",
        badge: "ACCESSORIES", // Match image style for badge
        description: "Our Button Mushrooms are grown in a climate-controlled environment to ensure maximum freshness and nutritional value. They have a mild, earthy flavor that intensifies when cooked.",
        longDescription: "Sourced from our state-of-the-art lab-grown facility, these Button Mushrooms are the perfect addition to your daily meals. Rich in vitamins and minerals, they provide a healthy boost to your immunity. We ensure that every batch is harvested at the peak of maturity for the best texture and taste.",
        specifications: [
            { label: "Type", value: "Fresh Button" },
            { label: "Origin", value: "Lab Grown, Khalilabad" },
            { label: "Shelf Life", value: "3-5 Days" },
            { label: "Storage", value: "Keep Refrigerated" }
        ],
        highlights: ["100% Organic", "No Pesticides", "Rich in Vitamin D", "Harvested Daily"]
    },
    {
        id: "m2",
        category: categories.MUSHROOM,
        name: "Oyster Mushroom",
        price: 450,
        img: oyster_img,
        unit: "Kg",
        tag: "Superfood",
        badge: "PREMIUM",
        description: "Known for their delicate texture and mild, savory flavor, Oyster Mushrooms are a gourmet favorite.",
        longDescription: "These mushrooms are not only delicious but also packed with antioxidants and fiber. They are meticulously grown on organic substrate to ensure the highest quality.",
        specifications: [
            { label: "Type", value: "Oyster" },
            { label: "Origin", value: "Organic Farm" },
            { label: "Shelf Life", value: "4-6 Days" }
        ],
        highlights: ["Gourmet Quality", "Antioxidant Rich", "Sustainable Grown"]
    },
    { id: "m3", category: categories.MUSHROOM, name: "Milky Mushroom", price: 600, img: milky_img, unit: "Kg", tag: "Premium", description: "Bright white, meaty mushrooms with a mild flavor, perfect for curries." },
    { id: "m4", category: categories.MUSHROOM, name: "Dry Mushroom", price: 1200, img: dry_img, unit: "Kg", tag: "Speciality", description: "Sun-dried mushrooms that pack an intense umami punch. Long shelf life." },
    { id: "m5", category: categories.MUSHROOM, name: "Shiitake Mushroom", price: 800, img: shiitake_img, unit: "Kg", tag: "Gourmet", description: "Known for their rich, savory taste and diverse health benefits." },
    { id: "m6", category: categories.MUSHROOM, name: "Portobello Mushroom", price: 550, img: portobello_img, unit: "Kg", tag: "Hearty", description: "Large, meaty mushrooms often used as a vegetarian burger substitute." },
    { id: "m7", category: categories.MUSHROOM, name: "Enoki Mushroom", price: 300, img: enoki_img, unit: "Kg", tag: "Delicate", description: "Thin, long-stemmed mushrooms with a crisp texture and light flavor." },
    { id: "m8", category: categories.MUSHROOM, name: "Porcini Mushroom", price: 1500, img: porcini_img, unit: "Kg", tag: "Exotic", description: "Highly prized for their deep, nutty flavor and substantial texture." },
    { id: "m9", category: categories.MUSHROOM, name: "King Oyster Mushroom", price: 700, img: king_oyster_img, unit: "Kg", tag: "Meat-like", description: "Thick, fleshy stalk and small cap, known for its savory umami flavor and meaty texture." },
    { id: "m10", category: categories.MUSHROOM, name: "Maitake Mushroom", price: 900, img: maitake_img, unit: "Kg", tag: "Layered", description: "Also known as Hen of the Woods, featuring a ruffled, petal-like appearance and spicy flavor." },
    { id: "m11", category: categories.MUSHROOM, name: "Chanterelle Mushroom", price: 1800, img: chanterelle_img, unit: "Kg", tag: "Aromatic", description: "Golden-yellow, trumpet-shaped mushrooms with a delicate fruity, apricot-like aroma." },
    { id: "m12", category: categories.MUSHROOM, name: "Lion's Mane Mushroom", price: 1100, img: lions_mane_img, unit: "Kg", tag: "Nocturnal", description: "Large, white, shaggy mushrooms that resemble a lion's mane, known for cognitive benefits." },

    // Dairy
    {
        id: "d1",
        category: categories.DAIRY,
        name: "Raw A2 Cow Milk",
        price: 85,
        img: milk_img,
        unit: "Litre",
        color: "from-blue-500/10",
        tag: "In Stock",
        badge: "PUREST",
        description: "Pure, unprocessed A2 milk from our desi cows. Rich in A2 beta-casein protein.",
        longDescription: "Our cows are grass-fed and treated with love. The milk is chilled immediately after milking to preserve its natural goodness and delivered to your doorstep within hours.",
        specifications: [
            { label: "Type", value: "A2 Desi Cow Milk" },
            { label: "Fat Content", value: "4.5% - 5%" },
            { label: "Origin", value: "Susheela Upvan Farm" }
        ],
        highlights: ["Antibiotic Free", "No Hormones", "Traditionally Processed"]
    },
    { id: "d2", category: categories.DAIRY, name: "Vedic Bilona Ghee", price: 1200, img: ghee_img, unit: "Kg", color: "from-amber-500/10", tag: "Premium", description: "Traditionally made from A2 curd using the wooden bilona method." },
    { id: "d3", category: categories.DAIRY, name: "Natural Farm Curd", price: 60, img: curd_img, unit: "Kg", color: "from-cyan-500/10", tag: "Fresh Daily", description: "Creamy, thick curd set naturally using age-old techniques." },
    { id: "d4", category: categories.DAIRY, name: "Organic Butter", price: 450, img: butter_img, unit: "Kg", color: "from-orange-500/10", tag: "Artisan Made", description: "Hand-churned butter with a rich, golden color and natural aroma." },
    { id: "d5", category: categories.DAIRY, name: "Fresh Paneer", price: 400, img: paneer_img, unit: "Kg", color: "from-emerald-500/10", tag: "Organic", description: "Soft, fresh cottage cheese made from pure whole milk." },
    { id: "d6", category: categories.DAIRY, name: "Greek Yogurt", price: 120, img: yogurt_img, unit: "Kg", color: "from-purple-500/10", tag: "High Protein", description: "Thick, creamy yogurt with more protein and less sugar." },
    { id: "d7", category: categories.DAIRY, name: "Fresh Cream", price: 180, img: cream_img, unit: "Litre", color: "from-pink-500/10", tag: "Farm Fresh", description: "Rich, luscious cream perfect for many culinary uses." },
    { id: "d8", category: categories.DAIRY, name: "Flavored Milk", price: 45, img: flavored_milk_img, unit: "Bottle", color: "from-yellow-500/10", tag: "Refreshing", description: "Natural flavors blended with fresh milk for a healthy treat." },
];

export const getProductById = (id) => products.find(p => p.id === id);
