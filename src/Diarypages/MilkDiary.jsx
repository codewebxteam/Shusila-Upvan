import React, { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Zap,
  Star,
  Quote,
  User,
  Plus,
  Minus,
  Search,
  Filter,
  TrendingUp,
  Package,
  Truck,
  Shield,
  Heart,
  Clock,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

// --- IMAGE IMPORTS for Dairy Products ---

import paneer from "../assets/dairy/paneer.jpg";
import cowmilk from "../assets/dairy/cowmilk.jpg";
import A2cow from "../assets/dairy/A2cow.jpg";
import buffalomilk from "../assets/dairy/buffalomilk.jpg";
import curd from "../assets/dairy/curd.jpg";
import cheese from "../assets/dairy/cheese.jpg";
import cowghee from "../assets/dairy/cowghee.jpg";
import butter from "../assets/dairy/butter.jpg";
import HeroMilk from "../assets/dairy/HeroMilk.jpg";

// API Endpoints (Backend URLs) - update these to match your backend
const API_ENDPOINTS = {
  GET_PRODUCTS: "https://your-backend-api.com/api/dairy/products",
  GET_PRODUCT_DETAIL: "https://your-backend-api.com/api/dairy/products/",
  ADD_TO_CART: "https://your-backend-api.com/api/cart/add",
  CREATE_ORDER: "https://your-backend-api.com/api/orders/create",
  GET_TESTIMONIALS: "https://your-backend-api.com/api/testimonials",
  CONTACT_US: "https://your-backend-api.com/api/contact",
  SUBSCRIBE_NEWSLETTER: "https://your-backend-api.com/api/subscribe",
};

// --- INITIAL DATA (fallback) for Dairy Products ---
const initialDairyData = [
  {
    id: 1,
    slug: "cow-milk",
    name: "Fresh Cow Milk (1L)",
    image: cowmilk,
    category: "Milk",
    price: 60.0,
    stock: 120,
    rating: 4.8,
    deliveryTime: "Same-day delivery",
    origin: "Local Dairy Farm",
    fullDescription:
      "Pure farm-fresh cow milk, unadulterated and delivered within hours of milking. Rich in essential nutrients and perfect for daily consumption.",
    healthBenefits: ["Rich in calcium", "Boosts immunity", "Improves bone health"],
    storageTips: "Refrigerate immediately. Use within 24–36 hours.",
    size: "1L",
    fat: "4%",
    snf: "8.5%",
  },
  {
    id: 2,
    slug: "buffalo-milk",
    name: "Buffalo Milk (1L)",
    image: buffalomilk,
    category: "Milk",
    price: 70.0,
    stock: 100,
    rating: 4.7,
    deliveryTime: "Same-day delivery",
    origin: "Organic Buffalo Farm",
    fullDescription:
      "Thick, creamy buffalo milk ideal for making curd, paneer, and desserts.",
    healthBenefits: ["High protein", "Nutrient-dense", "Builds muscle strength"],
    storageTips: "Keep refrigerated. Consume within 24 hours.",
    size: "1L",
    fat: "6%",
    snf: "9.0%",
  },
  {
    id: 3,
    slug: "a2-milk",
    name: "A2 Desi Cow Milk (1L)",
    image: A2cow,
    category: "Premium Milk",
    price: 120.0,
    stock: 60,
    rating: 4.9,
    deliveryTime: "Morning delivery",
    origin: "Gir Cow Farm",
    fullDescription:
      "A2 milk from indigenous Gir cows. Easily digestible and great for lactose-sensitive individuals.",
    healthBenefits: ["Aids digestion", "Anti-inflammatory", "Rich in A2 beta-casein"],
    storageTips: "Store at 4°C. Best consumed within 24 hours.",
    size: "1L",
    fat: "4.2%",
    snf: "8.6%",
  },
  {
    id: 4,
    slug: "fresh-paneer",
    name: "Fresh Paneer (200g)",
    image: paneer,
    category: "Paneer & Cheese",
    price: 320.0,
    stock: 40,
    rating: 4.8,
    deliveryTime: "Same-day delivery",
    origin: "Local Dairy",
    fullDescription:
      "Soft, fresh, and protein-rich paneer perfect for curries, grilling, and snacking.",
    healthBenefits: ["High in protein", "Good for muscle growth", "Source of healthy fats"],
    storageTips: "Refrigerate; consume within 48 hours.",
    size: "200g",
  },
  {
    id: 5,
    slug: "curd",
    name: "Natural Curd (500g)",
    image: curd,
    category: "Fermented Dairy",
    price: 90.0,
    stock: 80,
    rating: 4.9,
    deliveryTime: "Same-day delivery",
    origin: "Organic Dairy Farm",
    fullDescription: "Thick, creamy homemade-style curd made from fresh cow milk.",
    healthBenefits: ["Probiotic-rich", "Improves digestion", "Boosts gut health"],
    storageTips: "Keep refrigerated; lasts 2–3 days.",
    size: "500g",
  },
  {
    id: 6,
    slug: "ghee",
    name: "Desi Cow Ghee (500g)",
    image: cowghee,
    category: "Ghee",
    price: 900.0,
    stock: 50,
    rating: 5.0,
    deliveryTime: "2–3 days",
    origin: "Gir Cow Farm",
    fullDescription:
      "Traditional bilona-made A2 desi cow ghee with rich aroma and flavor.",
    healthBenefits: ["Boosts immunity", "Improves digestion", "Enhances brain health"],
    storageTips: "Store in a cool dry place. Do not refrigerate.",
    size: "500g",
  },
  {
    id: 7,
    slug: "butter",
    name: "Fresh White Butter (200g)",
    image: butter,
    category: "Butter",
    price: 450.0,
    stock: 30,
    rating: 4.6,
    deliveryTime: "1–2 days",
    origin: "Hand-Churned",
    fullDescription:
      "Soft, hand-churned makkhhan made from cultured cream. Perfect for parathas and spreads.",
    healthBenefits: ["Rich in good fats", "Energy booster", "Natural and preservative-free"],
    storageTips: "Refrigerate; stays fresh for 5–7 days.",
    size: "200g",
  },
  {
    id: 8,
    slug: "cheese",
    name: "Fresh Farm Cheese (200g)",
    image: cheese,
    category: "Paneer & Cheese",
    price: 380.0,
    stock: 25,
    rating: 4.7,
    deliveryTime: "2 days",
    origin: "Local Dairy",
    fullDescription:
      "Soft, mild farm cheese ideal for sandwiches, pizzas, and salads.",
    healthBenefits: ["High calcium", "Supports bone health", "Good source of protein"],
    storageTips: "Refrigerate; stays good for 5–6 days.",
    size: "200g",
  },
];

// --- FALLBACK testimonials ---
const initialTestimonialData = [
  {
    id: 1,
    name: "Anita S.",
    stars: 5,
    quote: "Milk delivered fresh every morning. Paneer quality is top-notch!",
    location: "Mumbai",
    date: "3 days ago",
  },
  {
    id: 2,
    name: "Rohit K.",
    stars: 5,
    quote: "Love the A2 milk — easier on the stomach and tastes great.",
    location: "Pune",
    date: "2 weeks ago",
  },
  {
    id: 3,
    name: "Priya M.",
    stars: 5,
    quote: "Ghee aroma is authentic, and butter is absolutely delicious.",
    location: "Bengaluru",
    date: "1 month ago",
  },
];

// --- BACKEND SERVICE FUNCTIONS (dairy) ---
class DairyService {
  static async fetchProducts() {
    try {
      const response = await fetch(API_ENDPOINTS.GET_PRODUCTS);
      if (!response.ok) throw new Error("Failed to fetch products");
      return await response.json();
    } catch (error) {
      console.warn("Using fallback dairy data:", error.message);
      return initialDairyData;
    }
  }

  static async addToCart(itemId, quantity, userId = null) {
    try {
      const response = await fetch(API_ENDPOINTS.ADD_TO_CART, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemId, quantity, userId }),
      });
      return await response.json();
    } catch (error) {
      console.error("Cart update failed:", error);
      return { success: false, message: "Failed to add to cart" };
    }
  }

  static async createOrder(orderData) {
    try {
      const response = await fetch(API_ENDPOINTS.CREATE_ORDER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      return await response.json();
    } catch (error) {
      console.error("Order creation failed:", error);
      return { success: false, message: "Order failed" };
    }
  }

  static async fetchTestimonials() {
    try {
      const response = await fetch(API_ENDPOINTS.GET_TESTIMONIALS);
      if (!response.ok) throw new Error("Failed to fetch testimonials");
      return await response.json();
    } catch (error) {
      console.warn("Using fallback testimonials");
      return initialTestimonialData;
    }
  }

  static async subscribeNewsletter(email) {
    try {
      const response = await fetch(API_ENDPOINTS.SUBSCRIBE_NEWSLETTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      return await response.json();
    } catch (error) {
      console.error("Newsletter subscription failed:", error);
      return { success: false, message: "Subscription failed" };
    }
  }
}

// --- HERO SECTION with Newsletter ---
const HeroSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    const result = await DairyService.subscribeNewsletter(email);
    if (result.success) {
      toast.success("Subscribed successfully!");
      setEmail("");
    } else {
      toast.error(result.message || "Subscription failed");
    }
  };

  return (
    <motion.div className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden">
      <motion.img
        src={HeroMilk}
        alt="Fresh Dairy Banner"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
      <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Fresh & Pure Dairy — Farm To Your Table
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white mb-8 drop-shadow max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Daily milk, handcrafted ghee, paneer and more — delivered fresh every morning.
        </motion.p>

        {/* Newsletter Subscription */}
        <motion.div
          className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email for offers & fresh drops"
            className="flex-1 px-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
          />
          <button
            onClick={handleSubscribe}
            className="bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2"
          >
            <Mail size={20} /> Subscribe
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- DAIRY PRODUCT CAROUSEL ---
const DairyCarousel = ({ products, onImageClick }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 4000 })]
  );

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {products.map((product) => (
            <motion.div
              className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 md:basis-1/3 pl-4 cursor-pointer"
              key={product.id}
              onClick={() => onImageClick(product.slug)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="group relative bg-white rounded-xl p-4 border border-yellow-300/30 transition-all duration-300 hover:shadow-2xl hover:border-yellow-400">
                <div className="relative overflow-hidden rounded-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  {product.stock < 10 && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      Low Stock
                    </div>
                  )}
                  {product.rating >= 4.5 && (
                    <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                      <Star size={10} fill="white" /> {product.rating}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {product.name}
                  </h3>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold text-yellow-600">
                      ₹{product.price.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {product.deliveryTime}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-600">{product.origin}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <button
        onClick={scrollPrev}
        className="absolute top-1/2 left-0 md:-left-4 transform -translate-y-1/2 bg-white/80 text-gray-900 p-3 rounded-full hover:bg-yellow-500 hover:text-white transition-colors z-10 shadow-lg"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={scrollNext}
        className="absolute top-1/2 right-0 md:-right-4 transform -translate-y-1/2 bg-white/80 text-gray-900 p-3 rounded-full hover:bg-yellow-500 hover:text-white transition-colors z-10 shadow-lg"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

// --- QUANTITY SELECTOR with Backend ---
const QuantitySelector = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    setLoading(true);
    const result = await DairyService.addToCart(product.id, quantity);

    if (result.success) {
      toast.success(`${quantity} x ${product.name} added to cart!`, {
        style: { background: "#fff7ed", color: "#92400e" },
        iconTheme: { primary: "#f59e0b", secondary: "#92400e" },
        duration: 3000,
      });
    } else {
      toast.error("Failed to add to cart. Please try again.");
    }
    setLoading(false);
  };

  const handleBuyNow = async () => {
    setLoading(true);
    const orderData = {
      items: [{ id: product.id, quantity }],
      total: product.price * quantity,
      customer: {}, // populate from auth/localStorage as needed
    };

    const result = await DairyService.createOrder(orderData);

    if (result.success) {
      toast.success("Order placed successfully!", {
        style: { background: "#e6f1dd", color: "#065f46" },
        iconTheme: { primary: "#22c55e", secondary: "#065f46" },
        duration: 4000,
      });
      // navigate to order confirmation if available
    } else {
      toast.error("Order failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
      <div className="flex items-center gap-2 bg-yellow-50 rounded-full p-1">
        <button
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          className="w-10 h-10 rounded-full bg-yellow-100 hover:bg-yellow-200 flex items-center justify-center transition-colors disabled:opacity-50"
          disabled={loading}
        >
          <Minus size={16} />
        </button>
        <span className="w-12 text-center text-lg font-bold text-gray-900">
          {quantity}
        </span>
        <button
          onClick={() => setQuantity((q) => q + 1)}
          className="w-10 h-10 rounded-full bg-yellow-100 hover:bg-yellow-200 flex items-center justify-center transition-colors disabled:opacity-50"
          disabled={loading || quantity >= product.stock}
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="flex gap-2 w-full sm:w-auto">
        <button
          onClick={handleAddToCart}
          disabled={loading || product.stock === 0}
          className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white font-bold py-3 px-6 rounded-full hover:bg-yellow-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            "Adding..."
          ) : (
            <>
              <ShoppingCart size={20} />
              {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </>
          )}
        </button>

        <button
          onClick={handleBuyNow}
          disabled={loading || product.stock === 0}
          className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Processing..." : <><Zap size={20} /> Buy Now</>}
        </button>
      </div>
    </div>
  );
};

// --- PRODUCT DETAILS ---
const ProductDetails = ({ product }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className={`${
              i < Math.floor(product.rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-gray-600">({product.rating})</span>
      </div>
      <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
        {product.category}
      </span>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <Package size={20} className="text-yellow-600" />
        <div>
          <p className="text-sm text-gray-500">Stock</p>
          <p className="font-bold">{product.stock} units</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <Truck size={20} className="text-blue-600" />
        <div>
          <p className="text-sm text-gray-500">Delivery</p>
          <p className="font-bold">{product.deliveryTime}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <Shield size={20} className="text-purple-600" />
        <div>
          <p className="text-sm text-gray-500">Quality</p>
          <p className="font-bold">Farm Fresh</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <MapPin size={20} className="text-red-600" />
        <div>
          <p className="text-sm text-gray-500">Origin</p>
          <p className="font-bold">{product.origin}</p>
        </div>
      </div>
    </div>

    <div>
      <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
        <Heart size={20} className="text-red-500" />
        Health Benefits
      </h4>
      <div className="flex flex-wrap gap-2">
        {product.healthBenefits?.map((benefit, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-yellow-50 text-yellow-800 rounded-full text-sm"
          >
            {benefit}
          </span>
        ))}
      </div>
    </div>

    <div>
      <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
        <Clock size={20} className="text-blue-500" />
        Storage Tips
      </h4>
      <p className="text-gray-700">{product.storageTips}</p>
      {product.size && <p className="text-sm text-gray-500 mt-2">Size: {product.size}</p>}
      {product.fat && <p className="text-sm text-gray-500">Fat: {product.fat}</p>}
      {product.snf && <p className="text-sm text-gray-500">SNF: {product.snf}</p>}
    </div>
  </div>
);

// --- PRODUCT LIST SECTION ---
const ProductListSection = ({ products, productRefs }) => (
  <div className="w-full max-w-7xl mx-auto py-16 px-4 space-y-24">
    {products.map((product, index) => (
      <div
        key={product.id}
        id={product.slug}
        ref={productRefs[product.slug]}
        className={`grid grid-cols-1 lg:grid-cols-2 items-center gap-12`}
      >
        <motion.div
          className={`relative group ${index % 2 !== 0 ? "lg:order-last" : ""}`}
          initial={{ opacity: 0, x: index % 2 !== 0 ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full max-w-lg mx-auto">
            <div className="absolute -inset-6 bg-gradient-to-r from-yellow-200/40 to-amber-200/40 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <img
              src={product.image}
              alt={product.name}
              className="relative w-full h-96 object-contain rounded-3xl shadow-2xl"
            />
          </div>
        </motion.div>

        <motion.div
          className="flex flex-col"
          initial={{ opacity: 0, x: index % 2 !== 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="mb-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-3">
              {product.name}
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-3xl font-bold text-yellow-600">
                ₹{product.price.toFixed(2)}
              </p>
              {product.stock < 5 && (
                <span className="text-sm text-red-600 font-semibold">
                  ⚠️ Only {product.stock} left!
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            {product.fullDescription}
          </p>

          <ProductDetails product={product} />
          <QuantitySelector product={product} />
        </motion.div>
      </div>
    ))}
  </div>
);

// --- BENEFITS SECTION ---
const BenefitsSection = () => (
  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
        Why Choose Our Dairy
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: <Truck size={32} />,
            title: "Fresh Daily Delivery",
            description: "Morning deliveries across the city",
            color: "from-yellow-400 to-amber-500",
          },
          {
            icon: <Shield size={32} />,
            title: "Farm-to-Home Quality",
            description: "100% natural, no preservatives",
            color: "from-blue-500 to-cyan-500",
          },
          {
            icon: <TrendingUp size={32} />,
            title: "Fair Prices",
            description: "Direct from farmers, fair for all",
            color: "from-yellow-500 to-orange-500",
          },
          {
            icon: <MessageCircle size={32} />,
            title: "Customer Support",
            description: "We’re here to help — always",
            color: "from-purple-500 to-pink-500",
          },
        ].map((benefit, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-xl transition-shadow"
          >
            <div
              className={`w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 mx-auto`}
            >
              <div className="text-white">{benefit.icon}</div>
            </div>
            <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
            <p className="text-gray-600">{benefit.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// --- TESTIMONIALS ---
const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonialData);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  );

  useEffect(() => {
    const loadTestimonials = async () => {
      const data = await DairyService.fetchTestimonials();
      setTestimonials(data);
    };
    loadTestimonials();
  }, []);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="bg-white py-16">
      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {testimonials.map((testimonial) => (
                <div
                  className="flex-grow-0 flex-shrink-0 basis-full sm:basis-1/2 lg:basis-1/3 pl-4"
                  key={testimonial.id}
                >
                  <div className="relative h-full bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200/50 flex flex-col shadow-lg">
                    <Quote
                      className="absolute top-4 right-4 text-green-200/50"
                      size={64}
                    />
                    <div className="z-10">
                      <div className="flex items-center mb-6">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center mr-4">
                          <User className="text-white" size={24} />
                        </div>
                        <div>
                          <p className="text-gray-900 font-bold text-lg">
                            {testimonial.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {testimonial.location} • {testimonial.date}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 italic text-lg leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                    </div>
                    <div className="flex text-green-500 mt-6">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <Star key={i} size={20} fill="currentColor" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={scrollPrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white/80 text-gray-900 p-3 rounded-full hover:bg-green-500 hover:text-white transition-colors z-10 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white/80 text-gray-900 p-3 rounded-full hover:bg-green-500 hover:text-white transition-colors z-10 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- CONTACT / SUPPORT SECTION ---
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Send to backend
    try {
      const response = await fetch(API_ENDPOINTS.CONTACT_US, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message");
      }
    } catch (error) {
      toast.error("Failed to send message");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gradient-to-r from-green-900 to-emerald-900 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Help? Contact Us
            </h2>
            <p className="text-green-100 mb-8 text-lg">
              Our dairy experts are here to help you with orders, subscriptions, and product advice.
            </p>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Phone className="text-green-300" />
                <div>
                  <p className="font-bold">Call Us</p>
                  <p className="text-green-200">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="text-green-300" />
                <div>
                  <p className="font-bold">Email Us</p>
                  <p className="text-green-200">support@dairybrand.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="text-green-300" />
                <div>
                  <p className="font-bold">Available</p>
                  <p className="text-green-200">Mon-Sun: 6AM - 10PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-green-200 focus:outline-none focus:border-green-300"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-green-200 focus:outline-none focus:border-green-300"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-green-200 focus:outline-none focus:border-green-300 resize-none"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-500 text-white py-3 rounded-lg font-bold hover:bg-green-600 transition-colors disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT with Backend Integration ---
export default function DairyPage() {
  const [products, setProducts] = useState(initialDairyData);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popular");

  const categories = ["All", "Milk", "Paneer & Cheese", "Ghee", "Butter", "Fermented Dairy", "Premium Milk"];
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
    { value: "new", label: "Newest" },
  ];

  // refs for product scroll
  const productRefs = initialDairyData.reduce((acc, product) => {
    acc[product.slug] = useRef(null);
    return acc;
  }, {});

  // Load data from backend on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await DairyService.fetchProducts();
      setProducts(data);
      setLoading(false);
    };
    loadData();
  }, []);

  const handleImageClick = (slug) => {
    productRefs[slug]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // Auto scroll when page loads with hash
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = productRefs[id]?.current;
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 300);
      }
    }
  }, [location, productRefs]);

  // Filter and sort products
  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = products;

    // Apply category filter
    if (filter !== "All") {
      filtered = filtered.filter((m) => m.category === filter);
    }

    // Apply search filter
    if (search) {
      filtered = filtered.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...filtered].sort((a, b) => b.price - a.price);
      case "rating":
        return [...filtered].sort((a, b) => b.rating - a.rating);
      case "new":
        return [...filtered].sort((a, b) => b.id - a.id);
      default:
        return filtered;
    }
  }, [products, filter, search, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf0]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dairy products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fffaf0] min-h-screen text-gray-900 font-sans">
      <Toaster position="top-center" />
      <HeroSection />
      <main>
        <motion.div
          className="w-full max-w-7xl mx-auto py-16 px-4"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Premium Dairy Collection
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Farm-fresh milk, handcrafted ghee, soft paneer and more — selected for quality.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <div className="flex gap-4 flex-wrap justify-center md:justify-start">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full font-medium transition-all ${
                    filter === cat
                      ? "bg-emerald-500 text-white shadow-lg"
                      : "bg-green-100 text-gray-800 hover:bg-emerald-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search dairy products..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>n
            </div>
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
            </div>
          ) : (
            <DairyCarousel
              products={filteredAndSortedProducts}
              onImageClick={handleImageClick}
            />
          )}
        </motion.div>

        <ProductListSection
          products={filteredAndSortedProducts}
          productRefs={productRefs}
        />

        <BenefitsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  );
}
