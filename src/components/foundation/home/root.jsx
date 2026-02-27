import React from 'react';
import { Microscope, CloudSun, Beaker, Zap, ShieldCheck, ArrowUpRight, Binary, Waves } from 'lucide-react';

const Root = () => {
  return (
    <section className="w-full bg-[#fdfdfd] py-16 lg:py-28 overflow-hidden relative">
      {/* Soft Ambient Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-50/50 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50/50 rounded-full blur-[120px] -z-10"></div>

      <div className="container mx-auto px-6">
        
        {/* Header: Minimal & Stylish */}
        <div className="flex flex-col items-center text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 mb-6 transition-all hover:bg-white cursor-default group">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] font-black tracking-[0.2em] text-slate-500 uppercase">The Root Methodology</span>
          </div>
          <h3 className="text-5xl lg:text-8xl font-black text-slate-900 tracking-tighter leading-[0.8] mb-6">
            Lab <span className="text-slate-200 italic font-light">to</span> Home.
          </h3>
          <p className="text-sm lg:text-base text-slate-400 font-medium max-w-lg leading-relaxed">
            Hum shuddhata ko engineer karte hain. Har drop aur har tissue hamari research aur laboratory science ka result hai.
          </p>
        </div>

        {/* The Actionable Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Mushroom: The Bio-Tech Card */}
          <button className="group relative w-full aspect-[4/3] lg:aspect-auto lg:h-[450px] text-left rounded-[3.5rem] p-10 lg:p-14 overflow-hidden transition-all duration-700 hover:-translate-y-3 cursor-pointer bg-slate-900 shadow-2xl shadow-slate-200 border border-slate-800">
            <div className="relative z-10 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-2xl rounded-3xl flex items-center justify-center text-green-400 border border-white/10 group-hover:bg-green-500 group-hover:text-white transition-all duration-500">
                    <Binary size={28} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-slate-900"></div>
                </div>
                <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-[9px] font-black text-white/40 uppercase tracking-widest group-hover:text-white/100 transition-colors">
                  Research 01
                </div>
              </div>

              <div>
                <h4 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none mb-4 italic uppercase">
                  Mushroom <br /> <span className="text-green-500">Precision.</span>
                </h4>
                <p className="text-slate-400 text-xs lg:text-sm font-medium leading-relaxed max-w-xs mb-8">
                  Controlled biology jahan har mushroom 100% organic substrate par ugta hai with 0.1% accuracy.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-white font-black text-lg">99.9%</span>
                    <span className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">Bio-Purity</span>
                  </div>
                  <div className="h-8 w-[1px] bg-white/10"></div>
                  <div className="text-green-500 text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                    Explore Method <ArrowUpRight size={14}/>
                  </div>
                </div>
              </div>
            </div>
            {/* Background Texture Illusion */}
            <div className="absolute top-0 right-0 w-full h-full opacity-10 group-hover:opacity-20 transition-opacity pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>
            </div>
          </button>

          {/* Dairy: The Tech-Logic Card */}
          <button className="group relative w-full aspect-[4/3] lg:aspect-auto lg:h-[450px] text-left rounded-[3.5rem] p-10 lg:p-14 overflow-hidden transition-all duration-700 hover:-translate-y-3 cursor-pointer bg-blue-600 shadow-2xl shadow-blue-100 border border-blue-500">
            <div className="relative z-10 h-full flex flex-col justify-between text-white">
              <div className="flex justify-between items-start">
                <div className="relative">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-2xl rounded-3xl flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-blue-600 transition-all duration-500">
                    <Waves size={28} />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-4 border-blue-600"></div>
                </div>
                <div className="px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-[9px] font-black text-white/60 uppercase tracking-widest group-hover:text-white/100 transition-colors">
                  Research 02
                </div>
              </div>

              <div>
                <h4 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none mb-4 italic uppercase">
                  Dairy <br /> <span className="text-blue-200">Logic.</span>
                </h4>
                <p className="text-blue-100 text-xs lg:text-sm font-medium leading-relaxed max-w-xs mb-8">
                  No preservatives. No middleman. Seedhe farm se aapke glass tak pure technology based dairy.
                </p>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-white font-black text-lg">0%</span>
                    <span className="text-[8px] text-blue-200 font-bold uppercase tracking-widest">Chemicals</span>
                  </div>
                  <div className="h-8 w-[1px] bg-white/20"></div>
                  <div className="text-white text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 group-hover:gap-4 transition-all">
                    The Process <ArrowUpRight size={14}/>
                  </div>
                </div>
              </div>
            </div>
            {/* Visual Glass Glow */}
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[100px] group-hover:bg-white/30 transition-all duration-700"></div>
          </button>

        </div>

        {/* Minimal Bottom Indicators */}
        <div className="mt-16 flex flex-wrap justify-center gap-12 py-8 border-t border-slate-100">
           {['Lab Tested', '100% Traceable', 'Zero Pesticides'].map((text, i) => (
             <div key={i} className="flex items-center gap-3 opacity-30 hover:opacity-100 transition-opacity cursor-default">
               <ShieldCheck size={14} className="text-slate-900"/>
               <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">{text}</span>
             </div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default Root;