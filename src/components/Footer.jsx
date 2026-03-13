 import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Youtube, ShieldCheck } from 'lucide-react';
import LegalModal from './common/LegalModal';

const Footer = () => {
  const navigate = useNavigate();
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState('terms');

  const openLegalModal = (type) => {
    setLegalModalType(type);
    setIsLegalModalOpen(true);
  };

  return (
    <footer className="bg-gradient-to-b from-[#f8fafc] to-[#eef2f7] text-slate-900 pt-[70px] pb-[40px] px-8 font-sans border-t border-[#e5e7eb] flex justify-center w-full">
      <div className="w-full max-w-6xl">
        {/* Top Section: Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mt-[80px] mb-[60px] w-full bg-gradient-to-r from-[#6d5dfc] to-[#8b5cf6] p-8 md:p-10 rounded-[24px] shadow-lg">
          <h2 className="text-3xl md:text-3xl font-bold tracking-tight text-white">
            Subscribe to Get Special Price
          </h2>
          <div className="flex w-full md:w-auto items-center relative">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-white/90 border-none text-slate-800 px-6 py-4 rounded-full w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-purple-200 shadow-sm"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-slate-900 hover:bg-slate-800 text-white px-8 rounded-full text-sm font-bold transition-all hover:scale-105">
              Subscribe
            </button>
          </div>
        </div>

        {/* Small Trust Icons */}
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 mb-12 px-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xl">🚚</div>
            <span className="font-bold text-slate-700 tracking-wide text-sm">Fast Delivery</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xl">🥛</div>
            <span className="font-bold text-slate-700 tracking-wide text-sm">100% Pure Dairy</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-xl">🔒</div>
            <span className="font-bold text-slate-700 tracking-wide text-sm">Secure Payment</span>
          </div>
        </div>

        <div className="w-full h-px bg-slate-200/60 mb-16"></div>

        {/* Middle Section: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-[60px] mb-10 w-full">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
            <h3 
              className="text-2xl font-bold tracking-tight cursor-pointer select-none text-slate-900"
              onClick={() => navigate('/')}
            >
              Susheela Upvan
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">
              Providing premium quality dairy and farm products, fresh from our upvan to your home.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 text-slate-600 flex items-center justify-center hover:scale-110 hover:bg-[#6366f1] hover:text-white hover:border-[#6366f1] transition-all duration-300">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 text-slate-600 flex items-center justify-center hover:scale-110 hover:bg-[#6366f1] hover:text-white hover:border-[#6366f1] transition-all duration-300">
                <Facebook size={18} fill="currentColor" />
              </a>
              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 text-slate-600 flex items-center justify-center hover:scale-110 hover:bg-[#6366f1] hover:text-white hover:border-[#6366f1] transition-all duration-300">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white shadow-sm border border-slate-200 text-slate-600 flex items-center justify-center hover:scale-110 hover:bg-[#6366f1] hover:text-white hover:border-[#6366f1] transition-all duration-300">
                <Youtube size={18} fill="currentColor" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 flex flex-col gap-5 md:pl-12">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-800 mb-2">QUICK LINK</h4>
            {['Home', 'Products', 'Dairy', 'Mushroom'].map((item) => {
              let route = `/${item.toLowerCase()}`;
              if (item === 'Home') route = '/';

              return (
                <button 
                  key={item} 
                  onClick={() => navigate(route)}
                  className="text-sm text-slate-500 hover:text-[#6366f1] hover:pl-1 transition-all duration-300 text-left w-fit font-medium"
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Help */}
          <div className="col-span-1 flex flex-col gap-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-800 mb-2">HELP</h4>
            {['Payments', 'Shipping', 'Cancellation & Returns', 'FAQ'].map((item) => {
              const typeMap = {
                'Payments': 'payments',
                'Shipping': 'shipping',
                'Cancellation & Returns': 'cancellation-returns',
                'FAQ': 'faq'
              };
              return (
                <button 
                  key={item} 
                  onClick={() => openLegalModal(typeMap[item])}
                  className="text-sm text-slate-500 hover:text-[#6366f1] hover:pl-1 transition-all duration-300 text-left w-fit font-medium"
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Contact */}
          <div className="col-span-1 flex flex-col gap-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-800 mb-2">CONTACT</h4>
            <div className="text-sm text-slate-500 flex flex-col gap-4 font-medium">
              <a href="mailto:support@susheelaupvan.com" className="hover:text-[#6366f1] hover:pl-1 transition-all duration-300">
                support@susheelaupvan.com
              </a>
              <a href="tel:+919876543210" className="hover:text-[#6366f1] hover:pl-1 transition-all duration-300">
                +91 98765 43210
              </a>
              <p className="leading-relaxed">
                Khalilabad, SKN, UP<br/>India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Links */}
        <div className="mt-10 pt-5 border-t border-slate-200/80 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-500 font-bold tracking-wider uppercase">
          <p>© {new Date().getFullYear()} Susheela Upvan. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-xs font-bold tracking-widest">
            <button 
              onClick={() => openLegalModal('privacy')} 
              className="hover:text-slate-800 transition-colors"
            >
              PRIVACY
            </button>
            <span className="text-slate-300">|</span>
            <button 
              onClick={() => openLegalModal('terms')} 
              className="hover:text-slate-800 transition-colors"
            >
              TERMS
            </button>
            <span className="text-slate-300">|</span>
            <div className="flex items-center gap-1.5 text-emerald-600">
               <ShieldCheck size={14} />
               <span>PURITY GUARANTEED</span>
            </div>
          </div>
        </div>
      </div>
      <LegalModal 
        isOpen={isLegalModalOpen} 
        onClose={() => setIsLegalModalOpen(false)} 
        type={legalModalType} 
      />
    </footer>
  );
};

export default Footer;