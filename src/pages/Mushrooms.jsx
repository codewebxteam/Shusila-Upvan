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
  Leaf,
  ArrowRight
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import DeliveryForm from '../pages/DeliveryForm';

// --- IMAGE IMPORTS ---
import heroImage from "../assets/hero.webp";
import button from "../assets/knowledge/button.webp";
import oyster from "../assets/knowledge/oyster.webp";
import shitake from "../assets/knowledge/shitake.webp";
import milky from "../assets/knowledge/milky.webp";
import king from "../assets/knowledge/king.webp";
import enoki from "../assets/knowledge/enoki.webp";
import cremini from "../assets/knowledge/cremini.webp";
import protobelo from "../assets/knowledge/protobelo.webp";

// --- INITIAL DATA ---
const initialMushroomData = [
  {
    id: 1,
    slug: "button",
    name: "Button Mushroom",
    image: button,
    category: "Culinary",
    price: 12.99,
    stock: 50,
    rating: 4.5,
    deliveryTime: "1-2 days",
    origin: "Local Farm",
    fullDescription: "Mild flavor, commonly used in soups, curries, pizzas, and salads. Rich in B vitamins, selenium, and low-calorie.",
    healthBenefits: ["Rich in antioxidants", "Boosts immunity", "Low calorie"],
    storageTips: "Store in paper bag in refrigerator for up to 1 week",
  },
  {
    id: 2,
    slug: "oyster",
    name: "Oyster Mushroom",
    image: oyster,
    category: "Gourmet",
    price: 10.5,
    stock: 30,
    rating: 4.7,
    deliveryTime: "1-2 days",
    origin: "Organic Farm",
    fullDescription: "Delicate taste, often used in stir-fries, soups, and as a meat substitute. High in protein and antioxidants.",
    healthBenefits: ["High protein", "Heart healthy", "Rich in iron"],
    storageTips: "Keep in original packaging, consume within 3-4 days",
  },
  {
    id: 3,
    slug: "shiitake",
    name: "Shiitake Mushroom",
    image: shitake,
    category: "Medicinal",
    price: 18.0,
    stock: 25,
    rating: 4.9,
    deliveryTime: "2-3 days",
    origin: "Mountain Farms",
    fullDescription: "Rich, umami flavor. Used in Asian dishes and supplements. Boosts immunity and has medicinal compounds.",
    healthBenefits: ["Immune booster", "Anti-inflammatory", "Cholesterol control"],
    storageTips: "Store in breathable container, use within 5 days",
  },
  {
    id: 4,
    slug: "milky",
    name: "Milky Mushroom",
    image: milky,
    category: "Culinary",
    price: 8.75,
    stock: 40,
    rating: 4.3,
    deliveryTime: "1 day",
    origin: "Local Farm",
    fullDescription: "Soft texture with a slightly sweet taste. Popular in Indian curries and stir-fries. High in dietary fiber and vitamins.",
    healthBenefits: ["High fiber", "Digestive health", "Vitamin B source"],
    storageTips: "Wrap in damp cloth, refrigerate",
  },
  {
    id: 5,
    slug: "king",
    name: "King Oyster Mushroom",
    image: king,
    category: "Gourmet",
    price: 15.0,
    stock: 20,
    rating: 4.8,
    deliveryTime: "2-3 days",
    origin: "Specialty Farm",
    fullDescription: "Meaty, firm texture. Great for grilling, soups, and gourmet dishes. Rich in protein, low in fat.",
    healthBenefits: ["High protein", "Low fat", "Rich in potassium"],
    storageTips: "Store in paper bag, avoid plastic",
  },
  {
    id: 6,
    slug: "enoki",
    name: "Enoki Mushroom",
    image: enoki,
    category: "Culinary",
    price: 14.0,
    stock: 35,
    rating: 4.4,
    deliveryTime: "1-2 days",
    origin: "Controlled Environment",
    fullDescription: "Mild, crunchy mushrooms used in soups, salads, and sushi. Contains antioxidants and supports digestion.",
    healthBenefits: ["Digestive aid", "Antioxidant rich", "Low calorie"],
    storageTips: "Keep in original packaging, refrigerate",
  },
  {
    id: 7,
    slug: "cremini",
    name: "Cremini Mushroom",
    image: cremini,
    category: "Culinary",
    price: 9.0,
    stock: 45,
    rating: 4.2,
    deliveryTime: "1 day",
    origin: "Local Farm",
    fullDescription: "Deeper flavor than button mushrooms. Used in pastas, stews, and curries. Rich in antioxidants.",
    healthBenefits: ["Antioxidant rich", "Immune support", "Energy boost"],
    storageTips: "Store in paper bag, keep dry",
  },
  {
    id: 8,
    slug: "portobello",
    name: "Portobello Mushroom",
    image: protobelo,
    category: "Gourmet",
    price: 20.0,
    stock: 15,
    rating: 4.9,
    deliveryTime: "2-3 days",
    origin: "Organic Farm",
    fullDescription: "Large, meaty mushrooms. Perfect for grilling as burgers or stuffing. Rich in nutrients.",
    healthBenefits: ["Nutrient dense", "Heart healthy", "Vitamin D source"],
    storageTips: "Store in cool dry place, use within 4 days",
  },
  {
    id: 9,
    slug: "maitake",
    name: "Maitake Mushroom",
    image: button,
    category: "Medicinal",
    price: 22.0,
    stock: 18,
    rating: 4.7,
    deliveryTime: "3-4 days",
    origin: "Mountain Farms",
    fullDescription: "Also known as Hen of the Woods. Medicinal properties for immune support and blood sugar control.",
    healthBenefits: ["Immune support", "Blood sugar control", "Rich in beta-glucans"],
    storageTips: "Store in paper bag, refrigerate for up to 5 days",
  },
  {
    id: 10,
    slug: "lion-mane",
    name: "Lion's Mane Mushroom",
    image: oyster,
    category: "Medicinal",
    price: 25.0,
    stock: 12,
    rating: 4.9,
    deliveryTime: "3-5 days",
    origin: "Specialty Farm",
    fullDescription: "Cognitive enhancing mushroom with neuroprotective properties. Unique seafood-like flavor.",
    healthBenefits: ["Cognitive support", "Nerve regeneration", "Anti-inflammatory"],
    storageTips: "Keep dry, store in breathable container",
  },
  {
    id: 11,
    slug: "chanterelle",
    name: "Chanterelle Mushroom",
    image: shitake,
    category: "Gourmet",
    price: 28.0,
    stock: 8,
    rating: 4.8,
    deliveryTime: "2-4 days",
    origin: "Wild Harvest",
    fullDescription: "Prized gourmet mushroom with fruity aroma and peppery taste. Excellent in creamy sauces.",
    healthBenefits: ["Rich in Vitamin D", "Antioxidant", "Low calorie"],
    storageTips: "Wrap in paper towels, refrigerate immediately",
  },
  {
    id: 12,
    slug: "morel",
    name: "Morel Mushroom",
    image: milky,
    category: "Gourmet",
    price: 35.0,
    stock: 5,
    rating: 5.0,
    deliveryTime: "4-5 days",
    origin: "Wild Harvest",
    fullDescription: "Highly prized seasonal mushroom with honeycomb appearance. Earthy, nutty flavor.",
    healthBenefits: ["Rich in iron", "Vitamin D source", "Antioxidant"],
    storageTips: "Store dry, use within 2-3 days of purchase",
  },
];

