import React from "react";
import { motion } from "framer-motion";

// --- 1. Background Text: Your Identity ---
const BackgroundMarquee = () => {
  const text = "FULL STACK ENGINEER — AI & ML ARCHITECT — ";
  const repeatCount = 4; // Enough to fill width

  return (
    <div className="absolute inset-0 flex flex-col justify-center pointer-events-none overflow-hidden select-none opacity-[0.03]">
      {[...Array(3)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex whitespace-nowrap py-2 sm:py-6 md:py-12">
          <motion.div
            className="flex"
            initial={{ x: 0 }}
            animate={{ x: rowIndex % 2 === 0 ? "-50%" : "50%" }} // Alternate directions
            transition={{
              ease: "linear",
              duration: 40 + rowIndex * 10, // Parallax speed effect
              repeat: Infinity,
            }}
          >
            {[...Array(repeatCount)].map((_, i) => (
              <span
                key={i}
                className="text-white font-black text-6xl sm:text-8xl md:text-[10rem] uppercase tracking-tighter leading-none px-8"
              >
                {text}
              </span>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

// --- 2. Main Hero Component ---
const HeroCarousel = () => {
  // --- Geometry Configuration (The "Octagon") ---
  const CARD_WIDTH = 300; 
  const GAP = 50; 
  const ITEM_COUNT = 8;
  const TANGENT = Math.tan(Math.PI / ITEM_COUNT);
  const RADIUS = (CARD_WIDTH + GAP) / (2 * TANGENT);
  const ANGLE_PER_STEP = 360 / ITEM_COUNT;

  // --- Animation Logic (Move -> Pause -> Move) ---
  const rotationKeyframes = Array.from({ length: ITEM_COUNT }, (_, i) => {
    const currentAngle = i * -ANGLE_PER_STEP;
    const nextAngle = (i + 1) * -ANGLE_PER_STEP;
    return [currentAngle, nextAngle];
  }).flat();
  
  // Close the loop
  rotationKeyframes.push(-360);

  // Timing: 80% moving, 20% paused
  const times = Array.from({ length: ITEM_COUNT }, (_, i) => {
    const stepStart = i / ITEM_COUNT;
    const pauseStart = stepStart + (0.8 / ITEM_COUNT); 
    return [stepStart, pauseStart];
  }).flat();
  times.push(1);

  // --- 3. Personalized Content (Your Skills) ---
  const items = [
    { 
      id: 1, 
      num: "01", 
      title: "Frontend Arch", 
      desc: "React & Next.js",
      img: "https://images.unsplash.com/photo-1618477247222-ac59124c6282?auto=format&fit=crop&q=80&w=600" 
    },
    { 
      id: 2, 
      num: "02", 
      title: "AI Integration", 
      desc: "LLMs & RAG Systems",
      img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600" 
    },
    { 
      id: 3, 
      num: "03", 
      title: "Cloud Infra", 
      desc: "AWS & Docker",
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600" 
    },
    { 
      id: 4, 
      num: "04", 
      title: "Backend Logic", 
      desc: "Python & Node.js",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600" 
    },
    { 
      id: 5, 
      num: "05", 
      title: "System Design", 
      desc: "Scalable Architecture",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600" 
    },
    { 
      id: 6, 
      num: "06", 
      title: "Data Science", 
      desc: "Analytics & Insights",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600" 
    },
    { 
      id: 7, 
      num: "07", 
      title: "Mobile Apps", 
      desc: "React Native",
      img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=600" 
    },
    { 
      id: 8, 
      num: "08", 
      title: "Cyber Security", 
      desc: "Privacy & Protection",
      img: "https://images.unsplash.com/photo-1563206767-5b1d972d9fb7?auto=format&fit=crop&q=80&w=600" 
    },
  ];

  return (
    <section className="bg-neutral-950 min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* Background Scrolling Text */}
      <BackgroundMarquee />

      {/* 4. The 3D Scene Container 
          Note the specific perspective and tilt values to match Promora
      */}
      <div 
        className="relative z-10 mt-10 md:mt-0" 
        style={{ 
          perspective: "2500px", // Deep perspective for dramatic effect
          transformStyle: "preserve-3d",
          transform: "rotateX(-10deg) rotateZ(-5deg)" // The "Promora" Tilt
        }}
      >
        <motion.div
          className="relative"
          style={{ 
            width: CARD_WIDTH, 
            height: 400,
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateY: rotationKeyframes }}
          transition={{
            duration: 20, // 20 seconds for full loop
            times: times, // Use the move/pause timing map
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          {items.map((item, index) => {
            const angle = (360 / ITEM_COUNT) * index;
            
            return (
              <div
                key={item.id}
                className="absolute inset-0 bg-neutral-900 border border-white/5"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                }}
              >
                {/* Panel Content */}
                <div className="relative h-full w-full p-6 flex flex-col justify-between group">
                  
                  {/* Image with Overlay */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                     <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-500 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                  </div>

                  {/* Top: Number & Decoration */}
                  <div className="relative z-10 flex justify-between items-start border-b border-white/10 pb-4">
                    <span className="text-white/80 text-sm font-mono tracking-widest">{item.num}</span>
                    <motion.div 
                      className="h-1.5 w-1.5 bg-green-500 rounded-full" 
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  
                  {/* Bottom: Title & Description */}
                  <div className="relative z-10 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-3xl uppercase tracking-tighter leading-none mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 text-xs font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroCarousel;