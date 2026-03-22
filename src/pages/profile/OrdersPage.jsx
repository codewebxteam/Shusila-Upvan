import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package, ChevronRight, Box, Calendar,
    CheckCircle2, Clock, Truck, Home,
    ArrowLeft, Search, Filter, MoreVertical, X
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
    const { orders } = useOrders();
    const navigate = useNavigate();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isEditingPhone, setIsEditingPhone] = useState(false);
    const [newPhone, setNewPhone] = useState('');

    const getStatusColor = (status) => {
        switch (status) {
            case 'Placed': return 'bg-amber-100 text-amber-600';
            case 'Confirmed': return 'bg-blue-100 text-blue-600';
            case 'Shipped': return 'bg-indigo-100 text-indigo-600';
            case 'Delivered': return 'bg-emerald-100 text-emerald-600';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    const formatDate = (dateString, includeTime = false) => {
        const date = new Date(dateString);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const day = date.getDate();
        const month = date.toLocaleDateString('en-US', { month: 'short' });
        const year = date.getFullYear().toString().substr(-2);

        let suffix = 'th';
        if (day === 1 || day === 21 || day === 31) suffix = 'st';
        else if (day === 2 || day === 22) suffix = 'nd';
        else if (day === 3 || day === 23) suffix = 'rd';

        let formatted = `${dayName}, ${day}${suffix} ${month} '${year}`;
        if (includeTime) {
            const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
            formatted = `${dayName}, ${day}${suffix} ${month} '${year} - ${time}`;
        }
        return formatted;
    };

    return (
        <div className="min-h-screen bg-[#fdfdfd] pb-24">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100 px-6 py-6">
                <div className="container mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate('/')}
                            className="p-2.5 bg-slate-50 rounded-2xl text-slate-400 hover:text-slate-900 transition-colors"
                        >
                            <ArrowLeft size={20} />
                        </motion.button>
                        <div>
                            <h1 className="text-2xl font-serif text-[#3a3f30] tracking-tight leading-none mb-1">My Orders</h1>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Manage and track your orders</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-12">
                {orders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-24 h-24 bg-slate-50 rounded-[2.5rem] flex items-center justify-center text-slate-200 mb-8 border border-slate-100">
                            <Package size={48} />
                        </div>
                        <h2 className="text-2xl font-serif text-[#3a3f30] mb-3">No orders found</h2>
                        <p className="text-sm text-slate-400 mb-8 max-w-xs">You haven't placed any orders yet. Start shopping to see your orders here.</p>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/')}
                            className="px-8 py-4 bg-[#111827] text-white rounded-full text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-200 transition-all hover:bg-emerald-600"
                        >
                            Explore Products
                        </motion.button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                        {orders.map((order) => (
                            <motion.div
                                key={order.id}
                                layoutId={order.id}
                                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:shadow-xl hover:border-emerald-100 transition-all duration-500 group"
                            >
                                <div className="p-8">
                                    {/* Order Header */}
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

                                    {/* Items Preview */}
                                    <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                                        {order.items.map((item, idx) => (
                                            <div key={idx} className="w-40 h-40 bg-white rounded-[2.5rem] border border-slate-100 p-6 shrink-0 shadow-sm group-hover:border-emerald-100 transition-all duration-500">
                                                <img src={item.img} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Order Footer */}
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
                )}
            </main>

            {/* Tracking Modal */}
            <AnimatePresence>
                {selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center p-0 bg-slate-900/60 backdrop-blur-md"
                        onClick={() => setSelectedOrder(null)}
                    >
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-white w-full h-full flex flex-col overflow-hidden shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header: Simple Back Arrow to mimic single-page dedicated page */}
                            <div className="p-5 border-b border-slate-100 flex items-center gap-4 bg-white sticky top-0 z-10">
                                <button
                                    onClick={() => setSelectedOrder(null)}
                                    className="p-1.5 hover:bg-slate-100 rounded-full text-slate-700 transition-colors"
                                >
                                    <ArrowLeft size={22} strokeWidth={1.8} />
                                </button>
                            </div>

                            {/* Center Timeline Area */}
                            <div className="p-6 md:p-8 flex-1 overflow-y-auto scrollbar-hide bg-white">
                                <div className="relative space-y-6">
                                    {selectedOrder.timeline.map((step, idx) => {
                                        const isCompleted = step.completed || idx === 0;
                                        const hasNext = idx < selectedOrder.timeline.length - 1;
                                        const isNextCompleted = selectedOrder.timeline[idx + 1]?.completed;

                                        return (
                                            <div key={idx} className="relative flex items-start gap-5 pb-7">
                                                {/* Left Column: Dot & Connecting Line */}
                                                <div className="flex flex-col items-center w-3 shrink-0 relative mt-1 h-full">
                                                    {hasNext && (
                                                        <div className={`w-[2px] h-[calc(100%+16px)] absolute top-3 left-[5px] ${isNextCompleted ? 'bg-green-600' : 'bg-slate-200'}`} />
                                                    )}
                                                    <div className={`relative z-10 w-2.5 h-2.5 rounded-full shrink-0 border-2 border-white ${isCompleted ? 'bg-green-600' : 'bg-slate-200'}`} />
                                                </div>

                                                {/* Content */}
                                                <div className="flex-1 -mt-0.5">
                                                    {/* Header: Status and Date */}
                                                    <div className="flex flex-wrap items-baseline gap-2 mb-1">
                                                        <h4 className={`text-[15px] font-semibold ${isCompleted ? 'text-slate-900' : 'text-slate-400'}`}>
                                                            {step.status}
                                                        </h4>
                                                        {step.date && (
                                                            <span className="text-[12px] text-gray-400 font-medium">
                                                                {formatDate(step.date)}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Description with Time below */}
                                                    <div className="space-y-1">
                                                        <p className={`text-[13.5px] leading-relaxed ${isCompleted ? 'text-slate-700' : 'text-slate-300'}`}>
                                                            {step.desc}
                                                        </p>
                                                        {step.date && isCompleted && (
                                                            <p className="text-[11.5px] text-slate-400 font-medium mt-1">
                                                                {formatDate(step.date, true)}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className="h-4 bg-white shrink-0" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrdersPage;
