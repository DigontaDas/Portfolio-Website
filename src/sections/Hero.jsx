import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const LINES = [
  "import torch",
  "from thesis_lib import TiledCNN3D",
  "",
  "# Current Research: Coronary Artery Blockage",
  "model = TiledCNN3D(",
  "  input_size=(64, 64, 64),",
  "  stride='tiled',",
  "  efficiency_mode=True",
  ")",
  "",
  "print('Loading Ibrahim Cardiac Hospital data...')",
  "accuracy = model.train(ct_scans)"
];
function Typewriter({ text, delay = 100 }) {
  const [currentText, setCurrentText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
}
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

/* ===================== 3D TILE CNN SCANNER =====================
   Signature element: a volumetric grid of "tiles" (voxel cubes) that
   represents the 3D-Tiled-CNN architecture from the thesis. A scan
   plane sweeps through the volume the way the model sweeps a receptive
   field across CT-scan voxels; tiles near the plane light up cyan→purple
   (the exact gradient from the banner/logo) as if being "read" by the
   network, then fade back to dim navy. This is built from the subject
   matter itself rather than a generic particle field.
=================================================================== */
function TileCNNScanner() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(5.6, 3.4, 6.4);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // ---- Volumetric tile grid (the "3D Tiled CNN" input volume) ----
    const GRID = 7; // odd so there's a true center tile
    const SPACING = 0.62;
    const TILE = 0.46;
    const half = ((GRID - 1) * SPACING) / 2;

    const cyan = new THREE.Color("#00dcf0");
    const purple = new THREE.Color("#a855f7");
    const dim = new THREE.Color("#0d3b42");

    const geometry = new THREE.BoxGeometry(TILE, TILE, TILE);
    const edgesGeo = new THREE.EdgesGeometry(geometry);

    const tiles = [];

    for (let x = 0; x < GRID; x++) {
      for (let y = 0; y < GRID; y++) {
        for (let z = 0; z < GRID; z++) {
          const px = x * SPACING - half;
          const py = y * SPACING - half;
          const pz = z * SPACING - half;

          // Sparse occupancy: carve a soft "vessel-like" branching
          // structure rather than a solid cube, echoing coronary
          // artery geometry without depicting anything literal/medical.
          const r = Math.sqrt(px * px + pz * pz);
          const branch =
            Math.abs(Math.sin(py * 2.1 + px * 1.3)) < 0.42 && r < 1.9;
          const core = r < 0.5;
          if (!branch && !core) continue;

          const mat = new THREE.MeshBasicMaterial({
            color: dim.clone(),
            transparent: true,
            opacity: 0.16,
          });
          const mesh = new THREE.Mesh(geometry, mat);
          mesh.position.set(px, py, pz);
          group.add(mesh);

          const lineMat = new THREE.LineBasicMaterial({
            color: 0x1a5560,
            transparent: true,
            opacity: 0.35,
          });
          const edges = new THREE.LineSegments(edgesGeo, lineMat);
          edges.position.set(px, py, pz);
          group.add(edges);

          tiles.push({ mesh, edges, py, baseOpacity: 0.16 });
        }
      }
    }

    // ---- Scan plane: sweeps through Y, "reading" the tiled volume ----
    const planeGeo = new THREE.PlaneGeometry(
      GRID * SPACING + 0.6,
      GRID * SPACING + 0.6
    );
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x00dcf0,
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
    });
    const scanPlane = new THREE.Mesh(planeGeo, planeMat);
    scanPlane.rotation.x = Math.PI / 2;
    group.add(scanPlane);

    const planeEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(planeGeo),
      new THREE.LineBasicMaterial({ color: 0x00dcf0, transparent: true, opacity: 0.5 })
    );
    planeEdges.rotation.x = Math.PI / 2;
    group.add(planeEdges);

    // ---- Bounding wireframe (the full volumetric "tile" boundary) ----
    const boundGeo = new THREE.BoxGeometry(
      GRID * SPACING,
      GRID * SPACING,
      GRID * SPACING
    );
    const boundEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(boundGeo),
      new THREE.LineBasicMaterial({ color: 0x2a6a72, transparent: true, opacity: 0.25 })
    );
    group.add(boundEdges);

    group.rotation.y = 0.55;
    group.rotation.x = -0.18;

    let raf;
    let t = 0;
    const scanRange = half + 0.4;

    const animate = () => {
      t += 0.012;
      group.rotation.y += 0.0016;

      const scanY = Math.sin(t * 0.9) * scanRange;
      scanPlane.position.y = scanY;
      planeEdges.position.y = scanY;

      tiles.forEach((tile) => {
        const dist = Math.abs(tile.py - scanY);
        const proximity = Math.max(0, 1 - dist / 0.85);
        if (proximity > 0.01) {
          const mixed = cyan.clone().lerp(purple, (tile.py + half) / (half * 2));
          tile.mesh.material.color.lerp(mixed, 0.35);
          tile.mesh.material.opacity =
            tile.baseOpacity + proximity * 0.55;
          tile.edges.material.opacity = 0.35 + proximity * 0.5;
          tile.edges.material.color.lerp(mixed, 0.25);
        } else {
          tile.mesh.material.color.lerp(dim, 0.05);
          tile.mesh.material.opacity += (tile.baseOpacity - tile.mesh.material.opacity) * 0.08;
          tile.edges.material.opacity += (0.35 - tile.edges.material.opacity) * 0.08;
        }
      });

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      geometry.dispose();
      edgesGeo.dispose();
      planeGeo.dispose();
      boundGeo.dispose();
      tiles.forEach((tile) => {
        tile.mesh.material.dispose();
        tile.edges.material.dispose();
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#080c14" }}
    >
      {/* 3D Tile CNN scanning visualization — the signature element */}
      <TileCNNScanner />

      {/* Ambient glows matched to banner palette (navy base, cyan + violet bloom) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-15%",
          left: "-10%",
          width: "60%",
          height: "60%",
          background:
            "radial-gradient(ellipse, rgba(0,180,220,0.10) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-15%",
          left: "-5%",
          width: "65%",
          height: "65%",
          background:
            "radial-gradient(ellipse, rgba(20,60,180,0.16) 0%, transparent 70%)",
          zIndex: 1,
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "-10%",
          right: "-8%",
          width: "50%",
          height: "50%",
          background:
            "radial-gradient(ellipse, rgba(140,60,230,0.09) 0%, transparent 70%)",
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
            <Typewriter text="Hi, I am " delay={100} />
            <span style={{ color: "rgba(0,220,240,0.9)" }}>
              <Typewriter text="Digonta Das" delay={120} />
            </span>
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
            <Typewriter text="APPLIED AI ENGINEER" delay={300} />
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, #00dcf0 0%, #a855f7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              MEDICAL VISION RESEARCHER
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
