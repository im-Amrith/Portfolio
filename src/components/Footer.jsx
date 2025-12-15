import React from "react";
import { Twitter, Github, Linkedin, Instagram, ArrowUpRight } from "lucide-react";

const Footer = () => {
  // 1. Social Media Configuration
  const socialLinks = [
    { 
      id: 'github', 
      icon: Github, 
      href: "https://github.com/im-Amrith", // Update this
      label: "GitHub" 
    },
    { 
      id: 'linkedin', 
      icon: Linkedin, 
      href: "https://www.linkedin.com/in/amrithesh-s-menon-1a2b86277/", // Update this
      label: "LinkedIn" 
    },
    { 
      id: 'instagram', 
      icon: Instagram, 
      href: "https://www.instagram.com/amrith_23/", // Update this
      label: "Instagram" 
    },
  ];

  // 2. Navigation Links
  const mainPages = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '#about' },
    { name: 'Our Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '/contact' },
  ];

  const utilityPages = [
    { name: '404 Not Found', href: '/404' },
    { name: 'Styleguide', href: '/styleguide' },
    { name: 'Licenses', href: '/licenses' },
    { name: 'Changelog', href: '/changelog' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-black text-white overflow-hidden pt-24 pb-12 border-t border-white/10">
      
      {/* Background Smoke */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-black opacity-80 z-10" />
        <img 
          src="https://images.unsplash.com/photo-1536514498073-50e69d39c6cf?q=80&w=2071&auto=format&fit=crop" 
          alt="Smoke Background" 
          className="w-full h-full object-cover grayscale opacity-60" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          {/* Col 1: Brand & Socials */}
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-2xl font-bold tracking-tight font-sans text-white mb-1">
                AM.Dev
              </h2>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-neutral-500 text-sm font-sans">Connect with me:</span>
              <div className="flex gap-3">
                {socialLinks.map(({ id, icon: Icon, href, label }) => (
                  <a 
                    key={id} 
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="h-10 w-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 group"
                  >
                    <Icon size={18} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Pages */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-medium font-sans text-white">Pages</h3>
            <div className="flex flex-col gap-3">
              {mainPages.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-neutral-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-1 group"
                >
                  <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 3: Utility Pages */}
          <div className="flex flex-col gap-6">
            <h3 className="text-lg font-medium font-sans text-white">Utility Pages</h3>
            <div className="flex flex-col gap-3">
              {utilityPages.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href} 
                  className="text-neutral-400 hover:text-white transition-colors text-sm font-sans flex items-center gap-1 group"
                >
                   <span className="group-hover:translate-x-1 transition-transform duration-300">{item.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Col 4: Contact Info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-neutral-500 text-sm font-sans">Phone:</h3>
              <a 
                href="tel:+919961120659" 
                className="text-white text-base font-sans hover:text-emerald-400 transition-colors flex items-center gap-2 group"
              >
                +91 996112 0659
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-neutral-500 text-sm font-sans">Email:</h3>
              <a 
                href="mailto:amrithesh23@gmail.com" 
                className="text-white text-base font-sans hover:text-emerald-400 transition-colors flex items-center gap-2 group"
              >
                amrithesh23@gmail.com
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-neutral-600 text-xs font-sans">
            © {currentYear} AM.Dev. All rights reserved.
          </p>
          <div className="flex gap-6">
             <a href="/privacy" className="text-neutral-600 hover:text-white text-xs font-sans transition-colors">Privacy Policy</a>
             <a href="/terms" className="text-neutral-600 hover:text-white text-xs font-sans transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;