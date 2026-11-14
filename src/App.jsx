import { useState, lazy, Suspense } from "react";
import Hero from "./sections/Hero.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import EarthSpaceCanvas from "./components/EarthSpaceCanvas.jsx";
import ScrollAnimationManager from "./components/ScrollAnimationManager.jsx";
import CharacterNavigator from "./components/CharacterNavigator.jsx";
import SpacePreloader from "./components/SpacePreloader.jsx";

const About = lazy(() => import("./sections/About.jsx"));
const Skills = lazy(() => import("./sections/Skills.jsx"));
const Architecture = lazy(() => import("./sections/Architecture.jsx"));
const Projects = lazy(() => import("./sections/Projects.jsx"));
const Certificates = lazy(() => import("./sections/Certificates.jsx"));

const SectionFallback = ({ id, minHeight = "min-h-[320px]" }) => (
    <section id={id} className={`c-space my-20 sm:my-24 ${minHeight}`} aria-hidden="true" />
);

const App = () => {
    const [preloaderDone, setPreloaderDone] = useState(false);

    return (
        <div className="relative min-h-screen bg-[#030614] text-[#e2e8f0] overflow-x-clip selection:bg-purple-600/30 selection:text-cyan-300">
            {/* Initial Round Logo Preloader */}
            {!preloaderDone && (
                <SpacePreloader onComplete={() => setPreloaderDone(true)} />
            )}

            {/* Scroll Laser, Smooth Scroll & Cursor Spotlight */}
            <ScrollAnimationManager />

            {/* Constant Animated Side 3D Satellite Waypoint Navigator */}
            <CharacterNavigator visible={preloaderDone} docked={true} />

            {/* 3D Milky Way, Earth & Moon Space Canvas */}
            <EarthSpaceCanvas />

            {/* Main Content Sections */}
            <main className="relative z-10 w-full">
                <Hero />

                <Suspense fallback={<SectionFallback id="about" minHeight="min-h-[600px]" />}>
                    <About />
                </Suspense>

                <Suspense fallback={<SectionFallback id="skills" minHeight="min-h-[420px]" />}>
                    <Skills />
                </Suspense>

                <Suspense fallback={<SectionFallback id="architecture" minHeight="min-h-[420px]" />}>
                    <Architecture />
                </Suspense>

                <Suspense fallback={<SectionFallback id="projects" minHeight="min-h-[560px]" />}>
                    <Projects />
                </Suspense>

                <Suspense fallback={<SectionFallback id="certificates" minHeight="min-h-[520px]" />}>
                    <Certificates />
                </Suspense>

                <Contact />
                <Footer />
            </main>
        </div>
    );
};

export default App;
