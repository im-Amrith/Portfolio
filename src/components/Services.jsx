import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  {
    num: "01",
    title: "AI & Machine Learning",
    description: "Designing intelligent systems using TensorFlow, PyTorch, and LLMs to solve complex data problems.",
    img: "/ai3.png"
  },
  {
    num: "02",
    title: "Full Stack Engineering",
    description: "Building scalable, high-performance web applications with React, Node.js, and modern UI architectures.",
    img: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=2000&auto=format&fit=crop"
  },
  {
    num: "03",
    title: "Cloud & DevOps",
    description: "Deploying robust infrastructure on AWS and Docker, ensuring 99.9% uptime and seamless CI/CD pipelines.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop"
  },
  {
    num: "04",
    title: "Cyber Security",
    description: "Implementing OWASP standards, penetration testing, and secure coding practices to protect digital assets.",
    img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2000&auto=format&fit=crop"
  }
];

const Services = () => {
  const [activeService, setActiveService] = useState(null);

  return (
    <section id="expertise" className="relative w-full min-h-screen bg-neutral-950 flex items-center justify-center overflow-hidden py-20">
      
      {/* 1. Background Image Layer */}
      {/* We map through all images and just change opacity for performance (better than mounting/unmounting) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-neutral-950 z-10 opacity-90 transition-opacity duration-500" 
             style={{ opacity: activeService !== null ? 0.3 : 1 }} // Dim background when an image is active
        />
        {services.map((service, index) => (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: activeService === index ? 1 : 0,
              scale: activeService === index ? 1 : 1.1 
            }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            style={{ backgroundImage: `url(${service.img})` }}
          >
             {/* Gradient Overlay to ensure text readability */}
             <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/50 to-neutral-950/30" />
          </motion.div>
        ))}
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10 max-w-7xl w-full px-6">
        
        {/* Section Header */}
        <div className="mb-16 border-b border-white/10 pb-4">
          <h2 className="text-emerald-400 font-mono text-sm tracking-widest uppercase">
            // Expertise_Modules
          </h2>
        </div>

        {/* The List */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <div 
              key={index}
              onMouseEnter={() => setActiveService(index)}
              onMouseLeave={() => setActiveService(null)}
              className="group relative border-b border-white/10 py-12 flex flex-col md:flex-row md:items-center justify-between transition-colors duration-300 hover:border-white/30 cursor-pointer"
            >
              
              {/* Left: Number & Title */}
              <div className="flex items-baseline gap-6 md:gap-12">
                <span className="text-neutral-600 font-mono text-xl md:text-2xl group-hover:text-emerald-400 transition-colors duration-300">
                  {service.num}
                </span>
                <h3 className="text-4xl md:text-6xl font-black text-neutral-400 uppercase tracking-tighter group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>
              </div>

              {/* Right: Description (Reveals/Highlights on hover) */}
              <div className="mt-4 md:mt-0 max-w-md md:text-right overflow-hidden">
                <p className="text-neutral-500 font-sans text-lg font-light leading-relaxed group-hover:text-neutral-200 transition-colors duration-300 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ease-out">
                  <span className="text-emerald-500 mr-2">*</span>
                  {service.description}
                </p>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;