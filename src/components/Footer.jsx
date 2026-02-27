 import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Mail, ArrowUpRight, ShieldCheck, MapPin } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#050505] text-white pt-10 pb-24 md:pb-6 px-4 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl border-b border-white/5 pb-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start">
            <h3 
              className="text-5xl md:text-7xl font-black tracking-tighter leading-none cursor-pointer group select-none"
              onClick={() => navigate('/')}
            >
              UPVAN<span className="text-emerald-500 italic">.</span>
            </h3>
            <div className="flex items-center gap-3 mt-2">
              <span className="h-[1px] w-8 bg-emerald-500/50"></span>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500">Pure Foundation</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="flex items-center gap-3 bg-white/5 hover:bg-white hover:text-black transition-all px-5 py-3 rounded-2xl border border-white/10 group">
              <Instagram size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Instagram</span>
            </button>
            <button className="flex items-center gap-3 bg-white/5 hover:bg-white hover:text-black transition-all px-5 py-3 rounded-2xl border border-white/10 group">
              <Mail size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Mail Us</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-4">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {['Home', 'Dairy', 'Mushroom', 'About'].map((item) => (
              <button 
                key={item} 
                onClick={() => navigate(item === 'Home' ? '/' : `/${item.toLowerCase()}`)}
                className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-emerald-500 transition-colors flex items-center gap-1 group"
              >
                {item} <ArrowUpRight size={10} className="opacity-0 group-hover:opacity-100 transition-all" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
            <MapPin size={12} className="text-emerald-500" />
            <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500/80">Khalilabad, SKN, UP</span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[8px] font-bold uppercase tracking-[0.3em] text-slate-600">
          <p>© 2026 SUSHEELA UPVAN — ALL RIGHTS RESERVED</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
            <div className="flex items-center gap-2 text-emerald-500/50">
               <ShieldCheck size={10} />
               <span>Purity Guaranteed</span>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/5 blur-[100px] -z-10"></div>
    </footer>
  );
};

export default Footer;