import { useState } from "react";
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
  LockKeyhole,
  ShoppingCart,
  User,
  Package,
  ShoppingBag,
  Key,
  Home,
  Milk,
  Headphones,
} from "lucide-react";
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const DairyNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [profileOpen, setProfileOpen] = useState(false);
  
  const { user, logout, sendPasswordUpdateLink } = useAuth();
  const { cartCount } = useCart();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => {
    setMenuOpen(false);
    setServicesOpen(false);
    setProfileOpen(false);
  };

  const handleLoginClick = () => {
    setAuthType("login");
    setAuthOpen(true);
    closeMenu();
  };

  const handleSignupClick = () => {
    setAuthType("signup");
    setAuthOpen(true);
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
      <header
        className="flex justify-between items-center px-4 sm:px-8 py-4 sticky top-0 z-50 w-full text-gray-900 backdrop-blur-sm bg-white/90"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        {/* Logo - Left Side */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-medium tracking-wider uppercase flex-shrink-0"
        >
          Shusila Dairy
        </Link>

        {/* Middle Navigation Links - Desktop WITH ICONS */}
        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `uppercase text-sm tracking-wide transition-colors flex items-center gap-2 ${isActive
                  ? "text-[#95e500] border-b-2 border-[#95e500]"
                  : "text-gray-900 hover:text-[#95e500]"
              }`
            }
          >
            <Home size={16} /> Home
          </NavLink>

          <NavLink
            to="/diary/milkdiary"
            className={({ isActive }) =>
              `uppercase text-sm tracking-wide transition-colors flex items-center gap-2 ${isActive
                  ? "text-[#95e500] border-b-2 border-[#95e500]"
                  : "text-gray-900 hover:text-[#95e500]"
              }`
            }
          >
            <Milk size={16} /> Milk Diary
          </NavLink>

          {/* Services Dropdown WITH ICON */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="uppercase text-sm tracking-wide text-gray-900 hover:text-[#95e500] flex items-center gap-2">
              <Users size={16} /> Services
              <ChevronDown
                size={16}
                className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white shadow-lg rounded-md py-2 w-56 md:w-64 transition-all duration-300 z-50 ${servicesOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 invisible"
                }`}
            >
              <Link
                to="/diary/diarysupport"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <Sprout size={18} /> Diary Support
              </Link>
              <Link
                to="/diary/milkdiary"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <ShoppingBasket size={18} /> Buy Fresh Dairy Products
              </Link>
              <Link
                to="/diary/diaryevents"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <Calendar size={18} /> Dairy Community Events
              </Link>
              <Link
                to="/diary/diaryknowledge"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <BookOpen size={18} /> Dairy Knowledge Hub
              </Link>
              <Link
                to="/diary/dairycommunity"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <Users size={18} /> Dairy Community
              </Link>
              <Link
                to="/diary/diarycontacts"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <Phone size={18} /> Contact Us
              </Link>
            </div>
          </div>

          <NavLink
            to="/diary/diarysupport"
            className={({ isActive }) =>
              `uppercase text-sm tracking-wide transition-colors flex items-center gap-2 ${isActive
                  ? "text-[#95e500] border-b-2 border-[#95e500]"
                  : "text-gray-900 hover:text-[#95e500]"
              }`
            }
          >
            <Headphones size={16} /> Support
          </NavLink>
        </nav>

        {/* Right Side - Cart & User Profile */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Desktop: Cart and Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart Icon */}
            <div className="relative">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative flex items-center transition-colors ${isActive
                  ? "text-[#95e500]"
                  : "text-gray-900 hover:text-[#95e500]"
                  }`
                }
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </NavLink>
            </div>

            {/* User is logged in */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-9 h-9 rounded-full bg-[#f3cc00] flex items-center justify-center font-bold hover:opacity-90 transition"
                >
                  {user.displayName?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase() || "U"}
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border shadow-lg rounded-md py-2 z-50">
                    <NavLink 
                      to="/profile" 
                      onClick={closeMenu} 
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 text-gray-900"
                    >
                      <User size={16} /> My Profile
                    </NavLink>
                    <NavLink 
                      to="/orders" 
                      onClick={closeMenu} 
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 text-gray-900"
                    >
                      <Package size={16} /> My Orders
                    </NavLink>
                    <NavLink 
                      to="/cart" 
                      onClick={closeMenu} 
                      className="flex items-center gap-3 px-4 py-2 hover:bg-gray-200 text-gray-900"
                    >
                      <ShoppingBag size={16} /> My Cart
                    </NavLink>
                    <button 
                      onClick={handleUpdatePassword} 
                      className="flex items-center gap-3 w-full text-left px-4 py-2 hover:bg-gray-200 text-gray-900"
                    >
                      <Key size={16} /> Update Password
                    </button>
                    <button 
                      onClick={handleLogout} 
                      className="flex items-center gap-3 w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // User is not logged in
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLoginClick}
                  className="text-gray-900 px-4 py-2 rounded font-semibold text-sm hover:text-[#95e500] transition"
                >
                  Login
                </button>
                <button
                  onClick={handleSignupClick}
                  className="bg-green-500 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-green-600 transition"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>

          {/* Mobile: Hamburger and Cart with Badge */}
          <div className="flex md:hidden items-center gap-4">
            <div className="relative">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative flex items-center transition-colors ${isActive
                  ? "text-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
                  }`
                }
              >
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {cartCount > 9 ? "9+" : cartCount}
                  </span>
                )}
              </NavLink>
            </div>
            
            <div className="cursor-pointer" onClick={toggleMenu}>
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu WITH ICONS */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40 py-4 border-t">
          <nav className="flex flex-col items-center gap-4">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `uppercase text-sm tracking-wide transition-colors flex items-center gap-2 ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
                }`
              }
            >
              <Home size={16} /> Home
            </NavLink>

            <NavLink
              to="/diary/milkdiary"
              onClick={closeMenu}
              className={({ isActive }) =>
                `uppercase text-sm tracking-wide transition-colors flex items-center gap-2 ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
                }`
              }
            >
              <Milk size={16} /> Milk Diary
            </NavLink>

            {/* Mobile Services Dropdown */}
            <div className="w-full px-4">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="uppercase text-sm tracking-wide text-gray-900 hover:text-[#95e500] flex items-center gap-2 py-2"
              >
                <Users size={16} /> Services
                <ChevronDown size={16} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
              </button>
              
              {servicesOpen && (
                <div className="pl-8 mt-2 space-y-2">
                  <Link
                    to="/diary/diarysupport"
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#95e500]"
                  >
                    <Sprout size={16} /> Diary Support
                  </Link>
                  <Link
                    to="/diary/milkdiary"
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#95e500]"
                  >
                    <ShoppingBasket size={16} /> Buy Fresh Dairy Products
                  </Link>
                  <Link
                    to="/diary/diaryevents"
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#95e500]"
                  >
                    <Calendar size={16} /> Dairy Community Events
                  </Link>
                  <Link
                    to="/diary/diaryknowledge"
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#95e500]"
                  >
                    <BookOpen size={16} /> Dairy Knowledge Hub
                  </Link>
                  <Link
                    to="/diary/dairycommunity"
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#95e500]"
                  >
                    <Users size={16} /> Dairy Community
                  </Link>
                  <Link
                    to="/diary/diarycontacts"
                    onClick={closeMenu}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#95e500]"
                  >
                    <Phone size={16} /> Contact Us
                  </Link>
                </div>
              )}
            </div>

            <NavLink
              to="/diary/diarysupport"
              onClick={closeMenu}
              className={({ isActive }) =>
                `uppercase text-sm tracking-wide transition-colors flex items-center gap-2 ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
                }`
              }
            >
              <Headphones size={16} /> Support
            </NavLink>

            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) =>
                `uppercase text-sm tracking-wide transition-colors flex items-center gap-2 ${isActive
                  ? "text-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
                }`
              }
            >
              <ShoppingCart size={18} /> Cart ({cartCount})
            </NavLink>

            {/* Mobile Auth Section WITH ICONS */}
            <div className="flex flex-col items-center gap-2 mt-4 w-full px-4">
              {user ? (
                <>
                  <div className="text-gray-900 px-4 py-2 text-sm font-semibold">
                    Hi,{" "}
                    {user.displayName
                      ? user.displayName
                      : user.email?.split("@")[0] || "User"}
                  </div>
                  
                  <div className="w-full">
                    <NavLink 
                      to="/profile" 
                      onClick={closeMenu} 
                      className="flex items-center justify-center gap-2 w-full py-2 border border-gray-900 rounded text-center mb-2"
                    >
                      <User size={16} /> My Profile
                    </NavLink>
                    <NavLink 
                      to="/orders" 
                      onClick={closeMenu} 
                      className="flex items-center justify-center gap-2 w-full py-2 border border-gray-900 rounded text-center mb-2"
                    >
                      <Package size={16} /> My Orders
                    </NavLink>
                    <button
                      onClick={handleUpdatePassword}
                      className="flex items-center justify-center gap-2 w-full py-2 border border-gray-900 rounded mb-2"
                    >
                      <Key size={16} /> Update Password
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full py-2 bg-red-600 text-white rounded"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="w-full px-6 py-2 border border-gray-900 rounded"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignupClick}
                    className="w-full px-6 py-2 bg-green-500 text-white rounded"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      <AuthModal
        type={authType}
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
};

export default DairyNavbar;