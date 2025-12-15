import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const LetsGrow = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Define grid position indices for clarity
  // [ 0,  1,  2,  3]
  // [ 4,  5,  6,  7]
  // [ 8,  9, 10, 11]

  // New Timing Scheme for Center-Out Expansion over a longer scroll distance
  const gridImages = [
    // --- Row 1 ---
    { src: "/foot1.jpg", start: 0.55, end: 0.85 }, // Corner (Phase 4)
    { src: "/foot2.jpg", start: 0.25, end: 0.55 }, // Top Center (Phase 2)
    { src: "foot3.jpg", start: 0.25, end: 0.55 }, // Top Center (Phase 2)
    { src: "foot4.jpg", start: 0.55, end: 0.85 }, // Corner (Phase 4)
    // --- Row 2 ---
    { src: "/foot5.jpg", start: 0.40, end: 0.70 }, // Side (Phase 3)
    { src: "/foot6.jpg", start: 0.10, end: 0.40 }, // Dead Center (Phase 1)
    { src: "/foot7.jpg", start: 0.10, end: 0.40 }, // Dead Center (Phase 1)
    { src: "/foot8.jpg", start: 0.40, end: 0.70 }, // Side (Phase 3)
    // --- Row 3 ---
    { src: "/foot9.jpg", start: 0.55, end: 0.85 }, // Corner (Phase 4)
    { src: "/foot10.jpg", start: 0.25, end: 0.55 }, // Bottom Center (Phase 2)
    { src: "foot11.jpg", start: 0.25, end: 0.55 }, // Bottom Center (Phase 2)
    { src: "/foot12.jpg", start: 0.55, end: 0.85 }, // Corner (Phase 4)
  ];

  return (
    // Increased height slightly to allow for a longer, slower scroll interaction
    <section ref={containerRef} className="relative h-[300vh] bg-neutral-950">
      
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center pt-20">
        
        {/* The Grid Layer */}
        <div className="absolute inset-0 grid grid-cols-2 md:grid-cols-4 grid-rows-3 w-full h-full">
          {gridImages.map((img, i) => (
            <GridItem 
              key={i} 
              data={img} 
              scrollYProgress={scrollYProgress} 
            />
          ))}
        </div>

        {/* The Text Layer */}
        <div className="relative z-20 text-center w-full max-w-[90vw] pointer-events-none">
          {/* Headline fades in early */}
          <motion.div style={{ opacity: useTransform(scrollYProgress, [0.05, 0.25], [0, 1]) }}>
             <h2 className="text-[12vw] md:text-[9rem] font-sans font-black text-white leading-[0.85] tracking-tighter uppercase drop-shadow-2xl">
               Let's <br />
               <span className="text-neutral-400">Grow</span> <br />
               Together
             </h2>
          </motion.div>
          
          {/* Button fades in towards the end of the image reveal sequence */}
          <motion.div 
            style={{ opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 1]) }}
            className="mt-12 md:mt-16 pointer-events-auto"
          >
            <a 
              href="mailto:amrithesh23@email.com" 
              className="inline-block bg-white text-neutral-950 px-10 py-4 rounded-full text-sm md:text-base font-mono font-bold tracking-widest uppercase hover:bg-emerald-400 hover:text-black hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>

        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 z-10 bg-black/30 pointer-events-none" />

      </div>
    </section>
  );
};

// Individual Grid Cell Component
const GridItem = ({ data, scrollYProgress }) => {
  // Opacity goes from 0 to 0.4 (subtle, colored)
  const opacity = useTransform(scrollYProgress, [data.start, data.end], [0, 0.4]);
  // Scale goes from 0.85 to 1 (gentle zoom)
  const scale = useTransform(scrollYProgress, [data.start, data.end], [0.85, 1]);

  return (
    <div id="collab" className="relative w-full h-full overflow-hidden border border-white/5 bg-neutral-900/50">
      <motion.div
        style={{ opacity, scale }}
        className="w-full h-full"
      >
        <img 
          src={data.src} 
          alt="Project" 
          className="w-full h-full object-cover" 
        />
      </motion.div>
    </div>
  );
};

export default LetsGrow;