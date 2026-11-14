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

const marqueeStack = [
  "Python",
  "FastAPI",
  "PostgreSQL",
  "PGVector",
  "PyTorch",
  "Hugging Face",
  "OpenAI API",
  "LLMOps",
  "WhisperAI",
  "Docker",
  "React.js",
  "GitHub Actions",
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
        className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center justify-center text-center"
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

        {/* Infinite Tech Stack Marquee (Mihir-inspired motion strip) */}
        <motion.div
          variants={itemVariants}
          className="w-full max-w-3xl overflow-hidden marquee-wrapper marquee-mask py-2"
        >
          <div className="animate-marquee items-center gap-6">
            {[...marqueeStack, ...marqueeStack].map((item, idx) => (
              <span
                key={`${item}-${idx}`}
                className="flex items-center gap-2 text-xs font-mono text-slate-400 whitespace-nowrap"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/70" />
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
