import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, Sparkles, Calendar, MessageSquare, PhoneCall, Package } from 'lucide-react';
import useScrollLock from '../../hooks/useScrollLock';
import { realtimeDb as db } from '../../firebase';
import { ref, push, serverTimestamp } from 'firebase/database';

const BulkOrderModal = ({ isOpen, onClose, category }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messageSent, setMessageSent] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    quantity: '',
    eventDate: '',
    requirements: '',
    callBack: false,
    callBackTime: 'Within 5 min'
  });
  const [submittedTime, setSubmittedTime] = useState('');

  useScrollLock(isOpen);

  const isMushroom = category?.toLowerCase() === 'mushroom';
  const accentColor = isMushroom ? 'emerald' : 'blue';
  const unit = isMushroom ? 'Kg' : 'Liters';

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const messagesRef = ref(db, 'messages');
      await push(messagesRef, {
        name: formData.name,
        email: formData.email,
        message: `Bulk Order Enquiry For ${category}. Qty: ${formData.quantity} ${isMushroom ? 'Kg' : 'Liters'}. Event Date: ${formData.eventDate || 'N/A'}. Details: ${formData.requirements}. Call Back: ${formData.callBack ? `Yes (${formData.callBackTime})` : 'No'}. Contact: ${formData.contact}`,
        type: 'bulk_order',
        timestamp: serverTimestamp() || new Date().toISOString(),
        status: 'Unread'
      });
      setSubmittedTime(formData.callBack ? formData.callBackTime : 'shortly');
      setMessageSent(true);
      setFormData({
        name: '',
        email: '',
        contact: '',
        quantity: '',
        eventDate: '',
        requirements: '',
        callBack: false,
        callBackTime: 'Within 5 min'
      });
      setTimeout(() => {
        onClose();
        setMessageSent(false);
      }, 3000);
    } catch (err) {
      console.error("Bulk Order submission error:", err);
      alert("Something went wrong. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-4" onClick={onClose}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white rounded-[2.5rem] w-full max-w-lg p-8 relative shadow-2xl border border-slate-100 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Gradient Bar */}
            <div className={`absolute top-0 left-0 right-0 h-2 bg-gradient-to-r ${accentColor === 'emerald' ? 'from-emerald-400 via-teal-500 to-green-500' : 'from-blue-400 via-sky-500 to-indigo-500'}`}></div>
            
            <button 
              onClick={onClose} 
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-900 transition-all z-10"
            >
              <X size={20} />
            </button>

            {messageSent ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className={`w-16 h-16 bg-${accentColor}-50 rounded-full flex items-center justify-center text-${isMushroom ? 'emerald' : 'blue'}-600 mb-6 animate-pulse shadow-lg`}>
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-2xl font-black text-slate-900 mb-2">Request Submitted!</h4>
                <p className="text-sm font-bold text-slate-700 tracking-wide">
                  We will contact you {submittedTime === 'shortly' ? 'shortly' : `within ${submittedTime.replace('Within ', '')}`}.
                </p>
                <p className="text-xs text-slate-400 font-semibold mt-1">Shukriya!</p>
              </div>
            ) : (
              <>
                <div className="mb-6">
                  <span className={`text-[10px] font-black text-${accentColor}-600 uppercase tracking-widest flex items-center gap-1 mb-1`}>
                    <Sparkles size={14} className="text-amber-500" /> Event & Party Orders
                  </span>
                  <h4 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    Bulk Enquiry <span className={`text-${accentColor}-600`}>({category})</span>
                  </h4>
                  <p className="text-[11px] text-slate-400 font-bold mt-1">
                     Tell us your requirements, we’ll handle the pricing & quantity.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                      <input 
                        name="name" value={formData.name} onChange={handleChange} required
                        placeholder="Aditya Kumar"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address</label>
                      <input 
                        type="email" name="email" value={formData.email} onChange={handleChange} required
                        placeholder="email@example.com"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Contact Number</label>
                      <input 
                        name="contact" value={formData.contact} onChange={handleChange} required
                        placeholder="+91 9999999999"
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Est. Quantity ({unit})</label>
                      <div className="relative">
                        <input 
                          name="quantity" value={formData.quantity} onChange={handleChange} required
                          placeholder="e.g. 50"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all shadow-sm pr-12"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">{unit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Event Date <span className="text-slate-300">(Optional)</span></label>
                    <input 
                      type="date" name="eventDate" value={formData.eventDate} onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all shadow-sm"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Requirements / Details</label>
                    <textarea 
                      name="requirements" value={formData.requirements} onChange={handleChange} required
                      placeholder="We need button mushroom for a wedding of 500 guests..."
                      rows={3}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold focus:outline-none focus:border-emerald-500 transition-all shadow-sm resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <input 
                        type="checkbox" name="callBack" checked={formData.callBack} onChange={handleChange}
                        className={`w-4 h-4 ${isMushroom ? 'text-emerald-600 focus:ring-emerald-500' : 'text-blue-600 focus:ring-blue-500'} border-slate-300 rounded`}
                        id="callBack"
                      />
                      <label htmlFor="callBack" className="text-xs font-bold text-slate-600 flex items-center gap-1 cursor-pointer">
                        <PhoneCall size={14} className={isMushroom ? 'text-emerald-600' : 'text-blue-600'} /> Require a Call Back for pricing?
                      </label>
                    </div>

                    {formData.callBack && (
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 animate-fadeIn">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2 block">Choose Callback Time</label>
                        <div className="flex flex-wrap gap-2">
                          {['Within 5 min', 'Within 10 min', 'After 30 min'].map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setFormData({ ...formData, callBackTime: time })}
                              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                formData.callBackTime === time 
                                  ? (isMushroom ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white')
                                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button 
                    type="submit" disabled={isSubmitting}
                    className={`w-full py-4 mt-2 bg-slate-900 text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-${accentColor}-600 transition-all shadow-lg flex items-center justify-center gap-2`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Enquiry'} <Sparkles size={14} />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default BulkOrderModal;
