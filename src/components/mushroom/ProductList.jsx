import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Leaf, Sparkles } from 'lucide-react';

// Assets Import
import mush1 from '../../assets/mushroom/mushroom1.webp';
import mush2 from '../../assets/mushroom/mushroom2.webp';
import mush3 from '../../assets/mushroom/mushroom3.webp';
import mush4 from '../../assets/mushroom/mushroom4.webp';

const ProductList = () => {
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1, 4: 1 });

  const updateQty = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const products = [
    { id: 1, name: "Button Mushroom", price: 160, img: mush1, unit: "Kg", tag: "Daily Fresh" },
    { id: 2, name: "Oyster Mushroom", price: 450, img: mush2, unit: "Kg", tag: "Superfood" },
    { id: 3, name: "Milky Mushroom", price: 600, img: mush3, unit: "Kg", tag: "Premium" },
    { id: 4, name: "Dry Mushroom", price: 1200, img: mush4, unit: "Kg", tag: "Speciality" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="w-full bg-white py-16 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section with Improved Spacing */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-4">
            <div>
              <h3 className="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">
                Earth's <span className="text-emerald-600 block sm:inline">Purest.</span>
              </h3>
              <p className="text-xs sm:text-sm lg:text-base text-slate-500 font-semibold mt-3 sm:mt-0">Premium Lab-Grown Mushrooms</p>
            </div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200 hover:border-emerald-300 transition-all"
            >
              <Leaf size={16} className="text-emerald-600" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-emerald-700">Lab Grown Certified</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Product Grid - 4 Columns on Desktop, 2 on Tablet, 1 on Mobile */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6"
        >
          {products.map((item, index) => (
            <motion.div 
              key={item.id}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.98 }}
              className="group relative bg-slate-50 rounded-3xl p-5 sm:p-6 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-emerald-100/50 border border-slate-100 hover:border-emerald-200 cursor-pointer"
            >
              {/* Badge Tag */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="absolute top-4 right-4 z-10"
              >
                <div className="bg-linear-to-r from-emerald-500 to-emerald-600 px-3 py-1 rounded-full border border-emerald-300">
                  <span className="text-[7px] font-black text-white uppercase tracking-widest">{item.tag}</span>
                </div>
              </motion.div>

              {/* Image Container with Enhanced Styling */}
              <div className="relative aspect-square rounded-2xl bg-linear-to-br from-emerald-500/8 via-emerald-500/3 to-transparent mb-6 sm:mb-7 flex items-center justify-center overflow-hidden border border-emerald-100/30">
                <motion.img 
                  src={item.img} 
                  alt={item.name}
                  whileHover={{ scale: 1.12 }}
                  transition={{ duration: 0.5 }}
                  className="w-3/4 h-3/4 object-contain drop-shadow-lg" 
                />
              </div>

              {/* Content Section with Proper Spacing */}
              <div className="space-y-4 sm:space-y-5">
                {/* Title and Price */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="space-y-2"
                >
                  <h4 className="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wide leading-relaxed">
                    Organically Cultivated • Non-GMO
                  </p>
                </motion.div>

                {/* Price Display */}
                <motion.div 
                  key={quantities[item.id]}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-xl sm:text-2xl font-black text-emerald-600 tracking-tight">
                    ₹{item.price * quantities[item.id]}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">
                    ({quantities[item.id]} {item.unit})
                  </span>
                </motion.div>

                {/* Quantity Selector */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center justify-between bg-white rounded-2xl p-3 border border-slate-200 hover:border-emerald-300 transition-colors"
                >
                  <span className="text-[9px] font-black text-slate-500 uppercase tracking-wide">Qty (Kg)</span>
                  <div className="flex items-center gap-2 bg-linear-to-r from-slate-900 to-slate-800 rounded-lg p-1">
                    <motion.button 
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQty(item.id, -1)} 
                      className="w-8 h-8 flex items-center justify-center text-white hover:text-emerald-400 transition-colors duration-200"
                    >
                      <Minus size={14} strokeWidth={2.5} />
                    </motion.button>
                    <span className="text-sm font-black text-white min-w-6 text-center">
                      {quantities[item.id]}
                    </span>
                    <motion.button 
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => updateQty(item.id, 1)} 
                      className="w-8 h-8 flex items-center justify-center text-white hover:text-emerald-400 transition-colors duration-200"
                    >
                      <Plus size={14} strokeWidth={2.5} />
                    </motion.button>
                  </div>
                </motion.div>

                {/* Add to Cart Button */}
                <motion.button 
                  whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(16, 185, 129, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-3.5 sm:py-4 bg-linear-to-r from-emerald-600 to-emerald-500 text-white rounded-2xl text-[10px] sm:text-[11px] font-black uppercase tracking-wide flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/40 hover:from-emerald-700 hover:to-emerald-600"
                >
                  <ShoppingCart size={16} />
                  <span>Add to Cart</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>


        {/* Bulk Order Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 lg:mt-20 flex justify-center"
        >
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(16, 185, 129, 0.2)" }}
            className="flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-emerald-50 to-emerald-100 rounded-full text-emerald-700 hover:from-emerald-600 hover:to-emerald-700 hover:text-white transition-all duration-300 group border border-emerald-200 hover:border-emerald-400 font-semibold"
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 3, repeat: Infinity }}>
              <Sparkles size={16} className="text-emerald-600 group-hover:text-white" />
            </motion.div>
            <span className="text-xs sm:text-sm font-black uppercase tracking-wide leading-tight">
              Bulk Orders for Hotels & Restaurants?
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductList;