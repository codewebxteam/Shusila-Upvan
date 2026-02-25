import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus, Minus, Verified, Sparkles } from 'lucide-react';

import milkImg from '../../assets/dairy/milk.webp';
import gheeImg from '../../assets/dairy/ghee.webp';
import curdImg from '../../assets/dairy/curd.webp';

const ProductList = () => {
  const [quantities, setQuantities] = useState({ 1: 1, 2: 1, 3: 1 });

  const updateQty = (id, delta) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const products = [
    { id: 1, name: "Raw A2 Cow Milk", price: 85, img: milkImg, unit: "Litre", color: "from-blue-500/10" },
    { id: 2, name: "Vedic Bilona Ghee", price: 1200, img: gheeImg, unit: "Kg", color: "from-amber-500/10" },
    { id: 3, name: "Natural Farm Curd", price: 60, img: curdImg, unit: "Kg", color: "from-emerald-500/10" }
  ];

  return (
    <section className="w-full bg-white py-12 lg:py-16">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <div className="flex items-end justify-between mb-12">
          <h3 className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
            The <span className="text-blue-600">Fresh</span> Edit.
          </h3>
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
             <Verified size={14} className="text-blue-600" />
             <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Purity Certified</span>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((item) => (
            <motion.div 
              key={item.id}
              whileHover={{ y: -5 }}
              className="group relative bg-slate-50 rounded-[3rem] p-6 transition-all duration-500 hover:bg-white hover:shadow-2xl hover:shadow-slate-100 border border-transparent hover:border-slate-100"
            >
              {/* Image Pop Visual */}
              <div className={`relative aspect-square rounded-[2.5rem] bg-gradient-to-br ${item.color} to-transparent mb-6 flex items-center justify-center`}>
                <img src={item.img} alt={item.name} className="w-3/4 h-3/4 object-contain drop-shadow-2xl group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                   <span className="text-[8px] font-black text-slate-900 uppercase tracking-widest">In Stock</span>
                </div>
              </div>

              {/* Info & Quantity Selector */}
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-black text-slate-900 tracking-tighter leading-tight mb-1">{item.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Farm-to-Door</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black text-slate-900 tracking-tighter">₹{item.price * quantities[item.id]}</span>
                    <p className="text-[8px] font-black text-blue-600 uppercase">Total Price</p>
                  </div>
                </div>

                {/* Quantity Selector UI */}
                <div className="flex items-center justify-between bg-white rounded-2xl p-2 border border-slate-100">
                  <span className="pl-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">Quantity ({item.unit})</span>
                  <div className="flex items-center gap-4 bg-slate-900 rounded-xl p-1">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center text-white hover:text-blue-400 transition-colors">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-black text-white min-w-[20px] text-center">{quantities[item.id]}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center text-white hover:text-blue-400 transition-colors">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Add to Cart CTA */}
                <button className="w-full py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl shadow-blue-100 hover:bg-slate-900">
                  <ShoppingCart size={14} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bulk Enquiry Section */}
        <div className="mt-12 flex justify-center">
           <button className="flex items-center gap-3 px-8 py-3 bg-slate-50 rounded-2xl text-slate-400 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100 group">
             <Sparkles size={12} className="group-hover:animate-spin" />
             <span className="text-[9px] font-black uppercase tracking-[0.2em]">Bulk Order for Khalilabad Events?</span>
           </button>
        </div>
      </div>
    </section>
  );
};

export default ProductList;