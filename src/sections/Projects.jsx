import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Play, Code2, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';

import { myProjects } from '../constants/index.js';
import CanvasLoader from '../components/Loading.jsx';
import DemoComputer from '../components/DemoComputer.jsx';

const projectCount = myProjects.length;

const Projects = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const controlsRef = useRef(null);

    const handleNavigation = (direction) => {
        setSelectedProjectIndex((prevIndex) => {
            if (direction === 'previous') {
                return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
            }
            return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
        });
    };

    const handleZoomIn = () => {
        if (controlsRef.current) {
            controlsRef.current.dollyIn(1.25);
            controlsRef.current.update();
        }
    };

    const handleZoomOut = () => {
        if (controlsRef.current) {
            controlsRef.current.dollyOut(1.25);
            controlsRef.current.update();
        }
    };

    const handleResetZoom = () => {
        if (controlsRef.current) {
            controlsRef.current.reset();
        }
    };

    const currentProject = myProjects[selectedProjectIndex];

    return (
        <section className="c-space my-20 sm:my-24 relative z-10" id="projects">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6 }}
                className="flex justify-between items-end flex-wrap gap-4 mb-6"
            >
                <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-sans">
                        Featured Portfolio Work
                    </span>
                    <h2 className="head-text mt-1">Selected Projects</h2>
                </div>
                <div className="text-slate-300 font-mono text-xs px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-cyan-500/25 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-beacon" />
                    <span>
                        <span className="text-white font-semibold">0{selectedProjectIndex + 1}</span> / 0{projectCount}
                    </span>
                </div>
            </motion.div>

            {/* Visual 5-Project Selector Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-6">
                {myProjects.map((project, idx) => {
                    const isActive = idx === selectedProjectIndex;
                    return (
                        <button
                            key={project.id}
                            type="button"
                            onClick={() => setSelectedProjectIndex(idx)}
                            className={`relative text-left px-3.5 py-2.5 rounded-xl border transition-all cursor-pointer overflow-hidden ${
                                isActive
                                    ? 'border-cyan-400/60 bg-slate-900/80 text-white shadow-[0_0_24px_rgba(0,220,240,0.16)]'
                                    : 'border-slate-800/90 bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                            }`}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="project-selector-glow"
                                    transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 via-blue-500/10 to-purple-500/15 pointer-events-none"
                                />
                            )}
                            <div className="relative z-10 flex items-center justify-between gap-2 mb-0.5">
                                <span className="text-[10px] font-mono text-cyan-400">0{idx + 1}</span>
                                <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-white/5 text-slate-300 truncate">
                                    {project.badge}
                                </span>
                            </div>
                            <p className="relative z-10 text-xs sm:text-sm font-semibold font-outfit truncate">
                                {project.title}
                            </p>
                        </button>
                    );
                })}
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 sm:gap-6 w-full">
                {/* Left Card: Visual Project Details */}
                <div className="flex flex-col gap-5 relative sm:p-8 p-5 ocean-card rounded-2xl overflow-hidden">
                    {currentProject.spotlight && (
                        <div className="absolute top-0 right-0 pointer-events-none opacity-35">
                            <img
                                src={currentProject.spotlight}
                                alt=""
                                className="w-full h-72 object-cover rounded-xl"
                            />
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentProject.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -12 }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                            className="relative z-10 flex flex-col gap-5 flex-1"
                        >
                            {/* Top Badge Row */}
                            <div className="flex justify-between items-center gap-3 flex-wrap">
                                <div className="flex items-center gap-2.5">
                                    {currentProject.logo ? (
                                        <div
                                            className="p-2 backdrop-blur-xl w-fit rounded-xl border border-white/10 shrink-0"
                                            style={currentProject.logoStyle || {}}
                                        >
                                            <img
                                                className="w-7 h-7 object-contain"
                                                src={currentProject.logo}
                                                alt={currentProject.title}
                                            />
                                        </div>
                                    ) : (
                                        <span className="px-3 py-1 rounded-lg border border-cyan-500/30 bg-cyan-950/40 font-mono text-xs text-cyan-300">
                                            0{selectedProjectIndex + 1}
                                        </span>
                                    )}
                                    <span className="text-xs font-mono text-purple-300 px-2.5 py-1 rounded-lg bg-purple-950/40 border border-purple-500/25">
                                        {currentProject.badge}
                                    </span>
                                </div>

                                {currentProject.texture ? (
                                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                                        <Play className="w-3 h-3 fill-cyan-400 text-cyan-400" />
                                        Video Demo
                                    </span>
                                ) : (
                                    <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                                        <Code2 className="w-3.5 h-3.5 text-purple-400" />
                                        Interactive Preview
                                    </span>
                                )}
                            </div>

                            {/* Title & Concise One-Liner */}
                            <div>
                                <h3 className="text-white text-2xl sm:text-3xl font-bold font-outfit tracking-tight">
                                    {currentProject.title}
                                </h3>
                                <p className="text-xs font-mono text-cyan-400 mt-1">
                                    {currentProject.subtitle}
                                </p>
                                <p className="text-sm sm:text-base leading-relaxed text-slate-300 font-sans mt-3">
                                    {currentProject.desc}
                                </p>
                            </div>

                            {/* Visual Highlights Grid (Replaces dense paragraphs) */}
                            <div className="grid grid-cols-3 gap-2.5">
                                {currentProject.highlights.map((h) => (
                                    <div
                                        key={h.label}
                                        className="p-2.5 sm:p-3 rounded-xl bg-slate-900/70 border border-slate-700/60 hover:border-cyan-400/40 transition-colors"
                                    >
                                        <span className="block text-[10px] font-mono uppercase tracking-wider text-slate-400 truncate">
                                            {h.label}
                                        </span>
                                        <span className="block text-xs sm:text-sm font-semibold text-white mt-1 truncate">
                                            {h.value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Tags + External Action */}
                            <div className="flex items-center justify-between flex-wrap gap-3 mt-auto pt-4 border-t border-slate-800/80">
                                <div className="flex items-center gap-2 flex-wrap">
                                    {currentProject.tags.map((tag) => (
                                        <div
                                            key={tag.id}
                                            className="px-2.5 py-1 rounded-md bg-cyan-950/35 border border-cyan-500/20 text-xs font-mono text-cyan-200 flex items-center gap-1.5"
                                        >
                                            <img
                                                src={tag.path}
                                                alt={tag.name}
                                                className="w-3.5 h-3.5 object-contain"
                                            />
                                            <span>{tag.name}</span>
                                        </div>
                                    ))}
                                </div>

                                <motion.a
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="flex items-center gap-2 text-xs font-mono text-white px-4 py-2 rounded-xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 hover:border-cyan-300 transition-all"
                                    href={currentProject.href}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <span>{currentProject.ctaLabel}</span>
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </motion.a>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Prev / Next Controls */}
                    <div className="flex justify-between items-center z-10 pt-3 border-t border-slate-800/60">
                        <button
                            type="button"
                            className="px-3.5 py-2 rounded-xl bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/40 text-cyan-200 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                            onClick={() => handleNavigation('previous')}
                            aria-label="Previous project"
                        >
                            <ChevronLeft className="w-4 h-4" />
                            <span>Prev</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                            {myProjects.map((p, idx) => (
                                <button
                                    key={p.id}
                                    type="button"
                                    onClick={() => setSelectedProjectIndex(idx)}
                                    aria-label={`Select ${p.title}`}
                                    className={`h-2 rounded-full transition-all cursor-pointer ${
                                        idx === selectedProjectIndex
                                            ? 'w-6 bg-gradient-to-r from-cyan-400 to-purple-400'
                                            : 'w-2 bg-slate-700 hover:bg-slate-500'
                                    }`}
                                />
                            ))}
                        </div>

                        <button
                            type="button"
                            className="px-3.5 py-2 rounded-xl bg-purple-950/30 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/40 text-purple-200 text-xs font-mono flex items-center gap-1.5 cursor-pointer transition-all active:scale-95"
                            onClick={() => handleNavigation('next')}
                            aria-label="Next project"
                        >
                            <span>Next</span>
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Right Card: Interactive 3D Demo Computer */}
                <div className="ocean-card rounded-2xl h-[320px] sm:h-[420px] lg:h-full lg:min-h-[480px] relative overflow-hidden group">
                    {/* Zoom / Reset Controls */}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 flex flex-col gap-1.5 bg-[#070c24]/90 backdrop-blur-md p-1.5 rounded-xl border border-cyan-500/20 shadow-xl">
                        <button
                            type="button"
                            onClick={handleZoomIn}
                            title="Zoom In 3D Model"
                            aria-label="Zoom In 3D Model"
                            className="w-8 h-8 rounded-lg bg-cyan-950/40 hover:bg-cyan-500/30 text-white flex items-center justify-center transition-colors border border-cyan-500/30 cursor-pointer"
                        >
                            <ZoomIn className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={handleZoomOut}
                            title="Zoom Out 3D Model"
                            aria-label="Zoom Out 3D Model"
                            className="w-8 h-8 rounded-lg bg-purple-950/40 hover:bg-purple-500/30 text-white flex items-center justify-center transition-colors border border-purple-500/30 cursor-pointer"
                        >
                            <ZoomOut className="w-4 h-4" />
                        </button>
                        <button
                            type="button"
                            onClick={handleResetZoom}
                            title="Reset 3D Camera"
                            aria-label="Reset 3D Camera"
                            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center transition-colors border border-slate-700 cursor-pointer"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Interactive Hint */}
                    <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070c24]/90 backdrop-blur-md border border-cyan-500/25 text-slate-300 shadow-md max-w-[calc(100%-24px)]">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0 animate-beacon" />
                        <span className="font-mono text-[10px] sm:text-[11px] truncate">
                            3D Viewport · Drag to Rotate
                        </span>
                    </div>

                    <Canvas>
                        <ambientLight intensity={Math.PI * 0.9} />
                        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00dcf0" />
                        <directionalLight position={[-10, 5, -5]} intensity={1.0} color="#a855f7" />
                        <Center>
                            <Suspense fallback={<CanvasLoader />}>
                                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                                    <DemoComputer
                                        texture={currentProject.texture}
                                        screenType={currentProject.screenType}
                                    />
                                </group>
                            </Suspense>
                        </Center>
                        <OrbitControls
                            ref={controlsRef}
                            maxPolarAngle={Math.PI / 2}
                            enableZoom={true}
                            minDistance={1.8}
                            maxDistance={12}
                            zoomSpeed={1.0}
                            makeDefault
                        />
                    </Canvas>
                </div>
            </div>
        </section>
    );
};

export default Projects;
