import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, ShieldCheck, Star } from 'lucide-react';
// Asset Import
import heroFungi from '../../assets/mushroom/herofungi.webp';

const Hero = () => {
  return (
    <section className="relative w-full bg-white pt-6 sm:pt-12 pb-2 sm:pb-4 lg:pt-24 lg:pb-10 overflow-hidden">
      {/* Organic Soft Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/60 blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-0 lg:gap-12">
          
          {/* 1. Content Section */}
          <div className="w-full lg:w-1/2 text-center lg:text-left z-10 pt-12 sm:pt-16 lg:pt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600/5 border border-emerald-600/10 rounded-full mb-4"
            >
              <Star size={10} className="text-emerald-600 fill-emerald-600" />
              <span className="text-[8px] font-black uppercase tracking-[0.2em] text-emerald-600">Premium Fungi Lab</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="text-[40px] sm:text-[56px] lg:text-[100px] font-black text-slate-900 tracking-tighter leading-[1.1] sm:leading-[1.15] lg:leading-[1.2] mb-6 sm:mb-8"
            >
              The Power <br className="hidden sm:block" /> 
              <span className="text-emerald-600 italic">Of Fungi.</span>
            </motion.h1>

            <p className="text-slate-400 text-[10px] sm:text-sm lg:text-base font-bold uppercase tracking-tight max-w-[280px] lg:max-w-md mb-8 sm:mb-10 mx-auto lg:mx-0 leading-relaxed">
              Grown in climate-controlled labs. Pure, organic, and harvested daily for Khalilabad.
            </p>

            <div className="flex flex-row items-center gap-2 justify-center lg:justify-start">
              <button className="flex-1 sm:flex-none px-8 py-3.5 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-emerald-100 active:scale-95 transition-all">
                Shop Now
              </button>
              <button className="flex-1 sm:flex-none px-8 py-3.5 bg-slate-50 text-slate-900 border border-slate-200 rounded-xl text-[10px] font-black uppercase tracking-widest">
                Price List
              </button>
            </div>
          </div>

          {/* 2. Visual Section with herofungi.webp */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full lg:w-1/2 relative flex justify-center mt-6 lg:mt-0"
          >
            <div className="relative w-full max-w-[320px] aspect-square bg-slate-50 rounded-[3rem] overflow-hidden shadow-2xl border-[4px] border-white group">
               {/* Real Image Implementation */}
               <img 
                src={heroFungi} 
                alt="Premium Mushroom" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
               />

               {/* Quality Indicators */}
               <div className="absolute top-4 right-4 px-3 py-1.5 backdrop-blur-md bg-black/20 border border-white/10 rounded-full flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[8px] font-black text-white uppercase tracking-widest">Fresh Batch</span>
               </div>

               <div className="absolute bottom-5 left-5 right-5 p-4 backdrop-blur-xl bg-white/20 border border-white/20 rounded-2xl flex items-center justify-between">
                  <div>
                    <p className="text-[7px] font-black text-emerald-700 uppercase">Chemical Free</p>
                    <p className="text-xs font-black text-slate-900 uppercase italic">Premium Oyster</p>
                  </div>
                  <div className="h-10 w-10 bg-emerald-600 rounded-full flex items-center justify-center text-white shadow-lg">
                    <ShieldCheck size={20} />
                  </div>
               </div>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-emerald-100 rounded-[2rem] -z-10 rotate-12 group-hover:rotate-0 transition-transform duration-700"></div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;