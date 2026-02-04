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
  ArrowRight,
  Leaf
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback } from "react";

// Dairy Products
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

// Carousel Component
const DairyCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000 })]
  );

  const navigate = useNavigate();

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const handleCardClick = (slug) => {
    navigate(`/diary/milkdiary#${slug}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto mt-20 relative">
      <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-8">
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
              <div className="bg-white/5 rounded-2xl p-5 border border-white/10 hover:border-yellow-500/30 transition-all duration-300 flex flex-col sm:flex-row items-center gap-6 group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-40 h-40 object-cover rounded-xl group-hover:scale-105 transition-transform"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-1">
                    <span className="text-gray-300 font-semibold">Taste:</span> {product.taste}
                  </p>
                  <p className="text-gray-400 text-sm">
                    <span className="text-gray-300 font-semibold">Uses:</span> {product.uses}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/10 border border-white/20 p-3 rounded-full text-white hover:bg-yellow-500 hover:border-yellow-500 transition-colors"
      >
        ◀
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/10 border border-white/20 p-3 rounded-full text-white hover:bg-yellow-500 hover:border-yellow-500 transition-colors"
      >
        ▶
      </button>
    </div>
  );
};

const Home = () => {
  return (
    <motion.div
      className="min-h-screen bg-[#0a0a0a] px-6 md:px-12 py-16 flex flex-col items-center pt-24"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      {/* Hero Section */}
      <div className="flex flex-wrap gap-12 justify-between max-w-6xl w-full">
        {/* Left Text */}
        <div className="flex-1 text-white min-w-[300px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
          >
            <Leaf className="text-yellow-400" size={16} />
            <span className="text-gray-400 text-sm">Premium Dairy Products</span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Milk Dairy <br />
            <span className="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent">
              Buy, Learn & Build
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg mb-8 max-w-lg">
            Discover everything about Milk Dairy – from healthy Dairy Products to
            healthy recipes and community events. All in one place 🥛
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/diary/milkdiary">
              <motion.button 
                className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-yellow-500/25"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Products <ArrowRight size={18} />
              </motion.button>
            </Link>
            <motion.button 
              className="border-2 border-white/20 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/5 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request a Demo
            </motion.button>
          </div>
        </div>

        {/* Right Image */}
        <motion.div 
          className="flex-1 flex justify-center min-w-[300px]"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-3xl blur-2xl" />
            <img
              src={heroImage}
              alt="Dairy farm preview"
              className="relative max-w-full rounded-3xl border border-white/10 shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Middle Heading */}
      <motion.div 
        className="w-full mt-28 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="text-white text-xl md:text-2xl font-semibold bg-white/5 border border-white/10 px-8 py-3 rounded-full inline-block">
          Fresh Dairy Products, Healthy Living, Strong Community.
        </div>
      </motion.div>

      {/* Carousel Section */}
      <DairyCarousel />

      {/* What We Offer Section */}
      <section className="w-full max-w-6xl mt-24 px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            What We Offer
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our services for Dairy enthusiasts and healthy living.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { to: "/diary/diarysupport", icon: Milk, title: "Dairy Support", desc: "Learn Dairy Products techniques, get expert help, and Make Dairy Products." },
            { to: "/diary/milkdiary", icon: ShoppingBasket, title: "Buy Fresh Dairy Products", desc: "Order fresh, and exotic Dairy Products directly from trusted Dairy Products." },
            { to: "/diary/diaryevents", icon: Calendar, title: "Dairy Community Events", desc: "Join workshops, Dairy festivals, and Dairy meetups near you." },
            { to: "/diary/diaryknowledge", icon: BookOpen, title: "Dairy Knowledge Hub", desc: "Access guides, recipes, and research to understand Dairy Products better." },
            { to: "/diary/dairycommunity", icon: Users, title: "Milk Dairy Products Community", desc: "Connect with fellow Dairy Products and share knowledge & experiences." },
            { to: "/diary/diarycontacts", icon: Phone, title: "Contact Us", desc: "Have questions? Reach out for support and collaboration." },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={feature.to}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 hover:border-yellow-500/30 transition-all duration-300 group h-full">
                  <div className="w-16 h-16 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon size={32} className="text-yellow-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-yellow-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;