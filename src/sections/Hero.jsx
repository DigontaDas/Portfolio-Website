import { useEffect, useRef, useState } from "react";

const LINES = [
  "import { useState, useEffect } from 'react';",
  "import torch from 'pytorch';",
  "",
  "# Coronary Artery CNN — 3D Tile Model",
  "model = TileCNN3D(",
  "  input_shape=(64, 64, 64),",
  "  num_classes=2,",
  "  backbone='resnet50'",
  ")",
  "",
  "accuracy = model.evaluate(ct_scans)",
  "# acc: 94.7% | dataset: 281 samples",
];

function TerminalTyper() {
  const [displayed, setDisplayed] = useState([]);
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (lineIdx >= LINES.length) return;
    const line = LINES[lineIdx];
    if (charIdx <= line.length) {
      const t = setTimeout(
        () => {
          setDisplayed((prev) => {
            const next = [...prev];
            next[lineIdx] = line.slice(0, charIdx);
            return next;
          });
          setCharIdx((c) => c + 1);
        },
        line === "" ? 0 : 28
      );
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, line === "" ? 80 : 120);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx]);

  useEffect(() => {
    const b = setInterval(() => setBlink((v) => !v), 530);
    return () => clearInterval(b);
  }, []);

  const getColor = (line) => {
    if (!line) return "text-gray-600";
    if (line.startsWith("#")) return "text-green-400 opacity-70";
    if (line.startsWith("import")) return "text-purple-400";
    if (line.includes("=") && !line.startsWith(" ")) return "text-cyan-300";
    if (line.startsWith("  ")) return "text-yellow-300 opacity-80";
    if (line.startsWith("model") || line.startsWith("accuracy"))
      return "text-cyan-200";
    return "text-gray-300";
  };

  return (
    <div className="font-mono text-xs leading-relaxed select-none">
      {displayed.map((line, i) => (
        <div key={i} className={`${getColor(line)} whitespace-pre`}>
          {line || "\u00A0"}
        </div>
      ))}
      {lineIdx < LINES.length && (
        <div className="text-gray-300 whitespace-pre">
          {displayed[lineIdx] || ""}
          <span
            className="inline-block w-[7px] h-[13px] bg-cyan-400 align-middle ml-[1px]"
            style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}
          />
        </div>
      )}
    </div>
  );
}

