import { 
  LayoutDashboard, Box, ShoppingCart, User, CreditCard, Home, Tag, FileText, BarChart2, Settings 
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import "../admin.css";  

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/admin/dashboard" },
  { id: "products", label: "Products", icon: Box, path: "/admin/products" },
  { id: "orders", label: "Orders", icon: ShoppingCart, path: "/admin/orders" },
  { id: "customers", label: "Customers", icon: User, path: "/admin/customers" },
  { id: "payments", label: "Payments", icon: CreditCard, path: "/admin/payments" },
  { id: "inventory", label: "Inventory", icon: Home, path: "/admin/inventory" },
  { id: "coupons", label: "Coupons", icon: Tag, path: "/admin/coupons" },
  { id: "cms", label: "Content", icon: FileText, path: "/admin/cms" },
  { id: "reports", label: "Reports", icon: BarChart2, path: "/admin/reports" },
  { id: "settings", label: "Settings", icon: Settings, path: "/admin/settings" }
];

export default function Sidebar() {
  return (
    <div className="admin-panel flex min-h-screen">
      {/* Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>🎯 Admin Panel</h2>
        </div>

        <div className="sidebar-menu">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `menu-item ${isActive ? "active" : ""}`
                }
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>
    </div>
  );
}
