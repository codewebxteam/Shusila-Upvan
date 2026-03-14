import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Layout Components
import Header from "./components/header";
import Footer from "./components/Footer";
import FloatingCartButton from "./components/common/FloatingCartButton";

// Pages
import FoundationHome from "./pages/foundation/home";
import DairyHome from "./pages/dairy/home";
import MushroomHome from "./pages/mushroom/home";
import About from "./pages/about";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import CartPage from "./pages/cart/CartPage";
import Dashboard from "./pages/profile/dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import OrdersPage from "./pages/profile/OrdersPage";
import ProductDetail from "./pages/ProductDetail";
import Success from "./pages/Success";

// Context Providers
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

// Admin Pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminPayments from "./pages/admin/AdminPayments";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminSettings from "./pages/admin/AdminSettings";

// Protect Admin Routes
const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) return null; // or a loader
  
  if (!user || user.role !== 'admin') {
     return <FoundationHome />; // Redirect unauthorized to home
  }
  
  return children;
};

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Global Header */}
      {!isAdminRoute && <Header />}

      {/* Main Content */}
      <main className="flex-grow">
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<FoundationHome />} />
          <Route path="/dairy" element={<DairyHome />} />
          <Route path="/mushroom" element={<MushroomHome />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Dashboard />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/success" element={<Success />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminProtectedRoute><AdminLayout /></AdminProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="reports" element={<AdminDashboard />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="customers" element={<AdminCustomers />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="*" element={<AdminDashboard />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<FoundationHome />} />
        </Routes>
      </main>

      {/* Global Footer */}
      {!isAdminRoute && <Footer />}

      {/* Floating Cart Button */}
      {!isAdminRoute && <FloatingCartButton />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;