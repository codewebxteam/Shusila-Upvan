import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Leaf, Sparkles, Check, Heart, Search, X } from 'lucide-react';
import BulkOrderModal from '../common/BulkOrderModal';
import { realtimeDb as db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductList = ({ priceRange, sortOrder }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantities, setQuantities] = useState({});
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [addedItems, setAddedItems] = useState({});
  const [firebaseProducts, setFirebaseProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState({});

  const mushroomWeightOptions = {
    'Kg': [
      { label: "50g", ratio: 0.05 },
      { label: "100g", ratio: 0.1 },
      { label: "150g", ratio: 0.15 },
      { label: "200g", ratio: 0.2 },
      { label: "250g", ratio: 0.25 },
      { label: "500g", ratio: 0.5 },
      { label: "1Kg", ratio: 1 }
    ]
  };

  const getActiveSize = (item) => {
    const options = mushroomWeightOptions[item.unit];
    if (options && selectedSize[item.id]) {
      return selectedSize[item.id];
    }
    return options ? options[options.length - 1] : { label: item.unit, ratio: 1 };
  };

  useEffect(() => {
    const productsRef = ref(db, 'products');
    const unsubscribe = onValue(productsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const list = Object.keys(data)
        .map(key => ({
          ...data[key],
          id: key,
          img: data[key].img || data[key].image || 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=500',
          unit: data[key].unit || 'Kg'
        }))
        .filter(p => String(p.category || '').toLowerCase().includes('mushroom'));
      console.log("🍄 Fetched Firebase Mushroom Products:", list.length, list);
      setFirebaseProducts(list);
    }, (error) => {
      console.error("Mushroom DB Error:", error);
      alert("⚠️ Website Mushroom Database Error: " + error.message + "\n\nThis means your rules still lock visitors from reading products branch!");
    });
    return () => unsubscribe();
  }, []);
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);

  const mushroomProducts = [...firebaseProducts].reverse();

  // Get unique tags
  const allTags = ['All', ...new Set(mushroomProducts.map(p => p.tag).filter(Boolean))];

  // Filter products by tag, search, and price
  const filteredProducts = mushroomProducts.filter(p => {
    const matchesTag = selectedTag === 'All' || p.tag === selectedTag;
    const matchesSearch = searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tag?.toLowerCase().includes(searchQuery.toLowerCase());

    // Price Filter
    const price = p.price || 0;
    const matchesPrice = price >= (priceRange?.[0] || 0) && price <= (priceRange?.[1] || Infinity);

    return matchesTag && matchesSearch && matchesPrice;
  });

  // Apply Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === 'asc') return a.price - b.price;
    if (sortOrder === 'desc') return b.price - a.price;
    return 0;
  });

  // Pagination logic
  const itemsPerPage = 8;
  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage);
  const paginatedProducts = sortedProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const updateQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();

    if (!user) {
      openAuthModal('login');
      return;
    }

    const qty = quantities[item.id] || 1;
    const activeSize = getActiveSize(item);

    // Create variation item
    const cartItem = {
      ...item,
      id: activeSize.ratio !== 1 ? `${item.id}-${activeSize.label}` : item.id,
      name: activeSize.ratio !== 1 ? `${item.name} (${activeSize.label})` : item.name,
      price: Math.round(item.price * activeSize.ratio),
      unit: activeSize.label,
      originalId: item.id
    };

    addToCart(cartItem, qty);

    setAddedItems((prev) => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  const handleWishlistToggle = (e, item) => {
    e.stopPropagation();
    if (!user) {
      openAuthModal('login');
      return;
    }
    toggleWishlist(item);
  };

  const isNewProduct = (item) => {
    if (!item.createdAt) return false;
    const createdDate = new Date(item.createdAt);
    const diffTime = Math.abs(new Date() - createdDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) <= 7;
  };

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 lg:mb-16"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">
                Earth's <span className="text-emerald-600">Purest.</span>
              </h3>
              <p className="text-sm text-slate-500 font-semibold mt-3">
                Premium Lab-Grown Mushrooms
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200">
              <Leaf size={16} className="text-emerald-600" />
              <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700">
                Lab Grown Certified
              </span>
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            placeholder="Search mushroom varieties..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(1);
            }}
            className="w-full pl-12 pr-12 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-300 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setPage(1);
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-8 flex flex-wrap gap-3">
          {allTags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedTag(tag);
                setPage(1);
              }}
              className={`px-6 py-2 rounded-full text-sm font-black uppercase transition-all ${selectedTag === tag
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Results Count */}
        {(searchQuery || (priceRange && (priceRange[0] > 0 || priceRange[1] < Infinity))) && (
          <p className="text-sm text-slate-500 mb-6">
            Found {sortedProducts.length} product{sortedProducts.length !== 1 ? 's' : ''}
            {priceRange && (priceRange[0] > 0 || priceRange[1] < Infinity) ? ' matching filters' : ` matching "${searchQuery}"`}
          </p>
        )}

        {/* Product Grid - Paginated, 8 per page */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {paginatedProducts.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/product/${item.id}`)}
              className="group relative bg-slate-50 rounded-3xl p-6 hover:bg-white hover:shadow-xl border border-slate-100 hover:border-emerald-200 cursor-pointer transition-all"
            >
              {/* Wishlist Button */}
              <button
                onClick={(e) => handleWishlistToggle(e, item)}
                className={`absolute top-4 right-4 z-10 p-2 rounded-full transition-all ${isInWishlist(item.id, item.category)
                  ? 'bg-red-50 text-red-500'
                  : 'bg-white/80 text-slate-400 hover:text-red-500 hover:bg-red-50'
                  }`}
              >
                <Heart
                  size={18}
                  fill={isInWishlist(item.id, item.category) ? 'currentColor' : 'none'}
                />
              </button>

              {/* Image */}
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-emerald-50 to-transparent mb-6 flex items-center justify-center overflow-hidden">
                {isNewProduct(item) && (
                  <div className="absolute top-3 left-3 z-20 bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md shadow-sm">
                    NEW
                  </div>
                )}
                <motion.img
                  src={item.img}
                  alt={item.name}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-3/4 h-3/4 object-contain"
                />
              </div>

              {/* Info */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-lg font-black text-slate-900">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-semibold uppercase">
                    Organically Cultivated • Non-GMO
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-emerald-600">
                    ₹{Math.round(item.price * getActiveSize(item).ratio) * (quantities[item.id] || 1)}
                  </span>
                  <span className="text-xs text-slate-400">
                    ( / {getActiveSize(item).label} )
                  </span>
                </div>

                {/* Size Selector */}
                {mushroomWeightOptions[item.unit] && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mushroomWeightOptions[item.unit].map((sizeObj) => {
                      const isActive = getActiveSize(item).label === sizeObj.label;
                      return (
                        <button
                          key={sizeObj.label}
                          onClick={(e) => { e.stopPropagation(); setSelectedSize(prev => ({...prev, [item.id]: sizeObj})); }}
                          className={`flex-1 min-w-[30%] px-1 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all border ${
                            isActive 
                              ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                              : 'bg-white text-slate-500 border-slate-200 hover:border-emerald-300 hover:bg-slate-50'
                          }`}
                        >
                          {sizeObj.label}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Quantity */}
                <div
                  className="flex items-center justify-between bg-white rounded-xl p-3 border border-slate-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="text-xs font-bold text-slate-500 uppercase">
                    Qty
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, -1)}
                      className="w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-lg"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-black">
                      {quantities[item.id] || 1}
                    </span>
                    <button
                      onClick={() => updateQty(item.id, 1)}
                      className="w-8 h-8 flex items-center justify-center bg-slate-900 text-white rounded-lg"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleAddToCart(e, item)}
                  className={`w-full py-3 text-white rounded-xl text-xs font-black uppercase flex items-center justify-center gap-2 transition-all ${addedItems[item.id] ? 'bg-green-600 hover:bg-green-700' : 'bg-emerald-600 hover:bg-emerald-700'
                    }`}
                >
                  {addedItems[item.id] ? (
                    <>
                      <Check size={16} />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={16} />
                      Add to Cart
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          ))}

        </motion.div>
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 rounded-full font-bold text-xs transition-all ${page === i + 1 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}

        <div className="mt-16 flex justify-center">
          <button 
            onClick={() => setIsBulkModalOpen(true)}
            className="flex items-center gap-3 px-8 py-3 bg-emerald-50 rounded-full text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all font-semibold"
          >
            <Sparkles size={16} />
            Bulk Orders for Events?
          </button>
        </div>

        <BulkOrderModal 
          isOpen={isBulkModalOpen} 
          onClose={() => setIsBulkModalOpen(false)} 
          category="Mushroom" 
        />

      </div>
    </section>
  );
};

export default ProductList;