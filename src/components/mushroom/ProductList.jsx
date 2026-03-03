import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Leaf, Sparkles } from 'lucide-react';
import { products, categories } from '../../data/products';
import { useCart } from '../../context/CartContext';

const ProductList = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantities, setQuantities] = useState({});

  const mushroomProducts = products.filter(
    (p) => p.category === categories.MUSHROOM
  );

  const updateQty = (id, delta) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleAddToCart = (e, item) => {
    e.stopPropagation();
    const qty = quantities[item.id] || 1;
    addToCart(item, qty);
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mushroomProducts.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -8 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/product/${item.id}`)}
              className="group relative bg-slate-50 rounded-3xl p-6 hover:bg-white hover:shadow-xl border border-slate-100 hover:border-emerald-200 cursor-pointer transition-all"
            >
              {/* Image */}
              <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-emerald-50 to-transparent mb-6 flex items-center justify-center overflow-hidden">
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
                    ₹{item.price * (quantities[item.id] || 1)}
                  </span>
                  <span className="text-xs text-slate-400">
                    ({quantities[item.id] || 1} {item.unit})
                  </span>
                </div>

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
                  className="w-full py-3 bg-emerald-600 text-white rounded-xl text-xs font-black uppercase flex items-center justify-center gap-2 hover:bg-emerald-700 transition-all"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bulk Orders */}
        <div className="mt-16 flex justify-center">
          <button className="flex items-center gap-3 px-8 py-3 bg-emerald-50 rounded-full text-emerald-700 hover:bg-emerald-600 hover:text-white transition-all font-semibold">
            <Sparkles size={16} />
            Bulk Orders for Hotels & Restaurants?
          </button>
        </div>

      </div>
    </section>
  );
};

export default ProductList;