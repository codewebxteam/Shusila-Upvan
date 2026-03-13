import React, { useState, useEffect, useMemo } from 'react';
import { DollarSign, ShoppingBag, Users, AlertCircle } from 'lucide-react';
import { realtimeDb as db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from 'recharts';

const AdminDashboard = () => {
    const [orders, setOrders] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const ordersRef = ref(db, 'orders');
        const productsRef = ref(db, 'products');
        const usersRef = ref(db, 'users');

        const unsubOrders = onValue(ordersRef, (snap) => setOrders(Object.values(snap.val() || {})));
        const unsubProducts = onValue(productsRef, (snap) => setProducts(Object.values(snap.val() || {})));
        const unsubUsers = onValue(usersRef, (snap) => setUsers(Object.values(snap.val() || {})));

        setIsLoading(false);
        return () => {
            unsubOrders();
            unsubProducts();
            unsubUsers();
        };
    }, []);

    // Derived Statistics
    const stats = useMemo(() => {
        const totalSales = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
        const pendingOrders = orders.filter(o => o.status === 'Pending').length;
        return {
            totalSales,
            totalOrders: orders.length,
            totalCustomers: users.length,
            pendingOrders
        };
    }, [orders, users]);

    // Graph Data Processing
    const salesChartData = useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        return months.map(month => ({
            name: month,
            sales: orders.filter(o => {
                if (!o.date) return false;
                const date = new Date(o.date);
                return date.toLocaleString('default', { month: 'short' }) === month;
            }).reduce((sum, o) => sum + (o.grandTotal || 0), 0)
        }));
    }, [orders]);

    const ordersChartData = useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        return months.map(month => ({
            name: month,
            orders: orders.filter(o => {
                if (!o.date) return false;
                const date = new Date(o.date);
                return date.toLocaleString('default', { month: 'short' }) === month;
            }).length
        }));
    }, [orders]);

    const categoryData = useMemo(() => {
        const mushroomCount = products.filter(p => p.category?.toLowerCase().includes('mushroom')).length;
        const dairyCount = products.filter(p => p.category?.toLowerCase().includes('dairy')).length;
        return [
            { name: 'Mushroom', value: mushroomCount },
            { name: 'Dairy', value: dairyCount }
        ].filter(c => c.value > 0);
    }, [products]);

    const COLORS = ['#10b981', '#f59e0b'];
    return (
        <div className="w-full animate-fade-in pb-12">
            {/* Header Area */}
            <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Dashboard Overview</h1>
                <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                    <span className="hover:text-indigo-600 cursor-pointer transition-colors">Home</span>
                    <span>/</span>
                    <span className="text-indigo-600">Dashboard</span>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Sales */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-3xl font-black text-slate-800">₹{stats.totalSales.toLocaleString()}</h3>
                            <p className="text-sm font-semibold text-slate-500 mt-1">Total Sales</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                            <DollarSign size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span>+12.5% live data</span>
                    </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-3xl font-black text-slate-800">{stats.totalOrders}</h3>
                            <p className="text-sm font-semibold text-slate-500 mt-1">Total Orders</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                            <ShoppingBag size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span>+8.2% live data</span>
                    </div>
                </div>

                {/* Total Customers */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-3xl font-black text-slate-800">{stats.totalCustomers}</h3>
                            <p className="text-sm font-semibold text-slate-500 mt-1">Total Customers</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                            <Users size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-emerald-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        <span>+15.3% live data</span>
                    </div>
                </div>

                {/* Pending Orders */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-3xl font-black text-slate-800">{stats.pendingOrders}</h3>
                            <p className="text-sm font-semibold text-slate-500 mt-1">Pending Orders</p>
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/30">
                            <AlertCircle size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-rose-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                        </svg>
                        <span>Real-time tracking</span>
                    </div>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Sales Overview Chart */}
                <div className="bg-white rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Sales Overview</h2>
                        <span className="text-[10px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">Real-time</span>
                    </div>
                    <div className="h-[300px] w-full min-h-[300px] relative">
                        <ResponsiveContainer width="99%" height={300}>
                            <LineChart data={salesChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Line type="monotone" dataKey="sales" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, strokeWidth: 2, fill: '#fff', stroke: '#8b5cf6' }} activeDot={{ r: 6, strokeWidth: 0, fill: '#8b5cf6' }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Distribution Pie Chart */}
                <div className="bg-white rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-bold text-slate-800">Inventory Split</h2>
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-widest">Category</span>
                    </div>
                    <div className="h-[300px] w-full min-h-[300px] relative">
                        <ResponsiveContainer width="99%" height={300}>
                            <PieChart>
                                <Pie
                                    data={categoryData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {categoryData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Orders Overview Chart */}
                <div className="bg-white rounded-[1.5rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Orders Overview</h2>
                    <div className="h-[300px] w-full min-h-[300px] relative">
                        <ResponsiveContainer width="99%" height={300}>
                            <BarChart data={ordersChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={32}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }} />
                                <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
                                <Bar dataKey="orders" fill="#10b981" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
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

export default AdminDashboard;
