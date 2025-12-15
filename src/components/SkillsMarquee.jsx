import React from "react";
import { motion } from "framer-motion";

const SkillsMarquee = () => {
  // --- 1. Organized Data (No Duplicates) ---
  const rows = [
    // Row 1: Languages & Core Engineering
    [
      "Python", "Java", "C++", "JavaScript (ES6+)", "TypeScript", 
      "SQL", "NoSQL", "C# (.Net)", "Swift", "Kotlin", "Object-Oriented Design"
    ],
    // Row 2: AI, ML & Data Science
    [
      "TensorFlow", "PyTorch", "OpenCV", "YOLO", "NLP", 
      "RAG Systems", "LLMs", "LangChain", "Generative AI", 
      "BERT", "Scikit-learn", "Pandas", "Vector Databases"
    ],
    // Row 3: Security, Cloud & Tools
    [
      "AWS", "Docker", "Kubernetes", "OWASP Top 10", "Burp Suite", 
      "Metasploit", "AppSec", "Penetration Testing", "Firebase", 
      "CI/CD", "Git", "Postman", "Spring Boot", "React & Next.js"
    ]
  ];

  return (
    <section className="py-20 bg-neutral-950 border-b border-white/5 overflow-hidden">
      
      {/* Section Label */}
      {/* <div className="max-w-7xl mx-auto px-6 mb-12">
        <h3 className="text-emerald-400 font-mono text-sm tracking-widest uppercase">
          // Technical_Arsenal
        </h3>
      </div> */}

      <div className="flex flex-col gap-16">
        {rows.map((skills, rowIndex) => (
          <div key={rowIndex} className="flex relative overflow-hidden select-none">
            
            {/* Gradient Masks for smooth fade in/out at edges */}
            <div className="absolute left-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-r from-neutral-950 to-transparent"></div>
            <div className="absolute right-0 top-0 bottom-0 w-20 z-10 bg-gradient-to-l from-neutral-950 to-transparent"></div>

            <motion.div
              className="flex gap-4 items-center whitespace-nowrap"
              // Alternating directions: Rows 0 & 2 go Left, Row 1 goes Right
              animate={{ x: rowIndex % 2 === 0 ? "-50%" : "0%" }}
              initial={{ x: rowIndex % 2 === 0 ? "0%" : "-50%" }} 
              transition={{
                ease: "linear",
                duration: 40 + rowIndex * 5, // Varied speeds for organic feel
                repeat: Infinity,
              }}
            >
              {/* Repeat list multiple times to ensure seamless loop */}
              {[...Array(4)].map((_, i) => (
                <React.Fragment key={i}>
                  {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <span 
                        className="text-neutral-400 text-4xl md:text-6xl font-sans font-bold uppercase tracking-tighter hover:text-white transition-colors cursor-default"
                      >
                        {skill}
                      </span>
                      {/* Separator Dot */}
                      <span className="h-2 w-2 bg-neutral-800 rounded-full mx-4" />
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsMarquee;