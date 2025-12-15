import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Scramble Text Helper (Mini version for the loader)
const ScrambleText = ({ text }) => {
  const [display, setDisplay] = useState(text);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let interval = setInterval(() => {
      setDisplay(
        text.split("").map((char, i) => {
          if (Math.random() < 0.1) {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return char;
        }).join("")
      );
    }, 50);
    return () => clearInterval(interval);
  }, [text]);

  return <span>{display}</span>;
};

const EntrySection = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animate progress from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 800); // Wait bit before finishing
          return 100;
        }
        // Randomize speed for "real" loading feel
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-neutral-950 overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ 
        y: "-100%", 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } // Smooth curtain lift effect
      }}
    >
      {/* 1. Background Grid (Matches Hero) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* 2. Spotlight Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_50%,#ffffff05,transparent)]" />

      {/* 3. Main Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 w-full max-w-md px-6">
        
        {/* Status Text */}
        <div className="flex justify-between w-full text-xs font-mono uppercase tracking-[0.2em] text-neutral-500">
          <span><ScrambleText text="System_Boot" /></span>
          <span className="text-emerald-500">v2.4.0</span>
        </div>

        {/* The Progress Bar */}
        <div className="w-full h-[1px] bg-neutral-800 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear" }}
          />
        </div>

        {/* Large Percentage Counter */}
        <div className="text-8xl md:text-9xl font-black text-white tracking-tighter tabular-nums leading-none">
          {progress}<span className="text-neutral-600 text-4xl align-top">%</span>
        </div>

        {/* Loading Message */}
        <div className="text-neutral-400 text-sm font-mono tracking-widest uppercase animate-pulse">
           {progress < 100 ? "Loading_Modules..." : "Access_Granted"}
        </div>
      </div>
    </motion.div>
  );
};

export default EntrySection;