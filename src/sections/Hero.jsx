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
        
        {/* Clean, Modern Status Badge - No AI Beeping Dot */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-slate-700/60 bg-slate-900/60 backdrop-blur-md mb-8 hover:border-slate-500/80 transition-all shadow-sm">
          <span className="text-xs font-sans text-slate-300 font-medium tracking-wide">
            BRAC University CSE <span className="text-slate-600 mx-1.5">•</span> Full Stack Developer & AI Engineer
          </span>
        </div>

        {/* 3D Name - Razor-Sharp, High-Impact Chiseled 3D Typography */}
        <div
          className="transition-transform duration-100 ease-out mb-4"
          style={{
            transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transformStyle: "preserve-3d",
            willChange: "transform",
          }}
        >
          <h1
            className="font-black tracking-tight uppercase leading-none select-text"
            style={{
              fontFamily: "'Space Grotesk', 'Outfit', sans-serif",
              fontSize: "clamp(3.4rem, 8.5vw, 6.8rem)",
              color: "#ffffff",
              WebkitFontSmoothing: "antialiased",
              MozOsxFontSmoothing: "grayscale",
              textRendering: "optimizeLegibility",
              /* Razor-sharp 3D stepped extrusion with zero blur radius */
              textShadow: `
                0 1px 0 #d9e2ec,
                0 2px 0 #bcccdc,
                0 3px 0 #9fb3c8,
                0 4px 0 #829ab1,
                0 5px 0 #627d98,
                0 6px 0 #486581,
                0 7px 0 #334e68,
                0 8px 0 #102a43,
                0 10px 16px rgba(0, 0, 0, 0.85)
              `,
            }}
          >
            Digonta Das
          </h1>
        </div>

        {/* Clean Role Presentation */}
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-200 tracking-tight font-sans mb-5"
          style={{
            fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          Full Stack Developer <span className="text-cyan-400 font-light mx-1">&amp;</span> AI Engineer
        </h2>

        {/* Technical Summary Description */}
        <p
          className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-300 font-sans font-normal mb-8"
          style={{
            fontFamily: "'Inter', 'Plus Jakarta Sans', system-ui, sans-serif",
          }}
        >
          Architecting robust full-stack web applications and intelligent AI systems. Specialized in modern React and Next.js architectures, scalable backend services, and production deep learning pipelines.
        </p>

        {/* Clean Pill Tags - No AI Beeping Dots */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10 max-w-2xl">
          {[
            "Full Stack Development",
            "AI & Deep Learning",
            "React & Next.js",
            "Node.js & Python",
            "Cloud & Scalable APIs",
          ].map((label) => (
            <span
              key={label}
              className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-sans font-medium text-slate-300 bg-slate-900/70 border border-slate-800 hover:border-slate-600 hover:text-white backdrop-blur-md transition-all shadow-sm"
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

