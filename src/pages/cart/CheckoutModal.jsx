import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X, User, MapPin, CreditCard, ChevronRight, ChevronLeft, Plus,
    CheckCircle2, ShoppingBag, Calendar, Clock, FileText,
    ShieldCheck, Smartphone, Landmark, Wallet, Banknote,
    AlertCircle, Info, Sparkles, MousePointer2, Box
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useOrders } from '../../context/OrderContext';

const CheckoutModal = ({ onClose }) => {
    const { cartItems, subtotal, tax, grandTotal, cartCount, clearCart } = useCart();
    const { placeOrder } = useOrders();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '', mobile: '', email: '',
        pincode: '', locality: '', street: '', city: '', state: '', landmark: '', alternatePhone: '',
        addressType: 'home',
        paymentMethod: 'cod',
        deliveryDate: new Date().toISOString().split('T')[0],
        timeSlot: '9 AM - 12 PM',
        selectedAddressId: 1
    });

    const savedAddresses = [
        { id: 1, name: 'Ajeet Kumar', mobile: '9876543210', pincode: '800001', locality: 'Boring Road', street: 'Flat 402, Shanti Complex', city: 'Patna', state: 'Bihar', type: 'Home' },
        { id: 2, name: 'Ajeet Kumar', mobile: '9876543210', pincode: '560001', locality: 'Indiranagar', street: '12th Main, 4th Cross', city: 'Bengaluru', state: 'Karnataka', type: 'Work' }
    ];

    const [isAddingNew, setIsAddingNew] = useState(false);
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handlePlaceOrder = () => {
        placeOrder({
            items: cartItems,
            subtotal,
            tax,
            grandTotal,
            ...formData
        });
        setOrderPlaced(true);
        setTimeout(() => {
            onClose();
        }, 3000);
    };

    const steps = [
        { id: 1, label: 'Personal Details', desc: 'Name & contact info', icon: <User size={16} /> },
        { id: 2, label: 'Delivery Address', desc: 'Where to deliver', icon: <MapPin size={16} /> },
        { id: 3, label: 'Payment', desc: 'Test different methods', icon: <CreditCard size={16} /> },
    ];

    const paymentMethods = [
        { id: 'cod', label: 'Cash on Delivery', icon: <Banknote size={20} />, activeBorder: 'border-emerald-500', activeBg: 'bg-emerald-50', iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600', dot: true },
        { id: 'upi', label: 'UPI / QR Code', icon: <Smartphone size={20} />, activeBorder: 'border-indigo-500', activeBg: 'bg-indigo-50', iconBg: 'bg-indigo-100', iconColor: 'text-indigo-600' },
        { id: 'debit', label: 'Debit Card', icon: <CreditCard size={20} />, activeBorder: 'border-blue-500', activeBg: 'bg-blue-50', iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
        { id: 'credit', label: 'Credit Card', icon: <CreditCard size={20} />, activeBorder: 'border-rose-500', activeBg: 'bg-rose-50', iconBg: 'bg-rose-100', iconColor: 'text-rose-600' },
        { id: 'bank', label: 'Net Banking', icon: <Landmark size={20} />, activeBorder: 'border-red-500', activeBg: 'bg-red-50', iconBg: 'bg-red-100', iconColor: 'text-red-600' },
        { id: 'wallet', label: 'Digital Wallet', icon: <Wallet size={20} />, activeBorder: 'border-amber-500', activeBg: 'bg-amber-50', iconBg: 'bg-amber-100', iconColor: 'text-amber-600' },
    ];

    const getPaymentDetails = () => {
        const method = paymentMethods.find(m => m.id === formData.paymentMethod);
        switch (formData.paymentMethod) {
            case 'cod': return `Pay ₹${grandTotal.toLocaleString('en-IN')} in cash when the product arrives.`;
            case 'upi': return "Scan the QR code in the next step or enter your UPI ID.";
            case 'debit':
            case 'credit': return "Secure checkout with 128-bit encryption.";
            case 'bank': return "Select your bank from the list (SBI, HDFC, ICICI, etc.)";
            case 'wallet': return "Pay using Paytm, PhonePe, or Amazon Pay.";
            default: return "";
        }
    };

    if (orderPlaced) {
        return (
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
            >
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white rounded-[3.5rem] p-12 text-center max-w-md w-full shadow-2xl border border-white/50"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                        className="w-24 h-24 mx-auto mb-8 bg-emerald-100 rounded-[2rem] flex items-center justify-center"
                    >
                        <CheckCircle2 size={48} className="text-emerald-600" />
                    </motion.div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-3 italic">Order Placed!</h2>
                    <p className="text-sm text-slate-400 leading-relaxed">Congratulations, Your order has been placed successfully. We'll contact you for delivery details shortly.</p>
                </motion.div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ scale: 0.95, y: 30, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 30, opacity: 0 }}
                className="bg-white rounded-[2.5rem] w-full max-w-[1240px] max-h-[92vh] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] flex flex-col border border-white/50"
            >
                {/* Modal Header */}
                <div className="flex items-center justify-between p-8 pb-6 border-b border-slate-100 relative">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#f8f9f4] border border-[#e8ead4] rounded-2xl flex items-center justify-center">
                            <ShoppingBag size={24} className="text-[#a4a87a]" />
                        </div>
                        <div>
                            <h2 className="text-[32px] font-serif text-[#3a3f30] tracking-tight leading-none mb-1">Complete Your Order</h2>
                            <p className="text-[12px] font-medium text-slate-400 capitalize">Complete Cart Checkout</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors">
                        <X size={24} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Modal Body */}
                <div className="flex-1 overflow-y-auto flex flex-col lg:flex-row bg-[#fdfdfd]">

                    {/* Left Sidebar - Step Indicators & Mini Summary */}
                    <div className="w-full lg:w-[360px] bg-[#fdfbf7] p-8 border-r border-[#f1efe1] shrink-0">

                        {/* Order Summary Sidebar Block */}
                        <div className="mb-10">
                            <h4 className="text-[24px] font-serif text-[#3a3f30] mb-6 flex items-center gap-3">
                                <Box size={20} className="text-[#a4a87a]" /> Order Summary
                            </h4>

                            <div className="bg-white/60 backdrop-blur-sm rounded-[2rem] p-6 border border-[#f1efe1] shadow-sm">
                                <h5 className="text-[11px] font-bold text-slate-900 mb-6 uppercase tracking-widest">Cart Items ({cartCount})</h5>
                                <div className="space-y-6 max-h-[280px] overflow-y-auto mb-8 pr-2 scrollbar-hide">
                                    {cartItems.map((item) => (
                                        <div key={`${item.category}-${item.id}`} className="flex items-center gap-4">
                                            <div className="w-14 h-14 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100 p-1">
                                                <img src={item.img} alt={item.name} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-[#3a3f30] leading-tight mb-1">{item.name}</p>
                                                <p className="text-[10px] text-slate-400 font-medium">Qty: {item.quantity}</p>
                                            </div>
                                            <span className="text-xs font-bold text-slate-500">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-3.5 pt-6 border-t border-[#f1efe1]">
                                    <div className="flex justify-between text-xs font-medium text-slate-500">
                                        <span>Subtotal</span>
                                        <span className="text-[#3a3f30]">₹{subtotal.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-medium text-slate-500">
                                        <span>Delivery</span>
                                        <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px]">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-xs font-medium text-slate-500">
                                        <span>Tax (18%)</span>
                                        <span className="text-[#3a3f30]">₹{tax.toLocaleString('en-IN')}</span>
                                    </div>
                                    <div className="flex justify-between pt-4 mt-2 border-t border-[#f1efe1]">
                                        <span className="text-base font-serif text-[#3a3f30]">Total Amount</span>
                                        <span className="text-xl font-bold font-serif text-[#313628]">₹{grandTotal.toLocaleString('en-IN')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mini Segments */}
                        <div className="space-y-4">
                            <div className="bg-white/60 p-5 rounded-3xl border border-[#f1efe1] flex items-center gap-4">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div className="leading-tight">
                                    <p className="text-xs font-bold text-[#3a3f30]">Personal Details</p>
                                    <p className="text-[10px] text-slate-400 font-medium whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
                                        {formData.fullName || "Name & contact info"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Form Steps */}
                    <div className="flex-1 p-8 lg:p-12 relative">

                        {/* Step 1: Personal Info */}
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="max-w-2xl">
                                <div className="mb-10">
                                    <h3 className="text-[32px] font-serif text-[#3a3f30] tracking-tight mb-2 leading-none">Personal Information.</h3>
                                    <p className="text-[12px] text-[#878787] uppercase font-bold tracking-widest">Provide your reachability details</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name *</label>
                                        <input
                                            name="fullName" value={formData.fullName} onChange={handleChange}
                                            placeholder="Enter your full name"
                                            className="w-full px-6 py-4 bg-white border border-slate-100 rounded-3xl text-[16px] font-bold focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all shadow-sm"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-slate-400 uppercase tracking-widest ml-1">Mobile Number *</label>
                                        <div className="relative">
                                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-[16px] font-black text-slate-300 tracking-tighter">+91</span>
                                            <input
                                                name="mobile" value={formData.mobile} onChange={handleChange}
                                                placeholder="10-digit mobile number"
                                                className="w-full pl-16 pr-6 py-4 bg-white border border-slate-100 rounded-3xl text-[16px] font-bold focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all shadow-sm"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[13px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                                        <input
                                            name="email" value={formData.email} onChange={handleChange}
                                            placeholder="email@example.com"
                                            className="w-full px-6 py-4 bg-white border border-slate-100 rounded-3xl text-[16px] font-bold focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all shadow-sm"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Step 2: Delivery Address (Flipkart Style) */}
                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="max-w-3xl w-full">
                                <div className="mb-8">
                                    <h3 className="text-[32px] font-serif text-[#3a3f30] tracking-tight mb-2 leading-none">Delivery Address</h3>
                                    <p className="text-[12px] text-[#878787] uppercase font-bold tracking-widest">Select where you want your fresh produce delivered</p>
                                </div>

                                {/* Saved Addresses List */}
                                <div className="space-y-4 mb-8">
                                    {savedAddresses.map((addr) => (
                                        <div
                                            key={addr.id}
                                            onClick={() => setFormData(prev => ({ ...prev, selectedAddressId: addr.id, ...addr }))}
                                            className={`relative p-6 rounded-[2rem] border-2 transition-all cursor-pointer group ${formData.selectedAddressId === addr.id
                                                ? 'border-[#2874f0] bg-blue-50/30'
                                                : 'border-slate-100 bg-white hover:border-slate-200'
                                                }`}
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${formData.selectedAddressId === addr.id ? 'border-[#2874f0]' : 'border-slate-300'}`}>
                                                    {formData.selectedAddressId === addr.id && <div className="w-2.5 h-2.5 bg-[#2874f0] rounded-full" />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <span className="text-sm font-black text-slate-900">{addr.name}</span>
                                                        <span className="px-2 py-0.5 rounded bg-slate-100 text-[9px] font-black uppercase tracking-wider text-slate-500">{addr.type}</span>
                                                        <span className="text-sm font-bold text-slate-900">{addr.mobile}</span>
                                                    </div>
                                                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                                                        {addr.street}, {addr.locality}, {addr.city}, {addr.state} - <span className="font-black text-slate-900">{addr.pincode}</span>
                                                    </p>
                                                    {formData.selectedAddressId === addr.id && (
                                                        <motion.button
                                                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                                                            className="mt-5 px-10 py-3 bg-[#fb641b] text-white text-[11px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all"
                                                            onClick={(e) => { e.stopPropagation(); setStep(3); }}
                                                        >
                                                            Deliver Here
                                                        </motion.button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Add New Address Toggle */}
                                {!isAddingNew ? (
                                    <button
                                        onClick={() => setIsAddingNew(true)}
                                        className="w-full p-5 rounded-[2rem] border-2 border-dashed border-slate-200 text-[#2874f0] text-sm font-black uppercase tracking-widest hover:bg-blue-50/50 hover:border-[#2874f0]/30 transition-all flex items-center justify-center gap-3"
                                    >
                                        <Plus size={18} /> Add a new address
                                    </button>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                                        className="p-8 bg-blue-50/20 rounded-[2.5rem] border border-blue-100/50"
                                    >
                                        <div className="flex items-center justify-between mb-8">
                                            <h4 className="text-[14px] font-black text-[#2874f0] uppercase tracking-wider font-sans">Add New Address</h4>
                                            <button onClick={() => setIsAddingNew(false)} className="text-[#878787] hover:text-slate-900 transition-colors">
                                                <X size={20} />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <label className="text-[13px] font-bold text-[#878787] uppercase tracking-wider block ml-1 font-sans">Full Name</label>
                                                <input
                                                    name="fullName" value={formData.fullName} onChange={handleChange}
                                                    placeholder="Receiver's name"
                                                    className="w-full px-4 py-3.5 bg-white border border-[#e0e0e0] rounded-lg text-[16px] font-medium text-[#212121] font-sans placeholder:text-[#878787] placeholder:font-medium focus:outline-none focus:border-[#2874f0] transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[13px] font-bold text-[#878787] uppercase tracking-wider block ml-1 font-sans">10-Digit Mobile Number</label>
                                                <input
                                                    name="mobile" value={formData.mobile} onChange={handleChange}
                                                    placeholder="9999999999"
                                                    className="w-full px-4 py-3.5 bg-white border border-[#e0e0e0] rounded-lg text-[16px] font-medium text-[#212121] font-sans placeholder:text-[#878787] placeholder:font-medium focus:outline-none focus:border-[#2874f0] transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[13px] font-bold text-[#878787] uppercase tracking-wider block ml-1 font-sans">Pincode</label>
                                                <input
                                                    name="pincode" value={formData.pincode} onChange={handleChange}
                                                    placeholder="6-digit pincode"
                                                    className="w-full px-4 py-3.5 bg-white border border-[#e0e0e0] rounded-lg text-[16px] font-medium text-[#212121] font-sans placeholder:text-[#878787] placeholder:font-medium focus:outline-none focus:border-[#2874f0] transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[13px] font-bold text-[#878787] uppercase tracking-wider block ml-1 font-sans">Locality</label>
                                                <input
                                                    name="locality" value={formData.locality} onChange={handleChange}
                                                    placeholder="Locality / Area"
                                                    className="w-full px-4 py-3.5 bg-white border border-[#e0e0e0] rounded-lg text-[16px] font-medium text-[#212121] font-sans placeholder:text-[#878787] placeholder:font-medium focus:outline-none focus:border-[#2874f0] transition-colors"
                                                />
                                            </div>
                                            <div className="md:col-span-2 space-y-1.5">
                                                <label className="text-[13px] font-bold text-[#878787] uppercase tracking-wider block ml-1 font-sans">Address (Area and Street)</label>
                                                <textarea
                                                    name="street" value={formData.street} onChange={handleChange}
                                                    placeholder="Flat / House No / Street Name"
                                                    rows={3}
                                                    className="w-full px-4 py-3.5 bg-white border border-[#e0e0e0] rounded-lg text-[16px] font-medium text-[#212121] font-sans placeholder:text-[#878787] placeholder:font-medium focus:outline-none focus:border-[#2874f0] transition-colors resize-none"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[13px] font-bold text-[#878787] uppercase tracking-wider block ml-1 font-sans">City / Town</label>
                                                <input
                                                    name="city" value={formData.city} onChange={handleChange}
                                                    placeholder="City"
                                                    className="w-full px-4 py-3.5 bg-white border border-[#e0e0e0] rounded-lg text-[16px] font-medium text-[#212121] font-sans placeholder:text-[#878787] placeholder:font-medium focus:outline-none focus:border-[#2874f0] transition-colors"
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <label className="text-[13px] font-bold text-[#878787] uppercase tracking-wider block ml-1 font-sans">State</label>
                                                <div className="relative">
                                                    <select
                                                        name="state" value={formData.state} onChange={handleChange}
                                                        className={`w-full px-4 py-3.5 bg-white border border-[#e0e0e0] rounded-lg text-[16px] font-medium focus:outline-none focus:border-[#2874f0] transition-colors appearance-none cursor-pointer font-sans ${formData.state ? 'text-[#212121]' : 'text-[#878787] font-medium'}`}
                                                    >
                                                        <option value="" disabled className="text-[#878787] font-medium">Select State</option>
                                                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                                                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                                                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                                        <option value="Assam">Assam</option>
                                                        <option value="Bihar">Bihar</option>
                                                        <option value="Chandigarh">Chandigarh</option>
                                                        <option value="Chhattisgarh">Chhattisgarh</option>
                                                        <option value="Dadra and Nagar Haveli and Daman and Diu">Dadra and Nagar Haveli and Daman and Diu</option>
                                                        <option value="Delhi">Delhi</option>
                                                        <option value="Goa">Goa</option>
                                                        <option value="Gujarat">Gujarat</option>
                                                        <option value="Haryana">Haryana</option>
                                                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                                                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                                                        <option value="Jharkhand">Jharkhand</option>
                                                        <option value="Karnataka">Karnataka</option>
                                                        <option value="Kerala">Kerala</option>
                                                        <option value="Ladakh">Ladakh</option>
                                                        <option value="Lakshadweep">Lakshadweep</option>
                                                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                                                        <option value="Maharashtra">Maharashtra</option>
                                                        <option value="Manipur">Manipur</option>
                                                        <option value="Meghalaya">Meghalaya</option>
                                                        <option value="Mizoram">Mizoram</option>
                                                        <option value="Nagaland">Nagaland</option>
                                                        <option value="Odisha">Odisha</option>
                                                        <option value="Puducherry">Puducherry</option>
                                                        <option value="Punjab">Punjab</option>
                                                        <option value="Rajasthan">Rajasthan</option>
                                                        <option value="Sikkim">Sikkim</option>
                                                        <option value="Tamil Nadu">Tamil Nadu</option>
                                                        <option value="Telangana">Telangana</option>
                                                        <option value="Tripura">Tripura</option>
                                                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                                                        <option value="Uttarakhand">Uttarakhand</option>
                                                        <option value="West Bengal">West Bengal</option>
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                                        <ChevronRight size={14} className="rotate-90" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="md:col-span-2 space-y-4 pt-4">
                                                <label className="text-[13px] font-bold text-[#878787] uppercase tracking-wider ml-1">Address Type</label>
                                                <div className="flex gap-6">
                                                    <label className="flex items-center gap-3 cursor-pointer group">
                                                        <input
                                                            type="radio" name="addressType" value="home"
                                                            checked={formData.addressType === 'home'}
                                                            onChange={handleChange}
                                                            className="w-5 h-5 accent-[#2874f0]"
                                                        />
                                                        <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Home</span>
                                                    </label>
                                                    <label className="flex items-center gap-3 cursor-pointer group">
                                                        <input
                                                            type="radio" name="addressType" value="work"
                                                            checked={formData.addressType === 'work'}
                                                            onChange={handleChange}
                                                            className="w-5 h-5 accent-[#2874f0]"
                                                        />
                                                        <span className="text-xs font-black text-slate-700 uppercase tracking-wider">Work</span>
                                                    </label>
                                                </div>
                                            </div>

                                            <div className="md:col-span-2 pt-6 flex gap-4">
                                                <button
                                                    onClick={() => { setIsAddingNew(false); setStep(3); }}
                                                    className="flex-1 py-4 bg-[#2874f0] text-white text-[16px] font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all"
                                                >
                                                    Save and Deliver Here
                                                </button>
                                                <button
                                                    onClick={() => setIsAddingNew(false)}
                                                    className="px-10 py-4 text-slate-400 text-[11px] font-black uppercase tracking-widest rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all"
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}

                        {/* Step 3: Payment Step (Redesigned to match Grid layout) */}
                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col h-full">
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-2">
                                        <h4 className="text-[32px] font-serif text-[#3a3f30] flex items-center gap-3">
                                            <CreditCard size={28} className="text-[#a4a87a]" /> Payment Method
                                        </h4>
                                        <div className="px-4 py-1.5 bg-[#f8f9f4] text-[#a4a87a] rounded-full flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest border border-[#e8ead4]">
                                            <div className="relative w-4 h-4">
                                                <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
                                                <div className="absolute inset-x-1.5 inset-y-1.5 bg-red-500 rounded-full" />
                                            </div>
                                            Click to Test
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-400 font-medium">Select your preferred payment gateway</p>
                                </div>

                                {/* 6 Grid Payment Methods - Horizontal Layout */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-10">
                                    {paymentMethods.map((method) => (
                                        <button
                                            key={method.id}
                                            onClick={() => setFormData(prev => ({ ...prev, paymentMethod: method.id }))}
                                            className={`relative flex items-center gap-4 p-4 rounded-[1.8rem] border-2 transition-all group ${formData.paymentMethod === method.id
                                                ? `${method.activeBorder} ${method.activeBg} shadow-sm z-10`
                                                : `border-slate-100 bg-white hover:border-slate-200 hover:shadow-xs`
                                                }`}
                                        >
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${formData.paymentMethod === method.id
                                                ? `${method.iconBg} ${method.iconColor}`
                                                : 'bg-slate-50 text-slate-400 group-hover:bg-slate-900 group-hover:text-white'
                                                }`}>
                                                {method.icon}
                                            </div>
                                            <div className="flex-1 text-left">
                                                <p className={`text-[12px] font-bold ${formData.paymentMethod === method.id ? 'text-slate-900' : 'text-slate-600'}`}>
                                                    {method.label}
                                                </p>
                                            </div>

                                            {formData.paymentMethod === method.id && (
                                                <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center">
                                                    <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                                                </div>
                                            )}
                                        </button>
                                    ))}
                                </div>

                                {/* Selected Method Detail Box */}
                                <motion.div
                                    key={formData.paymentMethod}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-6 bg-[#f8f9f4] rounded-[2.5rem] border border-dashed border-[#dce0bc] mb-10 flex items-center gap-5"
                                >
                                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#a4a87a] shadow-sm shrink-0">
                                        {paymentMethods.find(m => m.id === formData.paymentMethod)?.icon}
                                    </div>
                                    <div className="leading-tight">
                                        <h5 className="text-sm font-bold text-[#3a3f30] mb-1">
                                            {paymentMethods.find(m => m.id === formData.paymentMethod)?.label} Selected
                                        </h5>
                                        <p className="text-xs text-slate-500 font-medium">{getPaymentDetails()}</p>
                                    </div>
                                </motion.div>

                                {/* Secure Badge */}
                                <div className="p-5 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center gap-4 mb-10">
                                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h6 className="text-[11px] font-bold text-slate-900 uppercase tracking-widest leading-none mb-1">Secure Test Environment</h6>
                                        <p className="text-[10px] text-slate-500 font-medium">Demo payments only. No real money is charged.</p>
                                    </div>
                                </div>

                                {/* Final Order Summary Table */}
                                <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm">
                                    <h4 className="text-sm text-slate-600 font-medium mb-6">Final Order Summary</h4>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                                            <span>Items Total</span>
                                            <span className="text-[#3a3f30]">₹{subtotal.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm font-medium text-slate-500">
                                            <span>Tax (18%)</span>
                                            <span className="text-[#3a3f30]">₹{tax.toLocaleString('en-IN')}</span>
                                        </div>
                                        <div className="h-px bg-slate-100 my-4"></div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-serif text-[#3a3f30]">Total Payable</span>
                                            <span className="text-2xl font-bold font-serif text-[#313628]">₹{grandTotal.toLocaleString('en-IN')}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Modal Footer Controls */}
                <div className="p-8 pb-10 flex items-center justify-between border-t border-slate-50 bg-white">
                    <div className="flex items-center gap-4">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(step - 1)}
                                className="flex items-center gap-2 px-8 py-4 bg-slate-50 text-slate-900 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-all border border-slate-100"
                            >
                                <ChevronLeft size={16} /> Back
                            </button>
                        )}
                        <button
                            onClick={onClose}
                            className="px-6 py-4 text-slate-300 text-[10px] font-black uppercase tracking-widest hover:text-slate-900 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden sm:flex flex-col items-end leading-none">
                            <p className="text-[8px] font-black uppercase tracking-widest text-slate-300 mb-1 flex items-center gap-2">
                                <ShieldCheck size={10} /> Secure encrypted payment. We don't share your details.
                            </p>
                        </div>

                        {step < 3 ? (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setStep(step + 1)}
                                className="flex items-center gap-3 px-12 py-4 bg-[#111827] text-white rounded-full text-[16px] font-bold uppercase tracking-wider shadow-xl shadow-slate-200 hover:bg-emerald-600 transition-all"
                            >
                                CONTINUE <ChevronRight size={18} />
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handlePlaceOrder}
                                className="flex items-center gap-3 px-16 py-4 bg-[#00e676] text-[#111827] rounded-full text-[16px] font-bold uppercase tracking-wider shadow-xl shadow-emerald-200/50 hover:bg-white transition-all shadow-sm"
                            >
                                PLACE ORDER (₹{grandTotal.toLocaleString('en-IN')})
                            </motion.button>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default CheckoutModal;
