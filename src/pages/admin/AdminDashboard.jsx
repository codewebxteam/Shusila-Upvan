import React, { useState, useEffect, useMemo } from 'react';
import { DollarSign, ShoppingBag, Users, AlertCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { realtimeDb as db } from '../../firebase';
import { ref, onValue, push, set } from 'firebase/database';
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

    // Excel Export State
    const [exportSource, setExportSource] = useState('AdminOrder');
    const [exportTime, setExportTime] = useState('All Time');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');

    const placeTestOrder = async () => {
        try {
            const refOrder = ref(db, 'orders');
            const newRef = push(refOrder);
            await set(newRef, {
                orderId: "TEST" + Math.floor(Math.random() * 1000),
                customer: "Test User",
                email: "test@example.com",
                grandTotal: 1500,
                payment: "COD",
                status: "Placed",
                date: new Date().toISOString(),
                shippingAddress: { fullName: "Test User", street: "Test Road", city: "Test City", state: "TS", pincode: "110001", mobile: "9876543210" }
            });
            alert("Test Order placed successfully! If the database is connected they will load immediately.");
        } catch (err) {
            console.error("Test order failed:", err);
            alert("Failed to place test order. Check console logs.");
        }
    };

    useEffect(() => {
        const ordersRef = ref(db, 'orders');
        const productsRef = ref(db, 'products');
        const usersRef = ref(db, 'users');

        const unsubOrders = onValue(ordersRef, (snap) => {
            const data = snap.val();
            console.log("[Dashboard] Raw Orders Data snapped:", data ? Object.keys(data).length : "NULL");
            if (data) {
                const list = Object.keys(data).map(key => ({
                    ...data[key],
                    firebaseId: key,
                    orderId: data[key].orderId || data[key].id || key
                }));
                console.log("[Dashboard] Parsed Orders list length:", list.length);
                setOrders(list);
            } else {
                setOrders([]);
            }
            setIsLoading(false);
        }, (err) => {
            console.error("Orders sync error:", err);
            setIsLoading(false);
        });
        const unsubProducts = onValue(productsRef, (snap) => setProducts(Object.values(snap.val() || {})));
        const unsubUsers = onValue(usersRef, (snap) => setUsers(Object.values(snap.val() || {})));

        return () => {
            unsubOrders();
            unsubProducts();
            unsubUsers();
        };
    }, []);

    const handleExportExcel = () => {
        let filteredData = [];
        let headers = [];

        const now = new Date();
        const getDateLimit = (period) => {
            const d = new Date();
            switch (period) {
                case 'Weekly': return new Date(d.setDate(d.getDate() - 7)).getTime();
                case 'Monthly': return new Date(d.setMonth(d.getMonth() - 1)).getTime();
                case 'Yearly': return new Date(d.setFullYear(d.getFullYear() - 1)).getTime();
                case 'Custom': return { start: customStartDate ? new Date(customStartDate).getTime() : 0, end: customEndDate ? new Date(customEndDate).getTime() : Infinity };
                default: return 0;
            }
        };

        const limit = getDateLimit(exportTime);

        if (exportSource === 'AdminOrder' || exportSource === 'AdminPayment') {
            filteredData = orders.filter(o => {
                if (!o.date) return false;
                const oDate = new Date(o.date).getTime();
                if (exportTime === 'Custom') {
                    return oDate >= limit.start && oDate <= limit.end;
                }
                return exportTime === 'All Time' ? true : oDate >= limit;
            });

            if (exportSource === 'AdminOrder') {
                headers = [["Order ID", "Customer", "Email", "Total", "Payment", "Status", "Date"]];
                filteredData = filteredData.map(o => [
                    o.orderId || o.id || 'N/A',
                    o.shippingAddress?.fullName || 'Anonymous',
                    o.email || 'N/A',
                    `₹${o.grandTotal || 0}`,
                    o.payment || 'N/A',
                    o.status || 'N/A',
                    new Date(o.date).toLocaleDateString()
                ]);
            } else {
                headers = [["Order ID", "Date", "Amount", "Method", "Status"]];
                filteredData = filteredData.map(o => [
                    o.orderId || o.id || 'N/A',
                    new Date(o.date).toLocaleDateString(),
                    `₹${o.grandTotal || 0}`,
                    o.payment || 'N/A',
                    o.status || 'N/A'
                ]);
            }
        } 
        else if (exportSource === 'AdminCustomer') {
            const customerMap = {};
            orders.forEach(order => {
                const uid = order.userId || `guest_${order.firebaseId}`;
                if (!customerMap[uid]) {
                    customerMap[uid] = { name: order.shippingAddress?.fullName || 'Anonymous', email: order.email || 'N/A', orders: 0, spent: 0, joined: 'N/A' };
                }
                customerMap[uid].orders += 1;
                customerMap[uid].spent += (order.grandTotal || 0);
            });
            
            users.forEach(u => {
                const uid = u.id || u.uid;
                if (!customerMap[uid]) {
                    customerMap[uid] = { name: u.displayName || u.name || 'Anonymous', email: u.email || 'N/A', orders: 0, spent: 0, joined: u.joinedAt ? new Date(u.joinedAt).toLocaleDateString() : 'N/A' };
                } else if (u.joinedAt) {
                    customerMap[uid].joined = new Date(u.joinedAt).toLocaleDateString();
                }
            });

            filteredData = Object.values(customerMap);
            headers = [["Name", "Email", "Total Orders", "Total Spent", "Joined Date"]];
            filteredData = filteredData.map(c => [c.name, c.email, c.orders, `₹${c.spent}`, c.joined]);
        }
        else if (exportSource === 'AdminInventory') {
            filteredData = products;
            headers = [["Name", "Category", "Price", "Stock", "Status"]];
            filteredData = filteredData.map(p => [
                p.name, p.category, `₹${p.price}`, p.stock, p.status || (p.stock > 0 ? 'In Stock' : 'Out of Stock')
            ]);
        }

        if (filteredData.length === 0) {
            alert("No data found for the selected filters.");
            return;
        }

        const ws = XLSX.utils.aoa_to_sheet([...headers, ...filteredData]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, `${exportSource}_${exportTime.replace(' ', '_')}_${new Date().toISOString().slice(0,10)}.xlsx`);
    };

    // Derived Statistics
    const stats = useMemo(() => {
        const totalSales = orders.reduce((sum, o) => sum + (o.grandTotal || 0), 0);
        const pendingOrders = orders.filter(o =>
            o.status?.toUpperCase() === 'PENDING' ||
            o.status?.toUpperCase() === 'PLACED' ||
            o.status?.toUpperCase() === 'PROCESSING'
        ).length;
        const uniqueEmails = new Set(orders.map(o => o.email).filter(Boolean));
        const totalCustomers = Math.max(users.length, uniqueEmails.size);

        return {
            totalSales,
            totalOrders: orders.length,
            totalCustomers,
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

            {/* Excel Export Toolbar */}
            <div className="bg-white p-5 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 mb-8 flex flex-wrap items-center justify-between gap-4 animate-fade-in">
                <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Excel Export:</span>
                </div>
                
                <div className="flex flex-wrap items-center gap-3">
                    {/* Source Filter */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase text-slate-400">Data Source</label>
                        <select 
                            value={exportSource} 
                            onChange={(e) => setExportSource(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        >
                            <option value="AdminOrder">Orders</option>
                            <option value="AdminCustomer">Customers</option>
                            <option value="AdminPayment">Payments</option>
                            <option value="AdminInventory">Inventory</option>
                        </select>
                    </div>

                    {/* Time Filter */}
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] font-black uppercase text-slate-400">Time Period</label>
                        <select 
                            value={exportTime} 
                            onChange={(e) => setExportTime(e.target.value)}
                            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        >
                            <option value="All Time">All Time</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                            <option value="Custom">Custom Range</option>
                        </select>
                    </div>

                    {/* Custom Date Range Inputs */}
                    {exportTime === 'Custom' && (
                        <>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-black uppercase text-slate-400">Start Date</label>
                                <input 
                                    type="date" 
                                    value={customStartDate} 
                                    onChange={(e) => setCustomStartDate(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-700"
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label className="text-[10px] font-black uppercase text-slate-400">End Date</label>
                                <input 
                                    type="date" 
                                    value={customEndDate} 
                                    onChange={(e) => setCustomEndDate(e.target.value)}
                                    className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-bold text-slate-700"
                                />
                            </div>
                        </>
                    )}

                    <button 
                        onClick={handleExportExcel}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md shadow-emerald-500/20 transition-all self-end"
                    >
                        Export Excel
                    </button>
                </div>
            </div>

            {/* DEBUG PANEL - Visible only if no orders or manually triggered */}
            {(!isLoading && orders.length === 0) && (
                <div className="mb-8 p-6 bg-rose-50 border-2 border-rose-200 rounded-[2rem] shadow-lg shadow-rose-100/50 animate-pulse-slow">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 shrink-0">
                            <AlertCircle size={24} strokeWidth={2.5} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-black text-rose-900 tracking-tight">System Connection Status</h3>
                            <p className="text-sm font-bold text-rose-700/80 mb-4">No data found. This usually happens when the Firebase Database URL is incorrect.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-white/60 p-4 rounded-xl border border-rose-100">
                                    <p className="text-[10px] font-black uppercase text-rose-400 mb-1">Active Database URL:</p>
                                    <code className="text-xs font-mono text-rose-600 break-all">
                                        {db?._repoInternal?.repoInfo_?.host || "Connecting..."}
                                    </code>
                                </div>
                                <div className="bg-white/60 p-4 rounded-xl border border-rose-100">
                                    <p className="text-[10px] font-black uppercase text-rose-400 mb-1">Project ID:</p>
                                    <code className="text-xs font-mono text-rose-600">{import.meta.env.VITE_FIREBASE_PROJECT_ID}</code>
                                </div>
                            </div>

                            <div className="mt-4 p-4 bg-white/40 rounded-xl border border-rose-100">
                                <p className="text-[11px] font-bold text-rose-800">
                                    💡 Tip: Open your Firebase Console &gt; Realtime Database &gt; Copy the URL and add it as <span className="font-black">VITE_FIREBASE_DATABASE_URL</span> in your <span className="font-black">.env</span> file.
                                </p>
                            </div>

                            <button 
                                onClick={placeTestOrder}
                                className="mt-4 flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-md shadow-emerald-500/20"
                            >
                                Generate Test Order in Database
                            </button>
                        </div>
                    </div>
                </div>
            )}

{/* Stats Cards */ }
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
                <p className="text-sm font-semibold text-slate-500 mt-1">Orders Placed</p>
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

{/* Charts Section */ }
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

            <style dangerouslySetInnerHTML={{ __html: `
                 @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            ` }} />
        </div >
    );
};

export default AdminDashboard;
