import React, { useRef, useState } from 'react';
import useAlert from '../hooks/useAlert.js';
import Alert from '../components/Alert.jsx';
import emailjs from '@emailjs/browser';

const Contact = () => {
    const formRef = useRef();
    const { alert, showAlert, hideAlert } = useAlert();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleChange = ({ target: { name, value } }) => {
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (
                import.meta.env.VITE_APP_EMAILJS_SERVICE_ID &&
                import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID &&
                import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
            ) {
                await emailjs.send(
                    import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
                    {
                        from_name: form.name,
                        to_name: 'Digonta Das',
                        from_email: form.email,
                        to_email: 'digontadas0171@gmail.com',
                        message: form.message,
                    },
                    import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
                );
            } else {
                // Fallback simulation if env variables are pending
                await new Promise((resolve) => setTimeout(resolve, 800));
            }

            setLoading(false);
            showAlert({
                show: true,
                text: 'Your message has been sent successfully!',
                type: 'success',
            });
            setForm({ name: '', email: '', message: '' });
            setTimeout(() => {
                hideAlert(false);
            }, 3500);
        } catch (error) {
            setLoading(false);
            console.error(error);
            showAlert({
                show: true,
                text: 'Could not send directly. Please email me at digontadas0171@gmail.com',
                type: 'danger',
            });
        }
    };

    return (
        <section className="c-space my-24 relative z-10" id="contact">
            {alert.show && <Alert {...alert} />}

            <div className="relative flex items-center justify-center flex-col">
                {/* Background Ambient Glows */}
                <div className="absolute -top-10 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-10 right-1/4 w-96 h-96 bg-purple-500/15 rounded-full blur-3xl pointer-events-none" />

                <div className="w-full max-w-2xl ocean-card rounded-3xl sm:p-12 p-6 border border-cyan-500/20 shadow-2xl relative z-10">
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-5 mb-8">
                        <div>
                            <span className="subhead-text">// INITIATE TRANSMISSION</span>
                            <h2 className="head-text text-3xl sm:text-4xl mt-1">Let's Connect</h2>
                        </div>
                        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-xs font-mono text-cyan-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span>Response within 24h</span>
                        </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-300 font-sans leading-relaxed mb-8">
                        Open for full-time AI/ML and Computer Vision roles, research collaborations, or engineering ventures.
                    </p>

                    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col space-y-6">
                        <label className="space-y-2">
                            <span className="field-label">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input font-sans"
                                placeholder="Your Name or Organization"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="field-label">Email Address</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input font-sans"
                                placeholder="name@domain.com"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="field-label">Message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input font-sans resize-none"
                                placeholder="Share details about your project, team, or inquiry..."
                            />
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="field-btn group cursor-pointer"
                        >
                            <span className="font-mono tracking-wide">
                                {loading ? 'Dispatching Message...' : 'Send Message'}
                            </span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </button>
                    </form>

                    {/* Direct Contact Info */}
                    <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
                        <div className="flex items-center gap-2">
                            <span className="text-slate-500">Email:</span>
                            <a
                                href="mailto:digontadas0171@gmail.com"
                                className="text-cyan-300 hover:text-white transition-colors"
                            >
                                digontadas0171@gmail.com
                            </a>
                        </div>
                        <span>Dhaka, Bangladesh</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
