
import React, { useEffect, useRef, useState } from 'react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [showScrollMessage, setShowScrollMessage] = useState(false);

  useEffect(() => {
    if (!heroRef.current || !window.gsap) return;

    const ctx = window.gsap.context(() => {
      // Hero animations removed - no fade-in

      // Scroll indicator animation
      const scrollIndicator = heroRef.current?.querySelector('.absolute.bottom-12');
      if (scrollIndicator) {
        window.gsap.to(scrollIndicator, {
          y: 20,
          opacity: 0.5,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      }
    }, heroRef);

    // Show scroll message after 1.5 seconds
    const messageTimer = setTimeout(() => {
      setShowScrollMessage(true);
    }, 1500);

    // Don't revert context to prevent elements from disappearing
    return () => {
      // ctx.revert();
      clearTimeout(messageTimer);
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} className="min-h-screen flex flex-col justify-center px-8 md:px-24">
      <div className="max-w-5xl">
        <span className="font-mono text-[#ff7a22] text-xs md:text-sm tracking-[0.4em] uppercase mb-6 block font-bold">
          Nico Kuehn // Python System Developer
        </span>
        
        <h1 
          className="text-[clamp(2rem,6vw,4rem)] font-extrabold leading-[0.95] tracking-tighter mb-10"
          style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
        >
          Architecting<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#ff7a22] drop-shadow-[0_0_20px_rgba(255,122,34,0.3)]">Complex Logic.</span>
        </h1>

        <p className="max-w-2xl text-white/60 text-lg md:text-xl font-light leading-relaxed mb-12">
          Specializing in Django, REST APIs, and robust data systems. I build the stable backend infrastructure that modern high-performance applications demand.
        </p>

        <div className="flex flex-wrap gap-6">
          <a 
            href="#experience" 
            className="inline-flex items-center px-12 py-5 bg-white text-black font-mono text-[11px] uppercase tracking-[0.2em] font-extrabold rounded-2xl hover:bg-[#ff7a22] hover:text-white transition-all duration-300 group shadow-2xl relative overflow-hidden"
          >
            <span className="relative z-10">Professional Timeline</span>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
            <svg className="ml-4 w-5 h-5 relative z-10 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a 
            href="#contact" 
            className="inline-flex items-center px-12 py-5 bg-black/40 border border-white/10 text-white font-mono text-[11px] uppercase tracking-[0.2em] font-bold rounded-2xl hover:border-[#ff7a22] hover:text-[#ff7a22] transition-all duration-300 group apple-glass"
          >
            Initiate Contact
          </a>
        </div>
      </div>

      {/* Scroll message that appears after 1.5 seconds */}
      {showScrollMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <div className="apple-glass bg-black/60 border border-white/10 px-6 py-3 rounded-full">
            <p className="font-mono text-[10px] text-[#ff7a22] tracking-wider uppercase animate-pulse">
              scroll down to iterate ...
            </p>
          </div>
        </div>
      )}

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-20">
        <span className="font-mono text-[8px] tracking-[0.5em] uppercase font-bold">System Scroll</span>
        <div className="w-[1px] h-16 bg-[#ff7a22]"></div>
      </div>
    </section>
  );
};

export default Hero;
