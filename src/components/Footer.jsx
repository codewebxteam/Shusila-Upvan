import { Link } from "react-router-dom";
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
  Leaf
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-white w-full border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <Leaf className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Shusila Upvan
            </h2>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Fresh, organic, and sustainable farming solutions. Supporting farmers 
            and bringing nature's goodness to your community.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-400">Explore</h3>
          <ul className="flex flex-col gap-3">
            <li>
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Home size={16} className="text-green-400" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dairy"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ShoppingBasket size={16} className="text-green-400" />
                <span>Dairy</span>
              </Link>
            </li>
            <li>
              <Link
                to="/mushrooms"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Sprout size={16} className="text-green-400" />
                <span>Mushrooms</span>
              </Link>
            </li>
            <li>
              <Link
                to="/events"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Calendar size={16} className="text-green-400" />
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <Phone size={16} className="text-green-400" />
                <span>Contact</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-green-400">
            Get in Touch
          </h3>
          <ul className="flex flex-col gap-3">
            <li className="flex items-center gap-2">
              <Mail size={18} className="text-green-400" />
              <a
                href="mailto:info@shusilaupvan.org"
                className="text-gray-400 hover:text-white transition-colors"
              >
                info@shusilaupvan.org
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Twitter size={18} className="text-green-400" />
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
              <Linkedin size={18} className="text-green-400" />
              <a
                href="https://linkedin.com/company/shusilaupvan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Shusila Upvan
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Instagram size={18} className="text-green-400" />
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
              <Leaf size={18} className="text-green-400" />
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

      {/* Bottom */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Shusila Upvan. All rights reserved.
        </div>
      </div>

      {/* Bottom Gradient Line */}
      <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />
    </footer>
  );
}