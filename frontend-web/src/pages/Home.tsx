import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
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
                <title>Data Analytics Solutions & Software</title>
                <meta name="description" content="Transform your data into actionable insights with our advanced Big Data Analytics, Time-Series Intelligence, and AI-powered solutions." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20">
                <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 border border-primary-200 text-primary-700 text-sm mb-8 dark:bg-primary-900 dark:border-primary-700 dark:text-primary-300">
                            <Zap className="w-4 h-4" />
                            <span>✨ New: AI-Powered Predictive Analytics</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-dark-900 dark:text-white mb-6 leading-tight">
                            AI-Driven Data Platform
                            <br />
                            <span className="text-primary-600 dark:text-primary-400">For Industrial IoT 🏭</span>
                        </h1>

                        <p className="text-lg md:text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto mb-10">
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
                    </div>

                    {/* Dashboard Preview */}
                    <div className="mt-16">
                        <div className="relative rounded-2xl overflow-hidden border border-dark-200 dark:border-dark-800 shadow-md">
                            <div className="bg-dark-50 dark:bg-dark-900 p-8">
                                <div className="grid grid-cols-3 gap-4 mb-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="bg-dark-200 dark:bg-dark-800 rounded-xl p-4 h-24" />
                                    ))}
                                </div>
                                <div className="bg-dark-200 dark:bg-dark-800 rounded-xl p-4 h-48" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-dark-200 dark:border-dark-800">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-dark-600 dark:text-dark-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">Why Choose Us? 💡</h2>
                        <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
                            Leading-edge data analytics solutions designed for modern industrial enterprises.
                            From raw data to real-time intelligence in one platform.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="card bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 p-6 rounded-2xl"
                            >
                                <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-dark-600 dark:text-dark-400 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="card bg-primary-50 dark:bg-dark-900 border border-primary-200 dark:border-dark-800 text-center py-16 rounded-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">Ready to Transform Your Data? 🚀</h2>
                        <p className="text-dark-600 dark:text-dark-300 mb-8 max-w-xl mx-auto">
                            Join 500+ industrial companies using our platform to unlock the true value of their time-series data.
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
