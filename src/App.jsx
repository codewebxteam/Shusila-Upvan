import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import ChatWidget from "./components/ChatWidget";
import ProtectedRoute from "./components/ProtectedRoute";

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

// Diary pages
import DiaryHome from "./Diarypages/DiaryHome";
import DiaryContacts from "./Diarypages/DiaryContacts";
import MilkDiary from "./Diarypages/MilkDiary";
import Diaryknowledge from "./Diarypages/Diaryknowledge";
import DiarySupport from "./Diarypages/DiarySupport";
import DiaryEvents from "./Diarypages/DiaryEvents";
import DiaryCommunity from "./Diarypages/DiaryCommunity"; 

// Toaster
import { Toaster } from "react-hot-toast";

// Layouts
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
  return (
    <div className="bg-[#0f0425] min-h-screen flex flex-col font-inter">
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* Redirect typo /dairy → /diary */}
        <Route path="/dairy" element={<Navigate to="/diary" replace />} />

        {/* Main/Foundation pages */}
        <Route element={<MainLayout />}>
          <Route index element={<FoundationHome />} />
          <Route path="home" element={<Home />} />
          <Route path="mushrooms" element={<Mushrooms />} />
          <Route path="events" element={<Events />} />
          <Route path="farmer-support" element={<FarmerSupport />} />
          <Route path="contact" element={<Contact />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="community" element={<FarmerCommunity />} />
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

        {/* Fallback for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* ChatWidget visible on all pages */}
      <ChatWidget />
    </div>
  );
}

export default App;