export default function HeroSection() {
  const canvasRef = useRef(null);

  // Dot grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animFrame;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const spacing = 28;
      const cols = Math.ceil(canvas.width / spacing);
      const rows = Math.ceil(canvas.height / spacing);

      for (let r = 0; r <= rows; r++) {
        for (let c = 0; c <= cols; c++) {
          const x = c * spacing;
          const y = r * spacing;
          const dist = Math.sqrt(
            (x - canvas.width / 2) ** 2 + (y - canvas.height / 2) ** 2
          );
          const wave = Math.sin(dist * 0.018 - t * 0.7) * 0.5 + 0.5;
          const alpha = 0.06 + wave * 0.1;
          const radius = 0.8 + wave * 0.6;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0,220,240,${alpha})`;
          ctx.fill();
        }
      }
      t += 0.016;
      animFrame = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#080c0d" }}
    >
      {/* Animated dot grid */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />

      {/* Ambient glows */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10%",
          left: "-5%",
          width: "55%",
          height: "55%",
          background:
            "radial-gradient(ellipse, rgba(0,200,220,0.07) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          right: "-5%",
          width: "50%",
          height: "50%",
          background:
            "radial-gradient(ellipse, rgba(140,60,230,0.07) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />

      {/* Corner brackets */}
      <div
        className="absolute pointer-events-none"
        style={{ top: 60, left: 60, zIndex: 2 }}
      >
        <div
          style={{
            width: 24,
            height: 1,
            background: "rgba(0,220,240,0.25)",
            marginBottom: 0,
          }}
        />
        <div
          style={{
            width: 1,
            height: 24,
            background: "rgba(0,220,240,0.25)",
          }}
        />
      </div>
      <div
        className="absolute pointer-events-none"
        style={{ bottom: 60, right: 60, zIndex: 2 }}
      >
        <div
          style={{
            width: 1,
            height: 24,
            background: "rgba(160,80,255,0.25)",
            marginLeft: "auto",
          }}
        />
        <div
          style={{
            width: 24,
            height: 1,
            background: "rgba(160,80,255,0.25)",
            marginLeft: "auto",
          }}
        />
      </div>

      {/* Main content */}
      <div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16"
        style={{ paddingTop: 80 }}
      >
        {/* Left: Text */}
        <div className="flex-1 text-left">
          {/* Available badge */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
            <span
              className="w-2 h-2 rounded-full bg-emerald-400"
              style={{ animation: "pulse 2s infinite" }}
            />
            <span
              className="text-xs tracking-widest uppercase"
              style={{ color: "rgba(180,200,210,0.8)", fontFamily: "monospace" }}
            >
              Available for new ventures
            </span>
          </div>

          {/* Name */}
          <div
            className="text-sm tracking-widest uppercase mb-3"
            style={{ color: "rgba(0,220,240,0.6)", fontFamily: "monospace" }}
          >
            Hi, I am{" "}
            <span style={{ color: "rgba(0,220,240,0.9)" }}>Digonta Das</span>
          </div>

          {/* Headline */}
          <h1
            className="font-black leading-none mb-4"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              color: "#e8f4f6",
              letterSpacing: "-0.03em",
            }}
          >
            AI Researcher
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, #00dcf0 0%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MERN STACK ENGINEER
            </span>
          </h1>

          {/* Subtext */}
          <p
            className="mb-8 max-w-md leading-relaxed"
            style={{ color: "rgba(160,185,195,0.85)", fontSize: "1.05rem" }}
          >
            Building intelligent systems and immersive web experiences.
            Currently researching{" "}
            <span style={{ color: "rgba(0,220,240,0.85)" }}>
              3D Tile CNN for coronary artery blockage detection
            </span>{" "}
            at BRAC University.
          </p>

          {/* Tech pills */}
          <div className="flex flex-wrap gap-2 mb-8">
            {["React", "Node.js", "MongoDB", "Python", "PyTorch", "Three.js"].map(
              (tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded text-xs font-mono border"
                  style={{
                    borderColor: "rgba(0,220,240,0.15)",
                    background: "rgba(0,220,240,0.05)",
                    color: "rgba(0,220,240,0.7)",
                  }}
                >
                  {tech}
                </span>
              )
            )}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="group px-7 py-3 font-bold uppercase text-sm tracking-widest rounded transition-all duration-200"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "rgba(0,220,240,0.12)",
                border: "1px solid rgba(0,220,240,0.35)",
                color: "#00dcf0",
                boxShadow: "0 0 0 0 rgba(0,220,240,0)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 0 24px rgba(0,220,240,0.25)";
                e.currentTarget.style.background = "rgba(0,220,240,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 0 0 rgba(0,220,240,0)";
                e.currentTarget.style.background = "rgba(0,220,240,0.12)";
              }}
            >
              View Projects
            </a>
            <a
              href="#about"
              className="px-7 py-3 font-bold uppercase text-sm tracking-widest rounded transition-all duration-200"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "rgba(200,215,220,0.8)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(160,80,255,0.35)";
                e.currentTarget.style.color = "rgba(200,180,255,0.95)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                e.currentTarget.style.color = "rgba(200,215,220,0.8)";
              }}
            >
              About me →
            </a>
          </div>
        </div>

        {/* Right: Terminal */}
        <div
          className="flex-shrink-0 w-full lg:w-[420px] rounded-xl overflow-hidden"
          style={{
            border: "1px solid rgba(0,220,240,0.12)",
            background: "rgba(8,14,16,0.85)",
            boxShadow:
              "0 0 60px rgba(0,220,240,0.06), inset 0 1px 0 rgba(255,255,255,0.04)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Terminal title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{
              borderBottom: "1px solid rgba(255,255,255,0.06)",
              background: "rgba(255,255,255,0.025)",
            }}
          >
            <div className="w-3 h-3 rounded-full bg-red-500 opacity-70" />
            <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-70" />
            <div className="w-3 h-3 rounded-full bg-green-500 opacity-70" />
            <span
              className="ml-3 text-xs tracking-widest"
              style={{ color: "rgba(150,170,175,0.5)", fontFamily: "monospace" }}
            >
              thesis_model.py
            </span>
          </div>
          {/* Terminal body */}
          <div className="p-5 min-h-[220px]">
            <TerminalTyper />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        style={{ zIndex: 10, opacity: 0.35 }}
      >
        <span
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: "#80a0a8", fontFamily: "monospace" }}
        >
          Scroll
        </span>
        <div
          className="w-[1px] h-10"
          style={{
            background: "linear-gradient(to bottom, #00dcf0, transparent)",
          }}
        />
      </div>
    </section>
  );
}
