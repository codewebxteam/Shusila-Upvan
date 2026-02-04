import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import {
  Sprout,
  ShoppingBasket,
  Calendar,
  BookOpen,
  Users,
  Phone,
  LogOut,
  ChevronDown,
  ShoppingCart,
  User,
  Package,
  ShoppingBag,
  Key,
  Home,
  Milk,
  Headphones,
  Leaf
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const DairyNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  
  const { 
    user, 
    logout, 
    sendPasswordUpdateLink,
    openAuthModal
  } = useAuth();
  
  const { cartCount } = useCart();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setProfileOpen(false);
  };

  const handleLoginClick = () => {
    openAuthModal("login");
    closeMenu();
  };

  const handleSignupClick = () => {
    openAuthModal("signup");
    closeMenu();
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      closeMenu();
    }
  };

  const handleUpdatePassword = () => {
    sendPasswordUpdateLink();
    closeMenu();
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* Logo - Matching DairyPage style */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Leaf className="text-white" size={20} />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">
              Shusila <span className="text-yellow-400">Upvan</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive ? "text-yellow-400" : "text-gray-400 hover:text-white"
                }`
              }
            >
              <Home size={16} /> Home
            </NavLink>

            <NavLink
              to="/diary/milkdiary"
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive ? "text-yellow-400" : "text-gray-400 hover:text-white"
                }`
              }
            >
              <Milk size={16} /> Milk Diary
            </NavLink>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors">
                <Users size={16} /> Services
                <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              
              <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl py-2 w-56 transition-all duration-300 ${servicesOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 invisible"}`}>
                {[
                  { to: "/diary/diarysupport", icon: Sprout, label: "Diary Support" },
                  { to: "/diary/milkdiary", icon: ShoppingBasket, label: "Buy Fresh Dairy" },
                  { to: "/diary/diaryevents", icon: Calendar, label: "Community Events" },
                  { to: "/diary/diaryknowledge", icon: BookOpen, label: "Knowledge Hub" },
                  { to: "/diary/dairycommunity", icon: Users, label: "Dairy Community" },
                  { to: "/diary/diarycontacts", icon: Phone, label: "Contact Us" },
                ].map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.to}
                    onClick={closeMenu}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <item.icon size={16} /> {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <NavLink
              to="/diary/diarysupport"
              className={({ isActive }) =>
                `flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive ? "text-yellow-400" : "text-gray-400 hover:text-white"
                }`
              }
            >
              <Headphones size={16} /> Support
            </NavLink>
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            {/* Cart - Yellow badge matching DairyPage */}
            <NavLink to="/cart" className="relative text-gray-400 hover:text-white transition-colors">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </NavLink>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="w-9 h-9 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center font-bold text-black hover:opacity-90 transition"
                  >
                    {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                  </button>

                  {profileOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#1a1a1a] border border-white/10 rounded-xl py-2 shadow-xl">
                      <Link to="/profile" onClick={closeMenu} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        <User size={16} /> My Profile
                      </Link>
                      <Link to="/orders" onClick={closeMenu} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        <Package size={16} /> My Orders
                      </Link>
                      <Link to="/cart" onClick={closeMenu} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                        <ShoppingBag size={16} /> My Cart
                      </Link>
                      <button onClick={handleUpdatePassword} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors text-left">
                        <Key size={16} /> Update Password
                      </button>
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors text-left">
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <button onClick={handleLoginClick} className="text-gray-400 hover:text-white text-sm font-medium transition-colors">
                    Login
                  </button>
                  <button onClick={handleSignupClick} className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                    Sign Up
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button onClick={toggleMenu} className="md:hidden text-white">
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu - Full screen dark overlay */}
      {menuOpen && (
        <div className="fixed inset-0 top-[72px] bg-[#0a0a0a]/95 backdrop-blur-xl z-40 md:hidden">
          <nav className="flex flex-col p-6 gap-4">
            <NavLink to="/" onClick={closeMenu} className={({ isActive }) => `flex items-center gap-3 py-3 text-lg font-medium ${isActive ? "text-yellow-400" : "text-gray-400"}`}>
              <Home size={20} /> Home
            </NavLink>

            <NavLink to="/diary/milkdiary" onClick={closeMenu} className={({ isActive }) => `flex items-center gap-3 py-3 text-lg font-medium ${isActive ? "text-yellow-400" : "text-gray-400"}`}>
              <Milk size={20} /> Milk Diary
            </NavLink>

            {/* Mobile Services */}
            <div>
              <button onClick={() => setServicesOpen(!servicesOpen)} className="flex items-center gap-3 py-3 text-lg font-medium text-gray-400 w-full">
                <Users size={20} /> Services
                <ChevronDown size={16} className={`ml-auto transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              
              {servicesOpen && (
                <div className="pl-8 space-y-2 mt-2">
                  {[
                    { to: "/diary/diarysupport", icon: Sprout, label: "Diary Support" },
                    { to: "/diary/milkdiary", icon: ShoppingBasket, label: "Buy Fresh Dairy" },
                    { to: "/diary/diaryevents", icon: Calendar, label: "Community Events" },
                    { to: "/diary/diaryknowledge", icon: BookOpen, label: "Knowledge Hub" },
                    { to: "/diary/dairycommunity", icon: Users, label: "Dairy Community" },
                    { to: "/diary/diarycontacts", icon: Phone, label: "Contact Us" },
                  ].map((item, idx) => (
                    <Link key={idx} to={item.to} onClick={closeMenu} className="flex items-center gap-3 py-2 text-gray-400 hover:text-white">
                      <item.icon size={16} /> {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink to="/diary/diarysupport" onClick={closeMenu} className={({ isActive }) => `flex items-center gap-3 py-3 text-lg font-medium ${isActive ? "text-yellow-400" : "text-gray-400"}`}>
              <Headphones size={20} /> Support
            </NavLink>

            <NavLink to="/cart" onClick={closeMenu} className={({ isActive }) => `flex items-center gap-3 py-3 text-lg font-medium ${isActive ? "text-yellow-400" : "text-gray-400"}`}>
              <ShoppingCart size={20} /> Cart ({cartCount})
            </NavLink>

            {/* Mobile Auth */}
            <div className="border-t border-white/10 pt-6 mt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-white mb-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center font-bold text-black">
                      {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                    </div>
                    <span className="font-medium">{user.displayName || user.email?.split("@")[0]}</span>
                  </div>
                  
                  <Link to="/profile" onClick={closeMenu} className="flex items-center gap-3 py-3 text-gray-400 hover:text-white">
                    <User size={18} /> My Profile
                  </Link>
                  <Link to="/orders" onClick={closeMenu} className="flex items-center gap-3 py-3 text-gray-400 hover:text-white">
                    <Package size={18} /> My Orders
                  </Link>
                  <button onClick={handleUpdatePassword} className="flex items-center gap-3 py-3 text-gray-400 hover:text-white w-full">
                    <Key size={18} /> Update Password
                  </button>
                  <button onClick={handleLogout} className="flex items-center gap-3 py-3 text-red-400 w-full">
                    <LogOut size={18} /> Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button onClick={handleLoginClick} className="w-full py-3 border border-white/20 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
                    Login
                  </button>
                  <button onClick={handleSignupClick} className="w-full py-3 bg-gradient-to-r from-yellow-500 to-amber-600 text-black rounded-xl font-semibold">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default DairyNavbar;