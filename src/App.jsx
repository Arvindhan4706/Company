import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';

// Import Layout & Section Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import WhyChooseUs from './components/WhyChooseUs';
import Industries from './components/Industries';
import ProjectsGallery from './components/ProjectsGallery';
import QualitySafety from './components/QualitySafety';
import VisionMission from './components/VisionMission';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Import Pages
import AdminDashboard from './pages/AdminDashboard';
import SplashIntro from './components/SplashIntro';

// Helper component to handle scroll anchor links across page shifts
const ScrollToAnchor = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  return null;
};

// Home Page Layout consolidating all content sections
const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Industries />
      <ProjectsGallery />
      <QualitySafety />
      <VisionMission />
      <Stats />
      <Testimonials />
      <Contact />
    </>
  );
};

// Sub-component to coordinate page views
const AppContent = () => {
  return (
    <>
      <SplashIntro />
      <ScrollToAnchor />
      <Navbar />
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <CMSProvider>
      <Router>
        <AppContent />
      </Router>
    </CMSProvider>
  );
}

export default App;
