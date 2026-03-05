import React, { useState, useEffect } from 'react';
import { Mail, Phone, Ban, Users, UserPlus, Star, Landmark } from 'lucide-react';
import { db } from '../../firebase';
import { ref, onValue } from 'firebase/database';

const AdminCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch Users and Orders to calculate stats
        const usersRef = ref(db, 'users');
        const ordersRef = ref(db, 'orders');

        const unsubUsers = onValue(usersRef, (userSnap) => {
            const usersData = userSnap.val() || {};

            // Listen to orders to get real-time stats for users
            onValue(ordersRef, (orderSnap) => {
                const ordersData = orderSnap.val() || {};
                const ordersList = Object.values(ordersData);

                const customerList = Object.keys(usersData).map(uid => {
                    const userOrders = ordersList.filter(o => o.userId === uid);
                    const totalSpent = userOrders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);

                    return {
                        id: uid,
                        customer: usersData[uid].displayName || usersData[uid].name || 'Anonymous',
                        email: usersData[uid].email || 'N/A',
                        orders: userOrders.length,
                        spent: `₹${totalSpent.toLocaleString()}`,
                        joined: usersData[uid].createdAt ? new Date(usersData[uid].createdAt).toLocaleDateString() : 'N/A',
                        status: userOrders.length > 5 ? 'VIP' : 'Active'
                    };
                });

                setCustomers(customerList);
                setIsLoading(false);
            }, { onlyOnce: true }); // Avoid nested persistent listeners if possible, but for admin it's okay
        });

        return () => unsubUsers();
    }, []);

    // Helper to style the Status pill
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Active': return 'bg-emerald-100 text-emerald-700';
            case 'VIP': return 'bg-[#fef08a] text-[#854d0e]';
            case 'Inactive': return 'bg-slate-100 text-slate-600';
            default: return 'bg-slate-100 text-slate-600';
        }
    };

    return (
        <div className="max-w-7xl mx-auto w-full animate-fade-in pb-12">
            {/* Header Area */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Customers</h1>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <span className="hover:text-indigo-600 cursor-pointer transition-colors">Home</span>
                    <span>/</span>
                    <span className="text-indigo-600">Customers</span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Customers */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center relative overflow-hidden group border-b-4 border-b-indigo-500">
                    <h3 className="text-[2.2rem] font-black text-slate-800 tracking-tight mb-1">{customers.length}</h3>
                    <p className="text-sm font-bold text-slate-400">Total Customers</p>
                </div>

                {/* VIP Customers */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center relative overflow-hidden border-b-4 border-b-amber-500">
                    <h3 className="text-[2.2rem] font-black text-slate-800 tracking-tight mb-1">
                        {customers.filter(c => c.status === 'VIP').length}
                    </h3>
                    <p className="text-sm font-bold text-slate-400">VIP Customers</p>
                </div>

                {/* Avg Orders */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center relative overflow-hidden border-b-4 border-b-emerald-500">
                    <h3 className="text-[2.2rem] font-black text-slate-800 tracking-tight mb-1">
                        {customers.length > 0 ? (customers.reduce((s, c) => s + c.orders, 0) / customers.length).toFixed(1) : 0}
                    </h3>
                    <p className="text-sm font-bold text-slate-400">Avg. Orders/User</p>
                </div>

                {/* Revenue/Cust */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center relative overflow-hidden border-b-4 border-b-rose-500">
                    <h3 className="text-[2.2rem] font-black text-slate-800 tracking-tight mb-1">
                        ₹{customers.length > 0 ? Math.floor(customers.reduce((s, c) => s + parseInt(c.spent.replace(/[₹,]/g, '')), 0) / customers.length).toLocaleString() : 0}
                    </h3>
                    <p className="text-sm font-bold text-slate-400">Avg. Revenue/User</p>
                </div>
            </div>

            {/* All Customers Table */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800">All Customers</h2>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Customer</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Email</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Total Orders</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Total Spent</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Joined</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Status</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan="7" className="py-12 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">Loading data...</td>
                                </tr>
                            ) : customers.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <span className="font-bold text-slate-700 text-sm block">{item.customer}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-medium text-slate-500">{item.email}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-semibold text-slate-700">{item.orders}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-bold text-slate-700">{item.spent}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-medium text-slate-500">{item.joined}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getStatusStyle(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <button className="text-slate-400 hover:text-slate-600 transition-colors" title="Message">
                                                <Mail size={16} strokeWidth={2.5} />
                                            </button>
                                            <button className="text-slate-400 hover:text-red-500 transition-colors" title="Block">
                                                <Ban size={16} strokeWidth={2.5} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminCustomers;
