import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    ArrowRight, BarChart3, Layers, Zap, Shield
} from 'lucide-react';

const features = [
    {
        icon: BarChart3,
        title: 'Advanced Analytics',
        description: 'Real-time insights with beautiful charts and comprehensive reporting.',
    },
    {
        icon: Layers,
        title: 'Drag & Drop Builder',
        description: 'Create stunning dashboards in minutes with our intuitive builder.',
    },
    {
        icon: Zap,
        title: 'Lightning Fast',
        description: 'Optimized for performance with instant data updates and smooth interactions.',
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'Bank-grade security with SOC 2 compliance and data encryption.',
    },
];

const stats = [
    { value: '10K+', label: 'Active Users' },
    { value: '500M+', label: 'Data Points' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
];

export default function Home() {
    return (
        <>
            <Helmet>
                <title>DaaS Platform - Dashboard as a Service</title>
                <meta name="description" content="Build stunning dashboards with ease. Enterprise-grade analytics and visualization for your business." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center pt-20 bg-dark-950">
                <div className="relative max-w-7xl mx-auto px-6 py-20 text-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-dark-800 border border-dark-700 text-primary-400 text-sm mb-8">
                            <Zap className="w-4 h-4" />
                            <span>New: Real-time collaboration features</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                            Build Dashboards
                            <br />
                            <span className="text-primary-500">That Impress</span>
                        </h1>

                        <p className="text-lg md:text-xl text-dark-300 max-w-2xl mx-auto mb-10">
                            Create beautiful, real-time dashboards in minutes.
                            Enterprise-grade analytics for teams of all sizes.
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
                        <div className="relative rounded-2xl overflow-hidden border border-dark-800 bg-dark-900 p-8">
                            <div className="grid grid-cols-3 gap-4 mb-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="bg-dark-800 rounded-xl p-4 h-24" />
                                ))}
                            </div>
                            <div className="bg-dark-800 rounded-xl p-4 h-48" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 border-y border-dark-800 bg-dark-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary-500 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-dark-400">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-dark-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4">Everything You Need</h2>
                        <p className="text-dark-400 max-w-2xl mx-auto">
                            Powerful features to help you build, analyze, and share
                            dashboards that drive business decisions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature) => (
                            <div key={feature.title} className="p-6 rounded-2xl border border-dark-800 bg-dark-900">
                                <div className="w-12 h-12 rounded-xl bg-dark-800 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-primary-500" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-dark-400 text-sm">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-dark-950">
                <div className="max-w-4xl mx-auto px-6">
                    <div className="p-12 rounded-3xl border border-dark-800 bg-dark-900 text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
                        <p className="text-dark-300 mb-8 max-w-xl mx-auto">
                            Join thousands of companies using DaaS to power their analytics.
                            Start your free trial today.
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
