import React from 'react';
import { Mail, Phone, Ban, Users, UserPlus, Star, Landmark } from 'lucide-react';

const customersData = [
    {
        id: 1,
        customer: "Rahul Sharma",
        email: "rahul@example.com",
        orders: 12,
        spent: "₹45,600",
        joined: "2023-06-15",
        status: "Active"
    },
    {
        id: 2,
        customer: "Priya Singh",
        email: "priya@example.com",
        orders: 8,
        spent: "₹32,400",
        joined: "2023-08-20",
        status: "Active"
    },
    {
        id: 3,
        customer: "Amit Kumar",
        email: "amit@example.com",
        orders: 5,
        spent: "₹18,900",
        joined: "2023-10-10",
        status: "Active"
    },
    {
        id: 4,
        customer: "Sneha Patel",
        email: "sneha@example.com",
        orders: 15,
        spent: "₹67,800",
        joined: "2023-05-05",
        status: "VIP"
    }
];

// Helper to style the Status pill
const getStatusStyle = (status) => {
    switch (status) {
        case 'Active': return 'bg-emerald-100 text-emerald-700';
        case 'VIP': return 'bg-[#fef08a] text-[#854d0e]'; // Custom gold/yellow tailwind colors for VIP match
        case 'Inactive': return 'bg-slate-100 text-slate-600';
        default: return 'bg-slate-100 text-slate-600';
    }
};

const AdminCustomers = () => {
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
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center relative overflow-hidden group">
                    <h3 className="text-[2.2rem] font-black text-slate-800 tracking-tight mb-1">892</h3>
                    <p className="text-sm font-bold text-slate-400">
                        Total Customers
                    </p>
                </div>

                {/* New This Month */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center relative overflow-hidden">
                    <h3 className="text-[2.2rem] font-black text-slate-800 tracking-tight mb-1">45</h3>
                    <p className="text-sm font-bold text-slate-400">
                        New This Month
                    </p>
                </div>

                {/* VIP Customers */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center relative overflow-hidden">
                    <h3 className="text-[2.2rem] font-black text-slate-800 tracking-tight mb-1">234</h3>
                    <p className="text-sm font-bold text-slate-400">
                        VIP Customers
                    </p>
                </div>

                {/* Avg Lifetime Value */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center relative overflow-hidden">
                    <h3 className="text-[2.2rem] font-black text-slate-800 tracking-tight mb-1">₹2.4L</h3>
                    <p className="text-sm font-bold text-slate-400">
                        Avg. Lifetime Value
                    </p>
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
                            {customersData.map((item) => (
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
                                            <button className="text-slate-400 hover:text-slate-600 transition-colors" title="Call">
                                                <Phone size={16} strokeWidth={2.5} />
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
