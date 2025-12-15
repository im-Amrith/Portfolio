import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// --- Utility Hook for Responsive Design ---
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
};

// --- Component: The Scrolling Background Text ---
const BackgroundMarquee = () => {
  const text = "CREATIVE MINDS — ";
  const repeatCount = 6;

  return (
    <div className="absolute inset-0 flex flex-col justify-center pointer-events-none overflow-hidden select-none opacity-10">
      {[...Array(3)].map((_, rowIndex) => (
        <div key={rowIndex} className="flex whitespace-nowrap py-2 sm:py-4 md:py-8">
          <motion.div
            className="flex"
            animate={{ x: rowIndex % 2 === 0 ? "-50%" : "50%" }}
            initial={{ x: 0 }}
            transition={{
              ease: "linear",
              duration: 30 + rowIndex * 5,
              repeat: Infinity,
            }}
          >
            {[...Array(repeatCount)].map((_, i) => (
              <span
                key={i}
                className="text-neutral-500 font-black text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] uppercase tracking-tighter leading-none px-4 sm:px-8"
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

// --- Main Component: The 3D Carousel ---
const RotatingCarousel = () => {
  const isMobile = useIsMobile();

  // --- Configuration ---
  const CARD_WIDTH = isMobile ? 240 : 320; 
  const GAP = isMobile ? 20 : 40;
  const ITEM_COUNT = 8;
  
  // Calculate geometry
  const TANGENT = Math.tan(Math.PI / ITEM_COUNT);
  const RADIUS = (CARD_WIDTH + GAP) / (2 * TANGENT);
  const ANGLE_PER_STEP = 360 / ITEM_COUNT;

  // --- Animation Logic ---
  const rotationKeyframes = Array.from({ length: ITEM_COUNT }, (_, i) => {
    const currentAngle = i * -ANGLE_PER_STEP;
    const nextAngle = (i + 1) * -ANGLE_PER_STEP;
    return [currentAngle, nextAngle];
  }).flat();
  rotationKeyframes.push(-360);

  const times = Array.from({ length: ITEM_COUNT }, (_, i) => {
    const stepStart = i / ITEM_COUNT;
    const pauseStart = stepStart + (0.8 / ITEM_COUNT);
    return [stepStart, pauseStart];
  }).flat();
  times.push(1);

  const items = [
    { 
      id: 1, 
      num: "01", 
      title: "AI & Machine Learning", 
      img: "/ai2.jpg" 
    },
    { 
      id: 2, 
      num: "02", 
      title: "Full Stack Engineering", 
      img: "https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&q=80&w=600" 
    },
    { 
      id: 3, 
      num: "03", 
      title: "Computer Vision", 
      img: "/cv.jpg" 
    },
    { 
      id: 4, 
      num: "04", 
      title: "NLP & LLMs", 
      img: "/llm.jpg" 
    },
    { 
      id: 5, 
      num: "05", 
      title: "Cloud Architecture", 
      img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600" 
    },
    { 
      id: 6, 
      num: "06", 
      title: "Cyber Security", 
      img: "/cyber.jpg" 
    },
    { 
      id: 7, 
      num: "07", 
      title: "DevOps & CI/CD", 
      img: "/cd.jpg" 
    },
    { 
      id: 8, 
      num: "08", 
      title: "Market Research", 
      img: "/market.png" 
    },
  ];

  return (
    // CHANGE HERE: Removed 'touch-none'
    <section className="bg-black min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      
      <BackgroundMarquee />

      {/* Container with Tilt */}
      <div 
        className="relative z-10 scale-75 md:scale-100 origin-center"
        style={{ 
          perspective: isMobile ? "1000px" : "2000px",
          transformStyle: "preserve-3d",
          transform: isMobile ? "rotateX(-5deg)" : "rotateX(-12deg) rotateZ(-5deg)",
        }}
      >
        <motion.div
          className="relative"
          style={{ 
            width: CARD_WIDTH, 
            height: isMobile ? 320 : 400,
            transformStyle: "preserve-3d",
          }}
          animate={{ rotateY: rotationKeyframes }}
          transition={{
            duration: 16,
            times: times,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          {items.map((item, index) => {
            const angle = (360 / ITEM_COUNT) * index;
            
            return (
              <div
                key={item.id}
                className="absolute inset-0 bg-neutral-900/90 border border-white/10 shadow-2xl backdrop-blur-sm"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${RADIUS}px)`,
                }}
              >
                {/* Inner Content */}
                <div className="relative h-full w-full p-4 md:p-6 flex flex-col justify-between group">
                  <div className="absolute inset-0 z-0">
                      <img 
                       src={item.img} 
                       alt={item.title} 
                       className="w-full h-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                     />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90" />
                  </div>
                  <div className="relative z-10 flex justify-between items-start">
                     <span className="text-white/50 font-mono text-xs border border-white/20 px-2 py-1 rounded-full">
                        {item.num}
                     </span>
                  </div>
                  <div className="relative z-10">
                    <h3 className="text-white font-bold text-xl md:text-3xl uppercase tracking-tighter leading-none mb-2">
                      {item.title}
                    </h3>
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

export default RotatingCarousel;
