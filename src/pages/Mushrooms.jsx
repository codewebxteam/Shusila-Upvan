import React, { useState, useCallback, useRef, useEffect } from "react";
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
} from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import DeliveryForm from '../pages/DeliveryForm'; 

// --- IMAGE IMPORTS from knowledge folder ---
import heroImage from "../assets/hero.webp";
import button from "../assets/knowledge/button.webp";
import oyster from "../assets/knowledge/oyster.webp";
import shitake from "../assets/knowledge/shitake.webp";
import milky from "../assets/knowledge/milky.webp";
import king from "../assets/knowledge/king.webp";
import enoki from "../assets/knowledge/enoki.webp";
import cremini from "../assets/knowledge/cremini.webp";
import protobelo from "../assets/knowledge/protobelo.webp";

// --- INITIAL DATA (Fallback if API fails) ---
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
    fullDescription:
      "Mild flavor, commonly used in soups, curries, pizzas, and salads. Rich in B vitamins, selenium, and low-calorie.",
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
    fullDescription:
      "Delicate taste, often used in stir-fries, soups, and as a meat substitute. High in protein and antioxidants.",
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
    fullDescription:
      "Rich, umami flavor. Used in Asian dishes and supplements. Boosts immunity and has medicinal compounds.",
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
    fullDescription:
      "Soft texture with a slightly sweet taste. Popular in Indian curries and stir-fries. High in dietary fiber and vitamins.",
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
    fullDescription:
      "Meaty, firm texture. Great for grilling, soups, and gourmet dishes. Rich in protein, low in fat.",
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
    fullDescription:
      "Mild, crunchy mushrooms used in soups, salads, and sushi. Contains antioxidants and supports digestion.",
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
    fullDescription:
      "Deeper flavor than button mushrooms. Used in pastas, stews, and curries. Rich in antioxidants.",
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
    fullDescription:
      "Large, meaty mushrooms. Perfect for grilling as burgers or stuffing. Rich in nutrients.",
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
    fullDescription:
      "Also known as Hen of the Woods. Medicinal properties for immune support and blood sugar control.",
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
    fullDescription:
      "Cognitive enhancing mushroom with neuroprotective properties. Unique seafood-like flavor.",
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
    fullDescription:
      "Prized gourmet mushroom with fruity aroma and peppery taste. Excellent in creamy sauces.",
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
    fullDescription:
      "Highly prized seasonal mushroom with honeycomb appearance. Earthy, nutty flavor.",
    healthBenefits: ["Rich in iron", "Vitamin D source", "Antioxidant"],
    storageTips: "Store dry, use within 2-3 days of purchase",
  },
];

const initialTestimonialData = [
  {
    id: 1,
    name: "Sarah L.",
    stars: 5,
    quote:
      "The freshest shiitake I've ever had. Made my stir-fry incredible and the delivery was so fast!",
    location: "New York",
    date: "2 weeks ago",
  },
  {
    id: 2,
    name: "Mike R.",
    stars: 5,
    quote:
      "I tried the Lion's Mane for its health benefits, and I'm amazed. The quality is top-notch.",
    location: "California",
    date: "1 month ago",
  },
  {
    id: 3,
    name: "Jessica Chen",
    stars: 5,
    quote:
      "MushroomMart is my go-to for gourmet mushrooms. The Chanterelles were perfect for my risotto.",
    location: "Chicago",
    date: "3 days ago",
  },
];

// --- BACKEND SERVICE FUNCTIONS ---
const API_ENDPOINTS = {
  GET_MUSHROOMS: 'https://api.example.com/mushrooms',
  ADD_TO_CART: 'https://api.example.com/cart/add',
  CREATE_ORDER: 'https://api.example.com/orders',
  GET_TESTIMONIALS: 'https://api.example.com/testimonials',
  SUBSCRIBE_NEWSLETTER: 'https://api.example.com/newsletter/subscribe',
  CONTACT_US: 'https://api.example.com/contact'
};

