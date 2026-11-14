import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Download } from "lucide-react";

const techBadges = [
  "Python & FastAPI",
  "PostgreSQL & PGVector",
  "RAG & OpenAI API",
  "PyTorch & 3D Vision",
  "Docker & CI/CD",
];

const waterStackCards = [
  {
    name: "Python",
    role: "Core Backend Runtime",
    color: "#38bdf8",
    bg: "rgba(56, 189, 248, 0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M11.9 2C7.8 2 8.1 3.8 8.1 3.8V5.7H12V6.3H6.5S4 6 4 9.7C4 13.4 6.2 13.2 6.2 13.2H7.5V11.4S7.4 9.2 9.7 9.2H13.5S15.6 9.2 15.6 7.1V3.9S15.9 2 11.9 2ZM9.8 3.1C10.2 3.1 10.6 3.4 10.6 3.9C10.6 4.3 10.2 4.6 9.8 4.6C9.4 4.6 9 4.3 9 3.9C9 3.4 9.4 3.1 9.8 3.1Z"
          fill="#38bdf8"
        />
        <path
          d="M12.1 22C16.2 22 15.9 20.2 15.9 20.2V18.3H12V17.7H17.5S20 18 20 14.3C20 10.6 17.8 10.8 17.8 10.8H16.5V12.6S16.6 14.8 14.3 14.8H10.5S8.4 14.8 8.4 16.9V20.1S8.1 22 12.1 22ZM14.2 20.9C13.8 20.9 13.4 20.6 13.4 20.1C13.4 19.7 13.8 19.4 14.2 19.4C14.6 19.4 15 19.7 15 20.1C15 20.6 14.6 20.9 14.2 20.9Z"
          fill="#facc15"
        />
      </svg>
    ),
  },
  {
    name: "FastAPI",
    role: "Async REST Architecture",
    color: "#14b8a6",
    bg: "rgba(20, 184, 166, 0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" fill="#0d9488" fillOpacity="0.25" stroke="#14b8a6" strokeWidth="1.6" />
        <path d="M13 5L7.5 13H12L11 19L16.5 11H12L13 5Z" fill="#2dd4bf" />
      </svg>
    ),
  },
  {
    name: "PostgreSQL",
    role: "Relational Data Store",
    color: "#60a5fa",
    bg: "rgba(96, 165, 250, 0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8">
        <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
        <path d="M5 5.5V12C5 13.5 8.1 14.8 12 14.8C15.9 14.8 19 13.5 19 12V5.5" />
        <path d="M5 12V18.5C5 20 8.1 21.3 12 21.3C15.9 21.3 19 20 19 18.5V12" />
      </svg>
    ),
  },
  {
    name: "PGVector",
    role: "Semantic Vector Index",
    color: "#818cf8",
    bg: "rgba(129, 140, 248, 0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8">
        <circle cx="6" cy="17" r="2.2" fill="#818cf8" fillOpacity="0.3" />
        <circle cx="18" cy="17" r="2.2" fill="#818cf8" fillOpacity="0.3" />
        <circle cx="12" cy="6" r="2.5" fill="#a78bfa" fillOpacity="0.4" />
        <path d="M10.7 8L7.3 15M13.3 8L16.7 15M8.2 17H15.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "PyTorch",
    role: "3D Medical Vision & DL",
    color: "#f97316",
    bg: "rgba(249, 115, 22, 0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M16.9 7.1A7 7 0 1 1 7.1 7.1L12 2.2V5.1L8.9 8.2A4.4 4.4 0 1 0 15.1 8.2L16.9 7.1Z"
          fill="#fb923c"
        />
        <circle cx="15.2" cy="5.2" r="1.4" fill="#fdba74" />
      </svg>
    ),
  },
  {
    name: "OpenAI API",
    role: "LLM & Agent Intelligence",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M20.5 10.1a4.7 4.7 0 0 0-.4-3.9 4.8 4.8 0 0 0-5.1-2.3A4.8 4.8 0 0 0 6.8 5.6a4.7 4.7 0 0 0-3.2 2.3 4.8 4.8 0 0 0 .6 5.6 4.7 4.7 0 0 0 .4 3.9 4.8 4.8 0 0 0 5.1 2.3A4.8 4.8 0 0 0 13.4 21a4.8 4.8 0 0 0 4.6-3.3 4.7 4.7 0 0 0 3.1-2.3 4.8 4.8 0 0 0-.6-5.3ZM12 15.2l-2.8-1.6v-3.2L12 8.8l2.8 1.6v3.2L12 15.2Z"
          stroke="#34d399"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    name: "Hugging Face",
    role: "Transformers & ONNX",
    color: "#fbbf24",
    bg: "rgba(251, 191, 36, 0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8.5" fill="#fbbf24" fillOpacity="0.2" stroke="#fbbf24" strokeWidth="1.6" />
        <circle cx="9.2" cy="10.2" r="1.1" fill="#fde68a" />
        <circle cx="14.8" cy="10.2" r="1.1" fill="#fde68a" />
        <path d="M8.5 13.8C9.4 15.5 14.6 15.5 15.5 13.8" stroke="#fde68a" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "WhisperAI",
    role: "Multilingual Audio AI",
    color: "#00dcf0",
    bg: "rgba(0, 220, 240, 0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00dcf0" strokeWidth="2" strokeLinecap="round">
        <path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" />
      </svg>
    ),
  },
  {
    name: "LLMOps",
    role: "RAG Eval & Telemetry",
    color: "#c084fc",
    bg: "rgba(192, 132, 252, 0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="1.8">
        <rect x="3" y="4" width="7" height="6" rx="1.5" />
        <rect x="14" y="4" width="7" height="6" rx="1.5" />
        <rect x="8.5" y="14" width="7" height="6" rx="1.5" />
        <path d="M6.5 10v2h11v-2M12 12v2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: "Docker",
    role: "Containerized Deploys",
    color: "#0ea5e9",
    bg: "rgba(14, 165, 233, 0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 10h3v3H5v-3zm4 0h3v3H9v-3zm4 0h3v3h-3v-3zm-4-4h3v3H9V6zm4 0h3v3h-3V6z"
          fill="#38bdf8"
        />
        <path
          d="M2.5 14h16.2c.9 0 1.8-.5 2.3-1.2.4.3 1.2.5 1.8.2-.2 2.4-2.1 5.5-7 5.5-5.6 0-11.2-1.8-13.3-4.5Z"
          fill="#0ea5e9"
        />
      </svg>
    ),
  },
  {
    name: "React.js",
    role: "Interactive 3D Frontend",
    color: "#22d3ee",
    bg: "rgba(34, 211, 238, 0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.4">
        <circle cx="12" cy="12" r="2" fill="#22d3ee" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    name: "GitHub Actions",
    role: "Automated CI/CD",
    color: "#a855f7",
    bg: "rgba(168, 85, 247, 0.14)",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#a855f7" strokeWidth="1.7" />
        <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="#c084fc" />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 130,
      damping: 20,
    },
  },
};

