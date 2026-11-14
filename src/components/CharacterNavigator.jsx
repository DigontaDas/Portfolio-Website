import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SatelliteAvatar3D from './SatelliteAvatar3D.jsx';

const WAYPOINTS = [
  { id: 'home', label: 'Home', short: '01' },
  { id: 'about', label: 'About', short: '02' },
  { id: 'skills', label: 'Skills', short: '03' },
  { id: 'architecture', label: 'Systems', short: '04' },
  { id: 'projects', label: 'Projects', short: '05' },
  { id: 'certificates', label: 'Certificates', short: '06' },
  { id: 'contact', label: 'Contact', short: '07' },
];

const ROW_STEP_PX = 40;

/**
 * Animated directional laser pointer arrow pointing from the 3D satellite
 * directly toward the target waypoint node.
 */
function PixelPointerArrow({ isPinging }) {
  return (
    <motion.div
      animate={{
        x: isPinging ? [0, 8, 0] : [0, 4, 0],
        scale: isPinging ? [1, 1.2, 1] : 1,
      }}
      transition={{
        duration: isPinging ? 0.35 : 1.1,
        repeat: isPinging ? 0 : Infinity,
        ease: 'easeInOut',
      }}
      className="flex items-center pointer-events-none select-none shrink-0"
      aria-hidden="true"
    >
      <svg
        width="24"
        height="16"
        viewBox="0 0 26 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_8px_rgba(0,220,240,0.9)]"
      >
        <path
          d="M2 7H14V3L24 9L14 15V11H2V7Z"
          fill="#00dcf0"
          stroke="#050816"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M5 8.5H15.5V6L20.5 9L15.5 12V9.5H5V8.5Z" fill="#e0f2fe" />
      </svg>
    </motion.div>
  );
}

