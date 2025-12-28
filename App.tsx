
import React, { useState, useEffect } from 'react';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import Section from './components/Section';
import SkillsParticles from './components/SkillsParticles';
import TerminalText from './components/TerminalText';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'experience', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Inquiry from Portfolio - ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:nico.code.evo@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative min-h-screen selection:bg-[#ff7a22] selection:text-white">
      <Cursor />
      
      <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-5 apple-glass bg-black/50 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 group">
            <svg 
              className="w-8 h-8 text-white/80 group-hover:text-[#ff7a22] transition-all duration-300 transform group-hover:rotate-12 group-hover:scale-110" 
              fill="currentColor" 
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="font-mono font-bold text-2xl tracking-tighter hover:scale-105 transition-transform cursor-none text-white drop-shadow-[0_0_10px_rgba(255,122,34,0.3)]" style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}>
              nicocodeevo-ux
            </span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-10 font-mono text-[8px] uppercase tracking-[3px]">
          {['about', 'skills', 'experience', 'contact'].map((item) => (
            <a 
              key={item} 
              href={`#${item}`} 
              className={`hover:text-[#ff7a22] transition-colors relative group ${activeSection === item ? 'text-[#ff7a22]' : 'text-white/60'}`}
            >
              {item}
              <span className={`absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#ff7a22] transition-all duration-300 group-hover:w-full ${activeSection === item ? 'w-full' : ''}`}></span>
            </a>
          ))}
        </div>
      </nav>

      <main className="relative z-10 pt-20">
        <Hero />
        
        <Section id="about" title="Nico Kuehn">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left: Video Card */}
            <div className="metallic-card rounded-lg relative overflow-hidden h-[350px] transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1">
              <div className="absolute inset-0 bg-[#ff7a22]/10 mix-blend-overlay z-10 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-[#1a1a1a] via-transparent to-transparent z-10"></div>
              <div className="relative w-full h-full transform-gpu perspective-1000">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover opacity-80 mix-blend-screen transform scale-105 group-hover:scale-110 transition-all duration-[2s]"
                >
                  <source src="/videocontent/Create_a_develeopers_202512270557_kgxsk.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none"></div>
              </div>
              <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                <span className="w-2 h-2 bg-[#ff7a22] rounded-full animate-ping"></span>
                <span className="font-mono text-[9px] text-[#ff7a22] tracking-widest uppercase bg-black/80 px-2 py-[2px] rounded depth-shadow">Dev_Creative</span>
              </div>
            </div>

            {/* Right: Text Card */}
            <div className="metallic-card rounded-lg relative overflow-hidden p-8 md:p-12 transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1 h-[350px]">
              <div className="h-full flex flex-col justify-center">
                <div className="p-6 apple-glass brushed-metal rounded-[2.5rem] border border-white/5 hover:border-[#ff7a22]/30 transition-all glossy-finish group">
                  <h3 className="font-mono text-[#ff7a22] mb-6 uppercase tracking-[0.3em] text-[11px] font-bold flex items-center gap-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff7a22] shadow-[0_0_10px_#ff7a22]"></span> About Me
                  </h3>
                  <div className="space-y-6">
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      Specialized in <span className="text-[#ff7a22] font-semibold">Python Backend Development</span> with deep expertise in Django framework, REST APIs, and modern database management.
                    </p>
                    <p className="text-sm text-white/80 leading-relaxed font-light">
                      Currently undergoing intensive full-time training at <strong className="text-white font-semibold">DCI (Digital Career Institute)</strong>, mastering backend architecture from the ground up. I blend technical precision with discipline learned from years of high-sensitivity security management.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-4">
                      {['Aue-Bad Schlema, DE', 'Remote Ready', 'German (Native)', 'English (Pro)'].map(tag => (
                        <span key={tag} className="px-4 py-2 bg-white/5 rounded-xl font-mono text-[10px] border border-white/10 apple-glass brushed-metal tracking-wider hover:bg-[#ff7a22]/10 transition-colors">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="skills" title="Technical Arsenal">
          <div className="flex flex-col gap-8">
            {/* First Row: Backend & Core Text and Video 1 - Same Size */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Backend & Core Text - Same Size as Video 1 */}
              <div className="metallic-card rounded-lg relative overflow-hidden p-8 md:p-12 transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1 h-[350px]">
                <div className="h-full flex flex-col justify-center">
                  <div className="p-6 apple-glass brushed-metal rounded-[2.5rem] border border-white/5 hover:border-[#ff7a22]/30 transition-all glossy-finish group">
                    <h3 className="font-mono text-[#ff7a22] mb-6 uppercase tracking-[0.3em] text-[11px] font-bold flex items-center gap-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff7a22] shadow-[0_0_10px_#ff7a22]"></span> Backend & Core
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {['Python', 'Django', 'FastAPI', 'PostgreSQL', 'REST APIs', 'Pandas', 'NumPy', 'Testing/Debugging'].map(skill => (
                        <span key={skill} className="px-4 py-2 bg-white/5 rounded-xl font-mono text-sm border border-white/10 apple-glass brushed-metal tracking-wider hover:bg-[#ff7a22]/10 transition-colors">{skill}</span>
                      ))}
                    </div>
                    <div className="mt-8 p-4 bg-black/60 rounded-3xl border border-white/5 font-mono text-sm text-white/30 shadow-inner group-hover:border-[#ff7a22]/20 transition-all">
                      <p className="mb-2 text-[#ff7a22]/60 font-bold tracking-tighter">ENVIRONMENT_VAR_CHECK</p>
                      <p className="opacity-80">&gt; sys.initialize_backend()</p>
                      <p className="opacity-80">&gt; Django.migrate(database=PostgreSQL)</p>
                      <p className="mt-2">&gt; Status: <span className="text-[#ff7a22] font-bold animate-pulse">OPTIMIZED</span></p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Video 1 */}
              <div className="metallic-card rounded-lg relative overflow-hidden h-[350px] transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1">
                <div className="absolute inset-0 bg-[#ff7a22]/10 mix-blend-overlay z-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#1a1a1a] via-transparent to-transparent z-10"></div>
                <div className="relative w-full h-full transform-gpu perspective-1000">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover opacity-80 mix-blend-screen transform scale-105 group-hover:scale-110 transition-all duration-[2s]"
                  >
                    <source src="/videocontent/Create_a_develeopers_202512270559_uce4f.webm" type="video/webm" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none"></div>
                </div>
                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                  <span className="w-2 h-2 bg-[#ff7a22] rounded-full animate-ping"></span>
                  <span className="font-mono text-[9px] text-[#ff7a22] tracking-widest uppercase bg-black/80 px-2 py-[2px] rounded depth-shadow">Backend_Visual</span>
                </div>
              </div>
            </div>

            {/* Second Row: Video 2 and Dev & Creative Text - Same Size */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Video 2 - Same Size as Dev & Creative Text */}
              <div className="metallic-card rounded-lg relative overflow-hidden h-[350px] transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1">
                <div className="absolute inset-0 bg-[#ff7a22]/10 mix-blend-overlay z-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#1a1a1a] via-transparent to-transparent z-10"></div>
                <div className="relative w-full h-full transform-gpu perspective-1000">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover opacity-80 mix-blend-screen transform scale-105 group-hover:scale-110 transition-all duration-[2s]"
                  >
                    <source src="/videocontent/Create_a_develeopers_202512270558_fbldu.webm" type="video/webm" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none"></div>
                </div>
                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                  <span className="w-2 h-2 bg-[#ff7a22] rounded-full animate-ping"></span>
                  <span className="font-mono text-[9px] text-[#ff7a22] tracking-widest uppercase bg-black/80 px-2 py-[2px] rounded depth-shadow">Creative_Flow</span>
                </div>
              </div>

              {/* Dev & Creative Text - Same Size as Video 2 */}
              <div className="metallic-card rounded-lg relative overflow-hidden p-8 md:p-12 transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1 h-[350px]">
                <div className="h-full flex flex-col justify-center">
                  <div className="p-6 apple-glass brushed-metal rounded-[2.5rem] border border-white/5 hover:border-[#ff7a22]/30 transition-all glossy-finish group h-full">
                    <h3 className="font-mono text-[#ff7a22] mb-6 uppercase tracking-[0.3em] text-[11px] font-bold flex items-center gap-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#ff7a22] shadow-[0_0_10px_#ff7a22]"></span> Dev & Creative
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {['Git & GitHub', 'CI/CD', 'Linux/Bash', 'JavaScript', 'Docker', 'AI Tools', 'Sound Design', 'Audio Prod.'].map(skill => (
                        <span key={skill} className="px-4 py-2 bg-white/5 rounded-xl font-mono text-sm border border-white/10 apple-glass brushed-metal tracking-wider hover:bg-[#ff7a22]/10 transition-colors">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="experience" title="Professional Timeline">
          <div className="flex flex-col gap-8">
            {/* First Row: Python Backend Developer Text and Video - Same Size */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Python Backend Developer Text - Left Side */}
              <div className="metallic-card rounded-lg relative overflow-hidden p-8 md:p-12 transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1 h-[350px]">
                <div className="h-full flex flex-col justify-center">
                  <div className="relative pl-12 border-l-2 border-[#ff7a22]/30 group">
                    <div className="absolute left-[-11px] top-0 w-5 h-5 bg-black border-2 border-[#ff7a22] rounded-full shadow-[0_0_20px_#ff7a22] group-hover:scale-125 transition-transform duration-500"></div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                      <h3 className="text-xl font-bold tracking-tight">Python Backend Developer</h3>
                      <span className="font-mono text-[10px] text-[#ff7a22] apple-glass px-4 py-2 rounded-full border border-[#ff7a22]/40 tracking-widest uppercase bg-[#ff7a22]/5">03/2025 — Present</span>
                    </div>
                    <p className="text-white/40 text-sm font-mono mb-6 flex items-center gap-3">
                      <svg className="w-5 h-5 text-[#ff7a22]/60" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-2.75-.174l-.154.018a5.5 5.5 0 01-1.458-5.148l.154.018a1.166 1.166 0 01.972.651zM9.25 11.83l2 1.143v4.102a8.969 8.969 0 00-2.75-.174l-.154.018a5.5 5.5 0 01-1.458-5.148l.154.018a1.166 1.166 0 01.972.651z" /></svg>
                      Digital Career Institute (DCI), Berlin
                    </p>
                    <p className="text-white/70 font-light text-sm leading-relaxed max-w-2xl bg-white/5 p-6 rounded-[2rem] border border-white/5 apple-glass">
                      Immersive specialization in architecture design, data flow optimization, and secure API engineering using the Python ecosystem.
                    </p>
                  </div>
                </div>
              </div>

              {/* Video - Right Side */}
              <div className="metallic-card rounded-lg relative overflow-hidden h-[350px] transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1">
                <div className="absolute inset-0 bg-[#ff7a22]/10 mix-blend-overlay z-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#1a1a1a] via-transparent to-transparent z-10"></div>
                <div className="relative w-full h-full transform-gpu perspective-1000">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover opacity-80 mix-blend-screen transform scale-105 group-hover:scale-110 transition-all duration-[2s]"
                  >
                    <source src="/videocontent/Create_a_develeopers_202512270559_ey02q.webm" type="video/webm" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none"></div>
                </div>
                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                  <span className="w-2 h-2 bg-[#ff7a22] rounded-full animate-ping"></span>
                  <span className="font-mono text-[9px] text-[#ff7a22] tracking-widest uppercase bg-black/80 px-2 py-[2px] rounded depth-shadow">Backend_Dev</span>
                </div>
              </div>
            </div>

            {/* Second Row: New Video and Second Part of Text - Same Size */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* New Video - Left Side */}
              <div className="metallic-card rounded-lg relative overflow-hidden h-[350px] transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1">
                <div className="absolute inset-0 bg-[#ff7a22]/10 mix-blend-overlay z-10 pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-[#1a1a1a] via-transparent to-transparent z-10"></div>
                <div className="relative w-full h-full transform-gpu perspective-1000">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline 
                    className="w-full h-full object-cover opacity-80 mix-blend-screen transform scale-105 group-hover:scale-110 transition-all duration-[2s]"
                  >
                    <source src="/videocontent/Create_a_developers_202512270810_l0gl1.webm" type="video/webm" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none"></div>
                </div>
                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                  <span className="w-2 h-2 bg-[#ff7a22] rounded-full animate-ping"></span>
                  <span className="font-mono text-[9px] text-[#ff7a22] tracking-widest uppercase bg-black/80 px-2 py-[2px] rounded depth-shadow">Security_Pro</span>
                </div>
              </div>

              {/* Second Part of Text - Right Side */}
              <div className="metallic-card rounded-lg relative overflow-hidden p-8 md:p-12 transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1 h-[350px]">
                <div className="h-full flex flex-col justify-center space-y-8">
                  <div className="relative pl-12 border-l-2 border-white/10 group">
                    <div className="absolute left-[-11px] top-0 w-5 h-5 bg-black border-2 border-white/20 rounded-full group-hover:border-[#ff7a22]/60 transition-colors duration-500"></div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                      <h3 className="text-lg font-bold tracking-tight text-white/80">Site Manager</h3>
                      <span className="font-mono text-[10px] text-white/30 apple-glass px-4 py-2 rounded-full border border-white/10 tracking-widest uppercase">2016 — 2017</span>
                    </div>
                    <p className="text-white/40 text-sm font-mono mb-4">Security Operations, Kassel</p>
                    <p className="text-white/50 font-light text-sm leading-relaxed max-w-2xl">
                      Command and control of operational protocols at high-sensitivity facilities. Expert in reliability and structured documentation.
                    </p>
                  </div>

                  <div className="relative pl-12 border-l-2 border-white/10 group">
                    <div className="absolute left-[-11px] top-0 w-5 h-5 bg-black border-2 border-white/20 rounded-full group-hover:border-[#ff7a22]/60 transition-colors duration-500"></div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                      <h3 className="text-lg font-bold tracking-tight text-white/80">Security Specialist</h3>
                      <span className="font-mono text-[10px] text-white/30 apple-glass px-4 py-2 rounded-full border border-white/10 tracking-widest uppercase">2011 — 2016</span>
                    </div>
                    <p className="text-white/40 text-sm font-mono mb-4">High-Sensitivity Sector, Munich</p>
                    <p className="text-white/50 font-light text-sm leading-relaxed max-w-2xl">
                      Rigorous adherence to military-grade safety organizational systems and administrative monitoring.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section id="contact" title="System Protocol">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Contact Form Card */}
            <div className="metallic-card rounded-lg relative overflow-hidden p-8 md:p-12 lg:p-16 transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1 min-h-[500px]">
              <div className="max-w-lg mx-auto text-center space-y-8">
                <div className="space-y-4">
                  <p className="text-white/90 font-light text-xl lg:text-2xl tracking-tight">
                    Initiate Secure Communication
                  </p>
                  <p className="font-mono text-[11px] lg:text-[12px] text-[#ff7a22] uppercase tracking-[0.5em] font-bold drop-shadow-[0_0_8px_rgba(255,122,34,0.3)]">Aue-Bad Schlema, Germany</p>
                </div>
                <form className="space-y-5 text-left" onSubmit={handleContactSubmit}>
                  <div className="relative group">
                    <input 
                      type="text" 
                      required
                      placeholder="Identification (Name)" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 lg:p-5 outline-none focus:border-[#ff7a22] focus:bg-black/70 transition-all font-light placeholder:text-white/10 apple-glass group-hover:border-white/20 depth-shadow text-sm"
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#ff7a22] transition-all duration-500 group-focus-within:w-[95%] opacity-70"></div>
                  </div>
                  <div className="relative group">
                    <input 
                      type="email" 
                      required
                      placeholder="Contact Channel (Email)" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 lg:p-5 outline-none focus:border-[#ff7a22] focus:bg-black/70 transition-all font-light placeholder:text-white/10 apple-glass group-hover:border-white/20 depth-shadow text-sm"
                    />
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#ff7a22] transition-all duration-500 group-focus-within:w-[95%] opacity-70"></div>
                  </div>
                  <div className="relative group">
                    <textarea 
                      rows={4} 
                      required
                      placeholder="Protocol Details (Message)" 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-black/50 border border-white/10 rounded-xl p-4 lg:p-5 outline-none focus:border-[#ff7a22] focus:bg-black/70 transition-all font-light placeholder:text-white/10 apple-glass resize-none group-hover:border-white/20 text-sm"
                    ></textarea>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1.5px] bg-[#ff7a22] transition-all duration-500 group-focus-within:w-[95%] opacity-70"></div>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full bg-[#ff7a22] text-black font-mono text-[10px] lg:text-[11px] uppercase tracking-[0.2em] font-extrabold rounded-xl hover:bg-white transition-all duration-300 group shadow-2xl relative overflow-hidden apple-glass border border-[#ff7a22]/30 depth-shadow py-3 lg:py-4"
                  >
                    <span className="relative z-10">TRANSMIT MESSAGE</span>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
                  </button>
                </form>
              </div>
            </div>

            {/* Right: Video Card */}
            <div className="metallic-card rounded-lg relative overflow-hidden min-h-[400px] lg:min-h-[500px] transition-all border-2 border-[#ff7a22] depth-shadow-lg flex-1">
              <div className="absolute inset-0 bg-[#ff7a22]/10 mix-blend-overlay z-10 pointer-events-none"></div>
              <div className="absolute inset-0 bg-gradient-to-l from-[#1a1a1a] via-transparent to-transparent z-10"></div>
              <div className="relative w-full h-full transform-gpu perspective-1000">
                <video 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-full object-cover opacity-80 mix-blend-screen transform scale-105 group-hover:scale-110 transition-all duration-[2s]"
                >
                  <source src="/videocontent/email_form.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-transparent pointer-events-none"></div>
              </div>
              <div className="absolute bottom-6 left-6 z-20 flex gap-2">
                <span className="w-2 h-2 bg-[#ff7a22] rounded-full animate-ping"></span>
                <span className="font-mono text-[9px] text-[#ff7a22] tracking-widest uppercase bg-black/80 px-2 py-[2px] rounded depth-shadow">Contact_Form</span>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <TerminalText />

      <footer className="relative z-10 py-20 border-t border-white/5">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-8 mb-6">
            {/* LinkedIn Icon */}
            <a 
              href="https://github.com/nicocodeevo-ux" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative"
              title="LinkedIn (redirects to GitHub)"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 text-white/80 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                LinkedIn (→ GitHub)
              </span>
            </a>

            {/* GitHub Icon */}
            <a 
              href="https://github.com/nicocodeevo-ux" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative"
              title="GitHub Profile"
            >
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 text-white/80 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                GitHub Profile
              </span>
            </a>

            {/* Final Project Icon */}
            <div className="group relative">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 group-hover:scale-110 cursor-not-allowed opacity-60">
                <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z"/>
                </svg>
              </div>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                Final Project (Coming Soon)
              </span>
            </div>

            {/* App Portfolio Icon */}
            <div className="group relative">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300 group-hover:scale-110 cursor-not-allowed opacity-60">
                <svg className="w-6 h-6 text-white/60" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"/>
                </svg>
              </div>
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                App Portfolio (Coming Soon)
              </span>
            </div>
          </div>
        </div>
        <div className="text-center font-mono text-[9px] text-white/15 tracking-[0.6em] uppercase">
          &copy; {new Date().getFullYear()} Nico Kuehn // Python Dev // Aue-Bad Schlema // ID_{Math.random().toString(36).substr(2, 6).toUpperCase()}
        </div>
      </footer>
    </div>
  );
};

export default App;
