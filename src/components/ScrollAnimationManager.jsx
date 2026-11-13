import { useEffect, useState } from 'react';
import Lenis from 'lenis';

export default function ScrollAnimationManager() {
  const [scrollProgress, setScrollProgress] = useState(0);

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

    // 2. Scroll Progress Tracker
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setScrollProgress(progress);
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
    <div className="fixed top-0 left-0 w-full h-[3px] z-50 pointer-events-none bg-slate-900/40">
      <div
        className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(0,220,240,0.8)] transition-all duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
