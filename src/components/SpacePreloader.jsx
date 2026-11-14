import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CIRCLE_RADIUS = 82;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

export default function SpacePreloader({ onComplete }) {
  const [percent, setPercent] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const ringRef = useRef(null);
  const dotGroupRef = useRef(null);
  const completedRef = useRef(false);

  const triggerExit = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    setIsExiting(true);
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = '0';
      }
      setPercent(100);
      const t = setTimeout(triggerExit, 180);
      return () => clearTimeout(t);
    }

    // Preload logo image immediately
    const logoImg = new Image();
    logoImg.src = '/Logo.svg';

    const startTime = performance.now();
    const duration = 1950; // Deliberate, unhurried circular sweep
    const maxWait = 2800;
    let docReady = document.readyState === 'complete';

    const onWindowLoad = () => {
      docReady = true;
    };
    if (!docReady) {
      window.addEventListener('load', onWindowLoad, { once: true });
    }

    let rafId = null;
    let holdTimeout = null;
    let safetyFinish = null;
    let lastShownInt = 0;

    const tick = (now) => {
      const elapsed = now - startTime;
      const rawT = Math.min(1, elapsed / duration);
      // Smooth cosine ease-in-out curve for silky acceleration and deceleration around the circle
      const smoothT = 0.5 - 0.5 * Math.cos(Math.PI * rawT);
      const readyCap = docReady || elapsed >= maxWait ? 1 : 0.92;
      const value = Math.min(1, smoothT * readyCap);

      // Update SVG dashoffset directly at display refresh rate for buttery smoothness
      if (ringRef.current) {
        ringRef.current.style.strokeDashoffset = `${CIRCLE_CIRCUMFERENCE * (1 - value)}`;
      }
      if (dotGroupRef.current) {
        dotGroupRef.current.style.transform = `rotate(${value * 360}deg)`;
      }

      const nextInt = Math.round(value * 100);
      if (nextInt !== lastShownInt) {
        lastShownInt = nextInt;
        setPercent(nextInt);
      }

      if (rawT >= 1 && (docReady || elapsed >= maxWait)) {
        if (ringRef.current) ringRef.current.style.strokeDashoffset = '0';
        if (dotGroupRef.current) dotGroupRef.current.style.transform = 'rotate(360deg)';
        setPercent(100);
        holdTimeout = setTimeout(() => {
          triggerExit();
          safetyFinish = setTimeout(() => onComplete?.(), 650);
        }, 200);
        return;
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('load', onWindowLoad);
      if (rafId) cancelAnimationFrame(rafId);
      if (holdTimeout) clearTimeout(holdTimeout);
      if (safetyFinish) clearTimeout(safetyFinish);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1, scale: 1 }}
      animate={isExiting ? { opacity: 0, scale: 1.04 } : { opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={() => {
        if (isExiting) onComplete?.();
      }}
      className={`fixed inset-0 z-[100] bg-[#030614] flex flex-col items-center justify-center select-none ${
        isExiting ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
      aria-busy={!isExiting}
      aria-label="Loading portfolio"
    >
      {/* Subtle Radial Cosmic Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-75"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(0, 220, 240, 0.14) 0%, rgba(139, 92, 246, 0.1) 34%, rgba(3, 6, 20, 0) 68%)',
        }}
      />

      {/* Centered Circular Loader Stage */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="relative flex items-center justify-center w-44 h-44 sm:w-52 sm:h-52"
      >
        {/* Outer Smooth Sweeping Circle Progress SVG */}
        <svg
          viewBox="0 0 180 180"
          className="absolute inset-0 w-full h-full overflow-visible drop-shadow-[0_0_16px_rgba(0,220,240,0.35)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="preloaderRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00dcf0" />
              <stop offset="52%" stopColor="#38bdf8" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Subtle Track Ring */}
          <circle
            cx="90"
            cy="90"
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="rgba(148, 163, 184, 0.14)"
            strokeWidth="3.5"
          />

          {/* Smooth Progress Arc Starting from 12 O'Clock */}
          <circle
            ref={ringRef}
            cx="90"
            cy="90"
            r={CIRCLE_RADIUS}
            fill="none"
            stroke="url(#preloaderRingGradient)"
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeDasharray={CIRCLE_CIRCUMFERENCE}
            strokeDashoffset={CIRCLE_CIRCUMFERENCE}
            transform="rotate(-90 90 90)"
          />

          {/* Orbiting Leading Spark on the Circle Tip */}
          <g
            ref={dotGroupRef}
            style={{ transformOrigin: '90px 90px', transform: 'rotate(0deg)' }}
          >
            <circle cx="90" cy={90 - CIRCLE_RADIUS} r="4.2" fill="#e0f2fe" />
          </g>
        </svg>

        {/* Round Circular Background Containing Logo.svg */}
        <motion.div
          animate={{ scale: [1, 1.025, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center border border-cyan-400/25 shadow-[inset_0_2px_20px_rgba(0,220,240,0.16),0_12px_40px_rgba(0,0,0,0.65)] overflow-hidden"
          style={{
            background:
              'radial-gradient(circle at 32% 28%, rgba(30, 58, 118, 0.72) 0%, rgba(10, 18, 46, 0.94) 55%, rgba(5, 8, 22, 0.98) 100%)',
          }}
        >
          {/* Soft Inner Rim Highlight */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.12) 0%, transparent 55%)',
            }}
          />

          <img
            src="/Logo.svg"
            alt="Digonta Das Logo"
            className="relative z-10 w-18 h-18 sm:w-20 sm:h-20 object-contain drop-shadow-[0_0_16px_rgba(0,220,240,0.45)]"
          />
        </motion.div>
      </motion.div>

      {/* Subtle Loading Percentage Readout Below the Circle */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-5 font-mono text-xs tracking-[0.26em] text-cyan-300/85"
      >
        {percent}%
      </motion.span>
    </motion.div>
  );
}
