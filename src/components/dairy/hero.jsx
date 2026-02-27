import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ChevronRight, Verified, Droplets } from 'lucide-react';
import milkVideo from '../../assets/dairy/milkanimation.mp4'; 

const Hero = () => {
  return (
    <section className="relative w-full bg-white pt-4 sm:pt-8 pb-4 sm:pb-6 lg:pt-24 lg:pb-12 overflow-hidden">
      {/* Decorative Blur - Branding Color */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-b from-blue-50/50 to-transparent -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-0 lg:gap-16">
          
          {/* 1. New Visual Content Section */}
          <div className="w-full lg:w-1/2 z-10 pt-12 lg:pt-0">
            {/* Minimal Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-slate-900 rounded-full mb-4 shadow-xl shadow-slate-200"
            >
              <Droplets size={10} className="text-blue-400" />
              <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Live from Khalilabad</span>
            </motion.div>

            {/* Typography with Contrast */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="relative"
            >
              <h1 className="text-[40px] sm:text-[56px] lg:text-[100px] font-black text-slate-900 tracking-tighter leading-[1.1] sm:leading-[1.15] lg:leading-[1.2] mb-6 sm:mb-8">
                Raw <br />
                <span className="text-blue-600 relative">
                   Untouched
                   <motion.div 
                    initial={{ width: 0 }} animate={{ width: '100%' }} transition={{ delay: 0.5, duration: 1 }}
                    className="absolute -bottom-2 sm:-bottom-3 left-0 h-1 sm:h-1.5 md:h-2 bg-blue-100 -z-10" 
                   />
                </span>
              </h1>
            </motion.div>

            <p className="text-slate-500 text-[11px] sm:text-sm lg:text-lg font-medium max-w-[280px] lg:max-w-md mb-8 sm:mb-10 leading-relaxed opacity-90">
              Straight from our farm to your glass within 4 hours. No pasteurization, no compromise.
            </p>

            {/* Premium CTA Row */}
            <div className="flex items-center gap-3">
              <button className="flex-1 lg:flex-none px-8 py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl shadow-blue-200 flex items-center justify-center gap-2 group transition-all active:scale-95">
                Get Milk <ShoppingBag size={14} className="group-hover:rotate-12 transition-transform" />
              </button>
              <button className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* 2. Enhanced Video Visuals */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full lg:w-1/2 relative flex justify-center mt-6 lg:mt-0"
          >
            {/* Main Video Frame */}
            <div className="relative w-full max-w-[290px] aspect-[4/5] lg:aspect-square rounded-[3rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] border-[6px] border-white group">
              <video 
                autoPlay loop muted playsInline 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source src={milkVideo} type="video/mp4" />
              </video>

              {/* Dynamic Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-60"></div>
              
              {/* Floating Quality Stamp */}
              <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/10 backdrop-blur-xl px-3 py-1.5 rounded-full border border-white/20">
                <Verified size={12} className="text-blue-400" />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">A2 Certified</span>
              </div>

              {/* Bottom Info Card */}
              <div className="absolute bottom-5 left-5 right-5 p-4 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-[2rem] flex items-center justify-between">
                <div>
                   <p className="text-[7px] font-black text-blue-200 uppercase tracking-widest mb-0.5">Freshness Level</p>
                   <p className="text-xs font-black text-white italic">Peak Purity</p>
                </div>
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white shadow-lg">
                   <Droplets size={16} />
                </div>
              </div>
            </div>

            {/* Decorative Element: Floating Circle */}
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-2xl rotate-12 -z-10 animate-pulse"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;