import React from 'react';
// Path maintained as per your structure
import heroImg from '../../../assets/foundation/hero.webp';

const Hero = () => {
  return (
    <section className="relative w-full bg-white pt-28 pb-12 lg:pt-36 lg:pb-24 overflow-hidden">
      
      {/* Background Aesthetic Blobs - Modern Touch */}
      <div className="absolute top-20 left-[-10%] w-72 h-72 bg-green-50 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-10 right-[-5%] w-64 h-64 bg-emerald-50 rounded-full blur-[100px] -z-10"></div>

      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Text Content with Modern Effects */}
          <div className="w-full lg:w-1/2 order-2 lg:order-1 relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Purely Khalilabad</span>
            </div>

            <h1 className="text-6xl lg:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter">
              Pure <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 to-slate-600" style={{ WebkitTextStroke: '1px #cbd5e1' }}>
                Natural
              </span> <br />
              Organic
            </h1>
            
            <p className="mt-8 text-sm lg:text-base text-slate-500 font-medium leading-relaxed max-w-sm border-l-2 border-green-500 pl-4">
              Experience the fusion of high-grade Mushroom and pure Dairy. 
              Straight from our local farms to your kitchen.
            </p>

            {/* Premium Interactive Buttons */}
            <div className="mt-12 flex flex-row items-center gap-6">
              <a 
                href="/mushroom" 
                className="relative group px-10 py-4 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-2xl overflow-hidden transition-all active:scale-95"
              >
                <span className="relative z-10">Mushroom</span>
                <div className="absolute inset-0 bg-green-600 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300"></div>
              </a>
              
              <a 
                href="/dairy" 
                className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.2em] text-slate-900"
              >
                Dairy Farm
                <div className="flex items-center">
                   <div className="h-[1px] w-8 bg-slate-200 group-hover:w-12 group-hover:bg-green-500 transition-all duration-500"></div>
                   <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </div>
              </a>
            </div>
          </div>

          {/* Image Section: Sharp & Stylish */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2">
            <div className="relative group">
              {/* Outer Glow Frame */}
              <div className="absolute -inset-1 bg-gradient-to-tr from-green-100 to-transparent rounded-[3rem] blur-sm opacity-50"></div>
              
              <div className="relative aspect-[16/11] lg:h-[420px] lg:w-full rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] bg-slate-100">
                <img 
                  src={heroImg} 
                  alt="Shop Front" 
                  className="w-full h-full object-cover object-top grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                />
                
                {/* Minimal Overlay Gradient for Depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-60"></div>
              </div>

              {/* Stylish Bottom Info */}
              <div className="mt-6 flex items-end justify-between px-2">
                {/* <div>
                  <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-none">Established</p>
                  <p className="text-lg font-black text-slate-800 tracking-tighter">2026</p>
                </div> */}
                <div className="text-right">
                  <p className="text-[10px] font-black text-green-500 bg-green-50 px-3 py-1 rounded-full uppercase tracking-widest">
                    Live Status: Open
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;