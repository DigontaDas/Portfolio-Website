import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { navLinks } from '../constants/index.js';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeHref, setActiveHref] = useState('#home');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 36);

            for (let i = navLinks.length - 1; i >= 0; i--) {
                const id = navLinks[i].href.replace('#', '');
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= window.innerHeight * 0.42) {
                        setActiveHref(navLinks[i].href);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        setActiveHref(href);
        const target = document.querySelector(href);
        if (window.__lenis && target) {
            window.__lenis.scrollTo(target, { offset: -72 });
        } else if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="fixed top-3 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
            <div
                className={`max-w-5xl mx-auto pointer-events-auto rounded-2xl transition-all duration-300 ${
                    scrolled
                        ? 'bg-[#050816]/85 backdrop-blur-xl border border-cyan-500/25 shadow-[0_10px_40px_rgba(0,0,0,0.65)]'
                        : 'bg-[#050816]/55 backdrop-blur-md border border-white/10'
                }`}
            >
                <div className="flex justify-between items-center py-2.5 px-4 sm:px-5">
                    <a
                        href="#home"
                        onClick={(e) => handleNavClick(e, '#home')}
                        className="flex items-center gap-2.5 text-slate-200 font-bold text-base sm:text-lg hover:text-white transition-colors shrink-0"
                    >
                        <img src="/Logo.svg" alt="Digonta Logo" className="w-6 h-6 sm:w-7 sm:h-7 object-contain" />
                        <span className="font-outfit tracking-tight">Digonta</span>
                    </a>

                    {/* Desktop Pill Nav */}
                    <nav className="hidden md:flex items-center gap-1" aria-label="Primary Navigation">
                        {navLinks.map(({ id, href, name }) => {
                            const isActive = activeHref === href;
                            return (
                                <a
                                    key={id}
                                    href={href}
                                    onClick={(e) => handleNavClick(e, href)}
                                    className={`relative px-3.5 py-1.5 text-xs font-medium rounded-xl transition-colors ${
                                        isActive ? 'text-white' : 'text-slate-300 hover:text-white'
                                    }`}
                                >
                                    {isActive && (
                                        <motion.span
                                            layoutId="navbar-active-pill"
                                            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                            className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/25 to-purple-500/25 border border-cyan-400/35 -z-10"
                                        />
                                    )}
                                    {name}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="md:hidden p-2 rounded-xl text-slate-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        aria-label="Toggle navigation menu"
                        aria-expanded={isOpen}
                    >
                        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>

                {/* Mobile Drawer */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.nav
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: 'easeOut' }}
                            className="md:hidden overflow-hidden border-t border-white/10"
                            aria-label="Mobile Navigation"
                        >
                            <ul className="grid grid-cols-2 gap-2 p-3">
                                {navLinks.map(({ id, href, name }) => {
                                    const isActive = activeHref === href;
                                    return (
                                        <li key={id}>
                                            <a
                                                href={href}
                                                onClick={(e) => handleNavClick(e, href)}
                                                className={`block text-center py-2.5 px-3 rounded-xl text-xs font-medium transition-all ${
                                                    isActive
                                                        ? 'bg-gradient-to-r from-cyan-500/25 to-purple-500/25 border border-cyan-400/40 text-white'
                                                        : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:text-white'
                                                }`}
                                            >
                                                {name}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default Navbar;
