import React, { useRef, useState, useEffect } from "react";
import { motion, useTransform, useScroll } from "framer-motion";
import { Link } from 'react-router-dom';

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

const projects = [
  {
    id: 1,
    title: "Prompt Engine",
    category: "Web Application",
    description: "High-performance Prompt Engineering platform powered by RAG.Build better prompts using your own knowledge base.",
    img: "/rag.png",
    link: "https://rag-engine0.netlify.app"
  },
  {
    id: 2,
    title: "TrendFlow",
    category: "Content Automation",
    description: "Full-stack AI blogging platform that researches trending news and publishes optimized content",
    img: "/trend.png",
    link: "https://trend-flow-beta.vercel.app"
  },
  {
    id: 3,
    title: "ConnectVit",
    category: "Social Messaging",
    description: "Modern social media platform featuring real-time chat, groups, stories, and a dynamic social feed. Built with React.js and Flask",
    img: "vit.png",
    link: "https://connectvit.vercel.app"
  },
  {
    id: 4,
    title: "TeamSync AI",
    category: "Browser Extension",
    description: "Automated event extraction from Microsoft Teams chats using Gemini API integration.",
    img: "team2.jpg",
    link: "https://github.com/im-Amrith/Teamsync"
  },
];

const SelectedWorks = () => {
  const targetRef = useRef(null);
  const isMobile = useIsMobile(); // 1. Get mobile state

  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // 2. Dynamic Transform Logic
  // Mobile needs to scroll further (-85%) because the viewport is smaller relative to the content width.
  // Desktop is fine with -55%.
  const x = useTransform(
    scrollYProgress, 
    [0, 1], 
    ["1%", isMobile ? "-85%" : "-55%"] 
  );

  return (
    <section id="projects" ref={targetRef} className="relative h-[300vh] bg-neutral-950">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        
        <motion.div style={{ x }} className="flex gap-12 px-12 md:px-24 w-max">
          
          {/* Header Card */}
          <div className="flex flex-col justify-center min-w-[300px] md:min-w-[500px]">
             <h2 className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-6">
                // Selected_Works
             </h2>
             <h3 className="text-5xl md:text-7xl font-black text-white leading-tight uppercase">
                Featured <br />
                <span className="text-neutral-500">Projects</span>
             </h3>
             <p className="mt-6 text-neutral-400 max-w-sm text-lg leading-relaxed">
                A selection of applications focused on AI integration, privacy, and real-time data processing.
             </p>
          </div>

          {/* Project Cards Loop */}
          {projects.map((project) => (
            <motion.a 
              key={project.id}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              
              className="group relative h-[400px] w-[350px] md:h-[600px] md:w-[500px] overflow-hidden bg-neutral-900 border border-white/10 shrink-0 cursor-pointer block"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                style={{ backgroundImage: `url(${project.img})` }}
              >
                <div className="absolute inset-0 bg-neutral-950/40 group-hover:bg-neutral-950/0 transition-colors duration-500" />
              </div>

              <div className="absolute inset-0 p-8 flex flex-col justify-between bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-90">
                <div className="flex justify-between items-start">
                  <span className="text-white font-mono text-xl md:text-3xl font-bold">0{project.id}</span>
                  <span className="px-3 py-1 border border-white/20 rounded-full text-xs font-mono uppercase tracking-widest text-white/80 bg-black/50 backdrop-blur-md">
                    {project.category}
                  </span>
                </div>
                
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-3xl md:text-5xl font-black text-white uppercase mb-4 leading-none">
                    {project.title}
                  </h4>
                  <p className="text-neutral-300 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {project.description}
                  </p>
                </div>
              </div>
            </motion.a>
          ))}

          {/* 5th Card: View All */}
          <Link
            to="/projects"
            className="group relative h-[400px] w-[350px] md:h-[600px] md:w-[400px] bg-white hover:bg-emerald-400 transition-colors duration-500 shrink-0 flex items-center justify-center cursor-pointer"
          >
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.5 }}
               className="text-center relative z-10 p-8"
            >
              <h4 className="text-4xl md:text-6xl font-black text-neutral-950 uppercase leading-none mb-4 group-hover:text-white transition-colors">
                View All <br /> Works
              </h4>
              <div className="inline-flex items-center gap-2 border-b-2 border-neutral-950 group-hover:border-white pb-1 transition-colors">
                <span className="text-neutral-950 font-bold font-mono tracking-widest uppercase group-hover:text-white">
                  Open Archive
                </span>
                <svg className="w-5 h-5 text-neutral-950 group-hover:text-white transform group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          </Link>

        </motion.div>
      </div>
    </section>
  );
};

export default SelectedWorks;