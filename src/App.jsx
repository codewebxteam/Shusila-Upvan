import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/header';
import Footer from './components/Footer';
import FloatingCartButton from './components/common/FloatingCartButton';

// Pages
import FoundationHome from './pages/foundation/home';
import DairyHome from './pages/dairy/home';
import MushroomHome from './pages/mushroom/home';
import About from './pages/about';
<<<<<<< HEAD
import CartPage from './pages/cart/CartPage';
import Dashboard from './pages/profile/dashboard';
=======
<<<<<<< HEAD
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Dashboard from './pages/profile/dashboard';
import ProductDetail from './pages/ProductDetail';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

import Success from './pages/Success';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-white flex flex-col">

            {/* Globally Scoped Header */}
            <Header />

            {/* Main Content Area */}
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<FoundationHome />} />
                <Route path="/dairy" element={<DairyHome />} />
                <Route path="/mushroom" element={<MushroomHome />} />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Dashboard />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/success" element={<Success />} />

                {/* Default Fallback */}
                <Route path="*" element={<FoundationHome />} />
              </Routes>
            </main>

            {/* Globally Scoped Footer */}
            <Footer />

          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
=======
>>>>>>> 2baa1c9b936eb7fa150bf9fe73a4446832942f96

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">

        {/* Globally Scoped Header */}
        <Header />

        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<FoundationHome />} />
            <Route path="/dairy" element={<DairyHome />} />
            <Route path="/mushroom" element={<MushroomHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/profile" element={<Dashboard />} />

            {/* Default Fallback */}
            <Route path="*" element={<FoundationHome />} />
          </Routes>
        </main>

        {/* Globally Scoped Footer */}
        <Footer />

        {/* Floating Cart Button */}
        <FloatingCartButton />

      </div>
    </Router>
>>>>>>> origin/main
  );
}

export default App;