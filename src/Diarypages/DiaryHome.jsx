import { motion } from "framer-motion";
import heroImage from "../assets/cow 2.jpg";
import { Link, useNavigate } from "react-router-dom";
import {
  Milk,
  ShoppingBasket,
  Calendar,
  Users,
  BookOpen,
  Phone,
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";


// -- DAIRY PRODUCTS --

import paneer from "../assets/dairy/paneer.jpg";
import cowmilk from "../assets/dairy/cowmilk.jpg";
import A2cow from "../assets/dairy/A2cow.jpg";
import buffalomilk from "../assets/dairy/buffalomilk.jpg";
import curd from "../assets/dairy/curd.jpg";
import cheese from "../assets/dairy/cheese.jpg";
import cowghee from "../assets/dairy/cowghee.jpg";
import butter from "../assets/dairy/butter.jpg";

const dairyProducts = [
  {
    id: 1,
    name: "Fresh Natural Butter",
    image: paneer,
    taste: "Mild, Creamy, Soft",
    uses: "Paneer Butter Masala, Shahi Paneer",
    slug: "fresh-butter",
  },
  {
    id: 2,
    name: "Desi Cow Milk",
    image: cowmilk,
    taste: "Sweet, Creamy, Sweets",
    uses: "Tea, Coffee, paneer, Butter",
    slug: "desi-cow-milk",
  },
  {
    id: 3,
    name: "A2 Desi Cow Milk",
    image: A2cow,
    taste: "Sweet and Mild, Light, Less Heavy",
    uses: "Daily Drinking, Tea, Coffee, paneer, Butter",
    slug: "a2-cow-milk",
  },
  {
    id: 4,
    name: "Buffalo Milk",
    image: buffalomilk,
    taste: "Rich, Creamy, Sweet",
    uses: "Tea, Coffee, paneer, Butter",
    slug: "buffalo-milk",
  },
  {
    id: 5,
    name: "Fresh Natural Curd",
    image: curd,
    taste: "Sour, Creamy, Smooth Texture",
    uses: "Side Dish Meals, Lassi, Raita",
    slug: "fresh-curd",
  },
  {
    id: 6,
    name: "Fresh Natural Cheese",
    image: cheese,
    taste: "Rich, Creamy, Savoury",
    uses: "Pizza, Burger, Sandwiches",
    slug: "fresh-cheese",
  },
  {
    id: 7,
    name: "Fresh Cow Ghee",
    image: cowghee,
    taste: "Rich, Nutty, Aromatic & Sweet",
    uses: "Cooking, Frying, Sweets",
    slug: "cow-ghee",
  },
  {
    id: 8,
    name: "Natural Fresh Butter",
    image: butter,
    taste: "Creamy, Rich, Slightly Salty",
    uses: "Bread, Toast, Baking & Frying",
    slug: "natural-butter",
  },
];

// ---- Carousel Component ----
const DairyCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000 })]
  );

  const navigate = useNavigate();

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  // Click handler -> navigate to dairy products
  const handleCardClick = (slug) => {
    navigate(`/diary/milkdiary#${slug}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-20 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-8">
        Popular Milk Dairy Products
      </h2>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          {dairyProducts.map((product) => (
            <div
              key={product.id}
              className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 pl-6 cursor-pointer"
              onClick={() => handleCardClick(product.slug)}
            >
              <div className="bg-white rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 border border-green-200 flex flex-col sm:flex-row items-center gap-6">
                {/* Left Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 object-cover rounded-xl"
                />
                {/* Right Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-green-800">{product.name}</h3>
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">Taste:</span> {product.taste}
                  </p>
                  <p className="text-gray-700 text-sm">
                    <span className="font-semibold">Uses:</span> {product.uses}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next Buttons - Centered */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-green-500 hover:text-white"
      >
        ◀
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white p-3 rounded-full shadow hover:bg-green-500 hover:text-white"
      >
        ▶
      </button>
    </div>
  );
};

const Home = () => {
  return (
    <motion.div
      className="bg-gradient-to-b from-[#fdfbe9] via-[#f4fce3] to-[#e8f8f0] min-h-screen px-6 md:px-12 py-16 flex flex-col items-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <div className="flex flex-wrap gap-12 justify-between max-w-6xl w-full">
        {/* Left Text */}
        <div className="flex-1 text-gray-900 min-w-[300px]">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Milk Dairy <br />
            <span className="bg-gradient-to-r from-green-600 via-lime-500 to-yellow-500 bg-clip-text text-transparent font-extrabold">
              Buy, Learn & Build
            </span>{" "}
            The Milk Dairy Community
          </h1>
          <p className="text-gray-700 text-lg mb-6">
            Discover everything about Milk Dairy – from healthy Dairy Products to
            healthy recipes and community events. All in one place 🥛
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/diary/milkdiary">
              <button className="bg-gradient-to-r from-green-500 via-lime-400 to-yellow-400 text-white px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                Explore Dairy Products
              </button>
            </Link>
            <button className="border-2 border-green-600 text-green-700 px-6 py-3 rounded-full font-semibold transition-transform duration-300 hover:scale-105 hover:bg-green-600 hover:text-white">
              Request a Demo
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center min-w-[300px]">
          <img
            src={heroImage}
            alt="Dairy farm preview"
            className="max-w-full rounded-xl shadow-2xl border-4 border-yellow-200"
          />
        </div>
      </div>

      {/* Middle Heading */}
      <div className="w-full mt-28 flex justify-center">
        <div className="text-gray-900 text-2xl md:text-2xl font-semibold bg-gradient-to-r from-green-500 via-lime-400 to-yellow-400 px-6 py-2 rounded-full inline-block shadow-md">
          Fresh Dairy Products, Healthy Living, Strong Community.
        </div>
      </div>

      {/* 🔥 Carousel Section */}
      <DairyCarousel />

      {/* ---- What We Offer Section ---- */}
      <section className="w-full max-w-6xl mt-20 px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900">
            What We Offer
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto">
            Explore our services for Dairy, Dairy Products enthusiasts, and healthy
            Dairy Products lovers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Dairy Support */}
          <Link to="/diary/diarysupport">
            <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-200 hover:to-yellow-100 cursor-pointer h-full flex flex-col justify-between">
              <Milk size={48} className="mx-auto text-green-600" />  {/* Fixed: Changed from Sprout to Milk */}
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
               Dairy Support
              </h3>
              <p className="text-gray-700">
                Learn Dairy Products techniques, get expert help, and Make
                Dairy Products.
              </p>
            </div>
          </Link>

          {/* Buy Fresh Dairy Products */}
          <Link to="/diary/milkdiary">
            <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-200 hover:to-yellow-100 cursor-pointer h-full flex flex-col justify-between">
              <ShoppingBasket size={48} className="mx-auto text-yellow-500" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
                Buy Fresh Dairy Products
              </h3>
              <p className="text-gray-700">
                Order fresh, and exotic Dairy Products directly from trusted
                Dairy Products.
              </p>
            </div>
          </Link>

          {/* Dairy Community Events */}
          <Link to="/diary/diaryevents">
            <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-200 hover:to-yellow-100 cursor-pointer h-full flex flex-col justify-between">
              <Calendar size={48} className="mx-auto text-green-600" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
                Dairy Community Events
              </h3>
              <p className="text-gray-700">
                Join workshops, Dairy festivals, and Dairy meetups near you.
              </p>
            </div>
          </Link>

          {/* Dairy Knowledge Hub */}
          <Link to="/diary/diaryknowledge">
            <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-200 hover:to-yellow-100 h-full flex flex-col justify-between">
              <BookOpen size={48} className="mx-auto text-green-700" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
                Dairy Knowledge Hub
              </h3>
              <p className="text-gray-700">
                Access guides, recipes, and research to understand Dairy Products
                better.
              </p>
            </div>
          </Link>

          {/* Dairy Community */}
          <Link to="/diary/dairycommunity">
            <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-200 hover:to-yellow-100 h-full flex flex-col justify-between">
              <Users size={48} className="mx-auto text-yellow-500" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
                Milk Dairy Products Community
              </h3>
              <p className="text-gray-700">
                Connect with fellow Dairy Products and share knowledge &
                experiences.
              </p>
            </div>
          </Link>

          {/* Contact */}
          <Link to="/diary/diarycontacts">
            <div className="bg-green-100 p-8 rounded-xl text-center shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:bg-gradient-to-r hover:from-green-200 hover:to-yellow-100 cursor-pointer h-full flex flex-col justify-between">
              <Phone size={48} className="mx-auto text-green-600" />
              <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
                Contact Us
              </h3>
              <p className="text-gray-700">
                Have questions? Reach out for support and collaboration.
              </p>
            </div>
          </Link>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;