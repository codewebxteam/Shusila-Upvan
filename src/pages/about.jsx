 import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ShieldCheck, Globe, Users, ArrowUpRight, Instagram } from 'lucide-react';
import ownerImg from '../assets/owner/swapnil.webp';

const About = () => {
  return (
    <main className="min-h-screen bg-white pt-20 pb-10 overflow-hidden">
      
      {/* 1. BRAND HEADLINE - Compact & Punchy */}
      <section className="container mx-auto px-6 mb-12">
        <h1 className="text-[44px] lg:text-[90px] font-black text-slate-900 tracking-tighter leading-[0.85] mb-4">
          Scalable <span className="text-emerald-600 italic">Purity.</span>
        </h1>
        <p className="text-slate-500 text-[11px] lg:text-lg font-medium max-w-2xl leading-tight opacity-80">
          Susheela Upvan Khalilabad ka ek modern agricultural powerhouse hai. Hum purity ko technology ke saath scale kar rahe hain.
        </p>
      </section>

      {/* 2. LEADERSHIP: THE OWNER (High Visibility) */}
      <section className="container mx-auto px-6 mb-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
          <div className="w-full lg:w-[400px] shrink-0 relative group">
            <div className="aspect-[4/5] bg-slate-100 rounded-[3rem] overflow-hidden border-4 border-white shadow-2xl relative z-10">
              <img 
                src={ownerImg} 
                alt="Swapnil Singh" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6">
                <p className="text-white text-2xl font-black tracking-tighter italic">Swapnil Singh</p>
                <p className="text-emerald-400 text-[8px] font-black uppercase tracking-widest">Founder & CEO</p>
              </div>
            </div>
            {/* Background Accent */}
            <div className="absolute -top-3 -right-3 w-full h-full bg-emerald-600/10 rounded-[3rem] -z-10 rotate-3" />
          </div>

          <div className="flex-1 space-y-6 text-center lg:text-left">
            <h2 className="text-3xl lg:text-5xl font-black text-slate-900 tracking-tighter leading-none italic uppercase">
              The <span className="text-slate-300">Foundation</span> Mindset.
            </h2>
            <p className="text-slate-500 text-sm lg:text-base font-medium leading-relaxed max-w-xl">
              "Mera maqsad sirf product bechna nahi, ek aisi legacy banana hai jahan quality aur honesty hamare business ka DNA ho. Susheela Upvan Khalilabad ki mitti se nikla ek global vision hai."
            </p>
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
              Connect <Instagram size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. INVESTOR BOARD (Large Icons/Images) */}
      <section className="container mx-auto px-6 mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1.5 h-6 bg-emerald-600 rounded-full" />
          <h3 className="text-xl font-black text-slate-900 tracking-tighter uppercase">Board of Investors</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Investor 1 */}
          <div className="flex items-center gap-6 p-5 bg-slate-50 rounded-[2.5rem] border border-slate-100 group">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-slate-200 rounded-[2rem] overflow-hidden flex-shrink-0 relative">
               {/* Yahan Investor 1 ki image aayegi */}
               <div className="absolute inset-0 flex items-center justify-center opacity-10 font-black italic">IMG</div>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-1">INVESTOR 1</p>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-3">Strategic Partner</p>
              <ArrowUpRight size={18} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
            </div>
          </div>

          {/* Investor 2 */}
          <div className="flex items-center gap-6 p-5 bg-slate-50 rounded-[2.5rem] border border-slate-100 group">
            <div className="w-24 h-24 lg:w-32 lg:h-32 bg-slate-200 rounded-[2rem] overflow-hidden flex-shrink-0 relative">
               {/* Yahan Investor 2 ki image aayegi */}
               <div className="absolute inset-0 flex items-center justify-center opacity-10 font-black italic">IMG</div>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 tracking-tighter leading-none mb-1">INVESTOR 2</p>
              <p className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-3">Growth Partner</p>
              <ArrowUpRight size={18} className="text-slate-300 group-hover:text-emerald-600 transition-colors" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. BUSINESS CORE STATS (Horizontal & Compact) */}
      <section className="bg-slate-900 py-12 rounded-[3.5rem] mx-4">
        <div className="container mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: "Daily Output", val: "500L+", icon: <Users size={16}/> },
            { label: "Lab Certified", val: "ISO", icon: <ShieldCheck size={16}/> },
            { label: "Presence", val: "UP & BR", icon: <Globe size={16}/> },
            { label: "Facility", val: "Modern", icon: <Building2 size={16}/> }
          ].map((item, i) => (
            <div key={i} className="text-center lg:text-left border-l border-white/10 pl-4">
              <div className="text-emerald-500 mb-2">{item.icon}</div>
              <p className="text-xl font-black text-white tracking-tight">{item.val}</p>
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

    </main>
  );
};

export default About;