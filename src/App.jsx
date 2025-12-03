import { Routes, Route } from "react-router-dom";
import NavbarMain from "./components/NavbarMain";
import Footer from "./components/Footer";
import ChatWidget from "./components/ChatWidget";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import FoundationHome from "./pages/FoundationHome"; // Front page
import Home from "./pages/Home";
import Mushrooms from "./pages/Mushrooms";
import Events from "./pages/Events";
import FarmerSupport from "./pages/FarmerSupport";
import Contact from "./pages/Contact";
import Knowledge from "./pages/Knowledge";
import Dashboard from "./pages/Dashboard";

// Toaster
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="bg-[#0f0425] min-h-screen flex flex-col font-inter">
      <Toaster position="top-center" reverseOrder={false} />

      <NavbarMain />

      <main className="flex-1 font-serif">
        <Routes>

          {/* Foundation Front Page */}
          <Route path="/" element={<FoundationHome />} />

          {/* Public Pages */}
         

          <Route path="/home" element={<Home />} />
          <Route path="/mushrooms" element={<Mushrooms />} />
          <Route path="/events" element={<Events />} />
          <Route path="/farmer-support" element={<FarmerSupport />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/knowledge" element={<Knowledge />} />

          {/* Protected Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>

        <ChatWidget />
      </main>

      <Footer />
    </div>
  );
}

export default App;
