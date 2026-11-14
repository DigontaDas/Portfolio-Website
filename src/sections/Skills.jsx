import { motion } from 'framer-motion';

const waterStackCards = [
    {
        name: 'Python',
        role: 'Core Backend Runtime',
        color: '#38bdf8',
        bg: 'rgba(56, 189, 248, 0.14)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                    d="M11.9 2C7.8 2 8.1 3.8 8.1 3.8V5.7H12V6.3H6.5S4 6 4 9.7C4 13.4 6.2 13.2 6.2 13.2H7.5V11.4S7.4 9.2 9.7 9.2H13.5S15.6 9.2 15.6 7.1V3.9S15.9 2 11.9 2ZM9.8 3.1C10.2 3.1 10.6 3.4 10.6 3.9C10.6 4.3 10.2 4.6 9.8 4.6C9.4 4.6 9 4.3 9 3.9C9 3.4 9.4 3.1 9.8 3.1Z"
                    fill="#38bdf8"
                />
                <path
                    d="M12.1 22C16.2 22 15.9 20.2 15.9 20.2V18.3H12V17.7H17.5S20 18 20 14.3C20 10.6 17.8 10.8 17.8 10.8H16.5V12.6S16.6 14.8 14.3 14.8H10.5S8.4 14.8 8.4 16.9V20.1S8.1 22 12.1 22ZM14.2 20.9C13.8 20.9 13.4 20.6 13.4 20.1C13.4 19.7 13.8 19.4 14.2 19.4C14.6 19.4 15 19.7 15 20.1C15 20.6 14.6 20.9 14.2 20.9Z"
                    fill="#facc15"
                />
            </svg>
        ),
    },
    {
        name: 'FastAPI',
        role: 'Async REST Architecture',
        color: '#14b8a6',
        bg: 'rgba(20, 184, 166, 0.14)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" fill="#0d9488" fillOpacity="0.25" stroke="#14b8a6" strokeWidth="1.6" />
                <path d="M13 5L7.5 13H12L11 19L16.5 11H12L13 5Z" fill="#2dd4bf" />
            </svg>
        ),
    },
    {
        name: 'PostgreSQL',
        role: 'Relational Data Store',
        color: '#60a5fa',
        bg: 'rgba(96, 165, 250, 0.14)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.8">
                <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
                <path d="M5 5.5V12C5 13.5 8.1 14.8 12 14.8C15.9 14.8 19 13.5 19 12V5.5" />
                <path d="M5 12V18.5C5 20 8.1 21.3 12 21.3C15.9 21.3 19 20 19 18.5V12" />
            </svg>
        ),
    },
    {
        name: 'PGVector',
        role: 'Semantic Vector Index',
        color: '#818cf8',
        bg: 'rgba(129, 140, 248, 0.14)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#818cf8" strokeWidth="1.8">
                <circle cx="6" cy="17" r="2.2" fill="#818cf8" fillOpacity="0.3" />
                <circle cx="18" cy="17" r="2.2" fill="#818cf8" fillOpacity="0.3" />
                <circle cx="12" cy="6" r="2.5" fill="#a78bfa" fillOpacity="0.4" />
                <path d="M10.7 8L7.3 15M13.3 8L16.7 15M8.2 17H15.8" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'PyTorch',
        role: '3D Medical Vision & DL',
        color: '#f97316',
        bg: 'rgba(249, 115, 22, 0.14)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                    d="M16.9 7.1A7 7 0 1 1 7.1 7.1L12 2.2V5.1L8.9 8.2A4.4 4.4 0 1 0 15.1 8.2L16.9 7.1Z"
                    fill="#fb923c"
                />
                <circle cx="15.2" cy="5.2" r="1.4" fill="#fdba74" />
            </svg>
        ),
    },
    {
        name: 'OpenAI API',
        role: 'LLM & Agent Intelligence',
        color: '#10b981',
        bg: 'rgba(16, 185, 129, 0.14)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                    d="M20.5 10.1a4.7 4.7 0 0 0-.4-3.9 4.8 4.8 0 0 0-5.1-2.3A4.8 4.8 0 0 0 6.8 5.6a4.7 4.7 0 0 0-3.2 2.3 4.8 4.8 0 0 0 .6 5.6 4.7 4.7 0 0 0 .4 3.9 4.8 4.8 0 0 0 5.1 2.3A4.8 4.8 0 0 0 13.4 21a4.8 4.8 0 0 0 4.6-3.3 4.7 4.7 0 0 0 3.1-2.3 4.8 4.8 0 0 0-.6-5.3ZM12 15.2l-2.8-1.6v-3.2L12 8.8l2.8 1.6v3.2L12 15.2Z"
                    stroke="#34d399"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                />
            </svg>
        ),
    },
    {
        name: 'Hugging Face',
        role: 'Transformers & ONNX',
        color: '#fbbf24',
        bg: 'rgba(251, 191, 36, 0.14)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="8.5" fill="#fbbf24" fillOpacity="0.2" stroke="#fbbf24" strokeWidth="1.6" />
                <circle cx="9.2" cy="10.2" r="1.1" fill="#fde68a" />
                <circle cx="14.8" cy="10.2" r="1.1" fill="#fde68a" />
                <path d="M8.5 13.8C9.4 15.5 14.6 15.5 15.5 13.8" stroke="#fde68a" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'WhisperAI',
        role: 'Multilingual Audio AI',
        color: '#00dcf0',
        bg: 'rgba(0, 220, 240, 0.14)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00dcf0" strokeWidth="2" strokeLinecap="round">
                <path d="M4 10v4M8 7v10M12 4v16M16 7v10M20 10v4" />
            </svg>
        ),
    },
    {
        name: 'LLMOps',
        role: 'RAG Eval & Telemetry',
        color: '#c084fc',
        bg: 'rgba(192, 132, 252, 0.14)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c084fc" strokeWidth="1.8">
                <rect x="3" y="4" width="7" height="6" rx="1.5" />
                <rect x="14" y="4" width="7" height="6" rx="1.5" />
                <rect x="8.5" y="14" width="7" height="6" rx="1.5" />
                <path d="M6.5 10v2h11v-2M12 12v2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        name: 'Docker',
        role: 'Containerized Deploys',
        color: '#0ea5e9',
        bg: 'rgba(14, 165, 233, 0.14)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                    d="M5 10h3v3H5v-3zm4 0h3v3H9v-3zm4 0h3v3h-3v-3zm-4-4h3v3H9V6zm4 0h3v3h-3V6z"
                    fill="#38bdf8"
                />
                <path
                    d="M2.5 14h16.2c.9 0 1.8-.5 2.3-1.2.4.3 1.2.5 1.8.2-.2 2.4-2.1 5.5-7 5.5-5.6 0-11.2-1.8-13.3-4.5Z"
                    fill="#0ea5e9"
                />
            </svg>
        ),
    },
    {
        name: 'React.js',
        role: 'Interactive 3D Frontend',
        color: '#22d3ee',
        bg: 'rgba(34, 211, 238, 0.14)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.4">
                <circle cx="12" cy="12" r="2" fill="#22d3ee" />
                <ellipse cx="12" cy="12" rx="9" ry="3.8" />
                <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(60 12 12)" />
                <ellipse cx="12" cy="12" rx="9" ry="3.8" transform="rotate(120 12 12)" />
            </svg>
        ),
    },
    {
        name: 'GitHub Actions',
        role: 'Automated CI/CD',
        color: '#a855f7',
        bg: 'rgba(168, 85, 247, 0.14)',
        icon: (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="#a855f7" strokeWidth="1.7" />
                <path d="M10 8.5L16 12L10 15.5V8.5Z" fill="#c084fc" />
            </svg>
        ),
    },
];

const skillGroups = [
    {
        id: 'backend',
        title: 'Backend Engineering',
        tier: 'Primary',
        icon: '{ }',
        accent: 'cyan',
        span: 'md:col-span-2',
        blurb: 'Type-safe, asynchronous Python services with clean API contracts.',
        skills: [
            'Python',
            'FastAPI',
            'RESTful API Design',
            'Asyncio (Asynchronous Programming)',
            'Pydantic (Data Validation)',
            'SQLAlchemy (ORM)',
            'Alembic (DB Migrations)',
            'JWT & OAuth2 Authentication',
        ],
    },
    {
        id: 'data',
        title: 'Databases & Vector Storage',
        tier: 'Core',
        icon: '⛁',
        accent: 'blue',
        span: '',
        blurb: 'Relational integrity plus semantic retrieval.',
        skills: [
            'PostgreSQL',
            'PGVector',
            'Qdrant',
            'ChromaDB',
            'SQLite',
            'Database Schema Design',
            'Indexing & Query Optimization',
        ],
    },
    {
        id: 'ai',
        title: 'AI & LLM Systems',
        tier: 'Core',
        icon: '◎',
        accent: 'purple',
        span: '',
        blurb: 'Retrieval, prompt engineering, LLMOps and local model serving.',
        skills: [
            'Retrieval-Augmented Generation (RAG)',
            'OpenAI API & Prompt Engineering',
            'Hugging Face',
            'LLMOps',
            'Model Context Protocol (MCP)',
            'RAGAS Evaluation',
            'WhisperAI',
            'Ollama / Local LLMs',
        ],
    },
    {
        id: 'vision',
        title: 'Deep Learning & Vision',
        tier: 'Core',
        icon: '▣',
        accent: 'indigo',
        span: '',
        blurb: 'Volumetric medical imaging and efficient CNN architectures.',
        skills: [
            'PyTorch',
            '3D CNNs',
            'U-Net / SegResNet',
            'OpenCV',
            'Volumetric Data Processing (DICOM / NIfTI)',
        ],
    },
    {
        id: 'devops',
        title: 'DevOps, CI/CD & Tooling',
        tier: 'Core',
        icon: '⚙',
        accent: 'sky',
        span: '',
        blurb: 'Reproducible builds, automated tests and CI/CD pipelines.',
        skills: [
            'Docker',
            'Docker Compose',
            'CI/CD Pipelines (GitHub Actions)',
            'Automated Testing & Integration',
            'Linux/Bash',
            'Postman',
            'Swagger / OpenAPI',
        ],
    },
];

const secondaryGroup = {
    title: 'Frontend & UI Integration',
    tier: 'Secondary',
    blurb: 'Used as a thin, decoupled presentation layer over Python APIs.',
    skills: ['React.js', 'Tailwind CSS', 'Streamlit (Rapid AI Prototyping)'],
};

const accentStyles = {
    cyan: {
        icon: 'text-cyan-300 border-cyan-400/40 from-cyan-500/20 to-blue-500/10',
        chip: 'bg-cyan-950/40 text-cyan-100 border-cyan-500/25 hover:border-cyan-300/70',
        label: 'text-cyan-300',
        glow: 'bg-cyan-500/15',
    },
    blue: {
        icon: 'text-sky-300 border-sky-400/40 from-sky-500/20 to-blue-600/10',
        chip: 'bg-sky-950/40 text-sky-100 border-sky-500/25 hover:border-sky-300/70',
        label: 'text-sky-300',
        glow: 'bg-sky-500/10',
    },
    purple: {
        icon: 'text-purple-300 border-purple-400/40 from-purple-500/20 to-fuchsia-500/10',
        chip: 'bg-purple-950/40 text-purple-100 border-purple-500/25 hover:border-purple-300/70',
        label: 'text-purple-300',
        glow: 'bg-purple-500/15',
    },
    indigo: {
        icon: 'text-indigo-300 border-indigo-400/40 from-indigo-500/20 to-violet-500/10',
        chip: 'bg-indigo-950/40 text-indigo-100 border-indigo-500/25 hover:border-indigo-300/70',
        label: 'text-indigo-300',
        glow: 'bg-indigo-500/10',
    },
    sky: {
        icon: 'text-blue-300 border-blue-400/40 from-blue-500/20 to-cyan-500/10',
        chip: 'bg-blue-950/40 text-blue-100 border-blue-500/25 hover:border-blue-300/70',
        label: 'text-blue-300',
        glow: 'bg-blue-500/10',
    },
};

