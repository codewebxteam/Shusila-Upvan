import React from 'react';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CartView = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic mb-8">My Cart.</h3>

      <div className="flex-1 space-y-6 overflow-y-auto pr-2">
        <AnimatePresence mode="popLayout">
          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-64 text-center"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-4">
                <ShoppingCart size={32} />
              </div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Your cart is empty.</p>
            </motion.div>
          ) : (
            cart.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden">
                    <img src={item.img} alt={item.name} className="w-4/5 h-4/5 object-contain" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900 leading-none">{item.name}</p>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase mt-1 italic tracking-widest">{item.tag || 'Fresh Batch'}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-5 h-5 bg-white border border-slate-200 rounded-md flex items-center justify-center text-[10px] font-black">-</button>
                      <span className="text-[10px] font-black">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-5 h-5 bg-white border border-slate-200 rounded-md flex items-center justify-center text-[10px] font-black">+</button>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-black text-slate-900">₹{item.price * item.quantity}</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-200 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100">
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Order Total</p>
            <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">₹{cartTotal.toFixed(2)}</p>
          </div>
          <button
            disabled={cart.length === 0}
            onClick={() => navigate('/success')}
            className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3 hover:bg-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Secure Checkout <ArrowRight size={14} />
          </button>
        </div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Free delivery in Khalilabad city limits</p>
      </div>
    </div>
  );
};

export default CartView;