class MushroomService {
  static async fetchMushrooms() {
    try {
      const response = await fetch(API_ENDPOINTS.GET_MUSHROOMS);
      if (!response.ok) throw new Error("Failed to fetch mushrooms");
      return await response.json();
    } catch (error) {
      console.warn("Using fallback data:", error.message);
      return initialMushroomData;
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
    const result = await MushroomService.subscribeNewsletter(email);
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
        src={heroImage}
        alt="Exotic Mushrooms Banner"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1, opacity: 0 }}
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
          Discover Nature's Finest Fungi
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-white mb-8 drop-shadow max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          Fresh, Organic, and Delivered to Your Door. Farm to table in 24 hours.
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
            placeholder="Enter your email for updates"
            className="flex-1 px-4 py-3 rounded-full border-0 focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
          <button
            onClick={handleSubscribe}
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
          >
            <Mail size={20} /> Subscribe
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// --- COMPACT PRODUCT GRID with Pagination & Inline Buttons ---
// --- COMPACT PRODUCT GRID with Pagination & Inline Buttons ---
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
  
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Add to Cart handler for inline button
  const handleAddToCart = (mushroom, e) => {
    e.stopPropagation(); // Prevent card click event
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
  
  // Quick Buy handler for inline button - FIXED
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

    // Set selected product and open delivery form
    console.log("Opening delivery form for:", mushroom.name);
    setSelectedProduct({
      ...mushroom,
      selectedQuantity: 1
    });
    setShowDeliveryForm(true);
  };
  
  // Delivery form submit handler
  const handleOrderSubmit = (orderData) => {
    console.log("Order placed:", orderData);
    toast.success(`Order #${orderData.orderId} placed successfully!`);
    setShowDeliveryForm(false);
    setSelectedProduct(null);
  };

  const closeModal = () => {
    setShowDeliveryForm(false);
    setSelectedProduct(null);
  };
  
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      if (currentPage <= 3) {
        end = Math.min(totalPages - 1, 4);
      } else if (currentPage >= totalPages - 2) {
        start = Math.max(2, totalPages - 3);
      }
      
      if (start > 2) pages.push('...');
      
      for (let i = start; i <= end; i++) pages.push(i);
      
