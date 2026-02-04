import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  X,
  Milk,
  ArrowRight
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import DeliveryForm from '../pages/DeliveryForm';

// Image imports
import paneer from "../assets/dairy/paneer.jpg";
import cowmilk from "../assets/dairy/cowmilk.jpg";
import A2cow from "../assets/dairy/A2cow.jpg";
import buffalomilk from "../assets/dairy/buffalomilk.jpg";
import curd from "../assets/dairy/curd.jpg";
import cheese from "../assets/dairy/cheese.jpg";
import cowghee from "../assets/dairy/cowghee.jpg";
import butter from "../assets/dairy/butter.jpg";
import HeroMilk from "../assets/dairy/HeroMilk.jpg";

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
    deliveryTime: "Same-day",
    origin: "Local Dairy Farm",
    fullDescription: "Pure farm-fresh cow milk, unadulterated and delivered within hours of milking. Rich in essential nutrients and perfect for daily consumption.",
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
    deliveryTime: "Same-day",
    origin: "Organic Buffalo Farm",
    fullDescription: "Thick, creamy buffalo milk ideal for making curd, paneer, and desserts.",
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
    fullDescription: "A2 milk from indigenous Gir cows. Easily digestible and great for lactose-sensitive individuals.",
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
    deliveryTime: "Same-day",
    origin: "Local Dairy",
    fullDescription: "Soft, fresh, and protein-rich paneer perfect for curries, grilling, and snacking.",
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
    deliveryTime: "Same-day",
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
    fullDescription: "Traditional bilona-made A2 desi cow ghee with rich aroma and flavor.",
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
    fullDescription: "Soft, hand-churned makkhhan made from cultured cream. Perfect for parathas and spreads.",
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
    fullDescription: "Soft, mild farm cheese ideal for sandwiches, pizzas, and salads.",
    healthBenefits: ["High calcium", "Supports bone health", "Good source of protein"],
    storageTips: "Refrigerate; stays good for 5–6 days.",
    size: "200g",
  },
  {
    id: 9,
    slug: "lassi",
    name: "Sweet Lassi (500ml)",
    image: curd,
    category: "Fermented Dairy",
    price: 80.0,
    stock: 45,
    rating: 4.5,
    deliveryTime: "Same-day",
    origin: "Local Dairy",
    fullDescription: "Freshly made sweet lassi, perfect for summers.",
    healthBenefits: ["Cooling effect", "Probiotic", "Refreshing"],
    storageTips: "Consume immediately or refrigerate for 2-3 hours",
    size: "500ml",
  },
  {
    id: 10,
    slug: "malai",
    name: "Fresh Cream (Malai) 200g",
    image: butter,
    category: "Cream",
    price: 150.0,
    stock: 35,
    rating: 4.4,
    deliveryTime: "Same-day",
    origin: "Local Dairy",
    fullDescription: "Fresh malai cream collected from boiled milk.",
    healthBenefits: ["Rich in fats", "Energy source", "Natural"],
    storageTips: "Refrigerate; use within 2 days",
    size: "200g",
  },
  {
    id: 11,
    slug: "toned-milk",
    name: "Toned Milk (1L)",
    image: cowmilk,
    category: "Milk",
    price: 55.0,
    stock: 90,
    rating: 4.3,
    deliveryTime: "Same-day",
    origin: "Dairy Farm",
    fullDescription: "Toned milk with balanced fat content for healthy living.",
    healthBenefits: ["Lower fat", "High nutrition", "Balanced"],
    storageTips: "Refrigerate immediately",
    size: "1L",
    fat: "3%",
    snf: "8.5%",
  },
  {
    id: 12,
    slug: "flavored-milk",
    name: "Flavored Milk (500ml)",
    image: cowmilk,
    category: "Milk",
    price: 70.0,
    stock: 60,
    rating: 4.6,
    deliveryTime: "Same-day",
    origin: "Local Dairy",
    fullDescription: "Delicious flavored milk available in chocolate and kesar varieties.",
    healthBenefits: ["Tasty", "Nutritious", "Energy drink"],
    storageTips: "Refrigerate; consume within 24 hours",
    size: "500ml",
  },
];

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

