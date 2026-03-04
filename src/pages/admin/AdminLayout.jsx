import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
    Mail
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    // Redirect if not admin (for security in a real app, though here we just rely on login)
    // Actually, we'll just show it for anyone accessing /admin if they are meant to be an admin.

    const sidebarItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Products', path: '/admin/products', icon: <Package size={20} /> },
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
        <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-10">
                {/* Logo Area */}
                <div className="h-20 flex items-center px-6 border-b border-slate-100 shrink-0">
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center text-white font-black shadow-lg shadow-emerald-500/30">
                            SU
                        </div>
                        <span className="text-xl font-black tracking-tight text-slate-800">
                            Admin <span className="text-emerald-600 font-bold">Panel</span>
                        </span>
                    </div>
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
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-[0_4px_24px_rgba(0,0,0,0.01)] z-10 shrink-0">
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
                    <div className="flex items-center gap-6 pl-6">
                        {/* Notifications */}
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <Bell size={20} />
                                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
                            </button>
                            <button className="relative p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">
                                <Mail size={20} />
                                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[9px] font-bold border-2 border-white rounded-full flex items-center justify-center">12</span>
                            </button>
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
                <main className="flex-1 overflow-auto p-8 custom-scrollbar relative">
                    <Outlet />
                </main>
            </div>

            {/* Global scrollbar style for admin area */}
            <style jsx global>{`
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
            `}</style>
        </div>
    );
};

export default AdminLayout;