      if (end < totalPages - 1) pages.push('...');
      
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((mushroom) => (
          <motion.div
            key={mushroom.id}
            className="group relative bg-white rounded-xl p-4 border border-green-300/30 transition-all duration-300 hover:shadow-xl hover:border-green-400 hover:scale-[1.02] cursor-pointer"
            onClick={() => onImageClick(mushroom.slug)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={mushroom.image}
                alt={mushroom.name}
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Stock & Rating Badges */}
              {mushroom.stock < 10 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  {mushroom.stock < 5 ? 'Almost Gone' : 'Low Stock'}
                </div>
              )}
              {mushroom.rating >= 4.5 && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                  <Star size={10} fill="white" /> {mushroom.rating}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {mushroom.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <MapPin size={12} className="text-gray-400" />
                  <span className="truncate">{mushroom.origin}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  ${mushroom.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(mushroom.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({mushroom.rating})</span>
                </div>
              </div>
              
              {/* Category & Stock */}
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  mushroom.category === 'Medicinal' ? 'bg-purple-100 text-purple-800' :
                  mushroom.category === 'Gourmet' ? 'bg-blue-100 text-blue-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {mushroom.category}
                </span>
                <span className={`text-xs font-medium ${
                  mushroom.stock > 10 ? 'text-green-600' :
                  mushroom.stock > 0 ? 'text-amber-600' :
                  'text-red-600'
                }`}>
                  {mushroom.stock > 0 ? `${mushroom.stock} in stock` : 'Out of stock'}
                </span>
              </div>
              
              {/* Add to Cart & Quick Buy Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={(e) => handleAddToCart(mushroom, e)}
                  disabled={mushroom.stock === 0}
                  className="flex-1 flex items-center justify-center gap-1 bg-green-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
                
                <button
                  onClick={(e) => handleQuickBuy(mushroom, e)}
                  disabled={mushroom.stock === 0}
                  className="flex-1 flex items-center justify-center gap-1 bg-yellow-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap size={16} />
                  Buy Now
                </button>
              </div>
              
              {/* Delivery Info */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <Truck size={12} />
                  <span>{mushroom.deliveryTime}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={12} />
                  <span>Quick delivery</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* Delivery Form Modal */}
      <AnimatePresence>
        {showDeliveryForm && selectedProduct && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              <div className="sticky top-0 z-10 bg-white border-b p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Quick Order - {selectedProduct.name}</h2>
                  <p className="text-gray-600">Complete your purchase for ${selectedProduct.price.toFixed(2)} each</p>
                </div>
                <button 
                  onClick={closeModal} 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="mb-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.name} 
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="font-bold text-lg">{selectedProduct.name}</h3>
                      <p className="text-gray-600">Quantity: 1 × ${selectedProduct.price.toFixed(2)}</p>
                      <p className="text-green-700 font-bold text-lg">Total: ${selectedProduct.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                
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
      
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
          <div className="text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(endIndex, mushrooms.length)} of {mushrooms.length} products
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            
            <div className="flex gap-1">
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
                      currentPage === page
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600">Items per page:</span>
            <div className="relative">
              <select 
                className="px-3 py-1 border border-gray-300 rounded-lg bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
                value={itemsPerPage}
                onChange={(e) => {
                  console.log("Items per page changed to:", e.target.value);
                }}
              >
                <option value="8">8</option>
                <option value="12">12</option>
                <option value="16">16</option>
                <option value="20">20</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      )}
      
      {currentProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Package size={48} className="mx-auto" />
          </div>
          <p className="text-gray-500 text-lg">No products found</p>
        </div>
      )}
    </div>
  );
};

// Utility component for dropdown arrow
const ChevronDown = ({ size = 16, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="6 9 12 15 18 9"></polyline>
  </svg>
);

// QuantitySelector component (for detailed view)
const QuantitySelector = ({ mushroom }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { user, openAuthModal } = useAuth();

  const handleAddToCart = () => {
    try {
      addToCart({
        id: mushroom.id,
        slug: mushroom.slug,
        name: mushroom.name,
        price: mushroom.price,
        image: mushroom.image,
        quantity: quantity,
        category: mushroom.category,
        stock: mushroom.stock,
        type: 'mushroom'
      });
      toast.success(`${quantity} ${mushroom.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart.");
    }
  };

  const handleBuyNow = () => {
    console.log("Buy Now clicked", { user: user?.email, stock: mushroom.stock });

    if (mushroom.stock === 0) {
      toast.error("Product out of stock");
      return;
    }

    if (!user) {
      console.log("No user found, showing auth modal");
      openAuthModal('login');
      return;
    }

    console.log("User authenticated, showing delivery form");
    setSelectedProduct({
      ...mushroom,
      selectedQuantity: quantity
    });
    setShowDeliveryForm(true);
  };

  const handleOrderSubmit = (orderData) => {
    console.log("Order placed:", orderData);
    toast.success(`Order #${orderData.orderId} placed successfully!`);
    setShowDeliveryForm(false);
  };

  const closeModal = () => {
    setShowDeliveryForm(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
        <div className="flex items-center gap-2 bg-green-50 rounded-full p-1">
          <button 
            onClick={() => setQuantity((q) => Math.max(1, q - 1))} 
            className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
            disabled={mushroom.stock === 0}
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center text-lg font-bold">{quantity}</span>
          <button 
            onClick={() => setQuantity((q) => q + 1)} 
            className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
            disabled={mushroom.stock === 0 || quantity >= mushroom.stock}
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={handleAddToCart} 
            disabled={mushroom.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={20} />
            {mushroom.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
          
          <button 
            onClick={handleBuyNow} 
            disabled={mushroom.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white font-bold py-3 px-6 rounded-full hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap size={20} /> Buy Now
          </button>
        </div>
      </div>

      {/* Stock indicator */}
      {mushroom.stock > 0 && mushroom.stock <= 10 && (
        <div className="mt-2 text-sm text-amber-600 flex items-center gap-1">
          <Clock size={14} />
          Only {mushroom.stock} left in stock - order soon!
        </div>
      )}

      {/* Delivery Form Modal */}
      <AnimatePresence>
        {showDeliveryForm && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            >
              <div className="sticky top-0 z-10 bg-white border-b p-6 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold">Order Details</h2>
                  <p className="text-gray-600">Complete your purchase for {selectedProduct.name}</p>
                </div>
                <button 
                  onClick={closeModal} 
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <DeliveryForm 
                  product={selectedProduct}
                  quantity={selectedProduct.selectedQuantity}
                  onSubmit={handleOrderSubmit}
                  onCancel={closeModal}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- ENHANCED PRODUCT DETAILS ---
const ProductDetails = ({ mushroom }) => (
  <div className="space-y-6">
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={20}
            className={`${
              i < Math.floor(mushroom.rating)
                ? "text-yellow-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-gray-600">({mushroom.rating})</span>
      </div>
      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
        {mushroom.category}
      </span>
    </div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <Package size={20} className="text-green-600" />
        <div>
          <p className="text-sm text-gray-500">Stock</p>
          <p className="font-bold">{mushroom.stock} units</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <Truck size={20} className="text-blue-600" />
        <div>
          <p className="text-sm text-gray-500">Delivery</p>
          <p className="font-bold">{mushroom.deliveryTime}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <Shield size={20} className="text-purple-600" />
        <div>
          <p className="text-sm text-gray-500">Quality</p>
          <p className="font-bold">Organic</p>
        </div>
      </div>
      <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
        <MapPin size={20} className="text-red-600" />
        <div>
          <p className="text-sm text-gray-500">Origin</p>
          <p className="font-bold">{mushroom.origin}</p>
        </div>
      </div>
    </div>

    <div>
      <h4 className="text-lg font-bold mb-2 flex items-center gap-2">
        <Heart size={20} className="text-red-500" />
        Health Benefits
      </h4>
      <div className="flex flex-wrap gap-2">
        {mushroom.healthBenefits?.map((benefit, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm"
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
      <p className="text-gray-700">{mushroom.storageTips}</p>
    </div>
  </div>
);

// --- ENHANCED PRODUCT LIST SECTION ---
const ProductListSection = ({ mushrooms, productRefs }) => (
  <div className="w-full max-w-7xl mx-auto py-16 px-4 space-y-24">
    {mushrooms.map((mushroom, index) => (
      <div
        key={mushroom.id}
        id={mushroom.slug}
        ref={productRefs[mushroom.slug]}
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
            <div className="absolute -inset-6 bg-gradient-to-r from-green-200/40 to-blue-200/40 rounded-full blur-3xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
            <img
              src={mushroom.image}
              alt={mushroom.name}
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
              {mushroom.name}
            </h2>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-3xl font-bold text-green-600">
                ${mushroom.price.toFixed(2)}
              </p>
              {mushroom.stock < 5 && (
                <span className="text-sm text-red-600 font-semibold">
                  ⚠️ Only {mushroom.stock} left!
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-800 leading-relaxed mb-6 text-lg">
            {mushroom.fullDescription}
          </p>

          <ProductDetails mushroom={mushroom} />
          <QuantitySelector mushroom={mushroom} />
        </motion.div>
      </div>
    ))}
  </div>
);

// --- BENEFITS SECTION ---
const BenefitsSection = () => (
  <div className="bg-gradient-to-r from-green-50 to-blue-50 py-16">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
        Why Choose Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          {
            icon: <Truck size={32} />,
            title: "Fast Delivery",
            description: "24-48 hours delivery across the city",
            color: "from-green-500 to-emerald-500",
          },
          {
            icon: <Shield size={32} />,
            title: "Quality Guaranteed",
            description: "100% organic and fresh produce",
            color: "from-blue-500 to-cyan-500",
          },
          {
            icon: <TrendingUp size={32} />,
            title: "Best Prices",
            description: "Direct from farm, no middlemen",
            color: "from-yellow-500 to-orange-500",
          },
          {
            icon: <MessageCircle size={32} />,
            title: "24/7 Support",
            description: "Always here to help you",
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

// --- ENHANCED TESTIMONIALS SECTION ---
const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonialData);

  useEffect(() => {
    const loadTestimonials = async () => {
      const data = await MushroomService.fetchTestimonials();
      setTestimonials(data);
    };
    loadTestimonials();
  }, []);

  return (
    <div className="bg-white py-16">
      <div className="w-full max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative h-full bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl border border-green-200/50 flex flex-col shadow-lg"
            >
              <Quote
                className="absolute top-4 right-4 text-green-200/50"
                size={64}
              />
              <div className="z-10">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-r from-green-400 to-blue-400 flex items-center justify-center mr-4">
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
              <div className="flex text-yellow-500 mt-6">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- CONTACT/SUPPORT SECTION ---
const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT_US, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
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
              Our mushroom experts are here to help you with recipes, cultivation tips, and orders.
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
                  <p className="text-green-200">support@mushroommart.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Clock className="text-green-300" />
                <div>
                  <p className="font-bold">Available</p>
                  <p className="text-green-200">Mon-Sun: 8AM - 10PM</p>
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
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-green-200 focus:outline-none focus:border-green-300"
                  required
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-green-200 focus:outline-none focus:border-green-300"
                  required
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
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

// --- MAIN PAGE COMPONENT ---
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
    { value: "new", label: "Newest" },
  ];

  // refs for product scroll
  const productRefs = initialMushroomData.reduce((acc, mushroom) => {
    acc[mushroom.slug] = useRef(null);
    return acc;
  }, {});

  // Load data from backend on mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await MushroomService.fetchMushrooms();
      setMushrooms(data);
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

  // Filter and sort mushrooms
  const filteredAndSortedMushrooms = React.useMemo(() => {
    let filtered = mushrooms;

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
        return filtered.sort((a, b) => b.rating - a.rating);
    }
  }, [mushrooms, filter, search, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfbe9]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading mushrooms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fdfbe9] min-h-screen text-gray-900 font-sans">
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
              Premium Mushroom Collection
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              Handpicked from the finest farms, delivered fresh to your kitchen
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
                      ? "bg-green-600 text-white shadow-lg"
                      : "bg-green-100 text-gray-800 hover:bg-green-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search mushrooms..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 w-full sm:w-auto"
                />
              </div>
              
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 appearance-none bg-white pr-8"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-gray-600">
            {filteredAndSortedMushrooms.length} product{filteredAndSortedMushrooms.length !== 1 ? 's' : ''} found
            {filter !== 'All' && ` in ${filter}`}
            {search && ` matching "${search}"`}
          </div>

          {filteredAndSortedMushrooms.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No mushrooms found matching your criteria.</p>
              <button
                onClick={() => {
                  setFilter('All');
                  setSearch('');
                  setSortBy('popular');
                }}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                Clear filters and show all products
              </button>
            </div>
          ) : (
            <MushroomCarousel
              mushrooms={filteredAndSortedMushrooms}
              onImageClick={handleImageClick}
            />
          )}
        </motion.div>

        {/* Only show detailed product list if there are products and user hasn't searched/filtered too much */}
        {filteredAndSortedMushrooms.length <= 8 && filteredAndSortedMushrooms.length > 0 && (
          <ProductListSection
            mushrooms={filteredAndSortedMushrooms}
            productRefs={productRefs}
          />
        )}
        
        <BenefitsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
      {/* Add custom styles for line clamping */}
      <style jsx>{`
        .line-clamp-1 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 1;
        }
        .line-clamp-2 {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      `}</style>
    </div>
  );
}