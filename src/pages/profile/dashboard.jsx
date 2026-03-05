import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, ShoppingBag, ShoppingCart, Heart } from 'lucide-react';

// Components Import
import ProfileSettings from '../../components/profile/profile';
import OrderHistory from '../../components/profile/orders';
import CartView from '../../components/profile/cart';
import Wishlist from '../../components/profile/wishlist';

const Dashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    if (location.state) {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    }
  }, [location.state]);

  const menuItems = [
    { id: 'profile', label: 'Profile Settings', icon: <User size={20} /> },
    { id: 'cart', label: 'My Cart', icon: <ShoppingCart size={20} /> },
    { id: 'orders', label: 'My Orders', icon: <ShoppingBag size={20} /> },
    { id: 'wishlist', label: 'My Wishlist', icon: <Heart size={20} /> },
  ];

  return (
    <main className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Sidebar Navigation (In-Page) */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-100">
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${activeTab === item.id
                      ? 'bg-slate-900 text-white shadow-xl'
                      : 'text-slate-500 hover:bg-slate-50'
                      }`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content Area: Yahan change dikhega */}
          <section className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-sm border border-slate-100 min-h-[600px]"
            >
              {/* Dynamic Rendering Based on Active Tab */}
              {activeTab === 'profile' && <ProfileSettings />}
              {activeTab === 'cart' && <CartView />}
              {activeTab === 'orders' && <OrderHistory />}
              {activeTab === 'wishlist' && <Wishlist />}
            </motion.div>
          </section>

        </div>
      </div>
    </main>
  );
};

export default Dashboard;