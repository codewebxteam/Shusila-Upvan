import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, ArrowRight } from 'lucide-react';
import { products } from '../../data/products';
import { realtimeDb as db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useWishlist } from '../../context/WishlistContext';

const RecommendedProducts = ({ currentProductId, category }) => {
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user, openAuthModal } = useAuth();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const [firebaseProducts, setFirebaseProducts] = useState([]);

    useEffect(() => {
        const productsRef = ref(db, 'products');
        const unsubscribe = onValue(productsRef, (snapshot) => {
            const data = snapshot.val() || {};
            const list = Object.keys(data).map(key => ({
                ...data[key],
                id: key,
                img: data[key].img || data[key].image || 'https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=500',
                unit: data[key].unit || 'Kg'
            }));
            setFirebaseProducts(list);
        });
        return () => unsubscribe();
    }, []);

    const isMushroom = String(category || '').toLowerCase().includes('mushroom');
    const isDairy = String(category || '').toLowerCase().includes('dairy');

    const allProducts = [
        ...firebaseProducts,
        ...products
    ];

    const recommended = allProducts
        .filter(p => {
            if (p.id === currentProductId) return false;
            const pCat = String(p.category || '').toLowerCase();
            if (isMushroom) return pCat.includes('mushroom');
            if (isDairy) return pCat.includes('dairy');
            return pCat === String(category || '').toLowerCase();
        })
        .slice(0, 4);

    if (recommended.length === 0) return null;

    const handleAddToCart = (e, product) => {
        e.stopPropagation();
        if (!user) {
            openAuthModal('login');
            return;
        }
        addToCart(product, 1);
    };

    const handleWishlistToggle = (e, product) => {
        e.stopPropagation();
        if (!user) {
            openAuthModal('login');
            return;
        }
        toggleWishlist(product);
    };

    return (
        <section className="py-20 border-t border-slate-100 mt-20">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
                <div>
                    <h3 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tighter uppercase italic leading-tight">
                        You Might <span className="text-emerald-600">Also Like.</span>
                    </h3>
                    <p className="text-sm text-slate-500 font-semibold mt-2">
                        Handpicked recommendations from the {category} category
                    </p>
                </div>
                <button
                    onClick={() => navigate(category?.toLowerCase().includes('mushroom') ? '/mushroom' : '/dairy')}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors group"
                >
                    View All Products
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommended.map((item) => (
                    <motion.div
                        key={item.id}
                        whileHover={{ y: -8 }}
                        onClick={() => {
                            navigate(`/product/${item.id}`);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="group bg-white rounded-[2rem] p-6 border border-slate-100 hover:border-emerald-200 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all cursor-pointer"
                    >
                        {/* Image Container */}
                        <div className="relative aspect-square rounded-2xl bg-slate-50 mb-6 flex items-center justify-center overflow-hidden p-8">
                            <motion.img
                                src={item.img}
                                alt={item.name}
                                whileHover={{ scale: 1.1 }}
                                className="w-full h-full object-contain drop-shadow-md"
                            />

                            {/* Wishlist Button */}
                            <button
                                onClick={(e) => handleWishlistToggle(e, item)}
                                className={`absolute top-3 right-3 p-2.5 rounded-xl border border-white shadow-sm backdrop-blur-md transition-all ${isInWishlist(item.id, item.category)
                                        ? 'bg-rose-50 text-rose-500 border-rose-100'
                                        : 'bg-white/80 text-slate-300 hover:text-rose-500'
                                    }`}
                            >
                                <Heart size={16} fill={isInWishlist(item.id, item.category) ? 'currentColor' : 'none'} />
                            </button>
                        </div>

                        {/* Info */}
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">{item.tag || 'Fresh'}</span>
                                <div className="flex items-center gap-1">
                                    <Star size={8} className="fill-emerald-500 text-emerald-500" />
                                    <span className="text-[9px] font-black text-slate-900">5.0</span>
                                </div>
                            </div>

                            <h4 className="text-lg font-black text-slate-900 leading-tight">
                                {item.name.toLowerCase()}
                            </h4>

                            <div className="flex items-center justify-between pt-2">
                                <div className="flex flex-col">
                                    <span className="text-xl font-black text-slate-900">₹{item.price}</span>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Per {item.unit}</span>
                                </div>
                                <motion.button
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => handleAddToCart(e, item)}
                                    className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-emerald-600 transition-colors"
                                >
                                    <ShoppingCart size={16} />
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default RecommendedProducts;
