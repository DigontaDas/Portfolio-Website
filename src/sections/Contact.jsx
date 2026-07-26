import React, {useRef,useState} from 'react'
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
           )

            setLoading(false);
            showAlert({
                show: true,
                text: 'Your message has been sent...',
                type: 'success',
            });
            setForm({
                name: '',
                email: '',
                message: '',
            });
            setTimeout(() => {
                hideAlert(false);
            }, 3000);


        } catch (error) {
            setLoading(false);
            console.log(error);
            showAlert({
                show: true,
                text: 'Something went wrong...',
                type: 'danger',
            });

        }
    }




    return (
        <section className="c-space my-20" id="contact" style={{ background: '#080c14' }}>
            {alert.show && <Alert {...alert} />}
            <div className="relative min-h-screen flex items-center justify-center flex-col overflow-hidden">
                {/* Ambient glows matched to Hero/banner palette (navy base, cyan + violet bloom) */}
                <div
                    className="absolute pointer-events-none"
                    style={{
                        top: '-12%',
                        right: '-10%',
                        width: '55%',
                        height: '55%',
                        background: 'radial-gradient(ellipse, rgba(0,180,220,0.10) 0%, transparent 70%)',
                        zIndex: 0,
                    }}
                />
                <div
                    className="absolute pointer-events-none"
                    style={{
                        bottom: '-12%',
                        left: '-8%',
                        width: '55%',
                        height: '55%',
                        background: 'radial-gradient(ellipse, rgba(140,60,230,0.10) 0%, transparent 70%)',
                        zIndex: 0,
                    }}
                />

                <img
                    src="/assets/terminal.png"
                    alt="terminal-bg"
                    className="absolute inset-0 min-h-screen w-full object-cover"
                    style={{ opacity: 0.9, mixBlendMode: 'screen', zIndex: 1 }}
                />
                <div className="contact-container relative" style={{ zIndex: 2 }}>
                    <h3 className="head-text">Let's talk</h3>
                    <p className="text-lg text-white-600 mt-3">
                        If you want to work with Computer Vision or Need someone for Frontend Development, I'm here to help.
                    </p>
                    <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col space-y-7">
                        <label className="space-y-3">
                            <span className="field-label">Full Name</span>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="Digonta Das"
                            />
                        </label>
                        <label className="space-y-3">
                            <span className="field-label">Email address</span>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                                className="field-input"
                                placeholder="digontadas0171@gmail.com"
                            />
                        </label>
                        <label className="space-y-3">
                            <span className="field-label">Your message</span>
                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="field-input"
                                placeholder="Share your thoughts or inquiries with me ...."
                            />
                        </label>
                        <button className="field-btn" type="submit" disabled={loading}>
                            {loading ? 'Sending...' : 'Send Message'}

                            <img src="/assets/arrow-up.png" alt="arrow-up" className="field-btn_arrow" />
                        </button>
                    </form>
                </div>

            </div>
        </section>
    )
}
export default Contact
