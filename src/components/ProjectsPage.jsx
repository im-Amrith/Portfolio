import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from 'react-router-dom';

// --- 1. Project Data ---
const allProjects = [
  {
    id: 1,
    title: "DISEASE_DETECTOR",
    category: "AI/ML",
    tech: ["Python", "CNN", "TensorFlow"],
    description: "AI-powered livestock disease diagnostics using MobileNetV2 and Flask. Featuring a high-contrast Modern Brutalist UI for rapid, on-site skin condition analysis.",
    img: "/animal.png",
    link: "https://github.com/im-Amrith/DISEASE_DETECTOR"
  },
  {
    id: 2,
    title: "DriveGuard",
    category: "AI/ML",
    tech: ["TensorFlow.js", "Python", "Computer Vision"],
    description: "An intelligent driver safety monitoring system that uses AI to detect drowsiness and unsafe driving behaviors in real-time.",
    img: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    id: 3,
    title: "RoadMap0",
    category: "Web Dev",
    tech: ["React", "Node.js", "Gemini"],
    description: "An all-in-one AI-powered platform designed to accelerate your career growth. ",
    img: "roadmap.png",
    link: "https://roadmap0-iota.vercel.app"
  },
  {
    id: 4,
    title: "Optimax",
    category: "Productivity",
    tech: ["Gemini API", "React", "Node.js"],
    description: "Rod Cutting visualization tool to help students",
    img: "/rod.png",
    link: "#"
  },
  {
    id: 5,
    title: "CREWER",
    category: "AI/ML",
    tech: ["Streamlit", "Ai-Agents", "CrewAi"],
    description: "A modular, production-ready multi-agent application built with CrewAI, Google Gemini, and Streamlit. Orchestrates autonomous crews for Job Search, Content Creation, and Customer Support.",
    img: "/crew.png",
    link: "https://crewer-01.streamlit.app"
  },
  {
    id: 6,
    title: "3DFLOW",
    category: "Web Dev",
    tech: ["React", "Computer Vision", "Node.js"],
    description: "3DFlow is a research-oriented repository for estimating dense 3D motion (scene flow) and per-frame depth from stereo or multi-view video",
    img: "/sphere.png",
    link: "https://3dflow-chi.vercel.app/"
  },
  {
    id: 7,
    title: "RAG-VISUALISER",
    category: "Web Dev",
    tech: ["OAuth 2.0", "JWT", "Node.js"],
    description: "Interactive educational tool for visualizing Retrieval-Augmented Generation (RAG) pipelines. Features real-time chunking, 2D vector space mapping, and transparent prompt logic. ",
    img: "/rag2.jpg",
    link: "https://rag-edu-visualizer.vercel.app/"
  },
  {
    id: 8,
    title: "REEL2NOTE",
    category: "Security",
    tech: ["local-llm", "JWT", "Ai-summarizer"],
    description: "AI-powered study companion. Convert social media content and PDFs into notes and quizzes using Local LLMs. 100% Privacy-focused and Free.",
    img: "/reel.png",
    link: "https://reel2note.vercel.app/"
  },
  {
    id: 9,
    title: "LANE DETECTION",
    category: "AI/ML",
    tech: ["FCN", "Machine Learning", "Python"],
    description: "Lane Detection Using Fully Convolutional Neural Networks.automated lane detection in road scenes using a fully convolutional neural network (FCN).",
    img: "/lane.png",
    link: "https://github.com/im-Amrith/Lane-detection"
  },
  {
    id: 10,
    title: "LIFE RPG OS",
    category: "Web Dev",
    tech: ["Firebase", "React", "TypeScript"],
    description: "A gamified productivity OS for students built with React & Firebase. Turn tasks into quests, earn XP, buy real-life rewards in the Shop, and track your academic progress in an RPG-style interface.",
    img: "/life-rpg.jpg",
    link: "https://life-rpg-alpha.vercel.app"
  },
  {
    id: 11,
    title: "GITSOULS",
    category: "Productivity",
    tech: ["Electron", "JavaScript","Powershell"],
    description: "GitSouls is a PowerShell integration that turns every git push into a Dark Souls / Elden Ring victory event. When your push is successful, a native overlay appears on your screen with the iconic 'Victory' sound and aesthetic.",
    img: "/gitsouls.png",
    link: "https://github.com/im-Amrith/git-souls"
  },
  {
    id: 12,
    title: "ESOULS",
    category: "Browser Extension",
    tech: ["JavaScript"],
    description: "This is a Chrome Extension that brings the satisfaction of a Dark Souls victory to your inbox. Whenever you send an email on Gmail, it displays a 'EMAIL SENT' victory screen overlay accompanied by a sound effect.",
    img: "/esouls.png",
    link: "https://github.com/im-Amrith/souls-email"
  },,
  {
    id: 13,
    title: "VANTAGE",
    category: "Web Dev",
    tech: ["JavaScript","Python","GROQ"],
    description: "Vantage is not just a mock interview tool, it is a full-lifecycle career acceleration platform. Designed with a 'Mission Control' aesthetic, it leverages Computer Vision, RAG, and Real-time Audio processing to help engineers master every stage of the job hunt—from resume optimization to salary negotiation.",
    img: "/vantage.png",
    link: "https://github.com/im-Amrith/Vantage"
  }
];


