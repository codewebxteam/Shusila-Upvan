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

  return (
    <section className="w-full bg-white py-12 lg:py-16">
      <div className="container mx-auto px-6">
        
        {/* Condensed Header */}
        <div className="flex items-end justify-between mb-12">
          <h3 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            Earth's <span className="text-emerald-600">Purest.</span>
          </h3>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
             <Leaf size={14} className="text-emerald-600" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-700">Lab Grown Certified</span>
          </div>
        </div>

        {/* Product Grid - 4 Columns on Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -5 }}
              className="group relative bg-slate-50 rounded-[2.5rem] p-5 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-emerald-100 border border-transparent hover:border-emerald-100"
            >
              {/* Image Pop */}
              <div className="relative aspect-square rounded-[2rem] bg-gradient-to-br from-emerald-500/5 to-transparent mb-5 flex items-center justify-center overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-3/4 h-3/4 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-emerald-100">
                   <span className="text-[7px] font-black text-emerald-700 uppercase tracking-widest">{item.tag}</span>
                </div>
              </div>

              {/* Info & Quantity */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="max-w-[120px]">
                    <h4 className="text-lg font-black text-slate-900 tracking-tighter leading-tight mb-1">{item.name}</h4>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none">Organically Grown</p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-black text-slate-900 tracking-tighter leading-none">₹{item.price * quantities[item.id]}</span>
                  </div>
                </div>

                {/* Compact Qty Selector */}
                <div className="flex items-center justify-between bg-white rounded-xl p-1.5 border border-slate-100">
                  <span className="pl-1 text-[8px] font-black text-slate-400 uppercase tracking-widest">Kg</span>
                  <div className="flex items-center gap-3 bg-slate-900 rounded-lg p-0.5">
                    <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 flex items-center justify-center text-white hover:text-emerald-400 transition-colors">
                      <Minus size={12} />
                    </button>
                    <span className="text-xs font-black text-white min-w-[15px] text-center">{quantities[item.id]}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 flex items-center justify-center text-white hover:text-emerald-400 transition-colors">
                      <Plus size={12} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <button className="w-full py-3.5 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-emerald-100 hover:bg-slate-900">
                  <ShoppingCart size={14} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="mt-12 flex justify-center">
           <button className="flex items-center gap-3 px-6 py-3 bg-emerald-50 rounded-2xl text-emerald-600 hover:bg-emerald-600 hover:text-white transition-all group border border-emerald-100">
             <Sparkles size={12} className="group-hover:animate-spin" />
             <span className="text-[8px] font-black uppercase tracking-[0.2em]">Bulk Mushroom for Khalilabad Hotels?</span>
           </button>
        </div>
      </div>
    </section>
  );
};

export default ProductList;