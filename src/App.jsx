import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Skills from "./sections/Skills.jsx";
import Architecture from "./sections/Architecture.jsx";
import Projects from "./sections/Projects.jsx";
import Certificates from "./sections/Certificates.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";
import EarthSpaceCanvas from "./components/EarthSpaceCanvas.jsx";
import ScrollAnimationManager from "./components/ScrollAnimationManager.jsx";
import CharacterNavigator from "./components/CharacterNavigator.jsx";

const App = () => {
    return (
        <div className="relative min-h-screen bg-[#030614] text-[#e2e8f0] overflow-x-clip selection:bg-purple-600/30 selection:text-cyan-300">
            {/* Scroll Laser, Lenis Smooth Scroll & Cursor Spotlight */}
            <ScrollAnimationManager />

            {/* Constant Animated Side Character Waypoint Navigator */}
            <CharacterNavigator />

            {/* 3D Earth & Exact Solar System Space Canvas */}
            <EarthSpaceCanvas />

            {/* Main Content Sections */}
            <main className="relative z-10 w-full">
                <Hero />
                <About />
                <Skills />
                <Architecture />
                <Projects />
                <Certificates />
                <Contact />
                <Footer />
            </main>
        </div>
    );
};

export default App;
