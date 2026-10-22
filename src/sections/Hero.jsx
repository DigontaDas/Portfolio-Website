import { useState, useEffect } from "react";

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const tiltX = -mousePos.y * 7;
  const tiltY = mousePos.x * 7;

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent select-none pt-12 pb-16"
    >
      {/* Subtle cosmic vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(3,6,20,0.05) 0%, rgba(3,6,20,0.6) 100%)",
          zIndex: 1,
        }}
      />

      {/* Main Content - Centered in the middle of the screen */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        
        {/* Clean Modern Status Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-slate-900/70 backdrop-blur-md mb-8 hover:border-cyan-400/60 transition-all shadow-lg shadow-cyan-950/40">
          <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00dcf0] animate-pulse" />
          <span className="text-xs font-sans text-slate-200 font-medium tracking-wide">
            BRAC University CSE <span className="text-slate-600 mx-1.5">•</span> Software Engineer (Python &amp; AI Systems)
          </span>
        </div>

        {/* Name - Clean, High-End Typography with Perfect Letterforms */}
        <div
          className="transition-transform duration-100 ease-out mb-4"
          style={{
            transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transformStyle: "preserve-3d",
            willChange: "transform",
            filter: "drop-shadow(0 14px 35px rgba(0, 220, 240, 0.22)) drop-shadow(0 2px 4px rgba(0, 0, 0, 0.9))",
          }}
        >
          <h1
            className="font-extrabold select-text inline-block"
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontSize: "clamp(3.3rem, 8.2vw, 6.4rem)",
              lineHeight: 1.2,
              paddingBottom: "0.14em",
              paddingTop: "0.02em",
              letterSpacing: "-0.01em",
              background: "linear-gradient(135deg, #ffffff 0%, #f1f5f9 28%, #7dd3fc 65%, #c084fc 95%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Digonta Das
          </h1>
        </div>

        {/* Clean Role Presentation */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-200 tracking-tight font-sans mb-5"
          style={{
            fontFamily: "'Outfit', 'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          Software Engineer <span className="text-cyan-400 font-light mx-1">&amp;</span> AI Engineer
        </h2>

        {/* Technical Summary Description */}
        <p
          className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300 font-sans font-normal mb-8"
          style={{
            fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
          }}
        >
          Building scalable <span className="text-cyan-300 font-medium">FastAPI</span> systems, <span className="text-purple-300 font-medium">agentic workflows</span> &amp; <span className="text-blue-300 font-medium">deep learning pipelines</span>. Type-safe Python backends on PostgreSQL and Docker, powering production RAG, speech AI and 3D medical computer vision.
        </p>

        {/* Tech Pill Badges */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10 max-w-2xl">
          {[
            "Python & FastAPI",
            "PostgreSQL & PGVector",
            "RAG & LangChain",
            "PyTorch & 3D Vision",
            "Docker & CI/CD",
          ].map((label) => (
            <span
              key={label}
              className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-sans font-medium text-slate-200 bg-slate-900/80 border border-cyan-500/25 hover:border-cyan-400/60 hover:text-white backdrop-blur-md transition-all shadow-sm shadow-cyan-950/20"
            >
              {label}
            </span>
          ))}
        </div>

        {/* Interactive CTA Hub */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          <a
            href="#projects"
            className="px-6 py-3 font-sans font-medium text-sm rounded-xl text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/30 transition-all flex items-center gap-2 active:scale-95"
          >
            <span>Explore Projects</span>
            <span>→</span>
          </a>

          <a
            href="#about"
            className="px-5 py-3 font-sans font-medium text-sm rounded-xl text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 hover:border-slate-600 transition-all active:scale-95 shadow-sm"
          >
            About Me
          </a>

          <a
            href="https://www.linkedin.com/in/digonta-das-836117241"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 font-sans font-medium text-sm rounded-xl text-slate-300 hover:text-white bg-slate-900/60 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <span>LinkedIn</span>
            <span className="text-slate-400 text-xs">↗</span>
          </a>

          <a
            href="/Digonta_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 font-sans font-medium text-sm rounded-xl text-purple-300 hover:text-white bg-purple-950/30 hover:bg-purple-900/40 border border-purple-500/30 hover:border-purple-400 transition-all flex items-center gap-1.5 active:scale-95 shadow-sm"
          >
            <span>Resume</span>
            <span className="text-purple-400 text-xs">↓</span>
          </a>
        </div>
      </div>

      {/* Centered Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
        style={{ opacity: 0.7 }}
      >
        <span className="text-xs tracking-wider text-slate-400 font-sans font-medium">
          Scroll to explore
        </span>
        <div className="w-[1.5px] h-8 bg-gradient-to-b from-cyan-400 via-cyan-400/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