const initialTestimonialData = [
  {
    id: 1,
    name: "Sarah L.",
    stars: 5,
    quote: "The freshest shiitake I've ever had. Made my stir-fry incredible and the delivery was so fast!",
    location: "New York",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Mike R.",
    stars: 5,
    quote: "I tried the Lion's Mane for its health benefits, and I'm amazed. The quality is top-notch.",
    location: "California",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Jessica Chen",
    stars: 5,
    quote: "MushroomMart is my go-to for gourmet mushrooms. The Chanterelles were perfect for my risotto.",
    location: "Chicago",
    date: "3 days ago",
  },
];

// --- SERVICE CLASS ---
class MushroomService {
  static async fetchMushrooms() {
    try {
      const response = await fetch('/api/mushrooms');
      if (!response.ok) throw new Error("Failed to fetch");
      return await response.json();
    } catch (error) {
      return initialMushroomData;
    }
  }

  static async fetchTestimonials() {
    try {
      const response = await fetch('/api/testimonials');
      if (!response.ok) throw new Error("Failed to fetch");
      return await response.json();
    } catch (error) {
      return initialTestimonialData;
    }
  }
}

// --- HERO SECTION ---
const HeroSection = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = async () => {
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
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green-500/20 rounded-full blur-[120px]"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-emerald-500/20 rounded-full blur-[100px]"
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
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-gray-400 text-sm">Premium Organic Mushrooms</span>
        </motion.div>

        <motion.h1
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover Nature's{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
            Finest Fungi
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Fresh, organic, and exotic mushrooms delivered with care. 
          From our farms to your kitchen in 24 hours.
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
              className="px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 w-64"
            />
            <motion.button
              onClick={handleSubscribe}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center gap-2"
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

// --- PRODUCT GRID ---
const MushroomCarousel = ({ mushrooms, onImageClick }) => {
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mushrooms.length / itemsPerPage);
  const { addToCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = mushrooms.slice(startIndex, endIndex);

  const handleAddToCart = (mushroom, e) => {
    e.stopPropagation();
    try {
      addToCart({
        id: mushroom.id,
        slug: mushroom.slug,
        name: mushroom.name,
        price: mushroom.price,
        image: mushroom.image,
        quantity: 1,
        category: mushroom.category,
        stock: mushroom.stock,
        type: 'mushroom'
      });
      toast.success(`${mushroom.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart.");
    }
  };

  const handleQuickBuy = (mushroom, e) => {
    e.stopPropagation();
    if (mushroom.stock === 0) {
      toast.error("Product out of stock");
      return;
    }
    if (!user) {
      openAuthModal('login');
      return;
    }
    setSelectedProduct({ ...mushroom, selectedQuantity: 1 });
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
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((mushroom) => (
          <motion.div
            key={mushroom.id}
            className="group relative bg-white/5 rounded-2xl p-4 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:bg-white/10 cursor-pointer"
            onClick={() => onImageClick(mushroom.slug)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -5 }}
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-xl mb-4">
              <img
                src={mushroom.image}
                alt={mushroom.name}
                className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {mushroom.stock < 10 && (
                <div className="absolute top-2 left-2 bg-red-500/90 text-white px-2 py-1 rounded text-xs font-bold">
                  {mushroom.stock < 5 ? 'Almost Gone' : 'Low Stock'}
                </div>
              )}
              {mushroom.rating >= 4.5 && (
                <div className="absolute top-2 right-2 bg-yellow-500/90 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                  <Star size={10} fill="white" /> {mushroom.rating}
                </div>
              )}
            </div>

            {/* Details */}
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-white line-clamp-1">{mushroom.name}</h3>
                <p className="text-gray-400 text-sm flex items-center gap-1">
                  <MapPin size={12} /> {mushroom.origin}
                </p>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-400">${mushroom.price.toFixed(2)}</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className={i < Math.floor(mushroom.rating) ? "text-yellow-400 fill-current" : "text-gray-600"}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-xs">
                <span className={`px-2 py-1 rounded ${
                  mushroom.category === 'Medicinal' ? 'bg-purple-500/20 text-purple-300' :
                  mushroom.category === 'Gourmet' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-green-500/20 text-green-300'
                }`}>
                  {mushroom.category}
                </span>
                <span className={mushroom.stock > 10 ? 'text-green-400' : mushroom.stock > 0 ? 'text-yellow-400' : 'text-red-400'}>
                  {mushroom.stock > 0 ? `${mushroom.stock} left` : 'Out of stock'}
                </span>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={(e) => handleAddToCart(mushroom, e)}
                  disabled={mushroom.stock === 0}
                  className="flex-1 flex items-center justify-center gap-1 bg-green-600 hover:bg-green-700 text-white text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  <ShoppingCart size={14} /> Add
                </button>
                <button
                  onClick={(e) => handleQuickBuy(mushroom, e)}
                  disabled={mushroom.stock === 0}
                  className="flex-1 flex items-center justify-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-2.5 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Zap size={14} /> Buy
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Delivery Modal */}
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
                  <p className="text-gray-400 text-sm">{selectedProduct.name} - ${selectedProduct.price.toFixed(2)}</p>
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

      {/* Pagination */}
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
                  ? 'bg-green-600 text-white'
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

// --- QUANTITY SELECTOR ---
const QuantitySelector = ({ mushroom }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const { user, openAuthModal } = useAuth();

  const handleAddToCart = () => {
    try {
      addToCart({ ...mushroom, quantity, type: 'mushroom' });
      toast.success(`${quantity} ${mushroom.name} added!`);
    } catch (error) {
      toast.error("Failed to add");
    }
  };

  const handleBuyNow = () => {
    if (mushroom.stock === 0) {
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
            disabled={mushroom.stock === 0}
            className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            <ShoppingCart size={18} /> Add to Cart
          </button>
          <button 
            onClick={handleBuyNow}
            disabled={mushroom.stock === 0}
            className="flex items-center gap-2 bg-yellow-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-yellow-600 transition-colors disabled:opacity-50"
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
                  product={{ ...mushroom, selectedQuantity: quantity }}
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

// --- PRODUCT DETAILS ---
const ProductDetails = ({ mushroom }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={18}
            className={i < Math.floor(mushroom.rating) ? "text-yellow-400 fill-current" : "text-gray-600"}
          />
        ))}
        <span className="ml-2 text-gray-400">({mushroom.rating})</span>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
        mushroom.category === 'Medicinal' ? 'bg-purple-500/20 text-purple-300' :
        mushroom.category === 'Gourmet' ? 'bg-blue-500/20 text-blue-300' :
        'bg-green-500/20 text-green-300'
      }`}>
        {mushroom.category}
      </span>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        { icon: Package, label: "Stock", value: `${mushroom.stock} units`, color: "text-green-400" },
        { icon: Truck, label: "Delivery", value: mushroom.deliveryTime, color: "text-blue-400" },
        { icon: Shield, label: "Quality", value: "Organic", color: "text-purple-400" },
        { icon: MapPin, label: "Origin", value: mushroom.origin, color: "text-red-400" },
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
        {mushroom.healthBenefits?.map((benefit, idx) => (
          <span key={idx} className="px-3 py-1.5 bg-green-500/10 text-green-300 rounded-full text-sm border border-green-500/20">
            {benefit}
          </span>
        ))}
      </div>
    </div>

    <div>
      <h4 className="text-white font-semibold mb-2 flex items-center gap-2">
        <Clock size={18} className="text-blue-400" /> Storage Tips
      </h4>
      <p className="text-gray-400 text-sm">{mushroom.storageTips}</p>
    </div>
  </div>
);

// --- PRODUCT LIST SECTION ---
const ProductListSection = ({ mushrooms, productRefs }) => (
  <div className="w-full max-w-7xl mx-auto py-24 px-4 space-y-32">
    {mushrooms.map((mushroom, index) => (
      <div
        key={mushroom.id}
        id={mushroom.slug}
        ref={productRefs[mushroom.slug]}
        className="grid grid-cols-1 lg:grid-cols-2 items-center gap-16"
      >
        <motion.div
          className={`relative group ${index % 2 !== 0 ? "lg:order-last" : ""}`}
          initial={{ opacity: 0, x: index % 2 !== 0 ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute -inset-8 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-3xl opacity-50 group-hover:opacity-75 transition-opacity" />
          <img
            src={mushroom.image}
            alt={mushroom.name}
            className="relative w-full h-96 object-cover rounded-3xl border border-white/10"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: index % 2 !== 0 ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{mushroom.name}</h2>
          <p className="text-3xl font-bold text-green-400 mb-6">${mushroom.price.toFixed(2)}</p>
          <p className="text-gray-400 text-lg leading-relaxed mb-8">{mushroom.fullDescription}</p>
          <ProductDetails mushroom={mushroom} />
          <QuantitySelector mushroom={mushroom} />
        </motion.div>
      </div>
    ))}
  </div>
);

// --- BENEFITS SECTION ---
const BenefitsSection = () => (
  <div className="py-24 px-4 bg-white/5">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Why Choose Us</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: Truck, title: "Fast Delivery", desc: "24-48 hours delivery", color: "from-green-500 to-emerald-500" },
          { icon: Shield, title: "Quality Guaranteed", desc: "100% organic produce", color: "from-blue-500 to-cyan-500" },
          { icon: TrendingUp, title: "Best Prices", desc: "Direct from farm", color: "from-yellow-500 to-orange-500" },
          { icon: MessageCircle, title: "24/7 Support", desc: "Always here to help", color: "from-purple-500 to-pink-500" },
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

// --- TESTIMONIALS ---
const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonialData);

  useEffect(() => {
    MushroomService.fetchTestimonials().then(setTestimonials);
  }, []);

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
          <div className="w-24 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full" />
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
              <Quote className="absolute top-6 right-6 text-green-500/20" size={48} />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
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

// --- CONTACT SECTION ---
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("Message sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="py-24 px-4 bg-gradient-to-r from-green-900/50 to-emerald-900/50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">Need Help?</h2>
            <p className="text-gray-400 mb-8">Our experts are here to help you with recipes, tips, and orders.</p>
            
            <div className="space-y-6">
              {[
                { icon: Phone, label: "Call Us", value: "+1 (555) 123-4567" },
                { icon: Mail, label: "Email Us", value: "support@mushroommart.com" },
                { icon: Clock, label: "Available", value: "Mon-Sun: 8AM - 10PM" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                    <item.icon className="text-green-400" size={20} />
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
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50"
                required
              />
              <textarea
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-green-500/50 resize-none"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-opacity"
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

// --- MAIN COMPONENT ---
export default function MushroomsPage() {
  const [mushrooms, setMushrooms] = useState(initialMushroomData);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("popular");

  const categories = ["All", "Culinary", "Gourmet", "Medicinal"];
  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  const productRefs = initialMushroomData.reduce((acc, mushroom) => {
    acc[mushroom.slug] = useRef(null);
    return acc;
  }, {});

  useEffect(() => {
    MushroomService.fetchMushrooms().then(data => {
      setMushrooms(data);
      setLoading(false);
    });
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

  const filteredAndSortedMushrooms = React.useMemo(() => {
    let filtered = mushrooms;
    if (filter !== "All") filtered = filtered.filter(m => m.category === filter);
    if (search) filtered = filtered.filter(m => m.name.toLowerCase().includes(search.toLowerCase()));

    switch (sortBy) {
      case "price-low": return [...filtered].sort((a, b) => a.price - b.price);
      case "price-high": return [...filtered].sort((a, b) => b.price - a.price);
      case "rating": return [...filtered].sort((a, b) => b.rating - a.rating);
      default: return filtered.sort((a, b) => b.rating - a.rating);
    }
  }, [mushrooms, filter, search, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
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
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Premium Collection</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Handpicked from the finest farms</p>
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
                      ? "bg-green-600 text-white"
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
                  className="pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-green-500/50 w-48"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-green-500/50"
              >
                {sortOptions.map(opt => <option key={opt.value} value={opt.value} className="bg-[#1a1a1a]">{opt.label}</option>)}
              </select>
            </div>
          </div>

          {filteredAndSortedMushrooms.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <Search size={48} className="mx-auto mb-4 opacity-50" />
              <p>No mushrooms found</p>
            </div>
          ) : (
            <MushroomCarousel mushrooms={filteredAndSortedMushrooms} onImageClick={(slug) => productRefs[slug]?.current?.scrollIntoView({ behavior: "smooth" })} />
          )}
        </div>

        {filteredAndSortedMushrooms.length <= 8 && filteredAndSortedMushrooms.length > 0 && (
          <ProductListSection mushrooms={filteredAndSortedMushrooms} productRefs={productRefs} />
        )}

        <BenefitsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </div>
  );
}