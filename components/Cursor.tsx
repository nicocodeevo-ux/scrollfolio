
import React, { useEffect, useRef, useState } from 'react';

const Cursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor || !window.gsap) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (window.gsap) {
        window.gsap.to(cursor, {
          x: e.clientX - 25,
          y: e.clientY - 25,
          duration: 0.1,
          ease: "power2.out"
        });
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.classList.contains('cursor-pointer') ||
        target.closest('a') ||
        target.closest('button') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA'
      ) {
        setIsHovering(true);
        if (window.gsap) {
          window.gsap.to(cursor, {
            scale: 1.3,
            duration: 0.2,
            ease: "back.out(1.7)"
          });
        }
      } else {
        setIsHovering(false);
        if (window.gsap) {
          window.gsap.to(cursor, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <>
      {/* Main Lighting Effect - Large Area Light */}
      <div 
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          transform: 'translate(0, 0)',
          width: isHovering ? '400px' : '300px',
          height: isHovering ? '400px' : '300px',
          background: isHovering 
            ? 'radial-gradient(circle, rgba(255,255,255,0.12) 0%, rgba(255,245,200,0.08) 20%, rgba(255,220,150,0.04) 40%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,245,200,0.05) 20%, rgba(255,220,150,0.02) 40%, transparent 70%)',
          filter: 'blur(30px)',
          opacity: 1,
          mixBlendMode: 'screen'
        }}
        ref={(el) => {
          if (el && window.gsap) {
            const cursorX = window.gsap.getProperty(cursorRef.current, "x") as number;
            const cursorY = window.gsap.getProperty(cursorRef.current, "y") as number;
            const size = isHovering ? 400 : 300;
            window.gsap.set(el, {
              x: cursorX + 25 - size/2,
              y: cursorY + 25 - size/2
            });
          }
        }}
      />

      {/* Secondary Light - Medium Glow */}
      <div 
        className="fixed top-0 left-0 z-[9997] pointer-events-none"
        style={{
          transform: 'translate(0, 0)',
          width: isHovering ? '250px' : '200px',
          height: isHovering ? '250px' : '200px',
          background: isHovering 
            ? 'radial-gradient(circle, rgba(255,200,100,0.15) 0%, rgba(255,180,80,0.08) 30%, transparent 70%)'
            : 'radial-gradient(circle, rgba(255,200,100,0.10) 0%, rgba(255,180,80,0.05) 30%, transparent 70%)',
          filter: 'blur(15px)',
          opacity: 0.9,
          mixBlendMode: 'screen'
        }}
        ref={(el) => {
          if (el && window.gsap) {
            const cursorX = window.gsap.getProperty(cursorRef.current, "x") as number;
            const cursorY = window.gsap.getProperty(cursorRef.current, "y") as number;
            const size = isHovering ? 250 : 200;
            window.gsap.set(el, {
              x: cursorX + 25 - size/2,
              y: cursorY + 25 - size/2
            });
          }
        }}
      />

      {/* Torch Cursor - Small Visual Indicator */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ transform: 'translate(0, 0)' }}
      >
        {/* Small torch indicator */}
        <div className="relative">
          {/* Handle */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-gradient-to-b from-amber-800 to-amber-950 rounded-b-sm"
            style={{ 
              boxShadow: isHovering 
                ? '0 0 10px rgba(255, 200, 100, 0.8)' 
                : '0 0 5px rgba(255, 200, 100, 0.5)'
            }}
          />
          
          {/* Torch head with light */}
          <div className="relative w-6 h-6">
            {/* Metal head */}
            <div 
              className="absolute inset-0 bg-gradient-to-b from-gray-700 to-gray-900 rounded-full"
              style={{
                boxShadow: isHovering
                  ? '0 0 15px rgba(255, 200, 100, 0.9)'
                  : '0 0 10px rgba(255, 200, 100, 0.6)'
              }}
            />
            
            {/* Light source */}
            <div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-4 bg-gradient-to-t from-yellow-200 via-yellow-100 to-white rounded-full"
              style={{
                filter: 'blur(3px)',
                opacity: isHovering ? 1 : 0.8,
                boxShadow: isHovering
                  ? '0 0 20px rgba(255, 255, 200, 1), 0 0 40px rgba(255, 200, 100, 0.8)'
                  : '0 0 15px rgba(255, 255, 200, 0.8), 0 0 30px rgba(255, 200, 100, 0.6)',
                animation: 'lightPulse 2s ease-in-out infinite'
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cursor;
