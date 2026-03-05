import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Verified, Sparkles, Check, Heart } from 'lucide-react';
import { products, categories } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

const ProductList = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, openAuthModal } = useAuth();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantities, setQuantities] = useState({});
  const [addedItems, setAddedItems] = useState({});
  const [selectedTag, setSelectedTag] = useState('All');
  const [page, setPage] = useState(1);

  const dairyProducts = products.filter(p => p.category === categories.DAIRY);

  // Get unique tags
  const allTags = ['All', ...new Set(dairyProducts.map(p => p.tag))];

  // Filter products by tag  
  const filteredProducts = selectedTag === 'All'
    ? dairyProducts
    : dairyProducts.filter(p => p.tag === selectedTag);

  // Pagination logic
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

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
    addToCart(item, qty);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">
                The <span className="text-blue-600">Fresh</span> Edit.
              </h3>
              <p className="text-sm text-slate-500 font-semibold mt-3">
                Purity Certified Dairy Products
              </p>
            </div>

            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200">
              <Verified size={16} className="text-blue-600" />
              <span className="text-[9px] font-black uppercase tracking-widest text-blue-700">
                Purity Certified
              </span>
            </div>
          </div>
        </motion.div>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {paginatedProducts.map((item) => (
            <div key={item.id}>
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
              <div
                className="relative aspect-square rounded-2xl bg-gradient-to-br from-blue-50 to-transparent mb-6 flex items-center justify-center overflow-hidden cursor-pointer"
                onClick={() => navigate(`/product/${item.id}`)}
              >
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
                    Farm-to-Door Quality
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-blue-600">
                    ₹{item.price * (quantities[item.id] || 1)}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({quantities[item.id] || 1} {item.unit})
                  </span>
                </div>

                {/* Quantity */}
                <div
                  className="flex items-center justify-between bg-white rounded-xl p-3 border border-slate-200"
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

                {/* Add To Cart */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => handleAddToCart(e, item)}
                  className={`w-full py-3 text-white rounded-xl text-xs font-black uppercase flex items-center justify-center gap-2 transition-all ${addedItems[item.id] ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'
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
            </div>
          ))}
        </motion.div>

        {/* Bulk Order */}
        <div className="mt-16 flex justify-center">
          <button className="flex items-center gap-3 px-8 py-3 bg-blue-50 rounded-full text-blue-700 hover:bg-blue-600 hover:text-white transition-all font-semibold">
            <Sparkles size={16} />
            Bulk Orders for Events?
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductList;