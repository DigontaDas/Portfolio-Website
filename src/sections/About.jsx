import { useState } from 'react';
import Globe from 'react-globe.gl';

const About = () => {
    const [hasCopied, setHasCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText('digontadas0171@gmail.com');
        setHasCopied(true);
        setTimeout(() => {
            setHasCopied(false);
        }, 2000);
    };

    return (
        <section className="c-space my-24 relative z-10" id="about">
            {/* Section Header */}
            <div className="mb-12">
                <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-sans">Background & Skills</span>
                <h2 className="head-text mt-1">About Me & Expertise</h2>
                <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
                    Blending modern full-stack web architectures with machine learning models and production systems.
                </p>
            </div>

            <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-6 h-full">
                {/* 1. Main Profile Card with User Image (IMG_0452.PNG) */}
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container group">
                        <div className="relative w-full rounded-2xl overflow-hidden border border-cyan-500/25 bg-gradient-to-b from-cyan-950/30 via-slate-900/60 to-purple-950/40 p-4 flex flex-col items-center">
                            {/* Ambient Glow behind portrait */}
                            <div className="absolute -top-12 -left-12 w-48 h-48 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
                            <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/25 rounded-full blur-3xl pointer-events-none" />

                            {/* User Photo */}
                            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-cyan-400/40 shadow-2xl shadow-cyan-500/20 group-hover:border-purple-400/60 group-hover:shadow-purple-500/30 transition-all duration-500">
                                <img
                                    src="/assets/IMG_0452.PNG"
                                    alt="Digonta Das"
                                    className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* Verified Badge */}
                            <div className="mt-4 flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/40 backdrop-blur-md">
                                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                                <span className="text-[11px] font-mono tracking-wider text-cyan-200 uppercase">
                                    BRAC University CSE Graduate
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <h3 className="grid-headtext text-2xl font-bold text-white">
                                    Digonta Das
                                </h3>
                                <div className="flex items-center gap-2">
                                    <a
                                        href="https://www.linkedin.com/in/digonta-das-836117241"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-mono px-2.5 py-1 rounded-lg border border-cyan-500/30 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400 hover:text-white transition-all flex items-center gap-1"
                                    >
                                        LinkedIn ↗
                                    </a>
                                    <a
                                        href="/Digonta_CV.pdf"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs font-mono px-2.5 py-1 rounded-lg border border-purple-500/30 bg-purple-950/40 text-purple-300 hover:border-purple-400 hover:text-white transition-all flex items-center gap-1"
                                    >
                                        CV PDF ↗
                                    </a>
                                </div>
                            </div>
                            <p className="text-xs font-mono text-cyan-400 mb-2">Full Stack Developer & AI Engineer</p>
                            <p className="grid-subtext">
                                Architecting high-performance web applications and scalable AI systems. Passionate about modern full-stack development, cloud microservices, and practical machine learning solutions.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. Tech Stack & Matrix */}
                <div className="col-span-1 xl:row-span-3">
                    <div className="grid-container">
                        <div className="flex items-center justify-between">
                            <p className="grid-headtext mb-0">Core Tech Matrix</p>
                            <span className="text-xs font-mono px-2 py-0.5 rounded border border-purple-500/30 bg-purple-950/30 text-purple-300">Production Ready</span>
                        </div>
                        <p className="grid-subtext">
                            Specialized toolkit spanning full-stack web architectures, deep learning models, computer vision, and scalable AI infrastructure.
                        </p>

                        <div className="space-y-3 mt-1">
                            <div>
                                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-semibold">Deep Learning & Vision</span>
                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    {['PyTorch', 'TensorFlow', '3D CNN', 'U-Net', 'ResNet', 'MobileNetV2', 'ONNX', 'XGBoost', 'HU Normalization'].map(tech => (
                                        <span key={tech} className="px-2.5 py-1 text-xs font-mono rounded-md bg-cyan-950/30 text-cyan-200 border border-cyan-500/20 hover:border-cyan-400/50 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400 font-semibold">Full Stack & Systems</span>
                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    {['React', 'Next.js', 'FastAPI', 'Node.js', 'Express', 'PostgreSQL', 'Supabase', 'Tailwind CSS'].map(tech => (
                                        <span key={tech} className="px-2.5 py-1 text-xs font-mono rounded-md bg-purple-950/30 text-purple-200 border border-purple-500/20 hover:border-purple-400/50 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-400 font-semibold">NLP & LLM Infrastructure</span>
                                <div className="flex flex-wrap gap-1.5 mt-1.5">
                                    {['ChromaDB', 'Sentence Transformers', 'LangChain', 'RAG Pipelines', 'Ollama (LLaMA)', 'Whisper API'].map(tech => (
                                        <span key={tech} className="px-2.5 py-1 text-xs font-mono rounded-md bg-indigo-950/30 text-indigo-200 border border-indigo-500/20 hover:border-indigo-400/50 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Global Collaboration & Timezone Flexibility (Globe) */}
                <div className="col-span-1 xl:row-span-4">
                    <div className="grid-container flex flex-col justify-between">
                        <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
                            <Globe
                                height={326}
                                width={326}
                                backgroundColor="rgba(0, 0, 0, 0)"
                                backgroundImageOpacity={0.5}
                                showAtmosphere
                                showGraticules
                                globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
                                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                            />
                        </div>

                        <div className="mt-3">
                            <p className="grid-headtext">Global Collaboration & Remote First</p>
                            <p className="grid-subtext">
                                Highly adaptable to North American, European, and Asia-Pacific working hours. Experienced with asynchronous communication, agile sprints, and remote development workflows.
                            </p>

                            <a href="#contact" className="block mt-5">
                                <button className="w-full py-3 px-5 rounded-xl font-medium text-sm text-white flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 shadow-lg shadow-cyan-950 transition-all duration-300">
                                    <span>Get in Touch for Opportunities</span>
                                </button>
                            </a>
                        </div>
                    </div>
                </div>

                {/* 4. Research & Engineering Philosophy */}
                <div className="xl:col-span-2 xl:row-span-3">
                    <div className="grid-container">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/30 border border-cyan-400/30 flex items-center justify-center text-cyan-300 font-mono text-sm font-bold">
                                &lt;/&gt;
                            </div>
                            <div>
                                <p className="grid-headtext mb-0">Clinical Impact & Engineering Rigor</p>
                                <p className="text-xs font-mono text-slate-400">Undergrad Thesis Lead & Infinity AI Finalist</p>
                            </div>
                        </div>

                        <p className="grid-subtext mt-1">
                            My focus centers on high-impact AI where computational efficiency meets life-critical accuracy. In my undergraduate thesis, I designed an end-to-end 3D CNN pipeline trained on 121 MRI and 160 CT scans (3.5 GB per volumetric scan) self-collected from Ibrahim Cardiac & Bangladesh Medical hospitals, introducing volumetric tiling to prevent out-of-memory errors on clinical hardware.
                        </p>

                        <div className="grid sm:grid-cols-2 gap-3 pt-2 border-t border-slate-800/80">
                            <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/15">
                                <span className="text-xs font-mono text-cyan-300 font-semibold">Infinity AI BuildFest 2026 Finalist</span>
                                <p className="text-xs text-slate-400 mt-1">
                                    Team Lead on MaSheba AI — offline-first maternal healthcare platform reaching 3M+ mothers with on-device ONNX inference under 200ms.
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-purple-950/20 border border-purple-500/15">
                                <span className="text-xs font-mono text-purple-300 font-semibold">Zero-Shot Generalization: DSC 0.8712</span>
                                <p className="text-xs text-slate-400 mt-1">
                                    Hybrid SE-Mobile UNet cardiac segmentation maintaining high zero-shot performance across clinical imaging vendors.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Direct Contact & Copy Email */}
                <div className="xl:col-span-1 xl:row-span-2">
                    <div className="grid-container justify-center items-center text-center">
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-slate-400">Direct Inquiries</span>
                            <p className="grid-headtext text-lg sm:text-xl mt-1 mb-3">Let's Connect Directly</p>
                        </div>

                        <div
                            className="copy-container w-full group"
                            onClick={handleCopy}
                            title="Click to copy email address"
                        >
                            <img
                                src={hasCopied ? '/assets/tick.svg' : '/assets/copy.svg'}
                                alt="copy"
                                className="w-5 h-5 filter invert opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            <p className="text-sm sm:text-base font-mono font-medium text-cyan-300 group-hover:text-cyan-100 transition-colors truncate">
                                {hasCopied ? 'Email Copied to Clipboard!' : 'digontadas0171@gmail.com'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
