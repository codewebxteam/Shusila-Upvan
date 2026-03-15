import React, { useState } from 'react';
import { Lock } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import ConfirmDialog from '../common/ConfirmDialog';

const ProfileSettings = () => {
  const { user } = useAuth();
  const { orders } = useOrders();

  // Get latest address from orders if available
  const latestAddress = orders.length > 0
    ? `${orders[0].address.street}, ${orders[0].address.locality}, ${orders[0].address.city}, ${orders[0].address.state} - ${orders[0].address.pincode}`
    : '';

  const [showConfirm, setShowConfirm] = useState(false);

  const handleSaveClick = () => setShowConfirm(true);
  const handleConfirmSave = () => {
    // Actual save logic can be added here
    setShowConfirm(false);
  };

  return (
    <>
      <div className="max-w-2xl">
        <h3 className="text-3xl font-black text-slate-900 tracking-tighter italic mb-8">Profile Details.</h3>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Full Name</label>
              <input
                type="text"
                defaultValue={user?.name || ""}
                placeholder="Your Name"
                className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Email Address</label>
              <input
                type="email"
                value={user?.email || ""}
                placeholder="Your Email"
                className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold opacity-60 cursor-not-allowed outline-none"
                disabled
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Delivery Address</label>
            <textarea
              rows="3"
              defaultValue={latestAddress}
              placeholder="No address saved yet. Place an order to save your address."
              className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none"
            ></textarea>
          </div>

          <div className="pt-6 border-t border-slate-50">
            <h4 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-900 mb-6">
              <Lock size={16} /> Security Update
            </h4>
            <div className="space-y-4">
              <input type="password" placeholder="New Password" className="w-full p-4 bg-slate-50 rounded-2xl border-none text-sm font-bold outline-none" />
              <button
                type="button"
                onClick={handleSaveClick}
                className="px-8 py-4 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Save Changes?"
        message="Are you sure you want to update your profile details?"
        confirmText="Yes, Save"
        confirmColor="bg-emerald-600 hover:bg-emerald-700"
        onConfirm={handleConfirmSave}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
};

export default ProfileSettings;