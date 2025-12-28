import React, { useEffect, useState, useRef } from 'react';

const TerminalText: React.FC = () => {
  const [textLines, setTextLines] = useState<string[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Real code snippets from App.tsx
    const appCodeSnippets = [
      'import React, { useState, useEffect } from \'react\';',
      'import Cursor from \'./components/Cursor\';',
      'import Hero from \'./components/Hero\';',
      'import Section from \'./components/Section\';',
      'import SkillsParticles from \'./components/SkillsParticles\';',
      'import TerminalText from \'./components/TerminalText\';',
      'const App: React.FC = () => {',
      'const [activeSection, setActiveSection] = useState(\'hero\');',
      'const [formData, setFormData] = useState({ name: \'\', email: \'\', message: \'\' });',
      'useEffect(() => {',
      'const handleScroll = () => {',
      'const sections = [\'hero\', \'about\', \'skills\', \'experience\', \'contact\'];',
      'const scrollPos = window.scrollY + window.innerHeight / 2;',
      'for (const section of sections) {',
      'const element = document.getElementById(section);',
      'if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {',
      'setActiveSection(section);',
      'break;',
      '}',
      '}',
      '};',
      'window.addEventListener(\'scroll\', handleScroll);',
      'return () => window.removeEventListener(\'scroll\', handleScroll);',
      '}, []);',
      'const handleContactSubmit = (e: React.FormEvent) => {',
      'e.preventDefault();',
      'const subject = encodeURIComponent(`Inquiry from Portfolio - ${formData.name}`);',
      'const body = encodeURIComponent(`Name: ${formData.name}\\nEmail: ${formData.email}\\n\\nMessage:\\n${formData.message}`);',
      'window.location.href = `mailto:nico.code.evo@gmail.com?subject=${subject}&body=${body}`;',
      '};',
      'return (',
      '<div className="relative min-h-screen selection:bg-[#ff7a22] selection:text-white">',
      '<Cursor />',
      '<TerminalText />',
      '<nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5 apple-glass bg-black/50 border-b border-white/5">',
      '<div className="font-mono font-bold text-xl tracking-tighter hover:scale-105 transition-transform cursor-none text-white drop-shadow-[0_0_10px_rgba(255,122,34,0.3)]">',
      'nico_codeevo',
      '</div>',
      '</nav>',
      '<main className="relative z-10 pt-20">',
      '<Hero />',
      '<Section id="about" title="Nico Kuehn">',
      '<div className="flex flex-col md:flex-row gap-6">',
      '<div className="metallic-card rounded-lg relative overflow-hidden p-12 md:p-16 transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1">',
      '<div className="space-y-6">',
      '<p className="text-lg text-white/80 leading-relaxed font-light">',
      'Specialized in <span className="text-[#ff7a22] font-semibold underline underline-offset-8 decoration-white/10">Python Backend Development</span>',
      'with deep expertise in Django framework, REST APIs, and modern database management.',
      '</p>',
      '</div>',
      '</div>',
      '</div>',
      '</Section>',
      '</main>',
      '</div>',
      '};',
      'export default App;'
    ];

    const generateRandomLine = () => {
      const snippet = appCodeSnippets[Math.floor(Math.random() * appCodeSnippets.length)];
      
      if (Math.random() > 0.5) {
        const words = snippet.split(' ');
        const truncateAt = Math.floor(Math.random() * words.length) + 1;
        return words.slice(0, truncateAt).join(' ');
      }
      
      return snippet;
    };

    // Generate initial lines
    const initialLines = Array.from({ length: 100 }, generateRandomLine);
    setTextLines(initialLines);

    // Add new lines periodically
    const interval = setInterval(() => {
      setTextLines(prev => {
        const newLines = [...prev, generateRandomLine()];
        return newLines; // Remove the slice limit to make it truly permanent
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // GSAP continuous scrolling animation
    const scrollAnimation = () => {
      if (window.gsap) {
        gsap.to(scrollContainer, {
          y: -scrollContainer.scrollHeight,
          duration: 30,
          ease: "none",
          repeat: -1,
          onRepeat: function() {
            gsap.set(scrollContainer, { y: 0 });
          }
        });
      }
    };

    // Start animation when GSAP is available
    if (window.gsap) {
      scrollAnimation();
    } else {
      // Wait for GSAP to load
      const checkGSAP = setInterval(() => {
        if (window.gsap) {
          clearInterval(checkGSAP);
          scrollAnimation();
        }
      }, 100);
    }

    return () => {
      if (window.gsap && scrollContainer) {
        gsap.killTweensOf(scrollContainer);
      }
    };
  }, [textLines]);

  return (
    <div className="fixed right-4 top-0 h-full w-96 overflow-hidden pointer-events-none z-50">
      <div className="relative h-full">
        <div className="relative h-full overflow-hidden">
          <div 
            ref={scrollContainerRef}
            className="absolute inset-0 font-mono text-[18px] leading-[21px]"
            style={{
              color: '#ff7a22',
              textShadow: '0 0 8px rgba(255,122,34,0.8), 0 0 16px rgba(255,122,34,0.4), 0 0 24px rgba(255,255,255,0.2)'
            }}
          >
            {/* Duplicate content for seamless looping */}
            {[...textLines, ...textLines].map((line, index) => (
              <div 
                key={index} 
                className="whitespace-nowrap overflow-hidden text-ellipsis"
                style={{
                  opacity: 1
                }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TerminalText;
