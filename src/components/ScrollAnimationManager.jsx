import { useEffect, useState } from 'react';

export default function ScrollAnimationManager() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('HERO');

  useEffect(() => {
    // 1. Scroll Progress & Active Section Tracker
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Determine active section
      const sections = [
        { id: 'home', name: '01 SURFACE' },
        { id: 'about', name: '02 ABOUT' },
        { id: 'projects', name: '03 WORK' },
        { id: 'contact', name: '04 CONTACT' },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(sections[i].name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 2. IntersectionObserver for Scroll-Reveal Animations on elements
    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.12,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-in-view');
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.grid-container, .ocean-card, .head-text, .subhead-text');
    revealElements.forEach((el) => {
      el.classList.add('scroll-reveal-target');
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Top Scroll Progress Laser Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none bg-slate-900/40">
        <div
          className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(0,220,240,0.8)] transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Right Scroll-Depth HUD */}
      <div className="fixed right-6 bottom-10 z-40 hidden md:flex flex-col items-end gap-2 pointer-events-none select-none opacity-80 hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050816]/80 backdrop-blur-md border border-cyan-500/25 shadow-lg shadow-cyan-950/40">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-[10px] font-mono tracking-widest text-cyan-300 font-semibold">
            {activeSection}
          </span>
          <span className="text-[10px] font-mono text-purple-300 font-medium">
            {Math.round(scrollProgress)}%
          </span>
        </div>
        <div className="w-[1px] h-12 bg-gradient-to-b from-cyan-500/40 via-purple-500/40 to-transparent mr-4" />
      </div>
    </>
  );
}
