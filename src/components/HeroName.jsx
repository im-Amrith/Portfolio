import React, { useRef, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { PointMaterial } from "@react-three/drei";
import * as random from "maath/random/dist/maath-random.esm";
import * as THREE from "three";

// --- Utility: Mobile Detection Hook ---
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

// --- The Physics Engine ---
function SolidSphere({ count }) {
  const mesh = useRef();
  const { viewport, mouse } = useThree();

  // 1. Geometry
  const [positions, colors, homePositions] = useMemo(() => {
    const positions = random.inSphere(new Float32Array(count * 3), { radius: 1.5 });
    const homePositions = Float32Array.from(positions); 
    
    // Initial Color: White
    const colors = new Float32Array(count * 3); 
    for (let i = 0; i < count; i++) {
        colors[i * 3] = 1; colors[i * 3 + 1] = 1; colors[i * 3 + 2] = 1;
    }

    return [positions, colors, homePositions];
  }, [count]);

  // Optimized Vectors
  const mousePos = useMemo(() => new THREE.Vector3(), []);
  const currentPos = useMemo(() => new THREE.Vector3(), []);
  const targetPos = useMemo(() => new THREE.Vector3(), []);
  const homePos = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    // Rotation
    mesh.current.rotation.y += delta * 0.05;

    // Mouse Mapping
    mousePos.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0);

    const posAttr = mesh.current.geometry.attributes.position;
    const colAttr = mesh.current.geometry.attributes.color;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;

      currentPos.set(posAttr.array[i3], posAttr.array[i3 + 1], posAttr.array[i3 + 2]);
      homePos.set(homePositions[i3], homePositions[i3 + 1], homePositions[i3 + 2]);

      const distance = homePos.distanceTo(mousePos);
      
      const interactionRadius = 1.0; 
      const repulsionPower = 1.0; 
      const MAX_DISPLACEMENT = 0.2; 

      if (distance < interactionRadius) {
        // Interaction Logic
        dir.subVectors(homePos, mousePos).normalize();
        let force = (interactionRadius - distance) * repulsionPower;
        force = Math.min(force, MAX_DISPLACEMENT);
        targetPos.addVectors(homePos, dir.multiplyScalar(force));

        // Color: Cyan
        colAttr.array[i3] = THREE.MathUtils.lerp(colAttr.array[i3], 0, 0.1); 
        colAttr.array[i3 + 1] = THREE.MathUtils.lerp(colAttr.array[i3 + 1], 1, 0.1);
        colAttr.array[i3 + 2] = THREE.MathUtils.lerp(colAttr.array[i3 + 2], 1, 0.1);
      } else {
        // Return Home
        targetPos.copy(homePos);
        // Color: White
        colAttr.array[i3] = THREE.MathUtils.lerp(colAttr.array[i3], 1, 0.05);
        colAttr.array[i3 + 1] = THREE.MathUtils.lerp(colAttr.array[i3 + 1], 1, 0.05);
        colAttr.array[i3 + 2] = THREE.MathUtils.lerp(colAttr.array[i3 + 2], 1, 0.05);
      }

      currentPos.lerp(targetPos, 0.1);

      posAttr.array[i3] = currentPos.x;
      posAttr.array[i3 + 1] = currentPos.y;
      posAttr.array[i3 + 2] = currentPos.z;
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// --- The Layout Component ---
const HeroName = () => {
  const isMobile = useIsMobile();

  // Configuration for Responsive 3D Scene
  const particleCount = isMobile ? 4000 : 7000; // Reduce load on mobile
  const cameraPosition = isMobile ? [0, 0, 5.5] : [0, 0, 3.8]; // Move camera back on mobile to fit sphere
  const fov = isMobile ? 50 : 60; // Narrower FOV on mobile reduces edge distortion

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden flex items-center">
      
      {/* Background Smoke Video */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover grayscale"
        >
          <source src="https://cdn.prod.website-files.com/67c3581ddb64922e2ab65814%2F683d95447c690b9819164a07_freepik__smooth-flowing-motion-ethereal-wisps-of-smoke-grac__69084-transcode.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black" />
      </div>

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full pt-20 lg:pt-0 pb-10 lg:pb-0">
        
        {/* --- LEFT COLUMN: Text --- */}
        <div className="flex flex-col justify-center items-start z-30 pointer-events-none order-1">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
             <div className="flex items-center gap-2 mb-4 md:mb-6">
                <span className="h-[1px] w-8 md:w-12 bg-emerald-500"></span>
                <span className="text-emerald-400 font-mono text-xs md:text-sm tracking-widest uppercase">
                  System Online
                </span>
             </div>

             {/* Responsive Typography */}
             <h1 className="text-white font-black text-5xl sm:text-7xl md:text-8xl lg:text-[7rem] leading-[0.9] tracking-tighter uppercase mb-6 mix-blend-difference">
               Amrithesh <br/>
               <span className="text-neutral-600">S Menon</span>
             </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-neutral-400 font-mono text-xs md:text-sm tracking-[0.2em] uppercase max-w-sm md:max-w-md leading-relaxed"
          >
            Full Stack Engineer & AI Architect.<br/>
            Building digital intelligence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-8 md:mt-10 pointer-events-auto"
          >
             <a href="#projects" className="px-6 py-3 md:px-8 md:py-4 border border-white/20 text-white font-mono text-[10px] md:text-xs uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300">
               Explore Work
             </a>
          </motion.div>
        </div>

        {/* --- RIGHT COLUMN: The Solid Sphere --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          // Height adjustments: Smaller on mobile to fit the viewport vertically
          className="relative h-[40vh] md:h-[60vh] lg:h-[80vh] w-full flex items-center justify-center order-2 lg:order-2"
        >
          {/* Use 'key' to force re-render when switching mobile/desktop to update particle count correctly */}
          <Canvas key={isMobile ? 'mobile' : 'desktop'} camera={{ position: cameraPosition, fov: fov }}>
            <ambientLight intensity={0.5} />
            <SolidSphere count={particleCount} />
          </Canvas>
          
          <div className="absolute bottom-0 right-0 lg:bottom-10 lg:right-10 text-neutral-600 font-mono text-[8px] md:text-[10px] tracking-widest pointer-events-none animate-pulse">
            INTERACTIVE // {isMobile ? "TOUCH" : "HOVER"}
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default HeroName;