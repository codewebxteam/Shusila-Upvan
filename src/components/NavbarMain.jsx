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
} from "lucide-react";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // CartContext import

const MushroomNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authType, setAuthType] = useState("login");
  const [profileOpen, setProfileOpen] = useState(false);
  
  const { user, logout, sendPasswordUpdateLink } = useAuth();
  const { cartCount } = useCart(); // Cart count get karna

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
        className="flex justify-between items-center px-4 sm:px-8 py-4 sticky top-0 z-50 w-full text-gray-900 backdrop-blur-sm bg-[#fdfbe9]/90"
        style={{ fontFamily: "Orbitron, sans-serif" }}
      >
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-xl md:text-2xl font-medium tracking-wider uppercase flex-shrink-0"
        >
          Shusila-Upvan
        </Link>

        {/* Center: Navigation Links (Desktop) */}
        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `uppercase text-sm tracking-wide transition-colors ${
                isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/mushrooms"
            className={({ isActive }) =>
              `uppercase text-sm tracking-wide transition-colors ${
                isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
              }`
            }
          >
            Mushrooms
          </NavLink>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button className="uppercase text-sm tracking-wide text-gray-900 hover:text-[#95e500] flex items-center">
              Services
              <ChevronDown
                size={16}
                className={`ml-1 transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-[#fdfbe9] shadow-lg rounded-md py-2 w-56 md:w-64 transition-all duration-300 z-50 ${
                servicesOpen
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-95 invisible"
              }`}
            >
              <Link
                to="/farmer-support"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <Sprout size={18} /> Cultivation Support
              </Link>
              <Link
                to="/mushrooms"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <ShoppingBasket size={18} /> Buy Fresh Mushrooms
              </Link>
              <Link
                to="/events"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <Calendar size={18} /> Community Events
              </Link>
              <Link
                to="/knowledge"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <BookOpen size={18} /> Knowledge Hub
              </Link>
              <Link
                to="/community"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <Users size={18} /> Farmer Community
              </Link>
              <Link
                to="/contact"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-2 text-sm font-semibold text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-[#95e500] hover:to-[#f3cc00] rounded-md transition"
              >
                <Phone size={18} /> Contact Us
              </Link>
            </div>
          </div>

          <NavLink
            to="/farmer-support"
            className={({ isActive }) =>
              `uppercase text-sm tracking-wide transition-colors ${
                isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
              }`
            }
          >
            Support
          </NavLink>
        </nav>

        {/* Right Side: Auth + Cart (Desktop) - ORDER CHANGED */}
        <div className="hidden md:flex items-center gap-6">
          {/* Auth Section - Pehle */}
          {user ? (
            <div className="flex items-center gap-4">
              {/* User Profile with Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 text-gray-900 px-3 py-2 rounded font-semibold text-sm hover:text-[#95e500] transition"
                >
                  Hi,{" "}
                  {user.displayName
                    ? user.displayName.split(" ")[0]
                    : user.email
                    ? user.email.split("@")[0]
                    : "User"}
                  <ChevronDown
                    size={16}
                    className={`${
                      profileOpen ? "rotate-180" : ""
                    } transition-transform`}
                  />
                </button>

                {profileOpen && (
                  <div className="absolute top-full right-0 mt-2 bg-[#fdfbe9] shadow-lg rounded-md py-2 w-48 text-gray-900 z-50 border">
                    <button
                      onClick={handleUpdatePassword}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold hover:bg-gray-200"
                    >
                      <LockKeyhole size={16} /> Update Password
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-200"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </div>
                )}
              </div>
              
              {/* Cart Icon - User profile ke baad */}
              <div className="relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `relative flex items-center transition-colors ${
                      isActive
                        ? "text-[#f3cc00]"
                        : "text-gray-900 hover:text-[#95e500]"
                    }`
                  }
                >
                  <ShoppingCart size={24} />
                  {/* Cart Item Count Badge */}
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </NavLink>
              </div>
            </div>
          ) : (
            // User is not logged in
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleLoginClick}
                  className="text-gray-900 px-4 py-2 rounded font-semibold text-sm hover:text-[#95e500] transition"
                >
                  Login
                </button>
                <button
                  onClick={handleSignupClick}
                  className="bg-[#f3cc00] text-gray-900 px-4 py-2 rounded font-semibold text-sm hover:bg-[#95e500] transition"
                >
                  Sign Up
                </button>
              </div>
              
              {/* Cart Icon for logged-out users */}
              <div className="relative">
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `relative flex items-center transition-colors ${
                      isActive
                        ? "text-[#f3cc00]"
                        : "text-gray-900 hover:text-[#95e500]"
                    }`
                  }
                >
                  <ShoppingCart size={24} />
                  {/* Cart Item Count Badge */}
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartCount > 9 ? "9+" : cartCount}
                    </span>
                  )}
                </NavLink>
              </div>
            </div>
          )}
        </div>

        {/* Mobile: Hamburger and Cart with Badge */}
        <div className="flex md:hidden items-center gap-4">
          {/* Mobile me Cart icon with Badge */}
          <div className="relative">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `relative flex items-center transition-colors ${
                  isActive
                    ? "text-[#f3cc00]"
                    : "text-gray-900 hover:text-[#95e500]"
                }`
              }
            >
              <ShoppingCart size={22} />
              {/* Cart Item Count Badge - Mobile */}
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-bold">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </NavLink>
          </div>
          
          {/* Hamburger */}
          <div className="cursor-pointer" onClick={toggleMenu}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#fdfbe9] shadow-lg z-40 py-4 border-t">
          <nav className="flex flex-col items-center gap-4">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `uppercase text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                    : "text-gray-900 hover:text-[#95e500]"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/mushrooms"
              onClick={closeMenu}
              className={({ isActive }) =>
                `uppercase text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                    : "text-gray-900 hover:text-[#95e500]"
                }`
              }
            >
              Mushrooms
            </NavLink>

            <NavLink
              to="/farmer-support"
              onClick={closeMenu}
              className={({ isActive }) =>
                `uppercase text-sm tracking-wide transition-colors ${
                  isActive
                    ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                    : "text-gray-900 hover:text-[#95e500]"
                }`
              }
            >
              Support
            </NavLink>

            {/* Mobile Services Dropdown */}
            <div className="w-full px-4">
              <Link
                to="/farmer-support"
                onClick={closeMenu}
                className="uppercase text-sm tracking-wide text-gray-900 hover:text-[#95e500] block py-2"
              >
                Services
              </Link>
            </div>

            {/* Cart in Mobile Menu */}
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) =>
                `uppercase text-sm tracking-wide transition-colors flex items-center gap-2 ${
                  isActive
                    ? "text-[#f3cc00]"
                    : "text-gray-900 hover:text-[#95e500]"
                }`
              }
            >
              <ShoppingCart size={18} /> Cart ({cartCount})
            </NavLink>

            {/* Mobile Auth Section */}
            <div className="flex flex-col items-center gap-2 mt-4 w-full px-4">
              {user ? (
                <>
                  <div className="text-gray-900 px-4 py-2 text-sm font-semibold">
                    Hi,{" "}
                    {user.displayName
                      ? user.displayName
                      : user.email?.split("@")[0] || "User"}
                  </div>
                  <button
                    onClick={handleUpdatePassword}
                    className="w-full flex items-center justify-center gap-2 py-2 border border-gray-900 rounded"
                  >
                    <LockKeyhole size={18} /> Update Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2 bg-red-600 text-white rounded"
                  >
                    <LogOut size={18} /> Logout
                  </button>
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
                    className="w-full px-6 py-2 bg-[#f3cc00] text-gray-900 rounded"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        type={authType}
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
      />
    </>
  );
};

export default MushroomNavbar;