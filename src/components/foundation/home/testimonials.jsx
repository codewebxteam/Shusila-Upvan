import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star, CheckCircle2 } from 'lucide-react';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: "Aryan Sharma",
      role: "Health Enthusiast",
      msg: "Mushroom ki quality aisi hai jo market mein kahin nahi milti. 100% organic feel hota hai.",
      tag: "Verified Buyer",
      glow: "shadow-[0_0_60px_-15px_rgba(34,197,94,0.4)] border-green-200/50",
      accent: "text-green-600"
    },
    {
      name: "Sneha Gupta",
      role: "Home Maker",
      msg: "Dairy products ekdum shuddh hain. Bachon ke liye Foundation ka milk hi best hai.",
      tag: "Pure Dairy Fan",
      glow: "shadow-[0_0_60px_-15px_rgba(37,99,235,0.4)] border-blue-200/50",
      accent: "text-blue-600"
    },
    {
      name: "Vikram Singh",
      role: "Fitness Coach",
      msg: "Purity Index 99% bolna aasan hai, par Foundation ne use prove kiya hai. Highly recommended.",
      tag: "Quality Expert",
      glow: "shadow-[0_0_60px_-15px_rgba(249,115,22,0.4)] border-orange-200/50",
      accent: "text-orange-600"
    }
  ];

  const nextSlide = () => setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));

  // Swipe gesture logic
  const dragEndHandler = (event, info) => {
    if (info.offset.x < -100) nextSlide();
    else if (info.offset.x > 100) prevSlide();
  };

  return (
    <section className="w-full bg-white py-12 lg:py-20 overflow-hidden relative">
      <div className="container mx-auto px-6">
        
        {/* Header - Minimal */}
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h3 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">
            Wall of <span className="text-green-600">Purity.</span>
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          
          {/* Framer Motion Wrapper for Touch/Drag */}
          <div className="relative overflow-visible cursor-grab active:cursor-grabbing">
            <motion.div 
              className="flex"
              animate={{ x: `-${currentIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={dragEndHandler}
            >
              {reviews.map((rev, i) => (
                <div key={i} className="w-full flex-shrink-0 p-4">
                  <div className={`relative backdrop-blur-xl bg-white/70 border p-10 lg:p-16 rounded-[3.5rem] transition-all duration-500 flex flex-col items-center text-center ${rev.glow}`}>
                    
                    <div className="absolute top-10 right-12 opacity-5 pointer-events-none">
                      <Quote size={80} fill="currentColor" className="text-slate-900" />
                    </div>

                    <div className="flex gap-1 mb-8 text-yellow-400">
                      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                    </div>

                    <h4 className="text-xl lg:text-3xl font-black text-slate-800 leading-tight tracking-tight mb-10">
                      "{rev.msg}"
                    </h4>

                    <div className="flex flex-col items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl font-black ${rev.accent} border border-slate-100`}>
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-900 text-lg flex items-center justify-center gap-1 uppercase tracking-tighter">
                          {rev.name} <CheckCircle2 size={16} className="text-blue-500" />
                        </p>
                        <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 ${rev.accent}`}>{rev.tag}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Buttons - Floating Side Controls */}
          <div className="hidden lg:flex justify-between items-center absolute top-1/2 -translate-y-1/2 w-full left-0 -mx-16 pointer-events-none">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all active:scale-90 pointer-events-auto">
              <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white shadow-xl border border-slate-100 flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all active:scale-90 pointer-events-auto">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Progress Dots / Touch Indicator */}
        <div className="flex justify-center gap-3 mt-10">
          {reviews.map((_, i) => (
            <button 
              key={i} 
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${currentIndex === i ? 'w-10 bg-slate-900' : 'w-2 bg-slate-200'}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;