export default function CharacterNavigator({ visible = true, docked = true }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pingedIndex, setPingedIndex] = useState(null);
  const [pingCount, setPingCount] = useState(0);
  const [railExpanded, setRailExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 768 : true
  );

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const syncViewport = () => setIsDesktop(mq.matches);
    syncViewport();
    mq.addEventListener('change', syncViewport);
    return () => mq.removeEventListener('change', syncViewport);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      for (let i = WAYPOINTS.length - 1; i >= 0; i--) {
        const el = document.getElementById(WAYPOINTS[i].id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) {
            setActiveIndex(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setRailExpanded(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handlePingWaypoint = (idx) => {
    const target = WAYPOINTS[idx];
    setPingedIndex(idx);
    setPingCount((c) => c + 1);
    setActiveIndex(idx);
    setSpeechText(`→ ${target.label}`);
    setMobileOpen(false);

    const el = document.getElementById(target.id);
    if (window.__lenis && el) {
      window.__lenis.scrollTo(el, { offset: -20 });
    } else if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }

    setTimeout(() => {
      setPingedIndex(null);
    }, 650);

    setTimeout(() => {
      setSpeechText('');
    }, 1500);
  };

  const focusIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const centerOffset = ((WAYPOINTS.length - 1) * ROW_STEP_PX) / 2;
  const characterY = focusIndex * ROW_STEP_PX - centerOffset;

  if (isDesktop) {
    return (
      <nav
        aria-label="3D Satellite Section Navigator"
        onMouseEnter={() => setRailExpanded(true)}
        onMouseLeave={() => {
          setRailExpanded(false);
          setHoveredIndex(null);
        }}
        className={`fixed right-3 lg:right-5 top-1/2 -translate-y-1/2 z-50 flex items-center pointer-events-none select-none transition-opacity duration-500 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Sliding 3D Satellite Companion + Directional Pointer */}
        <motion.div
          animate={{ y: characterY }}
          transition={{ type: 'spring', stiffness: 250, damping: 24 }}
          className="relative flex items-center gap-0.5 mr-1 pointer-events-auto"
        >
          {/* Compact Ping Toast directly ABOVE the Satellite (no left clipping) */}
          <AnimatePresence>
            {speechText && (
              <motion.div
                initial={{ opacity: 0, y: 6, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.9 }}
                transition={{ duration: 0.18 }}
                className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1 whitespace-nowrap px-2.5 py-0.5 rounded-full bg-[#070c24]/95 border border-cyan-400/50 text-[10px] font-mono text-cyan-200 shadow-[0_0_16px_rgba(0,220,240,0.28)] backdrop-blur-md"
              >
                {speechText}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setRailExpanded((prev) => !prev)}
            title="Digonta Satellite Guide: Hover or ping a waypoint to jump"
            aria-label="Toggle section labels"
            className="relative w-24 h-24 lg:w-28 lg:h-28 cursor-pointer focus:outline-none group"
          >
            <span className="absolute inset-3 rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-500/15 to-purple-500/25 blur-xl group-hover:blur-2xl transition-all pointer-events-none" />
            {docked ? (
              <SatelliteAvatar3D
                isHovered={railExpanded || hoveredIndex !== null}
                pingKey={pingCount}
                className="w-full h-full"
              />
            ) : (
              <div data-satellite-dock="true" className="w-full h-full" />
            )}
          </button>

          <PixelPointerArrow isPinging={pingedIndex !== null} />
        </motion.div>

        {/* Vertical Waypoint Ping Rail */}
        <div className="relative pointer-events-auto flex flex-col items-end py-2 px-2 rounded-2xl bg-[#050816]/75 backdrop-blur-xl border border-cyan-500/20 shadow-[0_12px_36px_rgba(0,0,0,0.6)]">
          <div
            className="absolute right-[19px] top-5 bottom-5 w-px bg-gradient-to-b from-cyan-500/20 via-purple-500/40 to-cyan-500/20 pointer-events-none"
            aria-hidden="true"
          />

          {WAYPOINTS.map((wp, idx) => {
            const isActive = idx === activeIndex;
            const isHovered = idx === hoveredIndex;
            const isPinged = idx === pingedIndex;

            return (
              <button
                key={wp.id}
                type="button"
                onMouseEnter={() => setHoveredIndex(idx)}
                onFocus={() => setHoveredIndex(idx)}
                onClick={() => handlePingWaypoint(idx)}
                aria-label={`Jump to ${wp.label}`}
                style={{ height: `${ROW_STEP_PX}px` }}
                className="relative flex items-center justify-end gap-2.5 px-1 cursor-pointer group focus:outline-none"
              >
                <AnimatePresence>
                  {(railExpanded || isHovered || isActive) && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.16 }}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border backdrop-blur-md whitespace-nowrap transition-colors ${
                        isActive || isHovered
                          ? 'bg-cyan-950/90 border-cyan-400/60 text-white shadow-[0_0_14px_rgba(0,220,240,0.22)]'
                          : 'bg-slate-900/80 border-slate-700/70 text-slate-300'
                      }`}
                    >
                      <span className="text-cyan-400 mr-1.5">{wp.short}</span>
                      {wp.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                <span className="relative w-5 h-5 flex items-center justify-center shrink-0">
                  {(isPinged || isActive) && (
                    <motion.span
                      key={isPinged ? `ping-${idx}-${pingCount}` : `active-${idx}`}
                      initial={{ scale: 0.7, opacity: 0.85 }}
                      animate={
                        isPinged
                          ? { scale: [0.8, 2.5], opacity: [0.95, 0] }
                          : { scale: [1, 1.75, 1], opacity: [0.55, 0, 0.55] }
                      }
                      transition={
                        isPinged
                          ? { duration: 0.55, ease: 'easeOut' }
                          : { duration: 2.2, repeat: Infinity, ease: 'easeInOut' }
                      }
                      className="absolute inset-0 rounded-full border border-cyan-400 bg-cyan-400/20"
                    />
                  )}

                  <span
                    className={`relative rounded-full transition-all duration-200 ${
                      isActive
                        ? 'w-3 h-3 bg-gradient-to-r from-cyan-400 to-purple-400 shadow-[0_0_12px_rgba(0,220,240,0.95)] ring-2 ring-cyan-300/40'
                        : isHovered
                        ? 'w-3 h-3 bg-cyan-300 shadow-[0_0_10px_rgba(0,220,240,0.8)]'
                        : 'w-2 h-2 bg-slate-500 group-hover:bg-cyan-300'
                    }`}
                  />
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  }

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2.5 pointer-events-none select-none transition-opacity duration-500 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="pointer-events-auto w-48 p-2 rounded-2xl bg-[#050816]/95 backdrop-blur-xl border border-cyan-500/35 shadow-[0_14px_40px_rgba(0,0,0,0.85)]"
          >
            <div className="px-2.5 py-1.5 mb-1 border-b border-slate-800/80 flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                Ping to Jump
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                {WAYPOINTS[activeIndex].short}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              {WAYPOINTS.map((wp, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={wp.id}
                    type="button"
                    onClick={() => handlePingWaypoint(idx)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-500/25 to-purple-500/25 border border-cyan-400/50 text-white'
                        : 'text-slate-300 hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-cyan-400">{wp.short}</span>
                      <span>{wp.label}</span>
                    </span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-beacon" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Constant 3D Satellite Companion Button */}
      <motion.button
        type="button"
        onClick={() => setMobileOpen((prev) => !prev)}
        aria-label="Open satellite waypoint navigator"
        aria-expanded={mobileOpen}
        whileTap={{ scale: 0.94 }}
        className="pointer-events-auto relative flex items-center gap-1 pr-3 pl-1 py-1 rounded-2xl bg-[#050816]/88 backdrop-blur-md border border-cyan-400/40 shadow-[0_8px_28px_rgba(0,0,0,0.7)] cursor-pointer"
      >
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-beacon" />
        {docked ? (
          <SatelliteAvatar3D
            isHovered={mobileOpen}
            pingKey={pingCount}
            className="w-16 h-16 shrink-0"
          />
        ) : (
          <div data-satellite-dock="true" className="w-16 h-16 shrink-0" />
        )}
        <div className="text-left">
          <span className="block text-[9px] font-mono uppercase tracking-wider text-cyan-400">
            {mobileOpen ? 'Close' : 'Satellite'}
          </span>
          <span className="block text-[11px] font-mono font-semibold text-white">
            {WAYPOINTS[activeIndex].label}
          </span>
        </div>
      </motion.button>
    </div>
  );
}
