const principles = [
    {
        step: '01',
        title: 'API-First & Type-Safe',
        accent: 'cyan',
        body: (
            <>
                Every system starts with strict <strong className="text-cyan-200">Pydantic</strong> data models, modular{' '}
                <strong className="text-cyan-200">FastAPI</strong> routers, and auto-generated{' '}
                <strong className="text-cyan-200">OpenAPI (Swagger)</strong> documentation.
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
                Relational integrity with <strong className="text-sky-200">PostgreSQL &amp; SQLAlchemy ORM</strong>, paired
                with <strong className="text-sky-200">PGVector / Qdrant</strong> for sub-second semantic retrieval.
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
                Reproducible environments using <strong className="text-purple-200">Docker</strong>, automated
                verification with <strong className="text-purple-200">CI/CD</strong> pipelines, and{' '}
                <strong className="text-purple-200">LangSmith / RAGAS</strong> for AI pipeline observability.
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
        tags: ['Docker', 'CI/CD', 'GitHub Actions', 'LangSmith'],
    },
];

const pipeline = [
    { label: 'Client', sub: 'React / Mobile' },
    { label: 'FastAPI Router', sub: 'Auth · JWT' },
    { label: 'Pydantic', sub: 'Validation' },
    { label: 'Service Layer', sub: 'Async Python' },
    { label: 'PostgreSQL', sub: '+ PGVector' },
    { label: 'LLM / Model', sub: 'RAG · Agents' },
];

const accent = {
    cyan: { num: 'text-cyan-300', border: 'border-cyan-400/30', chip: 'text-cyan-200 border-cyan-500/30 bg-cyan-950/40', glow: 'bg-cyan-500/15' },
    blue: { num: 'text-sky-300', border: 'border-sky-400/30', chip: 'text-sky-200 border-sky-500/30 bg-sky-950/40', glow: 'bg-sky-500/15' },
    purple: { num: 'text-purple-300', border: 'border-purple-400/30', chip: 'text-purple-200 border-purple-500/30 bg-purple-950/40', glow: 'bg-purple-500/15' },
};

const Architecture = () => {
    return (
        <section className="c-space my-24 relative z-10" id="architecture">
            {/* Section Header */}
            <div className="mb-10">
                <span className="text-xs uppercase tracking-wider font-semibold text-cyan-400 font-sans">Engineering Architecture</span>
                <h2 className="head-text mt-1">How I Build Systems</h2>
                <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
                    Beyond UI screenshots: the backend principles behind every API, data layer and AI pipeline I ship.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 grid-cols-1 gap-6">
                {principles.map((p) => {
                    const a = accent[p.accent];
                    return (
                        <div key={p.step} className="grid-container relative overflow-hidden">
                            <div className={`absolute -bottom-20 -left-16 w-52 h-52 rounded-full blur-3xl pointer-events-none ${a.glow}`} />

                            <div className="relative flex items-center gap-3">
                                <span className={`font-mono text-3xl font-bold ${a.num}`}>{p.step}</span>
                                <span className="h-px flex-1 bg-gradient-to-r from-slate-600/60 to-transparent" />
                            </div>

                            <div className="relative">
                                <p className="grid-headtext">{p.title}</p>
                                <p className="grid-subtext">{p.body}</p>
                            </div>

                            {/* Code snippet */}
                            <div className={`relative rounded-xl border ${a.border} bg-[#030614]/80 overflow-hidden`}>
                                <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-800/80">
                                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                                </div>
                                <pre className="px-4 py-3 text-[11.5px] leading-relaxed font-mono text-slate-300 overflow-x-auto">
                                    {p.code.join('\n')}
                                </pre>
                            </div>

                            <div className="relative flex flex-wrap gap-1.5 mt-auto">
                                {p.tags.map((t) => (
                                    <span key={t} className={`px-2.5 py-1 text-[11px] font-mono rounded-md border ${a.chip}`}>
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Request flow pipeline */}
            <div className="ocean-card rounded-2xl mt-6 p-5 sm:p-6">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-400">Typical Request Flow</p>
                    <p className="text-[11px] font-mono text-slate-500">decoupled · typed · observable</p>
                </div>
                <div className="flex flex-wrap items-center gap-y-3">
                    {pipeline.map((node, i) => (
                        <div key={node.label} className="flex items-center">
                            <div className="px-3.5 py-2 rounded-xl border border-cyan-500/20 bg-slate-950/60 hover:border-purple-400/50 transition-colors">
                                <span className="block text-xs font-semibold text-slate-100 font-sans">{node.label}</span>
                                <span className="block text-[10px] font-mono text-slate-500">{node.sub}</span>
                            </div>
                            {i < pipeline.length - 1 && (
                                <span className="mx-2 sm:mx-3 text-cyan-400/70 font-mono text-sm" aria-hidden="true">→</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Architecture;
