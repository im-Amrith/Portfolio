import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// --- Prerequisite: Install Inter Font ---
// Run this in your terminal: npm install @fontsource/inter
// And add this to your main.jsx: import '@fontsource/inter';

// --- 1. Scramble Text Component ---
const ScrambleText = ({ text, className, delay = 0 }) => {
  const [display, setDisplay] = useState("");
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStart(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!start) return;

    let iteration = 0;
    let interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);

    return () => clearInterval(interval);
  }, [text, start]);

  return <span className={className}>{display}</span>;
};

// --- 2. Main Hero Component ---
const Hero = () => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section 
      id="about"
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className="relative w-full min-h-screen bg-neutral-950 flex items-center justify-center overflow-hidden border-b border-white/5 pt-20"
    >
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition duration-300 z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.04), transparent 40%)`,
        }}
      />

      <div className="relative z-10 max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* --- LEFT COLUMN --- */}
        <div className="flex flex-col justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
    
            </span>
            
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
            <span className="block text-neutral-500">
              <ScrambleText text="ENGINEERING" delay={500} />
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">
              <ScrambleText text="INTELLIGENCE" delay={1200} />
            </span>
          </h1>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="flex flex-col gap-8 lg:pl-10 border-l border-white/10 lg:border-white/5">
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
             <h2 className="text-emerald-400 text-sm font-mono mb-6 tracking-wide">
               // BIOGRAPHY
             </h2>
             
             {/* UPDATED TYPOGRAPHY HERE */}
             {/* Uses 'font-sans' (Inter) instead of default, better leading, slightly lighter text color for elegance */}
             <p className="text-neutral-300 text-lg md:text-xl font-sans font-light leading-8 tracking-wide">
              Innovative software developer specializing in <strong className="text-white font-semibold">Machine Learning</strong>, <strong className="text-white font-semibold">Deep Learning</strong>, and <strong className="text-white font-semibold">NLP</strong>. 
              Adept at designing efficient and scalable solutions, with a strong focus on data analysis and code optimization. 
              Eager to leverage technical skills to build impactful, cutting-edge applications.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.0 }}
            className="grid grid-cols-2 gap-px bg-white/10 border border-white/10 mt-6"
          >
            {[
              { label: "Core Stack", val: "Python / React" },
              { label: "Architecture", val: "Scalable Systems" },
              { label: "Focus Area", val: "AI Integration" },
              { label: "Location", val: "Available Remote" },
            ].map((stat, i) => (
              <div key={i} className="bg-neutral-950 p-5 group hover:bg-neutral-900 transition-colors">
                <div className="text-neutral-500 text-[10px] font-mono uppercase tracking-widest mb-2 group-hover:text-emerald-400 transition-colors">
                  {stat.label}
                </div>
                {/* Made stats font simpler and cleaner */}
                <div className="text-white font-medium tracking-wide text-sm">{stat.val}</div>
              </div>
            ))}
          </motion.div>

          {/* Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 2.5 }}
            className="flex gap-4 pt-6"
          >
             <a href="#projects" className="px-8 py-3 bg-white text-neutral-950 font-bold text-xs tracking-[0.15em] uppercase hover:bg-neutral-200 transition-colors">
               View Projects
             </a>
             <a href="#contact" className="px-8 py-3 bg-transparent border border-white/20 text-white font-bold text-xs tracking-[0.15em] uppercase hover:bg-white/10 transition-colors">
               Contact
             </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