const Skills = () => {
    return (
        <section className="c-space my-20 sm:my-24 relative z-10" id="skills">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6 }}
                className="flex justify-between items-end flex-wrap gap-4 mb-10"
            >
                <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-sans">
                        Python-First Toolkit
                    </span>
                    <h2 className="head-text mt-1">Skills Matrix</h2>
                    <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
                        API design, data modeling, testing and deployment, with AI and deep learning built on top.
                    </p>
                </div>
                <div className="flex items-center flex-wrap gap-2 text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-full border border-cyan-400/40 bg-cyan-950/40 text-cyan-200">
                        Primary
                    </span>
                    <span className="px-2.5 py-1 rounded-full border border-slate-600/60 bg-slate-900/60 text-slate-300">
                        Core
                    </span>
                    <span className="px-2.5 py-1 rounded-full border border-slate-700/60 bg-slate-900/40 text-slate-500">
                        Secondary
                    </span>
                </div>
            </motion.div>

            <div className="grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 sm:gap-6">
                {skillGroups.map((group, idx) => {
                    const a = accentStyles[group.accent];
                    const isPrimary = group.tier === 'Primary';
                    return (
                        <motion.div
                            key={group.id}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.12 }}
                            transition={{ duration: 0.45, delay: idx * 0.06 }}
                            className={`${group.span} ${isPrimary ? 'xl:col-span-2' : ''}`}
                        >
                            <div
                                className={`grid-container relative overflow-hidden ${
                                    isPrimary ? 'border-cyan-400/40' : ''
                                }`}
                            >
                                <div
                                    className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl pointer-events-none ${a.glow}`}
                                />

                                <div className="relative z-10 flex items-start justify-between gap-3">
                                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                                        <div
                                            className={`w-11 h-11 shrink-0 whitespace-nowrap rounded-xl bg-gradient-to-br border flex items-center justify-center font-mono text-base font-bold leading-none ${a.icon}`}
                                        >
                                            {group.icon}
                                        </div>
                                        <div className="min-w-0">
                                            <p className="grid-headtext mb-0.5 leading-snug">{group.title}</p>
                                            <p className="text-xs text-slate-400 font-sans leading-relaxed">
                                                {group.blurb}
                                            </p>
                                        </div>
                                    </div>
                                    <span
                                        className={`shrink-0 whitespace-nowrap text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                                            isPrimary
                                                ? 'border-cyan-400/50 bg-cyan-950/50 text-cyan-200'
                                                : 'border-slate-600/60 bg-slate-900/60 text-slate-300'
                                        }`}
                                    >
                                        {group.tier}
                                    </span>
                                </div>

                                <div className="relative z-10 flex flex-wrap gap-2">
                                    {group.skills.map((skill) => (
                                        <motion.span
                                            key={skill}
                                            whileHover={{ y: -2, scale: 1.03 }}
                                            className={`px-3 py-1.5 font-mono rounded-lg border transition-colors ${
                                                isPrimary ? 'text-xs sm:text-[13px]' : 'text-xs'
                                            } ${a.chip}`}
                                        >
                                            {skill}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* Secondary: Frontend as a decoupled presentation layer */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.45, delay: 0.25 }}
                    className="md:col-span-2 xl:col-span-3"
                >
                    <div className="grid-container flex-col sm:!flex-row items-start sm:items-center justify-between !gap-4 !py-4 opacity-95 overflow-hidden">
                        <div className="relative z-10 flex items-start sm:items-center gap-3 min-w-0">
                            <span className="shrink-0 whitespace-nowrap text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-slate-700/60 bg-slate-900/40 text-slate-400">
                                {secondaryGroup.tier}
                            </span>
                            <div className="min-w-0">
                                <p className="text-sm font-semibold text-slate-200 font-sans">
                                    {secondaryGroup.title}
                                </p>
                                <p className="text-xs text-slate-400 font-sans">{secondaryGroup.blurb}</p>
                            </div>
                        </div>
                        <div className="relative z-10 flex flex-wrap gap-2">
                            {secondaryGroup.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-900/60 text-slate-300 border border-slate-700/60 hover:text-white hover:border-slate-500 transition-colors"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ByteSpace-Style Water-Floating Stack Pill Blocks at End of Skills Matrix */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5 }}
                className="relative w-full overflow-hidden water-marquee-wrapper marquee-mask mt-7 pt-3 pb-7"
                aria-label="Core Engineering Stack"
            >
                <div
                    className="absolute left-6 right-6 bottom-5 h-px bg-gradient-to-r from-transparent via-cyan-400/25 to-transparent pointer-events-none"
                    aria-hidden="true"
                />

                <div className="water-stack-track gap-4 sm:gap-6 px-2">
                    {[...waterStackCards, ...waterStackCards].map((stack, idx) => (
                        <div
                            key={`${stack.name}-${idx}`}
                            className="water-stack-card px-4 py-2.5 pr-5 sm:px-5 sm:py-3 sm:pr-6 select-none cursor-default group"
                            style={{
                                '--float-delay': `${(idx % 7) * -0.58}s`,
                                '--float-dur': `${3.8 + (idx % 4) * 0.45}s`,
                                '--stack-accent': stack.color,
                            }}
                        >
                            <div className="water-glass-highlight" />

                            <div
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 border border-white/10 transition-transform duration-200 group-hover:scale-105"
                                style={{ backgroundColor: stack.bg }}
                            >
                                {stack.icon}
                            </div>

                            <div className="flex flex-col text-left leading-tight">
                                <div className="flex items-center gap-1.5">
                                    <span className="font-outfit font-bold text-xs sm:text-sm text-white whitespace-nowrap">
                                        {stack.name}
                                    </span>
                                    <svg
                                        width="12"
                                        height="12"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="text-cyan-400 shrink-0"
                                        aria-hidden="true"
                                    >
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                    </svg>
                                </div>
                                <span className="font-mono text-[10px] sm:text-[11px] text-slate-400 whitespace-nowrap mt-0.5">
                                    {stack.role}
                                </span>
                            </div>

                            <div className="water-buoyant-shadow" />
                        </div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Skills;
