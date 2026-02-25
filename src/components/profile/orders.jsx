import React from 'react';
import { Package, ChevronRight } from 'lucide-react';

const OrderHistory = () => {
  const orders = [
    { id: "#SUP-9281", date: "Feb 04, 2026", total: "₹240", status: "Delivered", items: "A2 Milk - 2L" },
    { id: "#SUP-8172", date: "Feb 02, 2026", total: "₹450", status: "Processing", items: "Button Mushroom - 2Kg" },
  ];

  return (
    <div>
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic mb-8">Order History.</h3>
      
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-transparent hover:border-emerald-100 transition-all">
            <div className="flex items-center gap-6 mb-4 md:mb-0">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-slate-400">
                <Package size={24} />
              </div>
              <div>
                <p className="text-sm font-black text-slate-900 leading-none mb-1">{order.id}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.date}</p>
              </div>
            </div>

            <div className="text-center md:text-left mb-4 md:mb-0 px-8">
              <p className="text-xs font-black text-slate-900 mb-1">{order.items}</p>
              <p className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block ${order.status === 'Delivered' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                {order.status}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-lg font-black text-slate-900">{order.total}</span>
              <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 hover:text-emerald-600 shadow-sm border border-slate-100">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;