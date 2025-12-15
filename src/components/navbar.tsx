import React, { useState } from 'react';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'EXPERIENCES', href: '#experience' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'COLLAB', href: '#collab' },
  ];

  return (
    // 1. Main Container
    // Matches .padding-global (padding-top: 1rem, padding-bottom: 1rem)
    // Kept the glass effect (bg-black/20 backdrop-blur-md) you liked
    <nav className="fixed w-full z-50 top-0 start-0 py-4 bg-black/20 backdrop-blur-md border-none">
      
      



      {/* 2. Content Wrapper
          Matches .navbar_content (justify-between, align-center) 
          + .padding-global (horizontal padding) */}
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="/" className="text-white font-bold text-3xl italic tracking-tighter hover:opacity-80 transition-opacity">
            AM
          </a>
        </div>

        {/* 3. Navigation List
            Matches .navbar_list:
            - gap-16 (4rem / 64px spacing)
            - flex, justify-center, items-center
        */}
        <div className="hidden md:flex flex-1 justify-center items-center gap-16">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              // Matches .w-nav-link + a tag:
              // - p-5 (20px padding)
              // - font-mono (Geist Mono)
              // - text-xs, font-medium, uppercase
              className="font-mono text-xs font-medium uppercase text-neutral-300 hover:text-white p-5 transition-colors duration-300 tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* 4. Contact / Menu Button Wrapper */}
        <div className="flex items-center">
          <a
            href="#contact"
            className="hidden sm:block font-mono text-xs font-medium uppercase bg-neutral-900 hover:bg-neutral-800 text-white px-6 py-2 rounded transition-all duration-300"
          >
            Contact
          </a>
          
          {/* Mobile Hamburger */}
          <div className="md:hidden ml-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-neutral-300 hover:text-white focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/90 backdrop-blur-xl absolute top-full left-0 w-full">
          <div className="flex flex-col items-center py-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-mono text-xs font-medium uppercase text-neutral-300 hover:text-white py-2"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;