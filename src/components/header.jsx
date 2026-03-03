import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Sprout, Milk, User, CircleUser, ShoppingCart } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import AccountSidebar from './common/sidebar';
import AuthModal from './common/AuthModal';
import ownerImg from '../assets/owner/swapnil.webp';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthModalOpen, authView, openAuthModal, closeAuthModal } = useAuth();
  const { cartCount } = useCart();
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
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
      {/* Top Header */}
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: -120 } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className="fixed top-0 w-full z-[60] px-4 py-5 pointer-events-none"
      >
        <div className="container mx-auto flex justify-between items-center bg-white/95 backdrop-blur-2xl border border-slate-200/60 p-2.5 px-5 rounded-3xl shadow-2xl pointer-events-auto">

          {/* Logo */}
          <motion.div
            whileTap={{ scale: 0.95 }}
            className="flex flex-col cursor-pointer"
            onClick={() => navigate('/')}
          >
            <span className="text-xl font-black tracking-tighter text-slate-900 leading-none">
              SUSHEELA <span className="text-emerald-600 italic">UPVAN</span>
            </span>
            <span className="text-[7px] font-black uppercase tracking-[0.4em] text-slate-400 mt-1">
              The Foundation
            </span>
          </motion.div>

          {/* Right Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">

            {/* Cart Button - Simplified */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => navigate('/cart')}
              className="relative p-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-colors"
            >
              <ShoppingCart size={20} className="text-slate-600" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-amber-500 text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white"
                  >
                    {cartCount > 9 ? '9+' : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Auth/Profile Section */}
            <div className="flex items-center gap-2 sm:gap-3">
              {!user ? (
                <>
                  {/* Login Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openAuthModal('login')}
                    className="px-3 sm:px-4 py-2 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-slate-600 hover:text-emerald-600 transition-colors"
                  >
                    Login
                  </motion.button>

                  {/* Signup Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => openAuthModal('signup')}
                    className="px-4 sm:px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-amber-500 text-white rounded-xl text-[10px] sm:text-[11px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/20"
                  >
                    Sign Up
                  </motion.button>
                </>
              ) : (
                /* Circular Profile Avatar - Visible only after login */
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSidebarOpen(true)}
                  className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-white shadow-xl overflow-hidden bg-slate-100 flex items-center justify-center group shrink-0"
                >
                  <img
                    src={user?.photo || ownerImg}
                    alt="Profile"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                </motion.button>
              )}
            </div>

          </div>
        </div>
      </motion.header>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={closeAuthModal}
        initialView={authView}
      />

      {/* Sidebar */}
      <AccountSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Bottom Navigation */}
      <motion.nav
        variants={{ visible: { y: 0, opacity: 1 }, hidden: { y: 150, opacity: 0 } }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.4, ease: "circOut" }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[94%] max-w-[440px]"
      >
        <div className="relative bg-[#0a0a0a] rounded-[2.5rem] p-2 shadow-2xl border border-white/10 flex justify-between items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`relative flex flex-col items-center justify-center py-3 flex-1 rounded-2xl transition-all ${isActive ? 'text-white' : 'text-slate-500'
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-1 bg-emerald-600 rounded-[1.8rem]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.icon}</span>
                <span className="relative z-10 text-[9px] font-black uppercase tracking-[0.15em] mt-1">
                  {item.name}
                </span>
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