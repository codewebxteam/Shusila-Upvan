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
        <div className="min-h-screen bg-[#fdfdfd] flex items-center justify-center p-4 pt-32 pb-24 relative z-[70]">
            <div className="max-w-4xl w-full text-center relative z-[80]">
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

                {/* Order Summary with LARGE images */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-white rounded-[3rem] p-8 lg:p-12 shadow-2xl shadow-slate-200/50 border border-slate-100 mb-12 text-left"
                >
                    <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-8 text-center lg:text-left">Order Summary</h3>

                    <div className="space-y-8">
                        {purchasedItems.map((item, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row items-center gap-8 group">
                                <div className="w-40 h-40 bg-slate-50 rounded-[2rem] border border-slate-100 p-6 flex items-center justify-center shrink-0 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-500">
                                    <img src={item.img} alt={item.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                </div>
                                <div className="flex-grow text-center sm:text-left">
                                    <h4 className="text-xl font-bold text-slate-900 mb-1">{item.name}</h4>
                                    <p className="text-sm font-semibold text-slate-400 mb-2">Quantity: {item.quantity}</p>
                                    <p className="text-2xl font-black text-emerald-600">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-dashed border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="text-center sm:text-left">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Total Paid</p>
                            <p className="text-4xl font-black text-slate-900 tracking-tighter">₹{total.toLocaleString('en-IN')}</p>
                        </div>
                        <CheckCircle2 size={32} className="text-emerald-500 hidden sm:block" />
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
