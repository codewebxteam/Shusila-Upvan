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

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
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
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 sm:p-0 backdrop-blur-sm"
                        onClick={() => setSelectedOrder(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-[#f1f3f6] w-full max-w-[450px] sm:h-auto h-[90vh] overflow-y-auto sm:rounded-sm shadow-2xl relative flex flex-col font-sans"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="bg-white px-4 py-3 shadow-sm flex items-center gap-3 sticky top-0 z-10 border-b border-gray-200">
                                <button onClick={() => setSelectedOrder(null)} className="p-1 hover:bg-gray-100 rounded-full text-gray-700 transition-colors">
                                    <X size={24} strokeWidth={2} />
                                </button>
                                <h2 className="text-[17px] font-medium text-gray-900 tracking-wide">Order Details</h2>
                            </div>

                            <div className="flex-1 p-2 space-y-2">
                                {/* Order ID & Basic Info Card */}
                                <div className="bg-white p-4 shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-900 mb-1">Order ID - {selectedOrder.id || selectedOrder.firebaseId?.slice(-10).toUpperCase() || 'OD1234567890'}</h3>
                                            <p className="text-xs text-gray-500 flex items-center gap-1">
                                                Item total: <span className="font-medium text-gray-900">₹{(selectedOrder.grandTotal || selectedOrder.amount || 0).toLocaleString('en-IN')}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Tracking Timeline Card */}
                                <div className="bg-white p-6 shadow-sm">
                                    <div className="relative">
                                        {selectedOrder.timeline.map((step, index) => {
                                            const isCompleted = step.completed || index === 0;
                                            const isNextCompleted = selectedOrder.timeline[index + 1]?.completed;
                                            const isCancelledNode = step.status === 'Cancelled';
                                            const hasLine = index < selectedOrder.timeline.length - 1;

                                            const dotColor = isCancelledNode ? 'bg-[#ff6161]' : (isCompleted ? 'bg-[#26a541]' : 'bg-gray-300');
                                            const lineColor = isNextCompleted ? (selectedOrder.timeline[index + 1]?.status === 'Cancelled' ? 'bg-[#ff6161]' : 'bg-[#26a541]') : 'bg-gray-200';

                                            return (
                                                <div key={index} className="flex gap-4 relative min-h-[70px]">
                                                    {/* Left Side: Icon & Line */}
                                                    <div className="flex flex-col items-center w-6">
                                                        <div className="relative mt-1">
                                                            <div className={`w-3 h-3 rounded-full z-10 relative ${dotColor}`}></div>
                                                            {isCompleted && !isNextCompleted && hasLine && (
                                                               <div className="absolute inset-0 bg-[#26a541] rounded-full animate-ping opacity-20"></div> 
                                                            )}
                                                        </div>
                                                        {hasLine && (
                                                            <div className={`w-[2px] h-full absolute top-4 bottom-[-10px] ${lineColor}`}></div>
                                                        )}
                                                    </div>

                                                    {/* Right Side: Content */}
                                                    <div className="flex-1 pb-6 -mt-0.5">
                                                        <h4 className={`text-[15px] font-medium tracking-wide ${isCancelledNode ? 'text-[#ff6161]' : (isCompleted ? 'text-gray-900' : 'text-gray-400')}`}>
                                                            {step.status}
                                                        </h4>
                                                        <p className={`text-[13px] mt-1 tracking-wide ${isCompleted ? 'text-gray-600' : 'text-gray-400'}`}>
                                                            {step.desc} {step.date && <span className="block mt-0.5">{formatDate(step.date)}</span>}
                                                        </p>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Shipping Address Card */}
                                <div className="bg-white p-4 shadow-sm mt-2">
                                    <h4 className="text-[15px] font-medium text-gray-900 mb-2">Shipping Details</h4>
                                    <div className="text-[13px] text-gray-700 leading-relaxed">
                                        <p className="font-medium text-gray-900 mb-1">{selectedOrder.address?.fullName || selectedOrder.shippingAddress?.fullName || selectedOrder.fullName || selectedOrder.customer || 'Customer'}</p>
                                        
                                        {(selectedOrder.address || selectedOrder.shippingAddress || selectedOrder.street) ? (
                                            <>
                                                <p>{selectedOrder.address?.street || selectedOrder.shippingAddress?.addressLine1 || selectedOrder.street}</p>
                                                <p>{selectedOrder.address?.locality || selectedOrder.shippingAddress?.locality || selectedOrder.locality}</p>
                                                <p>
                                                    {selectedOrder.address?.city || selectedOrder.shippingAddress?.city || selectedOrder.city},{' '} 
                                                    {selectedOrder.address?.state || selectedOrder.shippingAddress?.state || selectedOrder.state} -{' '}
                                                    <span className="font-medium">{selectedOrder.address?.pincode || selectedOrder.shippingAddress?.pincode || selectedOrder.pincode}</span>
                                                </p>
                                                <div className="mt-3 py-2 border-t border-gray-100 flex items-center justify-between">
                                                    {isEditingPhone ? (
                                                        <div className="flex items-center gap-2 w-full">
                                                            <input 
                                                                type="text" 
                                                                value={newPhone}
                                                                onChange={(e) => setNewPhone(e.target.value)}
                                                                className="flex-1 border border-gray-300 rounded px-2 py-1 text-[13px] outline-none focus:border-[#2874f0]"
                                                                placeholder="Enter new number"
                                                                autoFocus
                                                            />
                                                            <button 
                                                                onClick={() => {
                                                                    // Update local state for visual feedback (Firebase sync would go here)
                                                                    if(newPhone.trim()) {
                                                                       const updatedOrder = {...selectedOrder};
                                                                       if(updatedOrder.address) updatedOrder.address.mobile = newPhone;
                                                                       else if(updatedOrder.shippingAddress) updatedOrder.shippingAddress.phone = newPhone;
                                                                       else updatedOrder.mobile = newPhone;
                                                                       setSelectedOrder(updatedOrder);
                                                                    }
                                                                    setIsEditingPhone(false);
                                                                }}
                                                                className="px-3 py-1 bg-[#2874f0] text-white rounded text-[12px] font-medium"
                                                            >
                                                                Save
                                                            </button>
                                                            <button 
                                                                onClick={() => setIsEditingPhone(false)}
                                                                className="px-2 py-1 text-gray-500 text-[12px] hover:text-gray-700"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <>
                                                            <p className="text-gray-800 font-medium tracking-wide text-[13px]">
                                                                Phone number: {selectedOrder.address?.mobile || selectedOrder.shippingAddress?.phone || selectedOrder.mobile}
                                                            </p>
                                                            <button 
                                                                onClick={() => {
                                                                    setNewPhone(selectedOrder.address?.mobile || selectedOrder.shippingAddress?.phone || selectedOrder.mobile || '');
                                                                    setIsEditingPhone(true);
                                                                }}
                                                                className="text-[#2874f0] text-[13px] font-medium hover:underline"
                                                            >
                                                                Change
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            </>
                                        ) : (
                                            <p className="text-gray-500 italic">Address details unavailable for this mock order.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            {/* Bottom padding for mobile */}
                            <div className="pb-4 bg-[#f1f3f6]"></div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrdersPage;
