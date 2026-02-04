import {
  Twitter,
  Linkedin,
  Mail,
  Instagram,
  Home,
  ShoppingBasket,
  Calendar,
  Sprout,
  Phone,
  Shield,
  Leaf
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white w-full border-t border-white/10">
      {/* Top Section */}
      <div className="w-full max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand & Mission */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-xl flex items-center justify-center">
              <Leaf className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-bold text-white">
              Shusila <span className="text-yellow-400">Upvan</span>
            </h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            🥛 Fresh exotic Milk Diary products delivered with care.
            Supporting Diary and bringing nature's goodness to your Cup and Glasses.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">Explore</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Home size={16} className="text-yellow-400" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/diary/milkdiary"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ShoppingBasket size={16} className="text-yellow-400" />
                <span>Milk Diary</span>
              </Link>
            </li>
            <li>
              <Link
                to="/diary/diaryevents"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Calendar size={16} className="text-yellow-400" />
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link
                to="/diary/diarysupport"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Sprout size={16} className="text-yellow-400" />
                <span>Diary Products Support</span>
              </Link>
            </li>
            <li>
              <Link
                to="/diary/diarycontacts"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Phone size={16} className="text-yellow-400" />
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-yellow-400">
            Get in Touch
          </h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-yellow-400" />
              <a
                href="mailto:info@shusilaupvan.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                info@shusilaupvan.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Twitter size={18} className="text-yellow-400" />
              <a
                href="https://twitter.com/shusilaupvan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                @shusilaupvan
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Linkedin size={18} className="text-yellow-400" />
              <a
                href="https://linkedin.com/company/shusilaupvan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                shusilaupvan
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={18} className="text-yellow-400" />
              <a
                href="https://instagram.com/shusilaupvan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                @shusilaupvan
              </a>
            </li>
           
            <li className="flex items-center gap-2">
              <Shield size={18} className="text-yellow-400" />
              <Link
                to="/admin"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Admin Panel
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full border-t border-white/10"></div>

      {/* Bottom Section */}
      <div className="w-full text-center text-gray-500 text-sm py-6">
        &copy; {new Date().getFullYear()} Shusila Upvan. All rights reserved.
      </div>

      {/* Bottom Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500" />
    </footer>
  );
}