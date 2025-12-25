import { Routes, Route, Outlet, Navigate, Link } from "react-router-dom";
import ChatWidget from "./components/ChatWidget";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect, useState } from "react";

// ✅ ADD THESE 2 IMPORTS
import { AuthProvider } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";

// Diary components
import NavbarMain from "./components/NavbarMain";
import Footer from "./components/Footer";
import DiaryNavbar from "./Diarycomponents/DiaryNavbar";
import Diaryfooter from "./Diarycomponents/Diaryfooter";

// Pages
import FoundationHome from "./pages/FoundationHome";
import Home from "./pages/Home";
import Mushrooms from "./pages/Mushrooms";
import Events from "./pages/Events";
import FarmerSupport from "./pages/FarmerSupport";
import Contact from "./pages/Contact";
import Knowledge from "./pages/Knowledge";
import FarmerCommunity from "./pages/FarmerCommunity";
import Dashboard from "./pages/Dashboard";
import Cart from './pages/Cart';

// Diary pages
import DiaryHome from "./Diarypages/DiaryHome";
import DiaryContacts from "./Diarypages/DiaryContacts";
import MilkDiary from "./Diarypages/MilkDiary";
import Diaryknowledge from "./Diarypages/Diaryknowledge";
import DiarySupport from "./Diarypages/DiarySupport";
import DiaryEvents from "./Diarypages/DiaryEvents";
import DiaryCommunity from "./Diarypages/DiaryCommunity"; 
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./context/CartContext";

const MainLayout = () => (
  <>
    <NavbarMain />
    <main className="flex-1 font-serif">
      <Outlet />
    </main>
    <Footer />
  </>
);

const DiaryLayout = () => (
  <>
    <DiaryNavbar />
    <main className="flex-1 font-serif">
      <Outlet />
    </main>
    <Diaryfooter />
  </>
);

function App() {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    const handleShowAuthModal = (event) => {
      const { mode, action, product, quantity } = event.detail;
      
      if (action && product) {
        localStorage.setItem('pendingAction', JSON.stringify({
          action,
          product,
          quantity,
          timestamp: Date.now()
        }));
      }
      
      window.dispatchEvent(new CustomEvent('triggerAuthModal', { 
        detail: { mode: mode || 'login' } 
      }));
    };

    const handleShowCheckoutModal = (event) => {
      const { product, quantity } = event.detail;
      setCheckoutData({ product, quantity });
      setShowCheckoutModal(true);
    };

    window.addEventListener('showAuthModal', handleShowAuthModal);
    window.addEventListener('showCheckoutModal', handleShowCheckoutModal);
    
    return () => {
      window.removeEventListener('showAuthModal', handleShowAuthModal);
      window.removeEventListener('showCheckoutModal', handleShowCheckoutModal);
    };
  }, []);

  return (
    // ✅ WRAP EVERYTHING WITH AuthProvider
    <AuthProvider>
      <CartProvider>
        <div className="bg-[#0f0425] min-h-screen flex flex-col font-inter">
          <Toaster position="top-center" reverseOrder={false} />
          
          {/* ✅ ADD AUTH MODAL HERE */}
          <AuthModal />
          
          {/* Global Checkout Modal - SIMPLIFIED VERSION */}
          {showCheckoutModal && checkoutData && (
            <div className="fixed inset-0 bg-black/50 z-[9999] flex items-center justify-center p-4">
              <div className="bg-white rounded-lg max-w-md w-full p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Checkout</h2>
                  <button
                    onClick={() => setShowCheckoutModal(false)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                <p className="mb-4">Please use the checkout option from the cart page.</p>
                <div className="mt-6 flex justify-end gap-3">
                  <button
                    onClick={() => setShowCheckoutModal(false)}
                    className="px-4 py-2 border rounded"
                  >
                    Close
                  </button>
                  <Link
                    to="/cart"
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    onClick={() => setShowCheckoutModal(false)}
                  >
                    Go to Cart
                  </Link>
                </div>
              </div>
            </div>
          )}

          <Routes>
            <Route path="/dairy" element={<Navigate to="/diary" replace />} />

            <Route element={<MainLayout />}>
              <Route index element={<FoundationHome />} />
              <Route path="home" element={<Home />} />
              <Route path="mushrooms" element={<Mushrooms />} />
              <Route path="events" element={<Events />} />
              <Route path="farmer-support" element={<FarmerSupport />} />
              <Route path="contact" element={<Contact />} />
              <Route path="knowledge" element={<Knowledge />} />
              <Route path="community" element={<FarmerCommunity />} />
              <Route path="/cart" element={<Cart />} />

              <Route
                path="dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Diary pages */}
            <Route path="/diary" element={<DiaryLayout />}>
              <Route index element={<DiaryHome />} />
              <Route path="diarycontacts" element={<DiaryContacts />} />
              <Route path="milkdiary" element={<MilkDiary />} />
              <Route path="diaryknowledge" element={<Diaryknowledge />} />
              <Route path="diarysupport" element={<DiarySupport />} />
              <Route path="diaryevents" element={<DiaryEvents />} />
              <Route path="dairycommunity" element={<DiaryCommunity />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <ChatWidget />
        </div>
      </CartProvider>
    </AuthProvider> // ✅ CLOSE AuthProvider
  );
}

export default App;