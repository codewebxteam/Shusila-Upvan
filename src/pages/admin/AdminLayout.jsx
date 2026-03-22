import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { realtimeDb as db } from '../../firebase';
import { ref, onValue } from 'firebase/database';
import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    CreditCard,
    Warehouse,
    Tags,
    FileText,
    BarChart2,
    Settings,
    Search,
    Bell,
    Mail,
    Menu,
    X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [pendingOrders, setPendingOrders] = useState([]);
    const [messages, setMessages] = useState([]);
    const [showNotifications, setShowNotifications] = useState(false);
    const [showMessages, setShowMessages] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const ordersRef = ref(db, 'orders');
        const messagesRef = ref(db, 'messages');

        const unsubOrders = onValue(ordersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map(key => ({ ...data[key], id: key })).filter(o => o.status === 'Placed');
                setPendingOrders(list.reverse());
            } else {
                setPendingOrders([]);
            }
        });

        const unsubMessages = onValue(messagesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const list = Object.keys(data).map(key => ({ ...data[key], id: key }));
                setMessages(list.reverse());
            } else {
                setMessages([]);
            }
        });

        return () => {
            unsubOrders();
            unsubMessages();
        };
    }, []);

    useEffect(() => {
        setIsSidebarOpen(false);
    }, [location.pathname]);

    // Close dropdowns on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest('.relative')) {
                setShowNotifications(false);
                setShowMessages(false);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    const sidebarItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Orders', path: '/admin/orders', icon: <ShoppingCart size={20} /> },
        { name: 'Customers', path: '/admin/customers', icon: <Users size={20} /> },
        { name: 'Payments', path: '/admin/payments', icon: <CreditCard size={20} /> },
        { name: 'Inventory', path: '/admin/inventory', icon: <Warehouse size={20} /> },
        { name: 'Settings', path: '/admin/settings', icon: <Settings size={20} /> },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans relative">
            {/* Backdrop for mobile */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 w-64 bg-white border-r border-slate-200 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-50 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:relative transition-transform duration-200 ease-in-out`}>
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center text-white font-black shadow-lg shadow-emerald-500/30">
                            SU
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-800">
                            Admin <span className="text-emerald-600 font-bold">Panel</span>
                        </span>
                    </div>
                    {/* Close button for mobile */}
                    <button 
                        onClick={() => setIsSidebarOpen(false)}
                        className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg md:hidden"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
                    {sidebarItems.map((item) => {
                        // For exact matching of /admin or /admin/reports, let's treat /admin as the reports page per user screenshot.
                        const isActive = location.pathname === item.path || (item.path === '/admin' && location.pathname === '/admin/reports');

                        return (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${isActive
                                    ? 'bg-indigo-50/80 text-indigo-700 shadow-sm shadow-indigo-100'
                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                    }`}
                            >
                                <span className={`${isActive ? 'text-indigo-600' : 'text-slate-400'}`}>
                                    {item.icon}
                                </span>
                                {item.name}
                            </button>
                        );
                    })}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc]">
                {/* Top Header */}
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-8 shadow-[0_4px_24px_rgba(0,0,0,0.01)] z-[40] shrink-0 gap-3">
                    {/* Hamburger Toggle */}
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-1.5 -ml-1 text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 md:hidden flex items-center justify-center shrink-0"
                    >
                        <Menu size={20} />
                    </button>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-xl relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search products, orders, customers"
                            className="w-full bg-slate-50 border-none rounded-full py-2.5 pl-12 pr-4 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all shadow-inner"
                        />
                    </div>

                    {/* Right Toolbar */}
                    <div className="flex items-center gap-3 md:gap-6 pl-4 md:pl-6 border-l border-slate-100 md:border-l-none">
                        {/* Notifications */}
                        <div className="flex items-center gap-4 relative">
                            {/* Bell Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setShowNotifications(!showNotifications);
                                        setShowMessages(false);
                                    }}
                                    className={`relative p-2 rounded-full transition-colors ${showNotifications ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                                >
                                    <Bell size={20} />
                                    {pendingOrders.length > 0 && (
                                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full scale-110"></span>
                                    )}
                                </button>

                                {showNotifications && (
                                    <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Notifications</h3>
                                            <span className="text-[10px] font-bold bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">{pendingOrders.length} New</span>
                                        </div>
                                        <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                                            {pendingOrders.length > 0 ? (
                                                <div className="divide-y divide-slate-50">
                                                    {pendingOrders.map((order) => (
                                                        <div key={order.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group" onClick={() => { navigate('/admin/orders'); setShowNotifications(false); }}>
                                                            <div className="flex items-start gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                                                                    <ShoppingCart size={14} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[12px] font-bold text-slate-800 leading-tight">New Order: {order.orderId}</p>
                                                                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">Customer: {order.customer || 'Guest'}</p>
                                                                    <p className="text-[9px] font-bold text-slate-400 mt-1">{order.date || 'Just now'}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-10 text-center">
                                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                                                        <Bell size={24} />
                                                    </div>
                                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">There is no notification you received</p>
                                                </div>
                                            )}
                                        </div>
                                        {pendingOrders.length > 0 && (
                                            <button className="w-full py-3 bg-slate-50 text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:bg-indigo-50 transition-colors border-t border-slate-100" onClick={() => { navigate('/admin/orders'); setShowNotifications(false); }}>
                                                View All Orders
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Mail Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => {
                                        setShowMessages(!showMessages);
                                        setShowNotifications(false);
                                    }}
                                    className={`relative p-2 rounded-full transition-colors ${showMessages ? 'bg-indigo-50 text-indigo-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                                >
                                    <Mail size={20} />
                                    {messages.length > 0 && (
                                        <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[9px] font-bold border-2 border-white rounded-full flex items-center justify-center">
                                            {messages.length > 99 ? '99+' : messages.length}
                                        </span>
                                    )}
                                </button>

                                {showMessages && (
                                    <div className="absolute top-full right-0 mt-3 w-80 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[100] animate-in fade-in slide-in-from-top-2 duration-200">
                                        <div className="p-4 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-tight">Messages</h3>
                                            <span className="text-[10px] font-bold bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full">{messages.length} Total</span>
                                        </div>
                                        <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                                            {messages.length > 0 ? (
                                                <div className="divide-y divide-slate-50">
                                                    {messages.map((msg) => (
                                                        <div key={msg.id} className="p-4 hover:bg-slate-50 transition-colors cursor-pointer group">
                                                            <div className="flex items-start gap-3">
                                                                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                                                                    <Mail size={14} />
                                                                </div>
                                                                <div>
                                                                    <p className="text-[12px] font-bold text-slate-800 leading-tight">{msg.name || 'Anonymous'}</p>
                                                                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{msg.message || 'No content...'}</p>
                                                                    <p className="text-[9px] font-bold text-slate-400 mt-1">{msg.timestamp || 'Recent'}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : (
                                                <div className="p-10 text-center">
                                                    <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3 text-slate-300">
                                                        <Mail size={24} />
                                                    </div>
                                                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">There is no message you received</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer" onClick={handleLogout} title="Click to Logout">
                            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-500/30 shrink-0 border-2 border-white cursor-pointer hover:ring-2 hover:ring-offset-1 hover:ring-indigo-400 transition-all">
                                {user ? user.name.charAt(0).toUpperCase() : 'A'}
                            </div>
                            <div className="flex flex-col hidden sm:flex">
                                <span className="text-sm font-bold text-slate-800 leading-tight">
                                    {user ? user.name : 'Admin User'}
                                </span>
                                <span className="text-[11px] font-semibold text-slate-400">
                                    Super Admin
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-auto p-4 md:p-8 custom-scrollbar relative">
                    <Outlet />
                </main>
            </div>

            {/* Global scrollbar style for admin area */}
            {/* Global scrollbar style for admin area */}
            <style dangerouslySetInnerHTML={{ __html: `
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background-color: #cbd5e1;
                    border-radius: 20px;
                }
                .custom-scrollbar:hover::-webkit-scrollbar-thumb {
                    background-color: #94a3b8;
                }
            ` }} />
        </div>
    );
};

export default AdminLayout;
