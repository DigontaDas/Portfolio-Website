import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

const REVEAL_SELECTOR = '.grid-container, .ocean-card, .head-text, .subhead-text';

export default function ScrollAnimationManager() {
  const barRef = useRef(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktopPointer =
      window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 768;
    const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

    // 1. Lenis Smooth Inertia Scroll (Desktop fine-pointer only; mobile keeps native momentum)
    let lenis = null;
    let rafId = null;

    if (!prefersReducedMotion && isDesktopPointer) {
      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      window.__lenis = lenis;

      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    // 2. Compositor-only Scroll Progress Tracker (no React state re-renders)
    const updateProgressBar = () => {
      if (!barRef.current) return;
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = totalScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / totalScroll)) : 0;
      barRef.current.style.transform = `scaleX(${ratio})`;
    };

    window.addEventListener('scroll', updateProgressBar, { passive: true });
    updateProgressBar();

    // 3. Throttled Cursor Spotlight Glow on Desktop Hover Devices Only
    let pendingSpotEvent = null;
    let spotRafId = null;

    const flushSpotlight = () => {
      spotRafId = null;
      const e = pendingSpotEvent;
      if (!e) return;
      const card = e.target?.closest?.('.ocean-card, .grid-container');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--spot-x', `${e.clientX - rect.left}px`);
      card.style.setProperty('--spot-y', `${e.clientY - rect.top}px`);
    };

    const handlePointerMove = (e) => {
      pendingSpotEvent = e;
      if (!spotRafId) {
        spotRafId = requestAnimationFrame(flushSpotlight);
      }
    };

    if (hasHover) {
      window.addEventListener('pointermove', handlePointerMove, { passive: true });
    }

    // 4. IntersectionObserver + MutationObserver for Scroll Reveals (supports lazy sections)
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-in-view');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.06,
      }
    );

    const registerRevealNodes = (rootNode) => {
      if (!rootNode || rootNode.nodeType !== 1) return;
      if (rootNode.matches?.(REVEAL_SELECTOR) && !rootNode.classList.contains('scroll-in-view')) {
        rootNode.classList.add('scroll-reveal-target');
        revealObserver.observe(rootNode);
      }
      rootNode.querySelectorAll?.(REVEAL_SELECTOR).forEach((el) => {
        if (!el.classList.contains('scroll-in-view')) {
          el.classList.add('scroll-reveal-target');
          revealObserver.observe(el);
        }
      });
    };

    registerRevealNodes(document.body);

    const mutationObserver = new MutationObserver((mutations) => {
      for (const m of mutations) {
        for (const node of m.addedNodes) {
          registerRevealNodes(node);
        }
      }
    });
    const mainRoot = document.querySelector('main') || document.body;
    mutationObserver.observe(mainRoot, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('scroll', updateProgressBar);
      if (hasHover) {
        window.removeEventListener('pointermove', handlePointerMove);
      }
      if (spotRafId) cancelAnimationFrame(spotRafId);
      revealObserver.disconnect();
      mutationObserver.disconnect();
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
        ref={barRef}
        className="w-full h-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_12px_rgba(0,220,240,0.8)] will-change-transform"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}
