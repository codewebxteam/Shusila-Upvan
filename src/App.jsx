import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout Components
import Header from './components/header';
import Footer from './components/footer';

// Pages
import FoundationHome from './pages/foundation/home';
import DairyHome from './pages/dairy/home';
import MushroomHome from './pages/mushroom/home';
import About from './pages/about';

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

            {/* Default Fallback */}
            <Route path="*" element={<FoundationHome />} />
          </Routes>
        </main>

        {/* Globally Scoped Footer */}
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;