export default function HeroSection() {
  const tiltRef = useRef(null);

  useEffect(() => {
    const canTilt =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canTilt) return;

    let rafId = null;
    let latestX = 0;
    let latestY = 0;

    const applyTilt = () => {
      rafId = null;
      if (!tiltRef.current) return;
      const tiltX = (-latestY * 6).toFixed(2);
      const tiltY = (latestX * 6).toFixed(2);
      tiltRef.current.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    };

    const handleMouseMove = (e) => {
      latestX = (e.clientX / window.innerWidth - 0.5) * 2;
      latestY = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!rafId) rafId = requestAnimationFrame(applyTilt);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-transparent select-none py-16"
    >
      {/* Subtle cosmic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(3,6,20,0.04) 0%, rgba(3,6,20,0.62) 100%)",
          zIndex: 1,
        }}
      />

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center"
      >
        {/* Status Badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full border border-cyan-500/30 bg-slate-900/75 backdrop-blur-md mb-6 sm:mb-8 hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-950/40 max-w-full"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 animate-beacon" />
          <span className="text-[11px] sm:text-xs font-sans text-slate-200 font-medium tracking-wide truncate">
            BRAC University CSE <span className="text-slate-600 mx-1">•</span> Software Engineer (Python &amp; AI)
          </span>
        </motion.div>

        {/* Name with 3D mouse tilt + animated gradient */}
        <motion.div
          ref={tiltRef}
          variants={itemVariants}
          className="transition-transform duration-150 ease-out mb-3 sm:mb-4 w-full"
          style={{
            transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)",
            transformStyle: "preserve-3d",
            filter:
              "drop-shadow(0 14px 35px rgba(0, 220, 240, 0.22)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))",
          }}
        >
          <h1
            className="font-extrabold select-text inline-block animate-gradient-text"
            style={{
              fontFamily:
                "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: "clamp(2.65rem, 8.2vw, 6.4rem)",
              lineHeight: 1.15,
              paddingBottom: "0.1em",
              letterSpacing: "-0.02em",
              backgroundImage:
                "linear-gradient(120deg, #ffffff 0%, #e2e8f0 25%, #38bdf8 52%, #c084fc 78%, #ffffff 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Digonta Das
          </h1>
        </motion.div>

        {/* Role Presentation */}
        <motion.h2
          variants={itemVariants}
          className="text-lg sm:text-2xl md:text-3xl font-semibold text-slate-200 tracking-tight font-sans mb-4 sm:mb-5"
          style={{
            fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          Software Engineer <span className="text-cyan-400 font-light mx-1">&amp;</span> AI Engineer
        </motion.h2>

        {/* Concise Technical Summary */}
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-sm sm:text-base md:text-lg leading-relaxed text-slate-300 font-sans font-normal mb-6 sm:mb-8 px-1"
        >
          Building scalable <span className="text-cyan-300 font-medium">FastAPI</span> systems,{" "}
          <span className="text-purple-300 font-medium">RAG &amp; LLM workflows</span> &amp;{" "}
          <span className="text-blue-300 font-medium">3D medical vision</span> on PostgreSQL and Docker.
        </motion.p>

        {/* Tech Pill Badges */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-8 sm:mb-10 max-w-2xl"
        >
          {techBadges.map((label) => (
            <motion.span
              key={label}
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-sans font-medium text-slate-200 bg-slate-900/80 border border-cyan-500/25 hover:border-cyan-400/60 hover:text-white backdrop-blur-md transition-colors shadow-sm shadow-cyan-950/20"
            >
              {label}
            </motion.span>
          ))}
        </motion.div>

        {/* Interactive CTA Hub */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3.5 mb-10 sm:mb-12"
        >
          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="#projects"
            className="px-5 sm:px-6 py-2.5 sm:py-3 font-sans font-medium text-xs sm:text-sm rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/25 transition-all flex items-center gap-2"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="#certificates"
            className="px-4 sm:px-5 py-2.5 sm:py-3 font-sans font-medium text-xs sm:text-sm rounded-xl text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-400/40 transition-all shadow-sm"
          >
            Certificates
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="https://www.linkedin.com/in/digonta-das-836117241"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-5 py-2.5 sm:py-3 font-sans font-medium text-xs sm:text-sm rounded-xl text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>LinkedIn</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            href="/Digonta_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-5 py-2.5 sm:py-3 font-sans font-medium text-xs sm:text-sm rounded-xl text-purple-300 hover:text-white bg-purple-950/35 hover:bg-purple-900/45 border border-purple-500/35 hover:border-purple-400 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>Resume</span>
            <Download className="w-3.5 h-3.5 text-purple-400" />
          </motion.a>
        </motion.div>

        {/* ByteSpace-Style Water-Floating Stack Pill Blocks */}
        <motion.div
          variants={itemVariants}
          className="relative w-full max-w-6xl overflow-hidden water-marquee-wrapper marquee-mask pt-3 pb-7"
          aria-label="Core Engineering Stack"
        >
          {/* Subtle shimmering water horizon line behind the buoyant cards */}
          <div
            className="absolute left-6 right-6 bottom-5 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="water-stack-track gap-4 sm:gap-6 px-2">
            {[...waterStackCards, ...waterStackCards].map((stack, idx) => (
              <div
                key={`${stack.name}-${idx}`}
                className="water-stack-card px-4 py-2.5 pr-5 sm:px-5 sm:py-3 sm:pr-6 select-none cursor-default group"
                style={{
                  "--float-delay": `${(idx % 7) * -0.58}s`,
                  "--float-dur": `${3.8 + (idx % 4) * 0.45}s`,
                  "--stack-accent": stack.color,
                }}
              >
                <div className="water-glass-highlight" />

                <div
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 transition-transform duration-200 group-hover:scale-105"
                  style={{ backgroundColor: stack.bg }}
                >
                  {stack.icon}
                </div>

                <div className="flex flex-col text-left leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="font-outfit font-bold text-xs sm:text-sm text-white whitespace-nowrap">
                      {stack.name}
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="text-cyan-400 shrink-0"
                      aria-hidden="true"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 whitespace-nowrap mt-0.5">
                    {stack.role}
                  </span>
                </div>

                <div className="water-buoyant-shadow" />
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
