import React, { useState, useEffect } from 'react'; // <--- Add useEffect // <--- FIX: Ensure this is importedimport { AnimatePresence } from 'framer-motion';
import Navbar from './components/navbar'
import { BrowserRouter as Router, Routes, Route ,useLocation} from 'react-router-dom'; // <--- Import Router
import { AnimatePresence } from 'framer-motion';
import RotatingCarousel from './components/RotatingCarousel' 
import Hero from './components/Hero1'
import SkillsMarquee from './components/SkillsMarquee'
import EntrySection from './components/EntrySection'
import Services from './components/Services';
import SelectedWorks from './components/SelectedWorks';
import ProjectsPage from './components/ProjectsPage';
import LetsGrow from './components/LetsGrow';
import Footer from './components/Footer';
import HeroName from './components/HeroName';
import Experience from './components/Experience';
// 1. Create a "Home" component that holds your main landing page sections
const Home = () => {
  const { hash } = useLocation();

  useEffect(() => {
    // If there is a hash (like #projects) in the URL
    if (hash) {
      // Wait a tiny bit for the page to render, then scroll
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [hash]);

  return(
    <>
      <Navbar />
      <HeroName />
      <Hero />
      <RotatingCarousel />
      <SkillsMarquee />
      <Experience />
      <Services />
      <SelectedWorks />
      <LetsGrow />
      <Footer />
      {/* Add Contact or Footer here if you have them */}
    </>
  );
};

function App() {
  const [showEntry, setShowEntry] = useState(true);

  return (
    <div className="bg-neutral-950 min-h-screen text-white font-sans selection:bg-green-500/30">
      <AnimatePresence mode='wait'>
        {showEntry ? (
          <EntrySection key="entry" onComplete={() => setShowEntry(false)} />
        ) : (
          // 2. Wrap your content in the Router
          <Router>
            <Routes>
              {/* Route for the Main Page */}
              <Route path="/" element={<Home />} />
              
              {/* Route for the separate Projects Page */}
              <Route path="/projects" element={<ProjectsPage />} />
            </Routes>
          </Router>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;