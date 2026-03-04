import React from 'react';
import { PackageSearch, AlertTriangle, TrendingDown, BoxSelect, PackageCheck } from 'lucide-react';

const inventoryData = [
    {
        id: 1,
        product: "Butter (200g)",
        category: "Dairy Product",
        currentStock: 5,
        minRequired: 20,
        icon: "🧈",
        status: "low" // < 10
    },
    {
        id: 2,
        product: "Ghee (500ml)",
        category: "Dairy Product",
        currentStock: 0,
        minRequired: 20,
        icon: "🥛",
        status: "out" // 0
    },
    {
        id: 3,
        product: "Portobello Mushroom (300g)",
        category: "Mushroom Product",
        currentStock: 8,
        minRequired: 20,
        icon: "🍄",
        status: "low"
    },
    {
        id: 4,
        product: "Dried Mushroom Mix (100g)",
        category: "Mushroom Product",
        currentStock: 0,
        minRequired: 20,
        icon: "🍄",
        status: "out"
    }
];

const AdminInventory = () => {
    return (
        <div className="max-w-7xl mx-auto w-full animate-fade-in pb-12">
            {/* Header Area */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Inventory</h1>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <span className="hover:text-indigo-600 cursor-pointer transition-colors">Home</span>
                    <span>/</span>
                    <span className="text-indigo-600">Inventory</span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Products */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-between group">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Total Products</p>
                        <h3 className="text-2xl font-black text-slate-800">124</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                        <PackageCheck size={24} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Low Stock Items */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-between group">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Low Stock Items</p>
                        <h3 className="text-2xl font-black text-amber-500">12</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                        <TrendingDown size={24} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Out of Stock */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-between group">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Out of Stock</p>
                        <h3 className="text-2xl font-black text-red-500">3</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <AlertTriangle size={24} strokeWidth={2.5} />
                    </div>
                </div>

                {/* Inventory Value */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex items-center justify-between group">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Inventory Value</p>
                        <h3 className="text-2xl font-black text-emerald-600">₹8.4L</h3>
                    </div>
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                        <BoxSelect size={24} strokeWidth={2.5} />
                    </div>
                </div>
            </div>

            {/* Low Stock Alerts Table */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center gap-3">
                    <AlertTriangle className="text-amber-500" size={24} />
                    <h2 className="text-lg font-bold text-slate-800">Low Stock Alerts</h2>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Product</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Category</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 text-center">Current Stock</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 text-center">Min. Required</th>
                                <th className="py-4 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500 text-right">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {inventoryData.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-xl shadow-sm border border-slate-200/60">
                                                {item.icon}
                                            </div>
                                            <span className="font-bold text-slate-700 text-sm">{item.product}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-semibold text-slate-600">{item.category}</span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-black ${item.status === 'out' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                                            }`}>
                                            {item.currentStock}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                        <span className="text-sm font-bold text-slate-500">{item.minRequired}</span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="inline-flex items-center justify-center gap-1.5 bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all shadow-md shadow-indigo-500/20">
                                            <PackageSearch size={14} strokeWidth={3} />
                                            Restock
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <style jsx global>{`
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
        </div>
    );
};

export default AdminInventory;