// Hero Section
const HeroSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    toast.success("Subscribed successfully!");
    setEmail("");
  };

  return (
    <motion.div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-yellow-500/20 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/20 rounded-full blur-[100px]"
          animate={{ scale: [1.2, 1, 1.2], x: [0, -20, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6"
        >
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
          <span className="text-gray-400 text-sm">Farm Fresh Daily Delivery</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Pure Dairy{" "}
          <span className="bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">
            Delivered Fresh
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Daily milk, handcrafted ghee, soft paneer and more — delivered fresh every morning from our farms to your home.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 w-64"
            />
            <motion.button
              onClick={handleSubscribe}
              className="bg-gradient-to-r from-yellow-500 to-amber-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Product Grid
const DairyCarousel = ({ products, onImageClick }) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const { addToCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    try {
      addToCart({ ...product, quantity: 1, type: 'dairy' });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart.");
    }
  };

  const handleQuickBuy = (product, e) => {
    e.stopPropagation();
    if (product.stock === 0) {
      toast.error("Product out of stock");
      return;
    }
    if (!user) {
      openAuthModal('login');
      return;
    }
    setSelectedProduct({ ...product, selectedQuantity: 1 });
    setShowDeliveryForm(true);
  };

  const handleOrderSubmit = (orderData) => {
    toast.success(`Order #${orderData.orderId} placed successfully!`);
    setShowDeliveryForm(false);
    setSelectedProduct(null);
  };

  const closeModal = () => {
    setShowDeliveryForm(false);
    setSelectedProduct(null);
  };

  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <motion.div
            key={product.id}
            className="group relative bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-yellow-500/30 transition-all duration-300 hover:bg-white/10 cursor-pointer"
            onClick={() => onImageClick(product.slug)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {product.stock < 10 && (
                <div className="absolute top-2 left-2 bg-red-500/90 text-white px-2 py-1 rounded text-xs font-bold">
                  {product.stock < 5 ? 'Almost Gone' : 'Low Stock'}
                </div>
              )}
              {product.rating >= 4.5 && (
                <div className="absolute top-2 right-2 bg-yellow-500/90 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                  <Star size={10} fill="white" /> {product.rating}
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white line-clamp-1">{product.name}</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1">
                  <MapPin size={12} /> {product.origin}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-yellow-400">₹{product.price.toFixed(2)}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className={`px-2 py-1 rounded ${
                  product.category === 'Premium Milk' ? 'bg-purple-500/20 text-purple-300' :
                  product.category === 'Ghee' ? 'bg-amber-500/20 text-amber-300' :
                  product.category === 'Paneer & Cheese' ? 'bg-blue-500/20 text-blue-300' :
                  product.category === 'Butter' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {product.category}
                </span>
                <span className={product.stock > 10 ? 'text-green-400' : product.stock > 0 ? 'text-yellow-400' : 'text-red-400'}>
                  {product.stock > 0 ? `${product.stock} left` : 'Out of stock'}
                </span>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-1 bg-yellow-600 hover:bg-yellow-700 text-white text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  <ShoppingCart size={14} /> Add
                </button>
                <button
                  onClick={(e) => handleQuickBuy(product, e)}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Zap size={14} /> Buy
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showDeliveryForm && selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#1a1a1a] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              <div className="sticky top-0 z-10 bg-[#1a1a1a] border-b border-white/10 p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-white">Quick Order</h2>
                  <p className="text-gray-400 text-sm">{selectedProduct.name} - ₹{selectedProduct.price.toFixed(2)}</p>
                </div>
                <button onClick={closeModal} className="p-2 hover:bg-white/10 rounded-full text-gray-400 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
                <DeliveryForm 
                  product={selectedProduct}
                  quantity={1}
                  onSubmit={handleOrderSubmit}
                  onCancel={closeModal}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-12">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeft size={20} />
          </button>
          
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                currentPage === i + 1
                  ? 'bg-yellow-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              {i + 1}
            </button>
          ))}
          
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-white/5 border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

// Quantity Selector
const QuantitySelector = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const { user, openAuthModal } = useAuth();

  const handleAddToCart = () => {
    try {
      addToCart({ ...product, quantity, type: 'dairy' });
      toast.success(`${quantity} ${product.name} added!`);
    } catch (error) {
      toast.error("Failed to add");
    }
  };

  const handleBuyNow = () => {
    if (product.stock === 0) {
      toast.error("Out of stock");
      return;
    }
    if (!user) {
      openAuthModal('login');
      return;
    }
    setShowDeliveryForm(true);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
        <div className="flex items-center gap-2 bg-white/5 rounded-full p-1 border border-white/10">
          <button 
            onClick={() => setQuantity(q => Math.max(1, q - 1))}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center text-lg font-bold text-white">{quantity}</span>
          <button 
            onClick={() => setQuantity(q => q + 1)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="flex items-center gap-2 bg-yellow-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-700 transition-colors disabled:opacity-50"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
          <button 
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <Zap size={18} /> Buy Now
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showDeliveryForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-[#1a1a1a] rounded-2xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Order Details</h2>
                <button onClick={() => setShowDeliveryForm(false)} className="p-2 hover:bg-white/10 rounded-full text-gray-400">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto">
                <DeliveryForm 
                  product={{ ...product, selectedQuantity: quantity }}
                  quantity={quantity}
                  onSubmit={() => {
                    toast.success("Order placed!");
                    setShowDeliveryForm(false);
                  }}
                  onCancel={() => setShowDeliveryForm(false)}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// Product Details
const ProductDetails = ({ product }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"}
          />
        ))}
        <span className="ml-2 text-gray-400">({product.rating})</span>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        product.category === 'Premium Milk' ? 'bg-purple-500/20 text-purple-300' :
        product.category === 'Ghee' ? 'bg-amber-500/20 text-amber-300' :
        product.category === 'Paneer & Cheese' ? 'bg-blue-500/20 text-blue-300' :
        'bg-green-500/20 text-green-300'
      }`}>
        {product.category}
      </span>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: Package, label: "Stock", value: `${product.stock} units`, color: "text-yellow-400" },
        { icon: Truck, label: "Delivery", value: product.deliveryTime, color: "text-blue-400" },
        { icon: Shield, label: "Quality", value: "Farm Fresh", color: "text-purple-400" },
        { icon: MapPin, label: "Origin", value: product.origin, color: "text-red-400" },
      ].map((item, idx) => (
        <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-4">
          <item.icon size={20} className={item.color} />
          <p className="text-gray-500 text-xs mt-2">{item.label}</p>
          <p className="text-white font-semibold text-sm">{item.value}</p>
        </div>
      ))}
    </div>

    <div>
      <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
        <Heart size={18} className="text-red-400" /> Health Benefits
      </h4>
      <div className="flex flex-wrap gap-2">
        {product.healthBenefits?.map((benefit, idx) => (
          <span key={idx} className="px-3 py-1.5 bg-yellow-500/10 text-yellow-300 rounded-full text-sm border border-yellow-500/20">
            {benefit}
          </span>
        ))}
      </div>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
        <Clock size={18} className="text-blue-400" /> Storage Tips
      </h4>
      <p className="text-gray-400 text-sm">{product.storageTips}</p>
    </div>
  </div>
);

// Product List Section
const ProductListSection = ({ products, productRefs }) => (
  <div className="w-full max-w-7xl mx-auto py-24 px-4 space-y-32">
    {products.map((product, index) => (
      <div
        key={product.id}
        id={product.slug}
        ref={productRefs[product.slug]}
        className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16"
      >
        <motion.div
          className={`relative group ${index % 2 !== 0 ? "lg:order-last" : ""}`}
          initial={{ opacity: 0, x: index % 2 !== 0 ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -inset-8 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 rounded-3xl blur-3xl opacity-50 group-hover:opacity-75 transition-opacity" />
          <img
            src={product.image}
            alt={product.name}
            className="relative w-full h-96 object-cover rounded-3xl border border-white/10"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: index % 2 !== 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{product.name}</h2>
          <p className="text-3xl font-bold text-yellow-400 mb-6">₹{product.price.toFixed(2)}</p>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">{product.fullDescription}</p>
          <ProductDetails product={product} />
          <QuantitySelector product={product} />
        </motion.div>
      </div>
    ))}
  </div>
);

// Benefits Section
const BenefitsSection = () => (
  <div className="py-24 px-4 bg-white/5">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Our Dairy</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Truck, title: "Fresh Daily Delivery", desc: "Morning deliveries across the city", color: "from-yellow-500 to-amber-500" },
          { icon: Shield, title: "Farm-to-Home Quality", desc: "100% natural, no preservatives", color: "from-blue-500 to-cyan-500" },
          { icon: TrendingUp, title: "Fair Prices", desc: "Direct from farmers, fair for all", color: "from-green-500 to-emerald-500" },
          { icon: MessageCircle, title: "Customer Support", desc: "We're here to help — always", color: "from-purple-500 to-pink-500" },
        ].map((benefit, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors group"
          >
            <div className={`w-14 h-14 bg-gradient-to-r ${benefit.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <benefit.icon className="text-white" size={24} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
            <p className="text-gray-400">{benefit.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

// Testimonials
const TestimonialsSection = () => {
  const [testimonials] = useState(initialTestimonialData);

  return (
    <div className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">What Customers Say</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-500 to-amber-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 relative"
            >
              <Quote className="absolute top-6 right-6 text-yellow-500/20" size={48} />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-amber-400 rounded-full flex items-center justify-center">
                  <User className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-white font-bold">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.location} • {t.date}</p>
                </div>
              </div>
              <p className="text-gray-300 italic leading-relaxed">"{t.quote}"</p>
              <div className="flex text-yellow-400 mt-4">
                {[...Array(t.stars)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Contact Section
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="py-24 px-4 bg-gradient-to-r from-yellow-900/50 to-amber-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Need Help?</h2>
            <p className="text-gray-400 mb-8">Our dairy experts are here to help you with orders, subscriptions, and product advice.</p>
            
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567" },
                { icon: Mail, label: "Email Us", value: "support@dairybrand.com" },
                { icon: Clock, label: "Available", value: "Mon-Sun: 6AM - 10PM" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <item.icon className="text-yellow-400" size={20} />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">{item.label}</p>
                    <p className="text-white font-semibold">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50"
                required
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500/50 resize-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Main Component
export default function DairyPage() {
  const [products] = useState(initialDairyData);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popular");

  const categories = ["All", "Milk", "Premium Milk", "Paneer & Cheese", "Ghee", "Butter", "Fermented Dairy", "Cream"];
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  const productRefs = initialDairyData.reduce((acc, product) => {
    acc[product.slug] = useRef(null);
    return acc;
  }, {});

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => {
        productRefs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [location]);

  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = products;
    if (filter !== "All") filtered = filtered.filter(p => p.category === filter);
    if (search) filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    switch (sortBy) {
      case "price-low": return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high": return [...filtered].sort((a, b) => b.price - a.price);
      case "rating": return [...filtered].sort((a, b) => b.rating - a.rating);
      default: return filtered.sort((a, b) => b.rating - a.rating);
    }
  }, [products, filter, search, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] min-h-screen text-white">
      <Toaster position="top-center" toastOptions={{ style: { background: '#1a1a1a', color: '#fff', border: '1px solid #333' } }} />
      <HeroSection />
      
      <main>
        <div className="max-w-7xl mx-auto py-24 px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium Dairy Collection</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Farm-fresh milk, handcrafted ghee, soft paneer and more</p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <div className="flex gap-2 flex-wrap">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    filter === cat
                      ? "bg-yellow-600 text-white"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-yellow-500/50 w-48"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-yellow-500/50"
              >
                {sortOptions.map(opt => <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">{opt.label}</option>)}
              </select>
            </div>
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p>No dairy products found</p>
            </div>
          ) : (
            <DairyCarousel products={filteredAndSortedProducts} onImageClick={(slug) => productRefs[slug]?.current?.scrollIntoView({ behavior: "smooth" })} />
          )}
        </div>

        {filteredAndSortedProducts.length <= 8 && filteredAndSortedProducts.length > 0 && (
          <ProductListSection products={filteredAndSortedProducts} productRefs={productRefs} />
        )}

        <BenefitsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  );
}