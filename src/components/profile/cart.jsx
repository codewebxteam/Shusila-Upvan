import React from 'react';
import { ShoppingCart, ArrowRight, ShoppingBag, Sprout, Milk } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartView = () => {
  const navigate = useNavigate();
  const { cartItems, cartCount, grandTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-12">
        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4">
          <ShoppingBag size={28} className="text-slate-300" />
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tighter mb-2">Cart is Empty</h3>
        <p className="text-sm text-slate-400 mb-6">Add products from our store</p>
        <div className="flex gap-3">
          <button
            onClick={() => navigate('/mushroom')}
            className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-colors"
          >
            <Sprout size={12} /> Mushrooms
          </button>
          <button
            onClick={() => navigate('/dairy')}
            className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-blue-700 transition-colors"
          >
            <Milk size={12} /> Dairy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic mb-8">My Cart.</h3>

      <div className="flex-1 space-y-4">
        {cartItems.map((item) => (
          <div key={`${item.category}-${item.id}`} className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white rounded-2xl border border-slate-100 overflow-hidden flex items-center justify-center">
                <img src={item.img} alt={item.name} className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 leading-none">{item.name}</p>
                <p className="text-[10px] font-bold text-emerald-600 uppercase mt-1 italic tracking-widest">Qty: {item.quantity}</p>
              </div>
            </div>
            <span className="text-sm font-black text-slate-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100">
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Order Total</p>
            <p className="text-3xl font-black text-slate-900 tracking-tighter leading-none">₹{grandTotal.toLocaleString('en-IN')}</p>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="px-8 py-4 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3 hover:bg-emerald-600 transition-all"
          >
            View Full Cart <ArrowRight size={14} />
          </button>
        </div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Free delivery in Khalilabad city limits</p>
      </div>
    </div>
  );
};

export default CartView;