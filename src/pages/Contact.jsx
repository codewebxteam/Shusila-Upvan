import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  return (
    <div className="pt-32 pb-20 min-h-screen bg-white">
      <div className="container mx-auto max-w-4xl px-4">
        <h1 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tight text-center mb-4">Contact Us</h1>
        <p className="text-slate-500 text-center max-w-2xl mx-auto mb-16">
          Have a question about our farm-fresh dairy or mushroom products? We'd love to hear from you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-slate-50 rounded-3xl p-8 flex flex-col items-center text-center border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <Phone size={28} className="text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Call Us</h3>
            <p className="text-slate-500 text-sm mb-4">We're available from 6 AM to 8 PM, Mon-Sat.</p>
            <a href="tel:+919876543210" className="text-emerald-600 font-bold hover:underline">+91 98765 43210</a>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 flex flex-col items-center text-center border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <Mail size={28} className="text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Email Us</h3>
            <p className="text-slate-500 text-sm mb-4">Send us an email anytime and we'll reply within 24 hours.</p>
            <a href="mailto:info@susheelaupvan.com" className="text-emerald-600 font-bold hover:underline">info@susheelaupvan.com</a>
          </div>

          <div className="bg-slate-50 rounded-3xl p-8 flex flex-col items-center text-center border border-slate-100 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-100/50 transition-all cursor-pointer group">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
              <MapPin size={28} className="text-emerald-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">Visit Us</h3>
            <p className="text-slate-500 text-sm mb-4">Drop by our farm to see how fresh your food really is.</p>
            <a href="https://maps.google.com/?q=Khalilabad,Sant+Kabir+Nagar,UP" target="_blank" rel="noreferrer" className="text-emerald-600 font-bold hover:underline">
              Khalilabad, UP
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
