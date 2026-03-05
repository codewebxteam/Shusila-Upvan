import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Success = () => {
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();

    useEffect(() => {
        if (cartItems && cartItems.length > 0) {
            clearCart();
        }
    }, [cartItems, clearCart]);

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-32 relative z-[70] pointer-events-auto">
            <div className="max-w-2xl w-full text-center relative z-[80]">
                <motion.div
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-32 h-32 bg-emerald-50 rounded-[3rem] flex items-center justify-center mx-auto mb-10 border border-emerald-100 shadow-2xl shadow-emerald-500/20"
                >
                    <CheckCircle2 size={64} className="text-emerald-600" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter leading-none mb-6 italic"
                >
                    Order Placed Successfully.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-slate-500 font-semibold text-lg lg:text-xl max-w-lg mx-auto mb-12 leading-relaxed"
                >
                    Thank you for choosing <span className="text-emerald-600 font-black">Shusila Upvan</span>. Your fresh farm products are on their way!
                </motion.p>

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
                        Continue Shopping <ShoppingBag size={16} />
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
