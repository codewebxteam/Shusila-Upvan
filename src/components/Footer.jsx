import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Instagram,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Phone,
  ChevronUp
} from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToContact = () => {
    const footer = document.getElementById('contact-us-section');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickLink = (item) => {
    switch (item) {
      case 'Home': navigate('/'); break;
      case 'About Us': navigate('/about'); break;
      case 'Dairy': navigate('/dairy'); break;
      case 'Mushroom': navigate('/mushroom'); break;
      case 'Contact': scrollToContact(); break;
      default: navigate('/');
    }
  };

  return (
    <footer className="bg-[#0b0f19] text-white pt-20 pb-10 px-6 relative overflow-hidden font-sans border-t border-white/5">
      <div className="container mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-20">

          {/* Column 1: Brand & About */}
          <div className="flex flex-col gap-8 h-full">
            <div
              className="flex items-center gap-3 cursor-pointer group select-none transition-transform hover:scale-105 duration-300 w-fit"
              onClick={() => navigate('/')}
            >
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/40 group-hover:rotate-12 transition-all duration-500">
                <div className="w-6 h-6 border-2 border-white transform rotate-45 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                </div>
              </div>
              <h3 className="text-3xl font-black tracking-tighter uppercase italic bg-gradient-to-r from-white to-emerald-400 bg-clip-text text-transparent leading-none">
                SHUSHEEL UPVAN<span className="text-emerald-500">.</span>
              </h3>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-xs font-medium opacity-80">
              Your premier destination for professional dairy products & fresh mushrooms. We provide world-class quality for health-conscious families.
            </p>

            <div className="flex gap-4 mt-auto">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, idx) => (
                <button
                  key={idx}
                  className="w-11 h-11 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500 hover:text-white hover:scale-110 active:scale-95 transition-all duration-300 border border-white/10 shadow-lg"
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:pl-8">
            <h4 className="text-xl font-bold mb-8 relative inline-block text-white tracking-wide">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></span>
            </h4>
            <ul className="flex flex-col gap-5">
              {['Home', 'Dairy', 'Mushroom', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleQuickLink(item)}
                    className="text-slate-400 hover:text-emerald-400 hover:translate-x-2 transition-all duration-300 text-[15px] font-medium flex items-center gap-group"
                  >
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity mr-2"></span>
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Categories */}
          <div className="lg:pl-4" id="categories-section">
            <h4 className="text-xl font-bold mb-8 relative inline-block text-white tracking-wide">
              Categories
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></span>
            </h4>
            <ul className="flex flex-col gap-5">
              {[
                { name: 'Pure Milk', link: '/dairy' },
                { name: 'Desi Ghee', link: '/dairy' },
                { name: 'Fresh Paneer', link: '/dairy' },
                { name: 'Mushroom Seeds', link: '/mushroom' },
                { name: 'Dried Mushroom', link: '/mushroom' },
                { name: 'Organic Compost', link: '/mushroom' }
              ].map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.link)}
                    className="text-slate-400 hover:text-emerald-400 hover:translate-x-2 transition-all duration-300 text-[15px] font-medium flex items-center group text-left"
                  >
                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full group-hover:bg-emerald-500 transition-colors mr-2"></span>
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div id="contact-us-section">
            <h4 className="text-xl font-bold mb-8 relative inline-block text-white tracking-wide">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-10 h-1 bg-emerald-500 rounded-full shadow-lg shadow-emerald-500/50"></span>
            </h4>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-inner">
                  <MapPin size={20} className="text-emerald-500 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-slate-200 text-sm font-bold mb-1 uppercase tracking-tighter opacity-70">Location</p>
                  <p className="text-slate-400 text-sm leading-snug font-medium">
                    Khalilabad U.P.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-inner">
                  <Phone size={20} className="text-emerald-500 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-slate-200 text-sm font-bold mb-1 uppercase tracking-tighter opacity-70">Phone</p>
                  <p className="text-slate-400 text-sm font-medium">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all duration-300 shadow-inner">
                  <Mail size={20} className="text-emerald-500 group-hover:text-white" />
                </div>
                <div>
                  <p className="text-slate-200 text-sm font-bold mb-1 uppercase tracking-tighter opacity-70">Email</p>
                  <p className="text-slate-400 text-sm font-medium lowercase">support@upvan.com</p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-slate-500 text-xs font-semibold tracking-wide text-center md:text-left opacity-80">
            © 2026 SHUSHEELA UPVAN. All rights reserved. Designed with <span className="text-emerald-500 animate-pulse">❤️</span> for Nature Lovers.
          </div>
        </div>
      </div>

      {/* Floating Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-10 right-10 w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-emerald-500/50 hover:bg-emerald-600 hover:-translate-y-2 active:scale-95 transition-all z-50 group border-4 border-[#0b0f19]"
        aria-label="Scroll to top"
      >
        <ChevronUp className="group-hover:-translate-y-1 transition-transform w-7 h-7" />
      </button>

      {/* Background Decor */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
