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
        gsap.fromTo(`.animatedText`, { opacity: 0 }, { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' });
    }, [selectedProjectIndex]);

    const currentProject = myProjects[selectedProjectIndex];

    return (
        <section className="c-space my-20" id="projects">
            <div className="flex justify-between items-end flex-wrap gap-4">
                <div>
                    <p className="head-text">My Selected Work</p>
                    <p className="text-white-600 text-sm mt-1">
                        Explore research pipelines, deep learning architectures, and full-stack platforms
                    </p>
                </div>
                <div className="text-white-600 font-mono text-xs px-3 py-1.5 rounded-full bg-black-200 border border-black-300">
                    Project <span className="text-cyan-400 font-semibold">{selectedProjectIndex + 1}</span> of {projectCount}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
                <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 rounded-2xl border border-black-300/40 bg-black-200/50">
                    <div className="absolute top-0 right-0">
                        <img src={currentProject.spotlight} alt="spotlight" className="w-full h-96 object-cover rounded-xl" />
                    </div>

                    <div className="flex justify-between items-center z-10">
                        <div className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg" style={currentProject.logoStyle}>
                            <img className="w-10 h-10 shadow-sm" src={currentProject.logo} alt="logo" />
                        </div>

                        {currentProject.texture ? (
                            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                                Video Active
                            </span>
                        ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-800 text-neutral-400 border border-neutral-700/80 flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-neutral-500"></span>
                                No Video
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-5 text-white-600 my-5 z-10">
                        <p className="text-white text-2xl font-semibold animatedText">{currentProject.title}</p>

                        <p className="animatedText text-sm sm:text-base leading-relaxed">{currentProject.desc}</p>
                        <p className="animatedText text-xs sm:text-sm text-white-500 leading-relaxed">{currentProject.subdue}</p>
                    </div>

                    <div className="flex items-center justify-between flex-wrap gap-5 z-10 mt-auto">
                        <div className="flex items-center gap-3">
                            {currentProject.tags.map((tag, index) => (
                                <div key={index} className="tech-logo" title={tag.name}>
                                    <img src={tag.path} alt={tag.name} />
                                </div>
                            ))}
                        </div>

                        <a
                            className="flex items-center gap-2 cursor-pointer text-white-600 hover:text-cyan-400 transition-colors"
                            href={currentProject.href}
                            target="_blank"
                            rel="noreferrer">
                            <p>Check Out The Explanation</p>
                            <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
                        </a>
                    </div>

                    <div className="flex justify-between items-center mt-7 z-10">
                        <button className="arrow-btn" onClick={() => handleNavigation('previous')} aria-label="Previous project">
                            <img src="/assets/left-arrow.png" alt="left arrow" />
                        </button>

                        <div className="flex items-center gap-1.5 text-xs font-mono text-white-600">
                            {selectedProjectIndex + 1} / {projectCount}
                        </div>

                        <button className="arrow-btn" onClick={() => handleNavigation('next')} aria-label="Next project">
                            <img src="/assets/right-arrow.png" alt="right arrow" className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="border border-black-300 bg-black-200 rounded-2xl h-96 md:h-full min-h-[480px] relative overflow-hidden group">
                    {/* Zoom / TV Camera Controls */}
                    <div className="absolute top-4 right-4 z-10 flex flex-col gap-2 bg-black-200/90 backdrop-blur-md p-2 rounded-xl border border-black-300 shadow-xl">
                        <button
                            type="button"
                            onClick={handleZoomIn}
                            title="Zoom In TV"
                            aria-label="Zoom In TV"
                            className="w-8 h-8 rounded-lg bg-black-300 hover:bg-cyan-500/20 hover:text-cyan-400 text-white flex items-center justify-center font-bold text-lg transition-colors border border-white/10 hover:border-cyan-500/40 cursor-pointer"
                        >
                            +
                        </button>
                        <button
                            type="button"
                            onClick={handleZoomOut}
                            title="Zoom Out TV"
                            aria-label="Zoom Out TV"
                            className="w-8 h-8 rounded-lg bg-black-300 hover:bg-cyan-500/20 hover:text-cyan-400 text-white flex items-center justify-center font-bold text-lg transition-colors border border-white/10 hover:border-cyan-500/40 cursor-pointer"
                        >
                            −
                        </button>
                        <button
                            type="button"
                            onClick={handleResetZoom}
                            title="Reset TV Camera"
                            aria-label="Reset TV Camera"
                            className="w-8 h-8 rounded-lg bg-black-300 hover:bg-cyan-500/20 hover:text-cyan-400 text-white flex items-center justify-center text-xs transition-colors border border-white/10 hover:border-cyan-500/40 cursor-pointer"
                        >
                            ↺
                        </button>
                    </div>

                    {/* Interactive Zoom Hint Badge */}
                    <div className="absolute bottom-4 left-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-black-200/90 backdrop-blur-md border border-white/10 text-xs text-neutral-300 shadow-md">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span>🔍 Scroll / Pinch to Zoom TV</span>
                    </div>

                    <Canvas>
                        <ambientLight intensity={Math.PI} />
                        <directionalLight position={[10, 10, 5]} />
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

export default Projects
