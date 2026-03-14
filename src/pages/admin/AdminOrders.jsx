import React, { useState, useEffect } from 'react';
import { realtimeDb as db } from '../../firebase';
import { ref, onValue, update, remove } from 'firebase/database';
import { Download, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import OrderTrackingModal from '../../components/admin/OrderTrackingModal';


const AdminOrders = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);

    // Sync with Firebase
    useEffect(() => {
        const ordersRef = ref(db, 'orders');

        const unsubOrders = onValue(ordersRef, (snapshot) => {
            try {
                const data = snapshot.val();
                if (data) {
                    const orderList = Object.keys(data).map(key => ({
                        ...data[key],
                        firebaseId: key,
                        orderId: data[key].orderId || data[key].id || key
                    }));
                    setOrders(orderList.reverse());
                } else {
                    setOrders([]);
                }
                setIsLoading(false);
            } catch (error) {
                console.error("Error processing orders:", error);
                setIsLoading(false);
            }
        }, (error) => {
            console.error("Firebase onValue error:", error);
            setIsLoading(false);
        });

        return () => unsubOrders();
    }, []);

    const handleStatusChange = (firebaseId, newStatus) => {
        const orderRef = ref(db, `orders/${firebaseId}`);
        update(orderRef, { status: newStatus });
    };

    const handleClearOrders = () => {
        if (window.confirm('Are you sure you want to clear all order history? This cannot be undone.')) {
            const ordersRef = ref(db, 'orders');
            remove(ordersRef);
        }
    };

    // Calculate stats
    const stats = {
        total: orders.length,
        pending: orders.filter(o => o.status === 'Pending').length,
        delivered: orders.filter(o => o.status === 'Delivered').length,
        cancelled: orders.filter(o => o.status === 'Cancelled').length
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto w-full animate-fade-in pb-12">
            <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">Orders</h1>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                        <span className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={() => navigate('/admin/dashboard')}>Home</span>
                        <span>/</span>
                        <span className="text-indigo-600">Orders</span>
                    </div>
                </div>

                <button
                    onClick={handleClearOrders}
                    className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl font-bold text-sm hover:bg-red-100 transition-all border border-red-100 shadow-sm shadow-red-50"
                >
                    <Trash2 size={18} />
                    Clear History
                </button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {/* Total Orders */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center">
                    <h3 className="text-[2.2rem] font-black text-slate-800 tracking-tight mb-1">{stats.total}</h3>
                    <p className="text-sm font-bold text-slate-400">Total Orders</p>
                </div>

                {/* Pending Orders */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center">
                    <h3 className="text-[2.2rem] font-black text-amber-500 tracking-tight mb-1">{stats.pending}</h3>
                    <p className="text-sm font-bold text-slate-400">Pending Orders</p>
                </div>

                {/* Delivered */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center">
                    <h3 className="text-[2.2rem] font-black text-emerald-500 tracking-tight mb-1">{stats.delivered}</h3>
                    <p className="text-sm font-bold text-slate-400">Delivered</p>
                </div>

                {/* Cancelled */}
                <div className="bg-white rounded-[1.5rem] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col justify-center">
                    <h3 className="text-[2.2rem] font-black text-red-500 tracking-tight mb-1">{stats.cancelled}</h3>
                    <p className="text-sm font-bold text-slate-400">Cancelled</p>
                </div>
            </div>

            {/* All Orders Table */}
            <div className="bg-white rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between gap-4 flex-wrap">
                    <h2 className="text-lg font-bold text-slate-800">All Orders</h2>

                    <div className="flex items-center gap-3">
                        <select className="bg-white border border-slate-200 text-sm font-bold text-slate-700 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 shadow-sm appearance-none cursor-pointer pr-10 relative bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:10px_10px] bg-[right_12px_center]">
                            <option>All Status</option>
                            <option>Delivered</option>
                            <option>Pending</option>
                            <option>Processing</option>
                            <option>Shipped</option>
                        </select>

                        <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 py-2 px-4 rounded-xl font-bold text-sm transition-colors shadow-sm">
                            <Download size={16} strokeWidth={2.5} className="text-slate-400" />
                            Export
                        </button>
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[900px]">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Order ID</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Customer</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Amount</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Payment</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Status</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Date</th>
                                <th className="py-5 px-6 text-[11px] font-black uppercase tracking-widest text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {orders.map((item, index) => (
                                <tr key={item.firebaseId || item.id || index} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6">
                                        <span className="font-bold text-slate-600 text-sm">{item.orderId}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-semibold text-slate-700">{item.customer}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-bold text-slate-700">₹{(item.grandTotal || item.amount || 0).toLocaleString('en-IN')}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-semibold text-slate-500">{item.payment}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <select
                                            value={item.status}
                                            onChange={(e) => handleStatusChange(item.firebaseId, e.target.value)}
                                            className={`text-xs font-bold py-1.5 px-3 rounded-full border focus:outline-none appearance-none cursor-pointer pr-8 bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%2364748B%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[length:8px_8px] bg-[right_10px_center] ${item.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                                                item.status === 'Shipped' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                                                    item.status === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                                        'bg-slate-50 text-slate-700 border-slate-200'
                                                }`}
                                        >
                                            <option value="Delivered">Delivered</option>
                                            <option value="Shipped">Shipped</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Processing">Processing</option>
                                        </select>
                                    </td>
                                    <td className="py-4 px-6">
                                        <span className="text-sm font-semibold text-slate-500">{item.date}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <button 
                                            onClick={() => setSelectedOrder(item)}
                                            className="text-slate-400 hover:text-indigo-600 transition-colors" 
                                            title="View Details"
                                        >
                                            <Eye size={18} strokeWidth={2.5} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {selectedOrder && (
                <OrderTrackingModal 
                    order={selectedOrder} 
                    onClose={() => setSelectedOrder(null)} 
                />
            )}

        </div>
    );
};

export default AdminOrders;
