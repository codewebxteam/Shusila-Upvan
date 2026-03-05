import React, { useState } from 'react';
import { Package, ChevronRight, Box, Truck, CheckCircle2, Clock, Home, X, MoreVertical } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { motion, AnimatePresence } from 'framer-motion';

const OrderHistory = () => {
  const { orders } = useOrders();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Placed': return 'bg-amber-100 text-amber-600';
      case 'Confirmed': return 'bg-blue-100 text-blue-600';
      case 'Shipped': return 'bg-indigo-100 text-indigo-600';
      case 'Delivered': return 'bg-emerald-100 text-emerald-600';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center text-slate-200 mb-6 border border-slate-100">
          <Package size={40} />
        </div>
        <h3 className="text-xl font-serif text-[#3a3f30] mb-2">No orders yet</h3>
        <p className="text-xs text-slate-400 max-w-[200px]">Your order history will appear here once you place an order.</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic mb-8">Order History.</h3>

      <div className="grid grid-cols-1 gap-6">
        {orders.map((order) => (
          <motion.div
            key={order.id}
            layoutId={order.id}
            className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-emerald-100 transition-all duration-500 group"
          >
            <div className="p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    <Box size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Order ID: {order.id}</p>
                    <p className="text-xs font-bold text-slate-900">Placed on {formatDate(order.date)}</p>
                  </div>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                {order.items.map((item, idx) => (
                  <div key={idx} className="w-40 h-40 bg-white rounded-[2.5rem] border border-slate-100 p-6 shrink-0 shadow-sm group-hover:border-emerald-100 transition-all duration-500">
                    <img src={item.img} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                  <p className="text-xl font-bold font-serif text-[#313628]">₹{(order.grandTotal || order.amount || 0).toLocaleString('en-IN')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedOrder(order)}
                    className="px-6 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-200/50 flex items-center gap-2"
                  >
                    Track Order <ChevronRight size={14} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tracking Modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
            onClick={() => setSelectedOrder(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="bg-white rounded-[3rem] w-full max-w-xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                    <Truck size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif text-[#3a3f30] leading-none mb-1">Tracking Order</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Order ID: {selectedOrder.id}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-10">
                <div className="relative space-y-12">
                  <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-slate-100" />
                  {selectedOrder.timeline.map((step, idx) => {
                    const isCompleted = step.completed || idx === 0;
                    return (
                      <div key={idx} className="relative flex items-start gap-8">
                        <div className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 border-4 border-white shadow-md ${isCompleted ? 'bg-emerald-600 text-white shadow-emerald-200' : 'bg-white text-slate-300'
                          }`}>
                          {idx === 0 && <CheckCircle2 size={24} />}
                          {idx === 1 && <Clock size={24} />}
                          {idx === 2 && <Truck size={24} />}
                          {idx === 3 && <Home size={24} />}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className={`text-sm font-black uppercase tracking-wider ${isCompleted ? 'text-slate-900' : 'text-slate-300'}`}>
                              {step.status}
                            </h4>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">
                              {formatDate(step.date)}
                            </span>
                          </div>
                          <p className={`text-xs leading-relaxed ${isCompleted ? 'text-slate-500' : 'text-slate-300'}`}>
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-8 bg-slate-50 text-center">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedOrder(null)}
                  className="w-full py-4 bg-white border border-slate-200 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Close Details
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OrderHistory;
