const Footer = () => {
    return (
        <footer className="c-space pt-10 pb-8 border-t border-cyan-500/15 flex justify-between items-center flex-wrap gap-5 relative z-10 font-sans">
            <div className="text-slate-400 text-xs sm:text-sm flex items-center gap-3">
                <span className="font-outfit font-semibold text-white">Digonta Das</span>
                <span className="text-slate-600">|</span>
                <span>Full Stack Developer & AI Engineer</span>
            </div>

            <div className="flex items-center gap-3">
                <a
                    href="https://github.com/DigontaDas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon group"
                    title="GitHub"
                >
                    <img
                        src="/assets/github.svg"
                        alt="github"
                        className="w-5 h-5 filter invert opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                </a>

                <a
                    href="https://www.linkedin.com/in/digonta-das-836117241"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon group"
                    title="LinkedIn"
                >
                    <img
                        src="/assets/linkedin.svg"
                        alt="linkedin"
                        className="w-5 h-5 filter invert opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                </a>

                <a
                    href="https://www.facebook.com/digonta.das.37/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon group"
                    title="Facebook"
                >
                    <img
                        src="/assets/facebook.svg"
                        alt="facebook"
                        className="w-5 h-5 filter invert opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                </a>
            </div>

            <p className="text-slate-500 text-xs font-mono">
                © {new Date().getFullYear()} Digonta Das. All rights reserved.
            </p>
        </footer>
    );
};

export default Footer;
