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
        
        {/* Creative Aerospace Telemetry Chip */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-950/40 backdrop-blur-md shadow-lg shadow-cyan-950/40 mb-6 hover:border-cyan-400/60 transition-all">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-[11px] font-mono tracking-widest text-cyan-200 uppercase font-semibold">
            BRAC University CSE • AI & Medical Imaging Researcher
          </span>
        </div>

        {/* Creative Monospace Tagline */}
        <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase mb-3 text-cyan-300 font-bold flex items-center gap-2">
          <span className="text-cyan-500/60 font-mono">//</span>
          <span>PORTFOLIO & CLINICAL RESEARCH ARCHIVE</span>
          <span className="text-cyan-500/60 font-mono">//</span>
        </p>

        {/* 3D Name - Razor-Sharp, Zero-Blur, High-Impact Chiseled 3D Typography */}
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

        {/* Creative 3D Role Presentation with Character */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 max-w-3xl w-full">
          <span className="h-[1px] flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-r from-transparent to-cyan-400/80" />
          <h2
            className="font-bold tracking-[0.16em] uppercase text-xs sm:text-base md:text-lg text-cyan-300 font-mono"
            style={{
              textShadow: "0 2px 10px rgba(0, 220, 240, 0.35)",
            }}
          >
            AI Engineer <span className="text-purple-400 font-sans mx-1">•</span> Medical Image Processing Researcher
          </h2>
          <span className="h-[1px] flex-1 max-w-[60px] sm:max-w-[100px] bg-gradient-to-l from-transparent to-cyan-400/80" />
        </div>

        {/* Technical Summary Description */}
        <p className="max-w-2xl text-sm sm:text-base leading-relaxed text-slate-200 font-sans mb-8">
          Leading clinical AI research in <span className="text-white font-semibold">3D Volumetric Tiled-CNNs</span> for coronary artery blockage detection. Specialized in medical imaging pipelines, multi-modal MRI segmentation, and production AI platforms.
        </p>

        {/* Creative Clinical Focus Telemetry Chips - No Emojis */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-10 max-w-3xl">
          {[
            "Volumetric 3D CNN",
            "Ibrahim Cardiac CT Scans",
            "HU Normalization & Loss",
            "Cross-Vendor MRI Generalization",
            "PyTorch & CUDA Pipelines",
          ].map((label) => (
            <div
              key={label}
              className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-slate-200 border border-slate-700/80 bg-slate-900/60 backdrop-blur-md shadow-md flex items-center gap-2 hover:border-cyan-500/50 hover:text-white transition-all"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>{label}</span>
            </div>
          ))}
        </div>

        {/* Creative Interactive CTA Hub */}
        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4">
          <a
            href="#projects"
            className="px-7 py-3.5 font-bold uppercase text-xs tracking-widest rounded-xl transition-all duration-300 text-white bg-cyan-600/30 hover:bg-cyan-500/40 border border-cyan-400/50 hover:border-cyan-300 shadow-lg shadow-cyan-950/60 hover:shadow-cyan-500/25 flex items-center gap-2 active:scale-95"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span>Explore Research & Projects</span>
            <span className="text-cyan-300 font-mono">→</span>
          </a>

          <a
            href="#about"
            className="px-6 py-3.5 font-bold uppercase text-xs tracking-widest rounded-xl transition-all duration-300 text-slate-200 hover:text-white bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700 hover:border-purple-500/50 shadow-md active:scale-95"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            About Me
          </a>

          <a
            href="https://www.linkedin.com/in/digonta-das-836117241"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 font-bold uppercase text-xs tracking-widest rounded-xl transition-all duration-300 text-cyan-300 hover:text-white bg-cyan-950/30 hover:bg-cyan-900/40 border border-cyan-500/30 hover:border-cyan-400 shadow-md flex items-center gap-1.5 active:scale-95"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span>LinkedIn</span>
            <span className="text-cyan-400">↗</span>
          </a>

          <a
            href="/Digonta_CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3.5 font-bold uppercase text-xs tracking-widest rounded-xl transition-all duration-300 text-purple-300 hover:text-white bg-purple-950/30 hover:bg-purple-900/40 border border-purple-500/30 hover:border-purple-400 shadow-md flex items-center gap-1.5 active:scale-95"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span>Resume (PDF)</span>
            <span className="text-purple-400">↓</span>
          </a>
        </div>
      </div>

      {/* Centered Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
        style={{ opacity: 0.7 }}
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-cyan-300/80 font-mono font-medium">
          Scroll to enter space
        </span>
        <div className="w-[1.5px] h-8 bg-gradient-to-b from-cyan-400 via-cyan-400/40 to-transparent animate-pulse" />
      </div>
    </section>
  );
}

