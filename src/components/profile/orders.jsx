import React, { useState } from 'react';
import { Package, ChevronRight, Box, Truck, CheckCircle2, Clock, Home, X } from 'lucide-react';
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
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{formatDate(order.date)}</p>
              </div>
            </div>

            <div className="text-center md:text-left mb-4 md:mb-0 px-8">
              <p className="text-xs font-black text-slate-900 mb-1">
                {order.items.length} {order.items.length === 1 ? 'Item' : 'Items'}
              </p>
              <p className={`text-[8px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block ${getStatusColor(order.status)}`}>
                {order.status}
              </p>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-lg font-black text-slate-900">₹{order.grandTotal.toLocaleString('en-IN')}</span>
              <button
                onClick={() => setSelectedOrder(order)}
                className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300 hover:text-emerald-600 shadow-sm border border-slate-100"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
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
