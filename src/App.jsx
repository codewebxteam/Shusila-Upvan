import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/header';
import Footer from './components/Footer';

// Pages
import FoundationHome from './pages/foundation/home';
import DairyHome from './pages/dairy/home';
import MushroomHome from './pages/mushroom/home';
import About from './pages/about';
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
  );
}

export default App;