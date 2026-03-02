import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { Home, Sprout, Milk, User, Phone, CircleUser, ShoppingCart } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
// Sidebar Import
import AccountSidebar from './common/sidebar';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartCount } = useCart();
=======
import { Home, Sprout, Milk, User, Phone, CircleUser } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
// Sidebar Import
import AccountSidebar from './common/sidebar';

const Header = () => {
  const navigate = useNavigate();
>>>>>>> origin/main
  const location = useLocation();
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  // Sidebar State
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={22} /> },
    { name: 'Dairy', path: '/dairy', icon: <Milk size={22} /> },
    { name: 'Mushroom', path: '/mushroom', icon: <Sprout size={22} /> },
    { name: 'About', path: '/about', icon: <User size={22} /> },
  ];

  return (
    <>
<<<<<<< HEAD
      <motion.header
=======
      <motion.header 
>>>>>>> origin/main
        variants={{ visible: { y: 0 }, hidden: { y: -120 } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 w-full z-[60] px-4 py-5 pointer-events-none"
      >
        <div className="container mx-auto flex justify-between items-center bg-white/95 backdrop-blur-2xl border border-slate-200/60 p-2.5 px-5 rounded-3xl shadow-2xl pointer-events-auto">
<<<<<<< HEAD

          <motion.div
=======
          
          <motion.div 
>>>>>>> origin/main
            whileTap={{ scale: 0.95 }}
            className="flex flex-col cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">
              SUSHEELA <span className="text-emerald-600 italic">UPVAN</span>
            </span>
            <span className="text-[7px] font-black uppercase tracking-[0.4em] text-slate-400 mt-1">The Foundation</span>
          </motion.div>
<<<<<<< HEAD

          <div className="flex items-center gap-2 sm:gap-3 pointer-events-auto">
            {/* Login/Signup - Visible on all screens */}
            {!user ? (
              <>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/login')}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-900 border border-slate-200 hover:bg-slate-50 transition-all leading-none"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/signup')}
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-slate-900 rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white shadow-xl hover:bg-emerald-600 transition-all leading-none"
                >
                  Sign up
                </motion.button>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Add a logout option or just go to profile
                  navigate('/profile');
                }}
                className="px-4 sm:px-6 py-2 sm:py-2.5 border border-slate-200 rounded-2xl text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-slate-900 transition-all leading-none"
              >
                Profile
              </motion.button>
            )}

            {/* Shopping Cart Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/profile')} // Link to cart/profile
              className="relative p-3 bg-slate-50 text-slate-900 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:text-emerald-600 transition-all"
            >
              <ShoppingCart size={18} />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-600 text-white text-[10px] font-black flex items-center justify-center rounded-lg shadow-lg border-2 border-white"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSidebarOpen(true)}
              className="relative group flex items-center gap-2.5 bg-slate-900 p-1.5 pr-4 sm:pr-5 rounded-2xl text-white shadow-xl transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-emerald-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
              <div className="relative z-10 w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <CircleUser size={18} className="text-white" />
              </div>
              <div className="relative z-10 flex flex-col items-start leading-none">
                <span className="text-[9px] font-black uppercase tracking-widest mb-0.5">Account</span>
                <span className="text-[7px] font-bold text-slate-400 group-hover:text-emerald-100 uppercase">My Profile</span>
              </div>
            </motion.button>
          </div>
=======
          
          {/* Updated Button to trigger Sidebar */}
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSidebarOpen(true)}
            className="relative group flex items-center gap-2.5 bg-slate-900 p-1.5 pr-5 rounded-2xl text-white shadow-xl transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-emerald-600 translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            <div className="relative z-10 w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
              <CircleUser size={18} className="text-white" />
            </div>
            <div className="relative z-10 flex flex-col items-start leading-none">
              <span className="text-[9px] font-black uppercase tracking-widest mb-0.5">Account</span>
              <span className="text-[7px] font-bold text-slate-400 group-hover:text-emerald-100 uppercase">My Profile</span>
            </div>
          </motion.button>
>>>>>>> origin/main
        </div>
      </motion.header>

      {/* Sidebar Component Implementation */}
      <AccountSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

<<<<<<< HEAD
      <motion.nav
=======
      <motion.nav 
>>>>>>> origin/main
        variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 150, opacity: 0 } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: "circOut" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[94%] max-w-[440px]"
      >
        <div className="relative bg-[#0a0a0a] rounded-[2.5rem] p-2 shadow-[0_30px_60px_rgba(0,0,0,0.5)] border border-white/10 flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`relative flex flex-col items-center justify-center py-3 flex-1 transition-all duration-500 rounded-2xl ${isActive ? 'text-white' : 'text-slate-500'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-1 bg-emerald-600 rounded-[1.8rem] shadow-[0_8px_20px_rgba(16,185,129,0.5)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'scale-100'}`}>{item.icon}</span>
                <span className={`relative z-10 text-[9px] font-black uppercase tracking-[0.15em] transition-all duration-300 ${isActive ? 'opacity-100 mt-1' : 'opacity-60'}`}>{item.name}</span>
              </button>
            );
          })}
        </div>
      </motion.nav>

      <div className="h-28 md:h-0" />
    </>
  );
};

export default Header;