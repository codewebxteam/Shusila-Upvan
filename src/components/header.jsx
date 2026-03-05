import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Sprout, Milk, User, CircleUser, ShoppingCart, Menu, X, Search } from 'lucide-react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import AccountSidebar from './common/sidebar';
import AuthModal from './common/AuthModal';
import ownerImg from '../assets/owner/swapnil.webp';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthModalOpen, authView, openAuthModal, closeAuthModal } = useAuth();
  const { cartCount } = useCart();
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) setHidden(true);
    else setHidden(false);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);
    setSearchResults(filtered);
  }, [searchQuery]);

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

          {/* Search Box - Desktop */}
          <div className="hidden md:block relative flex-grow max-w-md mx-8 group">
            <div className={`relative flex items-center transition-all duration-300 rounded-2xl border shadow-sm ${isSearchFocused ? 'border-emerald-500 bg-white ring-8 ring-emerald-500/5 shadow-xl shadow-emerald-500/10' : 'bg-slate-100/80 border-slate-200 hover:border-slate-300 hover:bg-slate-100'}`}>
              <Search size={18} className={`ml-4 transition-colors ${isSearchFocused ? 'text-emerald-500' : 'text-slate-500'}`} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                className="w-full bg-transparent border-none focus:ring-0 px-3 py-3 text-xs font-bold text-slate-900 placeholder:text-slate-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="mr-3 p-1 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  <X size={14} className="text-slate-400" />
                </button>
              )}
            </div>

            {/* Results Dropdown */}
            <AnimatePresence>
              {(isSearchFocused && searchQuery) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-[2rem] shadow-2xl overflow-hidden p-2 ring-1 ring-slate-900/5"
                >
                  {searchResults.length > 0 ? (
                    <div className="flex flex-col">
                      {searchResults.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => {
                            navigate(`/product/${p.id}`);
                            setSearchQuery('');
                          }}
                          className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-2xl transition-colors text-left group"
                        >
                          <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-2">
                            <img src={p.img} alt={p.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform" />
                          </div>
                          <div>
                            <p className="text-[11px] font-black text-slate-900 uppercase tracking-tight">{p.name}</p>
                            <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">₹{p.price} • {p.category}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">No products found for "{searchQuery}"</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
                <div className="hidden min-[426px]:flex items-center gap-2 sm:gap-3">
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
                </div>
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

            {/* Mobile Menu Button - Visible on 425px and below */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-2xl border border-slate-200 transition-colors min-[426px]:hidden"
            >
              {isMenuOpen ? <X size={20} className="text-slate-600" /> : <Menu size={20} className="text-slate-600" />}
            </motion.button>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mt-4 mx-auto container pointer-events-auto min-[426px]:hidden"
            >
              <div className="bg-white/95 backdrop-blur-2xl border border-slate-200/60 p-4 rounded-3xl shadow-2xl flex flex-col gap-2">
                {/* Mobile Search */}
                <div className="relative flex items-center bg-slate-100 border border-slate-200 rounded-2xl p-1 mb-2 shadow-sm">
                  <Search size={16} className="ml-3 text-slate-500" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-none focus:ring-0 px-3 py-3 text-[11px] font-bold text-slate-900 placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="mr-2 p-1 hover:bg-slate-200 rounded-lg">
                      <X size={14} className="text-slate-400" />
                    </button>
                  )}
                </div>

                {/* Mobile Search Results */}
                {searchQuery && (
                  <div className="mb-4 bg-white/50 rounded-2xl border border-slate-100 max-h-[250px] overflow-y-auto p-2">
                    {searchResults.length > 0 ? (
                      searchResults.map(p => (
                        <button
                          key={p.id}
                          onClick={() => {
                            navigate(`/product/${p.id}`);
                            setSearchQuery('');
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center gap-3 w-full p-2 hover:bg-slate-50 rounded-xl mb-1 last:mb-0 transition-colors"
                        >
                          <div className="w-10 h-10 bg-white rounded-lg overflow-hidden flex items-center justify-center p-1 border border-slate-50">
                            <img src={p.img} alt={p.name} className="w-full h-full object-contain" />
                          </div>
                          <div className="text-left">
                            <p className="text-[10px] font-black text-slate-900 uppercase tracking-tight">{p.name}</p>
                            <p className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest mt-0.5">₹{p.price}</p>
                          </div>
                        </button>
                      ))
                    ) : (
                      <p className="p-4 text-[9px] font-black text-slate-400 text-center uppercase tracking-widest italic">No results</p>
                    )}
                  </div>
                )}
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.path);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${location.pathname === item.path
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                  >
                    {item.icon}
                    <span className="font-black uppercase tracking-widest text-[11px]">{item.name}</span>
                  </button>
                ))}

                {!user && (
                  <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => {
                        openAuthModal('login');
                        setIsMenuOpen(false);
                      }}
                      className="p-4 rounded-2xl bg-slate-50 text-slate-600 font-black uppercase tracking-widest text-[11px] hover:bg-slate-100"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        openAuthModal('signup');
                        setIsMenuOpen(false);
                      }}
                      className="p-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-amber-500 text-white font-black uppercase tracking-widest text-[11px]"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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