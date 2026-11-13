import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
 * Crisp pixel-art inspired pointing hand + cyan laser tip SVG
 * attached beside the character to visually point at the target waypoint.
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
      className="flex items-center pointer-events-none select-none"
      aria-hidden="true"
    >
      <svg
        width="26"
        height="18"
        viewBox="0 0 26 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_0_8px_rgba(0,220,240,0.9)]"
      >
        {/* Pixelated pointing glove / arrow */}
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

export default function CharacterNavigator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [pingedIndex, setPingedIndex] = useState(null);
  const [pingCount, setPingCount] = useState(0);
  const [railExpanded, setRailExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [speechText, setSpeechText] = useState('');

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
    }, 1600);
  };

  const focusIndex = hoveredIndex !== null ? hoveredIndex : activeIndex;
  const centerOffset = ((WAYPOINTS.length - 1) * ROW_STEP_PX) / 2;
  const characterY = focusIndex * ROW_STEP_PX - centerOffset;

  return (
    <>
      {/* =========================================================
          DESKTOP SIDE CHARACTER GUIDE & PING WAYPOINT RAIL (md+)
         ========================================================= */}
      <nav
        aria-label="Side Character Section Navigator"
        onMouseEnter={() => setRailExpanded(true)}
        onMouseLeave={() => {
          setRailExpanded(false);
          setHoveredIndex(null);
        }}
        className="hidden md:flex fixed right-3 lg:right-5 top-1/2 -translate-y-1/2 z-50 items-center pointer-events-none select-none"
      >
        {/* Sliding Constant Animated Character + Pointing Arrow */}
        <motion.div
          animate={{ y: characterY }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="relative flex items-center gap-1 mr-1.5 pointer-events-auto"
        >
          {/* Floating Speech Tag on Ping or Hover */}
          <AnimatePresence>
            {(speechText || hoveredIndex !== null) && (
              <motion.div
                initial={{ opacity: 0, x: 8, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 6, scale: 0.92 }}
                transition={{ duration: 0.18 }}
                className="absolute right-full mr-2 whitespace-nowrap px-2.5 py-1 rounded-xl bg-[#070c24]/95 border border-cyan-400/45 text-[11px] font-mono text-cyan-200 shadow-[0_0_20px_rgba(0,220,240,0.22)] backdrop-blur-md"
              >
                {speechText || `Ping → ${WAYPOINTS[focusIndex].label}`}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Animated Character Avatar */}
          <motion.button
            type="button"
            onClick={() => setRailExpanded((prev) => !prev)}
            title="Digonta Guide — Click a side node to jump"
            aria-label="Toggle section labels"
            animate={
              pingedIndex !== null
                ? {
                    y: [0, -14, 0],
                    rotate: [0, -8, 8, 0],
                    scale: [1, 1.12, 1],
                  }
                : {
                    y: [0, -4, 0],
                    rotate: [-1.5, 1.5, -1.5],
                  }
            }
            transition={
              pingedIndex !== null
                ? { duration: 0.45, ease: 'easeOut' }
                : { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
            }
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            className="relative group cursor-pointer focus:outline-none"
          >
            {/* Ambient Holographic Ring Behind Character */}
            <span className="absolute inset-1 rounded-full bg-gradient-to-tr from-cyan-500/30 via-blue-500/20 to-purple-500/35 blur-md group-hover:blur-lg transition-all" />

            <div className="relative w-12 h-14 lg:w-14 lg:h-16 flex items-center justify-center">
              <img
                src="/assets/digonta-avatar.png"
                alt="Digonta animated character guide"
                className="w-full h-full object-contain drop-shadow-[0_4px_12px_rgba(0,220,240,0.45)]"
              />
            </div>

            {/* Ground Hover Shadow */}
            <motion.span
              animate={{ scaleX: [0.85, 1, 0.85], opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              className="block mx-auto -mt-1 w-8 h-1.5 rounded-full bg-cyan-400/50 blur-[2px]"
            />
          </motion.button>

          {/* Animated Pointing Hand Aimed at the Target Node */}
          <PixelPointerArrow isPinging={pingedIndex !== null} />
        </motion.div>

        {/* Vertical Waypoint Ping Rail */}
        <div className="relative pointer-events-auto flex flex-col items-end py-2 px-2 rounded-2xl bg-[#050816]/75 backdrop-blur-xl border border-cyan-500/20 shadow-[0_12px_36px_rgba(0,0,0,0.6)]">
          {/* Connecting vertical spine */}
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
                {/* Expandable Destination Label */}
                <AnimatePresence>
                  {(railExpanded || isHovered || isActive) && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.16 }}
                      className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border backdrop-blur-md whitespace-nowrap transition-colors ${
                        isActive || isHovered
                          ? 'bg-cyan-950/85 border-cyan-400/60 text-white shadow-[0_0_14px_rgba(0,220,240,0.22)]'
                          : 'bg-slate-900/80 border-slate-700/70 text-slate-300'
                      }`}
                    >
                      <span className="text-cyan-400 mr-1.5">{wp.short}</span>
                      {wp.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Ping Node */}
                <span className="relative w-5 h-5 flex items-center justify-center shrink-0">
                  {/* Radar Ping Burst */}
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

      {/* =========================================================
          MOBILE FLOATING CHARACTER GUIDE + WAYPOINT POPOVER (< md)
         ========================================================= */}
      <div className="md:hidden fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2.5 pointer-events-none select-none">
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

        {/* Mobile Constant Animated Character Button */}
        <motion.button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Open character waypoint navigator"
          aria-expanded={mobileOpen}
          animate={
            pingedIndex !== null
              ? { y: [0, -12, 0], scale: [1, 1.12, 1] }
              : { y: [0, -4, 0] }
          }
          transition={
            pingedIndex !== null
              ? { duration: 0.4 }
              : { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }
          }
          whileTap={{ scale: 0.92 }}
          className="pointer-events-auto relative flex items-center gap-1.5 pl-2 pr-2.5 py-1.5 rounded-2xl bg-[#050816]/85 backdrop-blur-xl border border-cyan-400/40 shadow-[0_8px_28px_rgba(0,0,0,0.7)] cursor-pointer"
        >
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-400 animate-beacon" />
          <img
            src="/assets/digonta-avatar.png"
            alt="Digonta character guide"
            className="w-10 h-12 object-contain drop-shadow-[0_2px_8px_rgba(0,220,240,0.45)]"
          />
          <div className="text-left pr-0.5">
            <span className="block text-[9px] font-mono uppercase tracking-wider text-cyan-400">
              {mobileOpen ? 'Close' : 'Go To'}
            </span>
            <span className="block text-[11px] font-mono font-semibold text-white">
              {WAYPOINTS[activeIndex].label}
            </span>
          </div>
        </motion.button>
      </div>
    </>
  );
}
