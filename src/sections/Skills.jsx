import { motion } from 'framer-motion';

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
        </section>
    );
};

export default Skills;
