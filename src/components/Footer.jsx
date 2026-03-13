 import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Youtube, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white text-slate-900 pt-20 pb-8 px-8 font-sans border-t border-slate-100 flex justify-center w-full">
      <div className="w-full max-w-6xl">
        {/* Top Section: Newsletter */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 w-full">
          <h2 className="text-3xl md:text-3xl font-bold tracking-tight text-slate-800">
            Subscribe to Get Special Price
          </h2>
          <div className="flex w-full md:w-auto items-center relative">
            <input 
              type="email" 
              placeholder="Email address" 
              className="bg-white border border-slate-100 text-slate-800 px-6 py-4 rounded-full w-full md:w-96 focus:outline-none focus:ring-2 focus:ring-purple-400/50 shadow-sm"
            />
            <button className="absolute right-1 top-1 bottom-1 bg-[#a380eb] hover:bg-[#8663cd] text-white px-8 rounded-full text-sm font-medium transition-colors">
              Subscribe
            </button>
          </div>
        </div>

        <div className="w-full h-px bg-slate-100 mb-16"></div>

        {/* Middle Section: Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 w-full">
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
            <h3 
              className="text-2xl font-bold tracking-tight cursor-pointer select-none text-slate-900"
              onClick={() => navigate('/')}
            >
              Susheela Upvan
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed font-medium">
              Providing premium quality dairy and farm products, fresh from our upvan to your home.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-[#0088cc] text-white flex items-center justify-center hover:bg-[#0077b3] transition-colors">
                <Instagram size={12} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-[#3b5998] text-white flex items-center justify-center hover:bg-[#2d4373] transition-colors">
                <Facebook size={12} fill="currentColor" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-[#1da1f2] text-white flex items-center justify-center hover:bg-[#0c85d0] transition-colors">
                <Twitter size={12} fill="currentColor" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-[#ff0000] text-white flex items-center justify-center hover:bg-[#cc0000] transition-colors">
                <Youtube size={12} fill="currentColor" />
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
                  className="text-xs text-slate-500 hover:text-purple-600 transition-colors text-left w-fit font-medium"
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Help */}
          <div className="col-span-1 flex flex-col gap-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-800 mb-2">HELP</h4>
            {['Payments', 'Shipping', 'Cancellation & Returns'].map((item) => {
              const route = item === 'Cancellation & Returns' ? '/returns' : `/${item.toLowerCase()}`;
              return (
                <button 
                  key={item} 
                  onClick={() => navigate(route)}
                  className="text-xs text-slate-500 hover:text-purple-600 transition-colors text-left w-fit font-medium"
                >
                  {item}
                </button>
              );
            })}
          </div>

          {/* Contact */}
          <div className="col-span-1 flex flex-col gap-5">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-800 mb-2">CONTACT</h4>
            <div className="text-xs text-slate-500 flex flex-col gap-4 font-medium">
              <a href="mailto:support@susheelaupvan.com" className="hover:text-purple-600 transition-colors">
                support@susheelaupvan.com
              </a>
              <a href="tel:+919876543210" className="hover:text-purple-600 transition-colors">
                +91 98765 43210
              </a>
              <p className="leading-relaxed">
                Khalilabad, SKN, UP<br/>India
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright & Links */}
        <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-500 font-bold tracking-wider uppercase">
          <p>© {new Date().getFullYear()} Susheela Upvan. All Rights Reserved.</p>
          <div className="flex items-center gap-4 text-xs font-bold tracking-widest">
            <button 
              onClick={() => navigate('/privacy')} 
              className="hover:text-slate-800 transition-colors"
            >
              PRIVACY
            </button>
            <span className="text-slate-300">|</span>
            <button 
              onClick={() => navigate('/terms')} 
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
    </footer>
  );
};

export default Footer;