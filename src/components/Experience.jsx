import React from "react";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "AI + ML Developer",
    company: "CrispRoot AI Platform | IIT ROPAR",
    period: "May 2025 – July 2025",
    description: [
      "Engineered an AI-driven chatbot with >90% intent recognition accuracy using Rasa, TensorFlow, and Flask.",
      "Improved diagnostic accuracy for livestock & plant disease prediction by 15%, reducing crop loss with 90% model accuracy."
    ]
  },
  {
    role: "Summer Research Intern",
    company: "Vellore Institute of Technology",
    period: "May 2025 – July 2025",
    description: [
      "Pioneered a hybrid AI system for real-time edge traffic control, achieving >50% reduction in vehicle waiting time.",
      "Optimized model architecture to reduce memory footprint by approximately 45% for resource-constrained devices."
    ]
  }
];

const education = [
  {
    degree: "B.Tech Computer Science (AI & ML)",
    school: "Vellore Institute of Technology – Chennai",
    period: "Expected 2027",
    score: "CGPA: 9.10"
  },
  {
    degree: "CBSE 12th — Computer Science",
    school: "Bhavan’s Vidya Mandir, Girinagar",
    period: "2023",
    score: "95%"
  },
  {
    degree: "CBSE 10th",
    school: "Bhavan’s Vidya Mandir, Girinagar",
    period: "2021",
    score: "98.14%"
  }
];

const Experience = () => {
  return (
    <section className="py-24 bg-neutral-950 relative overflow-hidden" id="experience">
      
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-emerald-400 font-mono text-sm tracking-widest uppercase mb-4"
          >
            // Career_History
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter"
          >
            Experience <span className="text-neutral-600">&</span> Education
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* --- LEFT COLUMN: WORK EXPERIENCE --- */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-2 w-2 bg-emerald-500 rounded-full animate-pulse" />
              <h4 className="text-xl font-bold text-white uppercase tracking-wide">Work Logs</h4>
            </div>

            <div className="space-y-12 relative border-l border-white/10 pl-8 ml-3">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border border-white/20 bg-neutral-950 group-hover:border-emerald-500 group-hover:bg-emerald-500/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-white group-hover:bg-emerald-400" />
                  </span>

                  {/* Content Card */}
                  <div className="flex flex-col gap-2">
                    <h5 className="text-2xl font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors">
                      {exp.role}
                    </h5>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm font-mono text-neutral-400 mb-2">
                      <span>{exp.company}</span>
                      <span className="text-neutral-600">|</span>
                      <span className="text-emerald-500/80">{exp.period}</span>
                    </div>
                    <ul className="list-disc list-outside ml-4 space-y-2">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-neutral-400 text-sm leading-relaxed pl-1">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* --- RIGHT COLUMN: EDUCATION --- */}
          <div>
             <div className="flex items-center gap-3 mb-8">
              <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse" />
              <h4 className="text-xl font-bold text-white uppercase tracking-wide">Academic Records</h4>
            </div>

            <div className="space-y-10 relative border-l border-white/10 pl-8 ml-3">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.2 }} // Slight delay after experience
                  className="relative group"
                >
                  {/* Timeline Dot */}
                  <span className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border border-white/20 bg-neutral-950 group-hover:border-blue-500 group-hover:bg-blue-500/20 transition-colors duration-300 flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-white group-hover:bg-blue-400" />
                  </span>

                  {/* Content Card */}
                  <div className="p-6 bg-neutral-900/30 border border-white/5 hover:border-white/10 transition-colors rounded-sm">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="text-lg font-bold text-white">{edu.degree}</h5>
                      <span className="px-2 py-1 bg-white/5 rounded text-xs font-mono text-emerald-400 font-bold border border-emerald-500/20">
                        {edu.score}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-sm mb-1">{edu.school}</p>
                    <p className="text-neutral-500 text-xs font-mono">{edu.period}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Experience;