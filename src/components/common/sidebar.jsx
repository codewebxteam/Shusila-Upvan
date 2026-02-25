import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, ShoppingBag, ShoppingCart, X, ChevronRight, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
// Aapki image ka path
import ownerImg from '../../assets/owner/swapnil.webp';

const AccountSidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  // Mapping items to match Dashboard tabs exactly
  const menuItems = [
    { id: 'profile', label: 'My Profile', desc: 'Account & Security', icon: <Settings size={20} /> },
    { id: 'orders', label: 'My Orders', desc: 'Active & Past History', icon: <ShoppingBag size={20} /> },
    { id: 'cart', label: 'My Cart', desc: 'Checkout your items', icon: <ShoppingCart size={20} /> },
  ];

  const handleNavigation = (tabId) => {
    // Navigate and pass state so Dashboard knows which tab to open
    navigate('/profile', { state: { activeTab: tabId } });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 1. Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[100] pointer-events-auto"
          />

          {/* 2. Sidebar Drawer */}
          <motion.aside
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-[380px] bg-white z-[101] shadow-[-20px_0_80px_rgba(0,0,0,0.15)] flex flex-col pointer-events-auto"
          >
            {/* Sidebar Header with User Info */}
            <div className="p-8 border-b border-slate-50 relative bg-slate-50/50">
              <button 
                onClick={onClose} 
                className="absolute top-6 right-6 p-2 bg-white rounded-full text-slate-400 hover:text-slate-900 shadow-sm border border-slate-100 transition-all"
              >
                <X size={20}/>
              </button>
              
              <div className="flex items-center gap-4 mt-4">
                <div className="w-14 h-14 bg-white rounded-2xl border-4 border-white shadow-lg overflow-hidden shrink-0">
                  <img src={ownerImg} alt="User" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 tracking-tighter italic leading-none">Hello, Swapnil.</h2>
                  <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-1">Verified Member</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-5 space-y-3 overflow-y-auto">
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em] px-4 mb-4">Dashboard Quick Links</p>
              
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className="w-full flex items-center justify-between p-5 bg-white rounded-[2.5rem] hover:bg-slate-900 hover:text-white transition-all group border border-slate-100 shadow-sm"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-white/10 group-hover:text-emerald-400 transition-colors">
                      {item.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-black uppercase tracking-tight leading-none mb-1">{item.label}</p>
                      <p className="text-[9px] font-medium opacity-50 group-hover:opacity-80">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </nav>

            {/* Footer Action */}
            <div className="p-8 border-t border-slate-50">
              <button className="w-full py-4.5 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-red-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
                <LogOut size={14} /> 
                Sign Out
              </button>
              <div className="mt-6 flex justify-center gap-4 text-slate-300">
                 <span className="text-[8px] font-black uppercase tracking-widest">Privacy</span>
                 <span className="text-[8px] font-black uppercase tracking-widest">•</span>
                 <span className="text-[8px] font-black uppercase tracking-widest">Terms</span>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default AccountSidebar;