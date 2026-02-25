import React from 'react';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';

const CartView = () => {
  return (
    <div className="flex flex-col h-full">
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic mb-8">My Cart.</h3>
      
      <div className="flex-1 space-y-6">
        {/* Sample Item */}
        <div className="flex items-center justify-between p-4 bg-slate-50 rounded-3xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl border border-slate-100 flex items-center justify-center text-[8px] font-black italic">IMG</div>
            <div>
              <p className="text-sm font-black text-slate-900 leading-none">A2 Desi Cow Milk</p>
              <p className="text-[10px] font-bold text-emerald-600 uppercase mt-1 italic tracking-widest">Fresh Batch</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-black text-slate-900">₹170 (2L)</span>
            <button className="text-slate-300 hover:text-red-500 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        </div>

        {/* Empty State Logic can be added here */}
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100">
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Order Total</p>
            <p className="text-4xl font-black text-slate-900 tracking-tighter leading-none">₹170.00</p>
          </div>
          <button className="px-12 py-5 bg-slate-900 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3 hover:bg-emerald-600 transition-all">
            Secure Checkout <ArrowRight size={14} />
          </button>
        </div>
        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest italic">Free delivery in Khalilabad city limits</p>
      </div>
    </div>
  );
};

export default CartView;