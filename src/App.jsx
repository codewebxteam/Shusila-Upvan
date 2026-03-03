import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout Components
import Header from "./components/header";
import Footer from "./components/Footer";
import FloatingCartButton from "./components/common/FloatingCartButton";

// Pages
import FoundationHome from "./pages/foundation/home";
import DairyHome from "./pages/dairy/home";
import MushroomHome from "./pages/mushroom/home";
import About from "./pages/about";
import CartPage from "./pages/cart/CartPage";
import Dashboard from "./pages/profile/dashboard";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ProductDetail from "./pages/ProductDetail";
import Success from "./pages/Success";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="min-h-screen bg-white flex flex-col">

              {/* Global Header */}
              <Header />

              {/* Main Content */}
              <main className="flex-grow">
                <Routes>
                  <Route path="/" element={<FoundationHome />} />
                  <Route path="/dairy" element={<DairyHome />} />
                  <Route path="/mushroom" element={<MushroomHome />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/profile" element={<Dashboard />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/success" element={<Success />} />

                  {/* Fallback Route */}
                  <Route path="*" element={<FoundationHome />} />
                </Routes>
              </main>

              {/* Global Footer */}
              <Footer />

              {/* Floating Cart Button */}
              <FloatingCartButton />

            </div>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;