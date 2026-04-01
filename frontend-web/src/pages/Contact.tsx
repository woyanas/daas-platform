import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        subject: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            // Show success regardless of actual success for this demo
            setSubmitted(true);
        } catch (error) {
            console.error('Failed to send message:', error);
            // Show success regardless of actual success for this demo
            setSubmitted(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    return (
        <>
            <Helmet>
                <title>Contact Us - Platform</title>
                <meta name="description" content="Get in touch with the Platform team. We're here to help you build powerful analytics dashboards." />
            </Helmet>

            <section className="pt-32 pb-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Info */}
                        <div className="lg:col-span-1">
                            <h1 className="text-4xl font-bold text-dark-900 dark:text-white mb-6">Get in Touch 📩</h1>
                            <p className="text-dark-600 dark:text-dark-300 mb-12">
                                Have questions about our platform? We'd love to hear from you.
                                Send us a message and we'll respond as soon as possible.
                            </p>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center shrink-0">
                                        <Mail className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-dark-900 dark:text-white mb-1">Email</h3>
                                        <p className="text-dark-600 dark:text-dark-400">hello@platform.local</p>
                                        <p className="text-dark-600 dark:text-dark-400">support@platform.local</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center shrink-0">
                                        <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-dark-900 dark:text-white mb-1">Phone</h3>
                                        <p className="text-dark-600 dark:text-dark-400">+1 (555) 123-4567</p>
                                        <p className="text-dark-600 dark:text-dark-400">Mon-Fri 9am-6pm PST</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center shrink-0">
                                        <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-dark-900 dark:text-white mb-1">Office</h3>
                                        <p className="text-dark-600 dark:text-dark-400">123 Tech Street</p>
                                        <p className="text-dark-600 dark:text-dark-400">San Francisco, CA 94105</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            {submitted ? (
                                <div className="card text-center py-16 bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 rounded-2xl">
                                    <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-dark-900 dark:text-white mb-4">Message Sent!</h3>
                                    <p className="text-dark-600 dark:text-dark-400">
                                        Thank you for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="card bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 rounded-2xl p-6">
                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
                                                Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-xl text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-xl text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                                        <div>
                                            <label htmlFor="company" className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
                                                Company
                                            </label>
                                            <input
                                                type="text"
                                                id="company"
                                                name="company"
                                                value={formData.company}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-xl text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                                                placeholder="Acme Inc."
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="subject" className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
                                                Subject *
                                            </label>
                                            <select
                                                id="subject"
                                                name="subject"
                                                required
                                                value={formData.subject}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-xl text-dark-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors"
                                            >
                                                <option value="">Select a topic</option>
                                                <option value="sales">Sales Inquiry</option>
                                                <option value="support">Technical Support</option>
                                                <option value="partnership">Partnership</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="mb-6">
                                        <label htmlFor="message" className="block text-sm font-medium text-dark-700 dark:text-dark-200 mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-dark-50 dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-xl text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-colors resize-none"
                                            placeholder="How can we help you?"
                                        />
                                    </div>

                                    <button type="submit" className="btn-primary flex items-center justify-center">
                                        Send Message
                                        <Send className="w-4 h-4 ml-2" />
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
