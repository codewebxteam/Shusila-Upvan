import React from 'react';
import { Download, CreditCard, Wallet, Receipt, RefreshCcw } from 'lucide-react';

const paymentData = [
    {
        paymentId: "PAY-001",
        orderId: "ORD-001",
        customer: "Rahul Sharma",
        amount: "₹2499",
        method: "UPI",
        status: "Success"
    },
    {
        paymentId: "PAY-002",
        orderId: "ORD-002",
        customer: "Priya Singh",
        amount: "₹4999",
        method: "Card",
        status: "Success"
    },
    {
        paymentId: "PAY-003",
        orderId: "ORD-003",
        customer: "Amit Kumar",
        amount: "₹1299",
        method: "COD",
        status: "Pending"
    }
];

// Helper to style the Method pill
const getMethodStyle = (method) => {
    switch (method) {
        case 'UPI': return 'bg-blue-50 text-blue-600 border-blue-200';
        case 'Card': return 'bg-indigo-50 text-indigo-600 border-indigo-200';
        case 'COD': return 'bg-slate-100 text-slate-600 border-slate-200';
        default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
};

// Helper to style the Status pill
const getStatusStyle = (status) => {
    switch (status) {
        case 'Success': return 'bg-emerald-50 text-emerald-600 border-emerald-200';
        case 'Pending': return 'bg-amber-50 text-amber-600 border-amber-200';
        case 'Failed': return 'bg-red-50 text-red-600 border-red-200';
        default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
};

const AdminPayments = () => {
    return (
        <div className="max-w-7xl mx-auto w-full animate-fade-in pb-12">
            {/* Header Area */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Payments</h1>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <span className="hover:text-indigo-600 cursor-pointer transition-colors">Home</span>
                    <span>/</span>
                    <span className="text-indigo-600">Payments</span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Revenue */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center">
                    <h3 className="text-[2.2rem] font-black text-slate-800 tracking-tight mb-1">₹2.45L</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Wallet size={16} /> Total Revenue
                    </p>
                </div>

                {/* Online Payments */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-indigo-100 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out z-0"></div>
                    <div className="relative z-10 flex flex-col justify-center h-full">
                        <h3 className="text-[2.2rem] font-black text-indigo-600 group-hover:text-white transition-colors tracking-tight mb-1">₹1.89L</h3>
                        <p className="text-sm font-bold text-indigo-400 group-hover:text-indigo-200 transition-colors uppercase tracking-widest flex items-center gap-2">
                            <CreditCard size={16} /> Online Payments
                        </p>
                    </div>
                </div>

                {/* COD Payments */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center">
                    <h3 className="text-[2.2rem] font-black text-slate-800 tracking-tight mb-1">₹56K</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Receipt size={16} /> COD Payments
                    </p>
                </div>

                {/* Pending Refunds */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center">
                    <h3 className="text-[2.2rem] font-black text-slate-800 tracking-tight mb-1">₹12K</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <RefreshCcw size={16} /> Pending Refunds
                    </p>
                </div>
            </div>

            {/* Payment History Table */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                    <h2 className="text-lg font-bold text-slate-800">Payment History</h2>

                    <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-2.5 px-4 rounded-xl font-bold text-xs transition-colors shadow-sm">
                        <Download size={16} strokeWidth={2.5} className="text-slate-400" />
                        Export Report
                    </button>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Payment ID</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Order ID</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Customer</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Amount</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Method</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Status</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {paymentData.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <span className="font-bold text-slate-600 text-sm">{item.paymentId}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="font-bold text-slate-600 text-sm">{item.orderId}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-semibold text-slate-700">{item.customer}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-bold text-slate-700">{item.amount}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getMethodStyle(item.method)}`}>
                                            {item.method}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-semibold text-slate-500">2024-01-15</span>
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

export default AdminPayments;
