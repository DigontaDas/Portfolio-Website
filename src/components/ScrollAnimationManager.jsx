import { useEffect, useState } from 'react';
import Lenis from 'lenis';

const SECTIONS = [
  { id: 'home', name: '01 SURFACE' },
  { id: 'about', name: '02 ABOUT' },
  { id: 'skills', name: '03 SKILLS' },
  { id: 'architecture', name: '04 SYSTEMS' },
  { id: 'projects', name: '05 PROJECTS' },
  { id: 'certificates', name: '06 CERTIFICATES' },
  { id: 'contact', name: '07 CONTACT' },
];

export default function ScrollAnimationManager() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('01 SURFACE');

  useEffect(() => {
    // 1. Lenis Smooth Inertia Scroll
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lenis = null;
    let rafId = null;

    if (!prefersReducedMotion) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });
      window.__lenis = lenis;

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // 2. Scroll Progress & Active Section Tracker
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTIONS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveSection(SECTIONS[i].name);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 3. Interactive Cursor Spotlight Glow on Glass Cards
    const handlePointerMove = (e) => {
      const card = e.target.closest?.('.ocean-card, .grid-container');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // 4. IntersectionObserver for Scroll-Reveal Animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-in-view');
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.08,
      }
    );

    const revealElements = document.querySelectorAll(
      '.grid-container, .ocean-card, .head-text, .subhead-text'
    );
    revealElements.forEach((el) => {
      el.classList.add('scroll-reveal-target');
      observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      observer.disconnect();
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        lenis.destroy();
        if (window.__lenis === lenis) delete window.__lenis;
      }
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
      <div className="fixed right-6 bottom-8 z-40 hidden lg:flex flex-col items-end gap-2 pointer-events-none select-none opacity-85">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#050816]/85 backdrop-blur-md border border-cyan-500/25 shadow-lg shadow-cyan-950/40">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-beacon" />
          <span className="text-[10px] font-mono tracking-widest text-cyan-300 font-semibold">
            {activeSection}
          </span>
          <span className="text-[10px] font-mono text-purple-300 font-medium">
            {Math.round(scrollProgress)}%
          </span>
        </div>
        <div className="w-[1px] h-10 bg-gradient-to-b from-cyan-500/40 via-purple-500/40 to-transparent mr-4" />
      </div>
    </>
  );
}
