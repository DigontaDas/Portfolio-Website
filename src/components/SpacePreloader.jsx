import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import SatelliteAvatar3D from './SatelliteAvatar3D.jsx';

export default function SpacePreloader({ onStartFly, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'flying'
  const [flyTarget, setFlyTarget] = useState({ x: 0, y: 0, scale: 0.55 });
  const satBoxRef = useRef(null);
  const completedRef = useRef(false);

  const finishOnce = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  };

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setProgress(100);
      const t = setTimeout(finishOnce, 180);
      return () => clearTimeout(t);
    }

    // Warm critical small brand assets immediately during loading
    ['/assets/digonta-full-avatar.png', '/Logo.svg'].forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    const startTime = performance.now();
    const minDuration = 1050; // Crisp initial showcase of Logo + Satellite Avatar
    const maxDuration = 1850;
    let docReady = document.readyState === 'complete';

    const onWindowLoad = () => {
      docReady = true;
    };
    if (!docReady) {
      window.addEventListener('load', onWindowLoad, { once: true });
    }

    let rafId = null;
    let flyTimeout = null;
    let safetyFinish = null;

    const launchFlight = () => {
      const satEl = satBoxRef.current;
      const dockEl = document.querySelector('[data-satellite-dock="true"]');

      if (satEl && dockEl) {
        const satRect = satEl.getBoundingClientRect();
        const dockRect = dockEl.getBoundingClientRect();
        const dx = dockRect.left + dockRect.width / 2 - (satRect.left + satRect.width / 2);
        const dy = dockRect.top + dockRect.height / 2 - (satRect.top + satRect.height / 2);
        const scale = Math.max(0.28, dockRect.width / Math.max(1, satRect.width));
        setFlyTarget({ x: dx, y: dy, scale });
      } else {
        const isDesktop = window.innerWidth >= 768;
        setFlyTarget(
          isDesktop
            ? { x: window.innerWidth / 2 - 140, y: -120, scale: 0.55 }
            : { x: window.innerWidth / 2 - 104, y: window.innerHeight / 2 - 48, scale: 0.36 }
        );
      }

      onStartFly?.();
      setPhase('flying');

      // Fallback finish guard if animation events are skipped in backgrounded tabs
      safetyFinish = setTimeout(finishOnce, 920);
    };

    const tick = (now) => {
      const elapsed = now - startTime;
      const minRatio = Math.min(1, elapsed / minDuration);
      const readyCap = docReady || elapsed > maxDuration ? 1 : 0.88;
      const eased = 1 - Math.pow(1 - minRatio, 2.2);
      const nextProgress = Math.min(100, Math.round(eased * readyCap * 100));

      setProgress(nextProgress);

      if (elapsed >= minDuration && (docReady || elapsed >= maxDuration)) {
        setProgress(100);
        flyTimeout = setTimeout(launchFlight, 140);
        return;
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('load', onWindowLoad);
      if (rafId) cancelAnimationFrame(rafId);
      if (flyTimeout) clearTimeout(flyTimeout);
      if (safetyFinish) clearTimeout(safetyFinish);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFlying = phase === 'flying';

  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none select-none"
      aria-hidden={isFlying}
    >
      {/* Cosmic Backdrop + Brand Logo + Telemetry Progress */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isFlying ? 0 : 1 }}
        transition={{ duration: 0.42, ease: 'easeOut' }}
        className={`fixed inset-0 bg-[#030614] grid grid-rows-[1fr_auto_1fr] justify-items-center px-6 ${
          isFlying ? 'pointer-events-none' : 'pointer-events-auto'
        }`}
      >
        {/* Subtle Deep Milky Way Radial Backdrop Glow */}
        <div
          className="absolute inset-0 pointer-events-none opacity-65"
          style={{
            background:
              'radial-gradient(circle at 50% 50%, rgba(0, 220, 240, 0.14) 0%, rgba(168, 85, 247, 0.1) 36%, rgba(3, 6, 20, 0) 70%)',
          }}
        />

        {/* Name Logo Lockup above Centered Satellite Stage */}
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: isFlying ? 0 : 1, y: isFlying ? -24 : 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="relative z-10 self-end flex flex-col items-center pb-5 sm:pb-6"
        >
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-slate-900/60 border border-cyan-500/25 shadow-[0_0_28px_rgba(0,220,240,0.18)]">
            <img
              src="/Logo.svg"
              alt="Digonta Das Logo"
              className="w-9 h-9 sm:w-11 sm:h-11 object-contain drop-shadow-[0_0_12px_rgba(0,220,240,0.65)]"
            />
            <div className="flex flex-col leading-none">
              <span className="font-outfit text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                DIGONTA DAS
              </span>
              <span className="mt-1 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.26em] text-cyan-400/90">
                Software Engineer
              </span>
            </div>
          </div>
        </motion.div>

        {/* Exact Viewport-Center Placeholder Matching the Satellite Container */}
        <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
          {/* Holographic Orbital Reticle Behind Satellite */}
          <motion.div
            animate={{ rotate: 360, scale: isFlying ? 0.6 : 1, opacity: isFlying ? 0 : 1 }}
            transition={{
              rotate: { duration: 12, repeat: Infinity, ease: 'linear' },
              scale: { duration: 0.35 },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-2 rounded-full border border-dashed border-cyan-400/35 shadow-[0_0_32px_rgba(0,220,240,0.16)]"
          />
          <motion.div
            animate={{ rotate: -360, opacity: isFlying ? 0 : 0.7 }}
            transition={{
              rotate: { duration: 16, repeat: Infinity, ease: 'linear' },
              opacity: { duration: 0.3 },
            }}
            className="absolute inset-6 rounded-full border border-purple-500/30"
          />
        </div>

        {/* Orbital Link Progress Bar */}
        <motion.div
          animate={{ opacity: isFlying ? 0 : 1, y: isFlying ? 12 : 0 }}
          transition={{ duration: 0.32 }}
          className="relative z-10 self-start w-56 sm:w-64 pt-5 flex flex-col items-center gap-2"
        >
          <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden border border-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 shadow-[0_0_12px_rgba(0,220,240,0.85)] transition-[width] duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="w-full flex items-center justify-between font-mono text-[10px] tracking-widest uppercase">
            <span className="text-slate-400">
              {progress >= 100 ? 'Satellite Deployed' : 'Deploying Satellite'}
            </span>
            <span className="text-cyan-300 font-semibold">{progress}%</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Center-Stage 3D Satellite + Avatar That Flies Into Side Dock Position */}
      <div className="fixed inset-0 z-[101] pointer-events-none flex items-center justify-center">
        <motion.div
          ref={satBoxRef}
          initial={{ x: 0, y: 0, scale: 1, rotate: 0 }}
          animate={
            isFlying
              ? {
                  x: flyTarget.x,
                  y: flyTarget.y,
                  scale: flyTarget.scale,
                  rotate: [0, -9, 0],
                }
              : { x: 0, y: 0, scale: 1, rotate: 0 }
          }
          transition={
            isFlying
              ? {
                  duration: 0.68,
                  ease: [0.22, 1, 0.36, 1],
                  rotate: { duration: 0.68, times: [0, 0.45, 1] },
                }
              : { duration: 0.3 }
          }
          onAnimationComplete={() => {
            if (isFlying) finishOnce();
          }}
          className="w-44 h-44 sm:w-52 sm:h-52 will-change-transform"
        >
          <SatelliteAvatar3D
            isHovered={true}
            pingKey={isFlying ? 1 : 0}
            className="w-full h-full"
          />
        </motion.div>
      </div>
    </div>
  );
}
