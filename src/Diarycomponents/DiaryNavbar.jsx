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
import AuthModal from "../components/AuthModal";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext"; // CartContext import

const DairyNavbar = () => {
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

        {/* Middle Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center justify-center gap-6 lg:gap-8 absolute left-1/2 transform -translate-x-1/2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `uppercase text-sm tracking-wide transition-colors ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/diary/milkdiary"
            className={({ isActive }) =>
              `uppercase text-sm tracking-wide transition-colors ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
              }`
            }
          >
            Milk Diary
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
              `uppercase text-sm tracking-wide transition-colors ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
              }`
            }
          >
            Support
          </NavLink>
        </nav>

        {/* Right Side - Cart & User Profile */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Desktop: Cart and Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* User is logged in */}
            {user ? (
              <>
                {/* User Profile with Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 text-gray-900 px-4 py-2 rounded font-semibold text-sm hover:text-[#95e500] transition"
                  >
                    Hi,{" "}
                    {user.displayName
                      ? user.displayName.split(" ")[0]
                      : user.email
                        ? user.email.split("@")[0]
                        : "User"}
                    <ChevronDown
                      size={16}
                      className={`${profileOpen ? "rotate-180" : ""
                        } transition-transform`}
                    />
                  </button>

                  {profileOpen && (
                    <div className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-md py-2 w-48 text-gray-900 z-50 border">
                      <button
                        onClick={handleUpdatePassword}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold hover:bg-gray-100"
                      >
                        <LockKeyhole size={16} /> Update Password
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-gray-100"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  )}
                </div>

                {/* Cart Icon with Badge - User ke baad */}
                <div className="relative">
                  <NavLink
                    to="/cart"
                    className={({ isActive }) =>
                      `relative flex items-center transition-colors ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
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
              </>
            ) : (
              // User is not logged in
              <>
                <div className="flex items-center gap-4">
                  {/* Cart Icon for non-logged in users with Badge */}
                  <div className="relative">
                    <NavLink
                      to="/cart"
                      className={({ isActive }) =>
                        `relative flex items-center transition-colors ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
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

                  <button
                    onClick={handleLoginClick}
                    className="text-gray-900 px-4 py-2 rounded font-semibold text-sm hover:text-[#95e500] transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignupClick}
                    className="bg-green-500 text-white px-4 py-2 rounded font-semibold text-sm hover:text-[#95e500] transition"
                  >
                    Sign Up
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile: Hamburger and Cart with Badge */}
          <div className="flex md:hidden items-center gap-4">
            {/* Mobile me Cart icon with Badge */}
            <div className="relative">
              <NavLink
                to="/cart"
                className={({ isActive }) =>
                  `relative flex items-center transition-colors ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
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
        </div>
      </header>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40 py-4 border-t">
          <nav className="flex flex-col items-center gap-4">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `uppercase text-sm tracking-wide transition-colors ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/diary/milkdiary"
              onClick={closeMenu}
              className={({ isActive }) =>
                `uppercase text-sm tracking-wide transition-colors ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
                }`
              }
            >
              Milk Diary
            </NavLink>

            {/* Mobile Services */}
            <div className="w-full px-4">
              <Link
                to="/diary/diarysupport"
                onClick={closeMenu}
                className="uppercase text-sm tracking-wide text-gray-900 hover:text-[#95e500] block py-2"
              >
                Services
              </Link>
            </div>

            <NavLink
              to="/diary/diarysupport"
              onClick={closeMenu}
              className={({ isActive }) =>
                `uppercase text-sm tracking-wide transition-colors ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
                  : "text-gray-900 hover:text-[#95e500]"
                }`
              }
            >
              Support
            </NavLink>

            {/* Cart in Mobile Menu */}
            <NavLink
              to="/cart"
              onClick={closeMenu}
              className={({ isActive }) =>
                `uppercase text-sm tracking-wide transition-colors flex items-center gap-2 ${isActive
                  ? "text-[#f3cc00] border-b-2 border-[#f3cc00]"
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
                      ? user.displayName.split(" ")[0]
                      : user.email
                        ? user.email.split("@")[0]
                        : "User"}
                  </div>
                  <button
                    onClick={handleUpdatePassword}
                    className="flex items-center gap-2 text-gray-900 px-4 py-2 text-sm font-semibold w-full justify-center"
                  >
                    <LockKeyhole size={16} /> Update Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 px-4 py-2 text-sm font-semibold w-full justify-center"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={handleLoginClick}
                    className="text-gray-900 px-4 py-2 text-sm font-semibold w-full"
                  >
                    Login
                  </button>
                  <button
                    onClick={handleSignupClick}
                    className="bg-green-500 text-white px-4 py-2 text-sm font-semibold rounded w-full"
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

export default DairyNavbar;