const categories = ["All", "AI/ML", "Web Dev", "Security", "Productivity","Browser Extension"];

const ProjectsPage = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter logic
  const filteredProjects = activeCategory === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-neutral-950 pt-12 pb-20 px-6">
      
      {/* --- Header Section --- */}
      <div className="max-w-7xl mx-auto mb-10">
            <Link to="/#projects" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors uppercase font-mono text-xs tracking-widest">
            <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
            Back to Home
            </Link>
        </div>
      <div className="max-w-7xl mx-auto mb-20">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter mb-8"
        >
          Project <br/>
          <span className="text-neutral-800">Archive</span>
        </motion.h1>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-4 md:gap-8 border-b border-white/10 pb-8">
          {categories.map((cat, i) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-sm font-mono uppercase tracking-widest transition-colors duration-300 relative group ${
                activeCategory === cat ? "text-emerald-400" : "text-neutral-500 hover:text-white"
              }`}
            >
              <span className="relative z-10">{cat}</span>
              {activeCategory === cat && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute -bottom-9 left-0 right-0 h-0.5 bg-emerald-400" 
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* --- Projects Grid --- */}
      <motion.div 
        layout 
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="group relative bg-neutral-900 border border-white/5 overflow-hidden hover:border-emerald-500/50 transition-colors duration-500"
            >
              {/* 1. Image Area */}
              <div className="relative h-[300px] md:h-[400px] overflow-hidden">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${project.img})` }}
                />
                <div className="absolute inset-0 bg-neutral-950/20 group-hover:bg-neutral-950/0 transition-colors duration-500" />
                
                {/* Tech Tags Overlay */}
                <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                  {project.tech.map((t, i) => (
                    <span 
                      key={i} 
                      className="bg-black/80 backdrop-blur text-white/70 text-[10px] font-mono uppercase px-2 py-1 border border-white/10"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* 2. Content Area */}
              <div className="p-8 relative z-10 bg-neutral-900">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white uppercase mb-1 group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    <span className="text-neutral-500 text-xs font-mono tracking-widest uppercase">
                      // {project.category}
                    </span>
                  </div>
                  
                  {/* --- CLICKABLE ARROW BUTTON --- */}
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="h-10 w-10 border border-white/10 rounded-full flex items-center justify-center group-hover:bg-emerald-400 group-hover:text-black group-hover:border-emerald-400 transition-all duration-300 cursor-pointer"
                  >
                    <svg className="w-4 h-4 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                  
                </div>

                <p className="text-neutral-400 text-sm leading-relaxed max-w-md group-hover:text-neutral-300 transition-colors">
                  {project.description}
                </p>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default ProjectsPage;