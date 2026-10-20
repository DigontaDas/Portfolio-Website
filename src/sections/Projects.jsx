import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

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
            } else {
                return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
            }
        });
    };

    const handleZoomIn = () => {
        if (controlsRef.current) {
            controlsRef.current.dollyIn(1.3);
            controlsRef.current.update();
        }
    };

    const handleZoomOut = () => {
        if (controlsRef.current) {
            controlsRef.current.dollyOut(1.3);
            controlsRef.current.update();
        }
    };

    const handleResetZoom = () => {
        if (controlsRef.current) {
            controlsRef.current.reset();
        }
    };

    useGSAP(() => {
        gsap.fromTo(`.animatedText`, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out' });
    }, [selectedProjectIndex]);

    const currentProject = myProjects[selectedProjectIndex];

    return (
        <section className="c-space my-24 relative z-10" id="projects">
            {/* Header */}
            <div className="flex justify-between items-end flex-wrap gap-4 mb-8">
                <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-sans">Featured Portfolio Work</span>
                    <h2 className="head-text mt-1">Research & Engineering Projects</h2>
                    <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
                        Deep learning pipelines, full-stack systems, and production architectures.
                    </p>
                </div>
                <div className="text-slate-300 font-sans text-xs px-3.5 py-1.5 rounded-full bg-slate-900/60 border border-slate-700/60 flex items-center gap-2">
                    <span>Project <span className="text-white font-semibold">{selectedProjectIndex + 1}</span> of {projectCount}</span>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6 w-full">
                {/* Left Card: Project Details */}
                <div className="flex flex-col gap-5 relative sm:p-10 py-8 px-6 ocean-card rounded-2xl overflow-hidden">
                    {/* Spotlight overlay */}
                    {currentProject.spotlight && (
                        <div className="absolute top-0 right-0 pointer-events-none opacity-40">
                            <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" />
                        </div>
                    )}

                    <div className="flex justify-between items-center z-10 min-h-[52px]">
                        {currentProject.logo ? (
                            <div className="p-2.5 backdrop-blur-xl w-fit rounded-xl border border-white/10" style={currentProject.logoStyle || {}}>
                                <img className="w-9 h-9 object-contain" src={currentProject.logo} alt="logo" />
                            </div>
                        ) : (
                            <div className="px-3 py-1 rounded-lg border border-slate-700/60 bg-slate-900/40 font-mono text-xs text-slate-300">
                                Project {selectedProjectIndex + 1}
                            </div>
                        )}

                        {currentProject.texture ? (
                            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                                Video Demo
                            </span>
                        ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                                GitHub Repository
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-4 text-slate-300 my-4 z-10">
                        <p className="text-white text-2xl font-bold font-outfit tracking-tight animatedText">
                            {currentProject.title}
                        </p>

                        <p className="animatedText text-sm sm:text-base leading-relaxed text-slate-300 font-sans">
                            {currentProject.desc}
                        </p>
                        <p className="animatedText text-xs sm:text-sm text-slate-400 leading-relaxed font-sans border-l-2 border-purple-500/40 pl-3">
                            {currentProject.subdue}
                        </p>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-4 z-10 mt-auto pt-4 border-t border-slate-800/80">
                        <div className="flex items-center gap-2 flex-wrap">
                            {currentProject.tags.map((tag, index) => (
                                <div
                                    key={index}
                                    className="px-2.5 py-1 rounded-md bg-cyan-950/30 border border-cyan-500/20 text-xs font-mono text-cyan-300 flex items-center gap-1.5"
                                    title={tag.name}
                                >
                                    <img src={tag.path} alt={tag.name} className="w-3.5 h-3.5 object-contain" />
                                    <span>{tag.name}</span>
                                </div>
                            ))}
                        </div>

                        <a
                            className="flex items-center gap-2 text-xs font-mono text-cyan-300 hover:text-white px-3.5 py-2 rounded-lg border border-cyan-500/30 bg-cyan-950/40 hover:border-purple-400 transition-all"
                            href={currentProject.href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span>{currentProject.texture ? 'Watch Video / Demo' : 'Go to GitHub Page'}</span>
                            <img src="/assets/arrow-up.png" alt="arrow" className="w-2.5 h-2.5 filter invert" />
                        </a>
                    </div>

                    {/* Navigation bar with Previous / Next */}
                    <div className="flex justify-between items-center mt-4 z-10 pt-3 border-t border-slate-800/60">
                        <button
                            className="px-4 py-2 rounded-xl bg-cyan-950/30 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/40 text-cyan-200 text-xs font-mono flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                            onClick={() => handleNavigation('previous')}
                            aria-label="Previous project"
                        >
                            <span>← Previous</span>
                        </button>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400">
                            <span className="text-cyan-300 font-semibold">{selectedProjectIndex + 1}</span>
                            <span>/</span>
                            <span>{projectCount}</span>
                        </div>

                        <button
                            className="px-4 py-2 rounded-xl bg-purple-950/30 border border-purple-500/30 hover:border-purple-400 hover:bg-purple-900/40 text-purple-200 text-xs font-mono flex items-center gap-2 cursor-pointer transition-all active:scale-95"
                            onClick={() => handleNavigation('next')}
                            aria-label="Next project"
                        >
                            <span>Next →</span>
                        </button>
                    </div>
                </div>

                {/* Right Card: Interactive 3D Demo Computer */}
                <div className="ocean-card rounded-2xl h-96 md:h-full min-h-[500px] relative overflow-hidden group">
                    {/* Zoom / TV Camera Controls */}
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-[#070c24]/90 backdrop-blur-md p-2 rounded-xl border border-cyan-500/20 shadow-xl">
                        <button
                            type="button"
                            onClick={handleZoomIn}
                            title="Zoom In 3D Model"
                            aria-label="Zoom In 3D Model"
                            className="w-8 h-8 rounded-lg bg-cyan-950/40 hover:bg-cyan-500/30 hover:text-cyan-300 text-white flex items-center justify-center font-bold text-lg transition-colors border border-cyan-500/30 cursor-pointer"
                        >
                            +
                        </button>
                        <button
                            type="button"
                            onClick={handleZoomOut}
                            title="Zoom Out 3D Model"
                            aria-label="Zoom Out 3D Model"
                            className="w-8 h-8 rounded-lg bg-purple-950/40 hover:bg-purple-500/30 hover:text-purple-300 text-white flex items-center justify-center font-bold text-lg transition-colors border border-purple-500/30 cursor-pointer"
                        >
                            −
                        </button>
                        <button
                            type="button"
                            onClick={handleResetZoom}
                            title="Reset 3D Camera"
                            aria-label="Reset 3D Camera"
                            className="w-8 h-8 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 flex items-center justify-center text-xs transition-colors border border-slate-700 cursor-pointer"
                        >
                            ↺
                        </button>
                    </div>

                    {/* Interactive Zoom Hint Badge */}
                    <div className="absolute bottom-4 left-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#070c24]/90 backdrop-blur-md border border-cyan-500/25 text-xs text-slate-300 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="font-mono text-[11px]">3D Viewport • Drag to Rotate • Pinch / Scroll to Zoom</span>
                    </div>

                    <Canvas>
                        <ambientLight intensity={Math.PI * 0.9} />
                        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#00dcf0" />
                        <directionalLight position={[-10, 5, -5]} intensity={1.0} color="#a855f7" />
                        <Center>
                            <Suspense fallback={<CanvasLoader />}>
                                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                                    <DemoComputer texture={currentProject.texture} />
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
