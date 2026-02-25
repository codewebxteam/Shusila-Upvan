import React from 'react';
import { Lock, Mail, MapPin, Phone } from 'lucide-react';

const ProfileSettings = () => {
  return (
    <div className="max-w-2xl">
      <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic mb-8">Profile Details.</h3>
      
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
            <input type="text" defaultValue="Swapnil Singh" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
            <input type="email" placeholder="example@gmail.com" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold opacity-60 cursor-not-allowed outline-none" disabled />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Delivery Address (Khalilabad)</label>
          <textarea rows="3" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none"></textarea>
        </div>

        <div className="pt-6 border-t border-slate-50">
          <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-900 mb-6">
            <Lock size={16} /> Security Update
          </h4>
          <div className="space-y-4">
            <input type="password" placeholder="New Password" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold outline-none" />
            <button type="button" className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100">
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;