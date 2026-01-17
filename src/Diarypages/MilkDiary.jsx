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
  {
    id: 9,
    slug: "lassi",
    name: "Sweet Lassi (500ml)",
    image: curd,
    category: "Fermented Dairy",
    price: 80.0,
    stock: 45,
    rating: 4.5,
    deliveryTime: "Same-day delivery",
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
    deliveryTime: "Same-day delivery",
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
    deliveryTime: "Same-day delivery",
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
    deliveryTime: "Same-day delivery",
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

// --- HERO SECTION with Newsletter ---
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

// --- COMPACT PRODUCT GRID with Pagination & Inline Buttons ---
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
  
  const goToPage = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  // Add to Cart handler for inline button
  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    try {
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        category: product.category,
        stock: product.stock,
        type: 'dairy'
      });
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart.");
    }
  };
  
  // Quick Buy handler for inline button
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

    // Set selected product and open delivery form
    setSelectedProduct({
      ...product,
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
  
  return (
    <div className="space-y-8">
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <motion.div
            key={product.id}
            className="group relative bg-white rounded-xl p-4 border border-yellow-300/30 transition-all duration-300 hover:shadow-xl hover:border-yellow-400 hover:scale-[1.02] cursor-pointer"
            onClick={() => onImageClick(product.slug)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            {/* Product Image */}
            <div className="relative overflow-hidden rounded-lg mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              
              {/* Stock & Rating Badges */}
              {product.stock < 10 && (
                <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                  {product.stock < 5 ? 'Almost Gone' : 'Low Stock'}
                </div>
              )}
              {product.rating >= 4.5 && (
                <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                  <Star size={10} fill="white" /> {product.rating}
                </div>
              )}
            </div>
            
            {/* Product Details */}
            <div className="space-y-3">
              <div>
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                  <MapPin size={12} className="text-gray-400" />
                  <span className="truncate">{product.origin}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-yellow-600">
                  ₹{product.price.toFixed(2)}
                </span>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={`${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({product.rating})</span>
                </div>
              </div>
              
              {/* Category & Stock */}
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 text-xs font-medium rounded ${
                  product.category === 'Premium Milk' ? 'bg-purple-100 text-purple-800' :
                  product.category === 'Ghee' ? 'bg-amber-100 text-amber-800' :
                  product.category === 'Paneer & Cheese' ? 'bg-blue-100 text-blue-800' :
                  product.category === 'Butter' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {product.category}
                </span>
                <span className={`text-xs font-medium ${
                  product.stock > 10 ? 'text-green-600' :
                  product.stock > 0 ? 'text-amber-600' :
                  'text-red-600'
                }`}>
                  {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>
              
              {/* Add to Cart & Quick Buy Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={(e) => handleAddToCart(product, e)}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-1 bg-yellow-500 text-white text-sm font-medium py-2 rounded-lg hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
                
                <button
                  onClick={(e) => handleQuickBuy(product, e)}
                  disabled={product.stock === 0}
                  className="flex-1 flex items-center justify-center gap-1 bg-green-600 text-white text-sm font-medium py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Zap size={16} />
                  Buy Now
                </button>
              </div>
              
              {/* Delivery Info */}
              <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1">
                  <Truck size={12} />
                  <span>{product.deliveryTime}</span>
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
                  <p className="text-gray-600">Complete your purchase for ₹{selectedProduct.price.toFixed(2)} each</p>
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
                      <p className="text-gray-600">Quantity: 1 × ₹{selectedProduct.price.toFixed(2)}</p>
                      <p className="text-green-700 font-bold text-lg">Total: ₹{selectedProduct.price.toFixed(2)}</p>
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
            Showing {startIndex + 1}-{Math.min(endIndex, products.length)} of {products.length} products
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

const QuantitySelector = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [showDeliveryForm, setShowDeliveryForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { user, openAuthModal } = useAuth();

  const handleAddToCart = () => {
    try {
      addToCart({
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        category: product.category,
        stock: product.stock,
        type: 'dairy'
      });
      toast.success(`${quantity} ${product.name} added to cart!`);
    } catch (error) {
      toast.error("Failed to add to cart.");
    }
  };

  const handleBuyNow = () => {
    if (product.stock === 0) {
      toast.error("Product out of stock");
      return;
    }

    if (!user) {
      openAuthModal('login');
      return;
    }

    setSelectedProduct({
      ...product,
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
        <div className="flex items-center gap-2 bg-yellow-50 rounded-full p-1">
          <button 
            onClick={() => setQuantity((q) => Math.max(1, q - 1))} 
            className="w-10 h-10 rounded-full bg-yellow-100 hover:bg-yellow-200 flex items-center justify-center transition-colors"
            disabled={product.stock === 0}
          >
            <Minus size={16} />
          </button>
          <span className="w-12 text-center text-lg font-bold">{quantity}</span>
          <button 
            onClick={() => setQuantity((q) => q + 1)} 
            className="w-10 h-10 rounded-full bg-yellow-100 hover:bg-yellow-200 flex items-center justify-center transition-colors"
            disabled={product.stock === 0 || quantity >= product.stock}
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={handleAddToCart} 
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 bg-yellow-500 text-white font-bold py-3 px-6 rounded-full hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={20} />
            {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
          </button>
          
          <button 
            onClick={handleBuyNow} 
            disabled={product.stock === 0}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white font-bold py-3 px-6 rounded-full hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap size={20} /> Buy Now
          </button>
        </div>
      </div>

      {/* Stock indicator */}
      {product.stock > 0 && product.stock <= 10 && (
        <div className="mt-2 text-sm text-amber-600 flex items-center gap-1">
          <Clock size={14} />
          Only {product.stock} left in stock - order soon!
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
            description: "We're here to help — always",
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

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState(initialTestimonialData);

  useEffect(() => {
    setTestimonials(initialTestimonialData);
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
              className="relative h-full bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl border border-green-200/50 flex flex-col shadow-lg"
            >
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
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    toast.success("Message sent successfully!");
    setFormData({ name: "", email: "", message: "" });
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

export default function DairyPage() {
  const [products, setProducts] = useState(initialDairyData);
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
    { value: "new", label: "Newest" },
  ];

  const productRefs = initialDairyData.reduce((acc, product) => {
    acc[product.slug] = useRef(null);
    return acc;
  }, {});

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setTimeout(() => {
        setProducts(initialDairyData);
        setLoading(false);
      }, 500);
    };
    loadData();
  }, []);

  const handleImageClick = (slug) => {
    productRefs[slug]?.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

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

  const filteredAndSortedProducts = React.useMemo(() => {
    let filtered = products;

    if (filter !== "All") {
      filtered = filtered.filter((m) => m.category === filter);
    }

    if (search) {
      filtered = filtered.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase())
      );
    }

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
  }, [products, filter, search, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fffaf0]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
                  placeholder="Search dairy products..."
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
                <svg 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" 
                  width={16} 
                  height={16} 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          {/* Results count */}
          <div className="mb-6 text-gray-600">
            {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
            {filter !== 'All' && ` in ${filter}`}
            {search && ` matching "${search}"`}
          </div>

          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <p className="text-gray-500 text-lg mb-2">No dairy products found matching your criteria.</p>
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
            <DairyCarousel
              products={filteredAndSortedProducts}
              onImageClick={handleImageClick}
            />
          )}
        </motion.div>

        {filteredAndSortedProducts.length <= 8 && filteredAndSortedProducts.length > 0 && (
          <ProductListSection
            products={filteredAndSortedProducts}
            productRefs={productRefs}
          />
        )}
        
        <BenefitsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      
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