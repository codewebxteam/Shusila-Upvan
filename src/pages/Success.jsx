import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Success = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { cartItems, clearCart } = useCart();

    const [purchasedItems] = useState(location.state?.items || []);

    const grandTotal = purchasedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = grandTotal * 0.05;
    const total = grandTotal + tax;

    return (
        <div className="min-h-screen bg-[#fdfdfd] flex flex-col items-center pt-32 pb-24 px-4 relative z-[70]">
            <div className="max-w-3xl w-full text-center relative z-[80]">
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-24 h-24 bg-emerald-50 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 border border-emerald-100 shadow-xl shadow-emerald-500/10"
                >
                    <CheckCircle2 size={40} className="text-emerald-600" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl lg:text-6xl font-black text-slate-900 tracking-tighter leading-none mb-4 italic"
                >
                    Order Successful.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-500 font-bold text-sm lg:text-base max-w-lg mx-auto mb-12 leading-relaxed"
                >
                    Your products are being prepared. You can manage your account settings in your profile.
                </motion.p>

                {/* Order Summary */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-[2rem] p-6 lg:p-10 shadow-2xl shadow-slate-200/50 border border-slate-100 mb-12 text-left"
                >
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-6 text-center sm:text-left">Order Summary</h3>

                    <div className="space-y-6">
                        {purchasedItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-4 group">
                                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-50 rounded-2xl border border-slate-100 p-3 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-500">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-grow flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4">
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 mb-0.5">{item.name}</h4>
                                        <p className="text-sm font-semibold text-slate-400">Qty: {item.quantity}</p>
                                    </div>
                                    <p className="text-xl font-black text-emerald-600">₹{(item.price * item.quantity).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-dashed border-slate-200">
                        <div className="space-y-3 mb-6">
                            <div className="flex justify-between text-sm font-bold text-slate-500">
                                <span>Subtotal</span>
                                <span>₹{grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                            <div className="flex justify-between text-sm font-bold text-slate-500">
                                <span>Tax (5%)</span>
                                <span>₹{tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>
                        <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-6">
                            <div>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Paid</p>
                                <p className="text-3xl font-black text-slate-900 tracking-tighter">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            </div>
                            <CheckCircle2 size={32} className="text-emerald-500 shrink-0" />
                        </div>
                    </div>
                </motion.div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/orders')}
                        className="px-10 py-5 bg-slate-900 text-white rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] shadow-xl flex items-center justify-center gap-3 transition-all hover:bg-emerald-600"
                    >
                        Track Order <ArrowRight size={16} />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/')}
                        className="px-10 py-5 bg-white text-slate-900 border border-slate-200 rounded-[2rem] text-[11px] font-black uppercase tracking-[0.2em] shadow-sm flex items-center justify-center gap-3 transition-all hover:bg-slate-50"
                    >
                        Return Home <ShoppingBag size={16} />
                    </motion.button>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 flex items-center justify-center gap-2 text-slate-300"
                >
                    <Heart size={14} className="fill-slate-300" />
                    <span className="text-[10px] font-black uppercase tracking-widest">Handcrafted with care for you.</span>
                </motion.div>
            </div>
        </div>
    );
};

export default Success;
