import { useState } from "react";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { myProjects } from '../constants/index.js'; // Keeping your data source

// Map your tech names to colors for Claude's tag system
const stackColors = {
  React: "#61dafb",
  "Node.js": "#6cc24a",
  MongoDB: "#47a248",
  Python: "#ffd43b",
  PyTorch: "#ee4c2c",
  // Add others as needed
};

export default function ProjectShowcase() {
  const [active, setActive] = useState(0);
  const project = myProjects[active];

  // Keeping your GSAP animation logic
  useGSAP(() => {
    gsap.fromTo(`.animatedText`, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 });
  }, [active]);

  return (
    <section style={{ background: "#060a0b", padding: "6rem 1.5rem" }} id="projects">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <h2 className="head-text" style={{ color: "#e0eef2", marginBottom: "3rem" }}>My Selected Work</h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
          
          {/* Content Card */}
          <div style={{
              background: "rgba(12,20,24,0.9)",
              border: `1px solid #00dcf022`,
              borderRadius: 16,
              padding: "2.5rem",
              minHeight: 400
          }}>
            <h3 className="animatedText" style={{ fontSize: "1.85rem", fontWeight: 700, color: "#dceef4", marginBottom: 6 }}>
              {project.title}
            </h3>
            <p className="animatedText" style={{ color: "rgba(160,185,195,0.85)", lineHeight: 1.75, marginBottom: 28 }}>
              {project.desc}
            </p>

            {/* Tech Stack Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {project.tags.map((tag) => (
                <span key={tag.name} style={{
                    fontSize: 10,
                    padding: "4px 10px",
                    borderRadius: 4,
                    border: `1px solid ${stackColors[tag.name] || "#888"}33`,
                    color: stackColors[tag.name] || "#aaa",
                    background: `${stackColors[tag.name] || "#888"}0d`,
                }}>
                  {tag.name}
                </span>
              ))}
            </div>

            <a href={project.href} target="_blank" style={{ color: "#00dcf0", textDecoration: "none", fontWeight: 600 }}>
              Check Live Site ↗
            </a>
          </div>

          {/* Preview Panel (Replacing the 3D Canvas) */}
          <div style={{ background: "rgba(8,14,16,0.8)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden", minHeight: 400, display: "flex", flexDirection: "column" }}>
             <div style={{ display: "flex", gap: 8, padding: "12px 16px", background: "rgba(255,255,255,0.02)" }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
             </div>
             <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* You can put an image of the project here using project.spotlight */}
                <img src={project.spotlight} style={{ width: '80%', borderRadius: 8, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }} alt="preview" />
             </div>
          </div>
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginTop: 32 }}>
            <button onClick={() => setActive(prev => prev === 0 ? myProjects.length - 1 : prev - 1)}>←</button>
            <button onClick={() => setActive(prev => prev === myProjects.length - 1 ? 0 : prev + 1)}>→</button>
        </div>
      </div>
    </section>
  );
}
