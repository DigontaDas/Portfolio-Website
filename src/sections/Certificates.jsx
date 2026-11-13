import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, BookOpen, ExternalLink, Maximize2, X } from 'lucide-react';
import { featuredCertificates, courseCertificates } from '../constants/index.js';

const tierAccent = {
    cyan: 'border-cyan-400/40 hover:border-cyan-300/80 shadow-cyan-500/15',
    emerald: 'border-emerald-400/40 hover:border-emerald-300/80 shadow-emerald-500/15',
    purple: 'border-purple-400/40 hover:border-purple-300/80 shadow-purple-500/15',
};

const badgeAccent = {
    cyan: 'bg-cyan-950/60 text-cyan-200 border-cyan-400/40',
    emerald: 'bg-emerald-950/60 text-emerald-200 border-emerald-400/40',
    purple: 'bg-purple-950/60 text-purple-200 border-purple-400/40',
};

const Certificates = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') setSelectedCert(null);
        };
        if (selectedCert) {
            window.addEventListener('keydown', onKeyDown);
            window.__lenis?.stop();
            document.documentElement.style.overflow = 'hidden';
        } else {
            window.__lenis?.start();
            document.documentElement.style.overflow = '';
        }
        return () => {
            window.removeEventListener('keydown', onKeyDown);
            window.__lenis?.start();
            document.documentElement.style.overflow = '';
        };
    }, [selectedCert]);

    return (
        <section className="c-space my-20 sm:my-24 relative z-10" id="certificates">
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
                        Achievements &amp; Credentials
                    </span>
                    <h2 className="head-text mt-1">Certificates</h2>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300 px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-purple-500/25">
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    <span>3 Featured · {courseCertificates.length} Courses</span>
                </div>
            </motion.div>

            {/* TIER 1: 3 Prioritized Main Certificates */}
            <div className="mb-12">
                <div className="flex items-center gap-2.5 mb-5">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-beacon" />
                    <h3 className="text-sm sm:text-base font-outfit font-bold uppercase tracking-wider text-slate-200">
                        Featured Competitions &amp; Awards
                    </h3>
                    <span className="h-px flex-1 bg-gradient-to-r from-cyan-500/35 via-purple-500/25 to-transparent" />
                </div>

                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 sm:gap-6">
                    {featuredCertificates.map((cert, idx) => (
                        <motion.button
                            key={cert.id}
                            type="button"
                            onClick={() => setSelectedCert(cert)}
                            initial={{ opacity: 0, y: 28 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            whileHover={{ y: -6 }}
                            className={`text-left ocean-card card-shine-effect rounded-2xl overflow-hidden group cursor-pointer flex flex-col border ${
                                tierAccent[cert.accent] || tierAccent.cyan
                            }`}
                        >
                            {/* Visual Certificate Thumbnail */}
                            <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950/90 border-b border-white/10">
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                                {/* Top Badges */}
                                <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                                    <span
                                        className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider border backdrop-blur-md ${
                                            badgeAccent[cert.accent] || badgeAccent.cyan
                                        }`}
                                    >
                                        {cert.tag}
                                    </span>
                                    <span className="p-1.5 rounded-lg bg-slate-950/75 border border-white/15 text-slate-200 opacity-85 group-hover:opacity-100 group-hover:text-cyan-300 transition-all">
                                        <Maximize2 className="w-3.5 h-3.5" />
                                    </span>
                                </div>
                            </div>

                            {/* Minimal Metadata */}
                            <div className="relative z-10 p-4 sm:p-5 flex flex-col gap-1.5 flex-1">
                                <h4 className="font-outfit font-bold text-base sm:text-lg text-white leading-snug group-hover:text-cyan-200 transition-colors">
                                    {cert.title}
                                </h4>
                                <p className="text-xs font-mono text-cyan-300/90">{cert.subtitle}</p>
                                <div className="mt-auto pt-3 flex items-center justify-between gap-2 border-t border-slate-800/80 text-[11px] font-mono text-slate-400">
                                    <span className="truncate">{cert.issuer}</span>
                                    <span className="shrink-0 text-slate-300">{cert.date}</span>
                                </div>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* TIER 2: Course Certificates */}
            <div>
                <div className="flex items-center gap-2.5 mb-5">
                    <BookOpen className="w-4 h-4 text-purple-400 shrink-0" />
                    <h3 className="text-sm sm:text-base font-outfit font-bold uppercase tracking-wider text-slate-200">
                        Courses &amp; Technical Certifications
                    </h3>
                    <span className="h-px flex-1 bg-gradient-to-r from-purple-500/35 via-cyan-500/20 to-transparent" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                    {courseCertificates.map((course, idx) => (
                        <motion.button
                            key={course.id}
                            type="button"
                            onClick={() => setSelectedCert(course)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.12 }}
                            transition={{ duration: 0.45, delay: idx * 0.06 }}
                            whileHover={{ y: -5 }}
                            className="text-left ocean-card card-shine-effect rounded-2xl overflow-hidden group cursor-pointer flex flex-col"
                        >
                            {/* Visual Preview of PDF Certificate */}
                            <div className="relative aspect-[16/11] w-full overflow-hidden bg-slate-950 border-b border-white/10">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050816]/80 via-transparent to-transparent opacity-50 group-hover:opacity-25 transition-opacity" />
                                <span className="absolute top-2.5 right-2.5 p-1.5 rounded-lg bg-slate-950/75 border border-white/15 text-slate-200 opacity-80 group-hover:opacity-100 group-hover:text-cyan-300 transition-all">
                                    <Maximize2 className="w-3 h-3" />
                                </span>
                            </div>

                            {/* Minimal Course Details */}
                            <div className="relative z-10 p-3.5 flex flex-col gap-1.5 flex-1">
                                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                                    {course.issuer} · {course.date}
                                </span>
                                <h4 className="font-outfit font-semibold text-sm text-white leading-snug group-hover:text-cyan-200 transition-colors line-clamp-2">
                                    {course.title}
                                </h4>
                                <span className="mt-auto pt-2 text-[10px] font-mono text-slate-400">
                                    {course.badge}
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Interactive Lightbox Modal rendered at body root to avoid section stacking context */}
            {typeof document !== 'undefined' &&
                createPortal(
                    <AnimatePresence>
                        {selectedCert && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setSelectedCert(null)}
                                className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
                                data-lenis-prevent
                            >
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.94, y: 16 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.94, y: 16 }}
                                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full max-w-4xl rounded-2xl bg-[#070c24] border border-cyan-500/40 shadow-[0_25px_80px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[90vh]"
                                >
                                    {/* Modal Header */}
                                    <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3.5 border-b border-slate-800">
                                        <div className="min-w-0">
                                            <h4 className="font-outfit font-bold text-base sm:text-lg text-white truncate">
                                                {selectedCert.title}
                                            </h4>
                                            <p className="text-xs font-mono text-cyan-300 truncate">
                                                {selectedCert.issuer} · {selectedCert.date}
                                                {selectedCert.credentialId ? ` · ${selectedCert.credentialId}` : ''}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 shrink-0">
                                            <a
                                                href={selectedCert.file}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-3 py-1.5 rounded-lg text-xs font-mono bg-cyan-500/15 border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/25 hover:text-white transition-colors flex items-center gap-1.5"
                                            >
                                                <span>Open {selectedCert.fileType === 'pdf' ? 'PDF' : 'Image'}</span>
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </a>
                                            <button
                                                type="button"
                                                onClick={() => setSelectedCert(null)}
                                                aria-label="Close certificate preview"
                                                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-colors cursor-pointer"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Modal Image */}
                                    <div className="p-3 sm:p-5 overflow-auto flex items-center justify-center bg-slate-950/90">
                                        <img
                                            src={selectedCert.image}
                                            alt={selectedCert.title}
                                            className="max-h-[74vh] w-auto object-contain rounded-xl shadow-lg"
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </AnimatePresence>,
                    document.body
                )}
        </section>
    );
};

export default Certificates;

