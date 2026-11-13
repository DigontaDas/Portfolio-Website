import { motion } from 'framer-motion';

const principles = [
    {
        step: '01',
        title: 'API-First & Type-Safe',
        accent: 'cyan',
        body: (
            <>
                Strict <strong className="text-cyan-200">Pydantic</strong> schemas, modular{' '}
                <strong className="text-cyan-200">FastAPI</strong> routers, and auto-generated{' '}
                <strong className="text-cyan-200">OpenAPI</strong> contracts.
            </>
        ),
        code: [
            'class Query(BaseModel):',
            '    text: str = Field(min_length=3)',
            '    top_k: int = Field(5, le=20)',
            '',
            '@router.post("/search")',
            'async def search(q: Query) -> Results:',
        ],
        tags: ['Pydantic', 'FastAPI', 'OpenAPI'],
    },
    {
        step: '02',
        title: 'Production Data Layer',
        accent: 'blue',
        body: (
            <>
                Relational integrity with <strong className="text-sky-200">PostgreSQL &amp; SQLAlchemy</strong>, paired
                with <strong className="text-sky-200">PGVector / Qdrant</strong> semantic search.
            </>
        ),
        code: [
            'class Doc(Base):',
            '    __tablename__ = "documents"',
            '    id = Column(Integer, primary_key=True)',
            '    embedding = Column(Vector(384))',
            '',
            '# alembic upgrade head',
        ],
        tags: ['PostgreSQL', 'SQLAlchemy', 'PGVector', 'Qdrant'],
    },
    {
        step: '03',
        title: 'Containerized & CI/CD',
        accent: 'purple',
        body: (
            <>
                Reproducible builds using <strong className="text-purple-200">Docker</strong> and automated verification
                via <strong className="text-purple-200">GitHub Actions</strong>.
            </>
        ),
        code: [
            '# GitHub Actions CI/CD pipeline:',
            '- name: Build & Health Check',
            '  run: docker compose up --build -d',
            '',
            '$ git push origin main',
            '$ # CI/CD: all pipeline checks passed',
        ],
        tags: ['Docker', 'CI/CD', 'GitHub Actions'],
    },
];

const pipeline = [
    { label: 'Client', sub: 'React / Mobile' },
    { label: 'FastAPI Router', sub: 'Auth · JWT' },
    { label: 'Pydantic', sub: 'Validation' },
    { label: 'Service Layer', sub: 'Async Python' },
    { label: 'PostgreSQL', sub: '+ PGVector' },
    { label: 'LLM / Model', sub: 'RAG · Vision' },
];

const accent = {
    cyan: {
        num: 'text-cyan-300',
        border: 'border-cyan-400/30',
        chip: 'text-cyan-200 border-cyan-500/30 bg-cyan-950/40',
        glow: 'bg-cyan-500/15',
    },
    blue: {
        num: 'text-sky-300',
        border: 'border-sky-400/30',
        chip: 'text-sky-200 border-sky-500/30 bg-sky-950/40',
        glow: 'bg-sky-500/15',
    },
    purple: {
        num: 'text-purple-300',
        border: 'border-purple-400/30',
        chip: 'text-purple-200 border-purple-500/30 bg-purple-950/40',
        glow: 'bg-purple-500/15',
    },
};

const Architecture = () => {
    return (
        <section className="c-space my-20 sm:my-24 relative z-10" id="architecture">
            {/* Section Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6 }}
                className="mb-10"
            >
                <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-sans">
                    Engineering Architecture
                </span>
                <h2 className="head-text mt-1">How I Build Systems</h2>
                <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
                    Backend principles behind every API, data layer, and AI pipeline I ship.
                </p>
            </motion.div>

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 sm:gap-6">
                {principles.map((p, idx) => {
                    const a = accent[p.accent];
                    return (
                        <motion.div
                            key={p.step}
                            initial={{ opacity: 0, y: 24 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.12 }}
                            transition={{ duration: 0.45, delay: idx * 0.08 }}
                            className="grid-container relative overflow-hidden"
                        >
                            <div
                                className={`absolute -bottom-20 -left-16 w-52 h-52 rounded-full blur-3xl pointer-events-none ${a.glow}`}
                            />

                            <div className="relative z-10 flex items-center gap-3">
                                <span className={`font-mono text-2xl sm:text-3xl font-bold shrink-0 ${a.num}`}>
                                    {p.step}
                                </span>
                                <span className="h-px flex-1 bg-gradient-to-r from-slate-600/60 to-transparent" />
                            </div>

                            <div className="relative z-10">
                                <p className="grid-headtext">{p.title}</p>
                                <p className="grid-subtext">{p.body}</p>
                            </div>

                            {/* Code snippet */}
                            <div
                                className={`relative z-10 rounded-xl border ${a.border} bg-[#030614]/85 overflow-hidden`}
                            >
                                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800/80">
                                    <span className="w-2 h-2 rounded-full bg-rose-500/60" />
                                    <span className="w-2 h-2 rounded-full bg-amber-400/60" />
                                    <span className="w-2 h-2 rounded-full bg-emerald-400/60" />
                                </div>
                                <pre className="px-3 sm:px-4 py-3 text-[11px] sm:text-[11.5px] leading-relaxed font-mono text-slate-300 overflow-x-auto">
                                    {p.code.join('\n')}
                                </pre>
                            </div>

                            <div className="relative z-10 flex flex-wrap gap-1.5 mt-auto">
                                {p.tags.map((t) => (
                                    <span
                                        key={t}
                                        className={`px-2.5 py-1 text-[11px] font-mono rounded-md border ${a.chip}`}
                                    >
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Request flow pipeline with animated pulse */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="ocean-card rounded-2xl mt-6 p-4 sm:p-6 overflow-hidden"
            >
                <div className="relative z-10 flex items-center justify-between flex-wrap gap-2 mb-4">
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                        Typical Request Flow
                    </p>
                    <p className="text-[11px] font-mono text-cyan-300/80 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-beacon" />
                        decoupled · typed · observable
                    </p>
                </div>

                <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3">
                    {pipeline.map((node, i) => (
                        <motion.div
                            key={node.label}
                            initial={{ opacity: 0, scale: 0.94 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.35, delay: i * 0.06 }}
                            whileHover={{ y: -3 }}
                            className="relative px-3 py-2.5 rounded-xl border border-cyan-500/20 bg-slate-950/70 hover:border-purple-400/50 transition-colors flex flex-col justify-center"
                        >
                            <div className="flex items-center justify-between gap-1 mb-0.5">
                                <span className="text-[10px] font-mono text-cyan-400/70">0{i + 1}</span>
                                {i < pipeline.length - 1 && (
                                    <span className="text-cyan-400/60 font-mono text-xs hidden lg:inline" aria-hidden="true">
                                        →
                                    </span>
                                )}
                            </div>
                            <span className="block text-xs font-semibold text-slate-100 font-sans truncate">
                                {node.label}
                            </span>
                            <span className="block text-[10px] font-mono text-slate-400 truncate">
                                {node.sub}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default Architecture;
