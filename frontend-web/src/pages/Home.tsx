import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowRight, BarChart3, Layers, Zap, Shield
} from 'lucide-react';

const features = [
    {
        icon: BarChart3,
        title: 'Big Data Analytics',
        description: 'Process and analyze massive datasets with our high-performance analytics engine.',
    },
    {
        icon: Layers,
        title: 'Time-Series Intelligence',
        description: 'Specialized time-series database for industrial IoT and real-time monitoring.',
    },
    {
        icon: Zap,
        title: 'Real-Time Processing',
        description: 'Millisecond-level analytics with stream processing for instant insights.',
    },
    {
        icon: Shield,
        title: 'AI-Powered Insights',
        description: 'Machine learning and AI agents for predictive analytics and anomaly detection.',
    },
];

const stats = [
    { value: '500+', label: 'Enterprise Clients' },
    { value: '10B+', label: 'Data Points Processed' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '24/7', label: 'Expert Support' },
];

export default function Home() {
    return (
        <>
            <Helmet>
                <title>Canasfee - Data Analytics Solutions & Software</title>
                <meta name="description" content="Transform your data into actionable insights with Canasfee's advanced Big Data Analytics, Time-Series Intelligence, and AI-powered solutions." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
                {/* Background Effects */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-dark-950 to-dark-950" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-600/10 rounded-full blur-3xl" />

                <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-sm mb-8">
                            <Zap className="w-4 h-4" />
                            <span>New: AI-Powered Predictive Analytics</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            AI-Driven Data Platform
                            <br />
                            <span className="gradient-text">For Industrial IoT</span>
                        </h1>

                        <p className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-10">
                            Transform massive amounts of industrial data into real-time insights.
                            High-performance time-series analytics with AI-powered intelligence.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/pricing" className="btn-primary">
                                Start Free Trial
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </Link>
                            <Link to="/services" className="btn-secondary">
                                See Features
                            </Link>
                        </div>
                    </motion.div>

                    {/* Dashboard Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-16"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-dark-800 shadow-2xl shadow-black/50">
                            <div className="bg-gradient-to-br from-dark-900 to-dark-950 p-8">
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="bg-dark-800/50 rounded-xl p-4 h-24 animate-pulse" />
                                    ))}
                                </div>
                                <div className="bg-dark-800/50 rounded-xl p-4 h-48 animate-pulse" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-dark-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-dark-400">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="section-title mb-4">Why Choose Canasfee?</h2>
                        <p className="text-dark-400 max-w-2xl mx-auto">
                            Leading-edge data analytics solutions designed for modern industrial enterprises.
                            From raw data to real-time intelligence in one platform.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="card group hover:border-primary-500/30"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                                    <feature.icon className="w-6 h-6 text-primary-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-dark-400 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="card bg-gradient-to-br from-primary-900/30 to-dark-900/50 border-primary-500/20 text-center py-16">
                        <h2 className="section-title mb-4">Ready to Transform Your Data?</h2>
                        <p className="text-dark-300 mb-8 max-w-xl mx-auto">
                            Join 500+ industrial companies using Canasfee to unlock the true value of their time-series data.
                            Request a demo or start your free trial today.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <a href="http://localhost:3002/register" className="btn-primary">
                                Start Free Trial
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                            <Link to="/contact" className="btn-secondary">
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
