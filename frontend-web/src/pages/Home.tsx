import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
    ArrowRight, BarChart3, Layers, Zap, Shield,
    TrendingUp, Activity, Database, Users
} from 'lucide-react';

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:3002';

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

const dashboardStats = [
    { icon: Users, label: 'Active Users', value: '1,284', change: '+12%', color: 'text-primary-600 dark:text-primary-400' },
    { icon: Activity, label: 'API Calls / min', value: '45.2K', change: '+23%', color: 'text-emerald-600 dark:text-emerald-400' },
    { icon: Database, label: 'Data Stored', value: '2.3 TB', change: '+8%', color: 'text-blue-600 dark:text-blue-400' },
    { icon: TrendingUp, label: 'Dashboards', value: '382', change: '+18%', color: 'text-violet-600 dark:text-violet-400' },
];

export default function Home() {
    return (
        <>
            <Helmet>
                <title>DaaS Platform — AI-Driven Data Analytics for Industrial IoT</title>
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
                            <a href={`${ADMIN_URL}/register`} className="btn-primary">
                                Start Free Trial
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </a>
                            <Link to="/services" className="btn-secondary">
                                See Features
                            </Link>
                        </div>
                    </div>

                    {/* Dashboard Preview — Animated mockup */}
                    <div className="mt-16">
                        <div className="relative rounded-2xl overflow-hidden border border-dark-200 dark:border-dark-800 shadow-2xl">
                            {/* Browser chrome bar */}
                            <div className="bg-dark-100 dark:bg-dark-800 px-4 py-3 flex items-center gap-2 border-b border-dark-200 dark:border-dark-700">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <div className="flex-1 mx-4 h-5 rounded-md bg-dark-200 dark:bg-dark-700 flex items-center px-3">
                                    <span className="text-xs text-dark-400 dark:text-dark-500">app.daas-platform.io/dashboard</span>
                                </div>
                            </div>

                            {/* Dashboard content */}
                            <div className="bg-dark-50 dark:bg-dark-900 p-6">
                                {/* Stat cards */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
                                    {dashboardStats.map((s) => (
                                        <div
                                            key={s.label}
                                            className="bg-white dark:bg-dark-800 rounded-xl p-4 border border-dark-100 dark:border-dark-700"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <s.icon className={`w-4 h-4 ${s.color}`} />
                                                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20 px-1.5 py-0.5 rounded-full">
                                                    {s.change}
                                                </span>
                                            </div>
                                            <div className={`text-lg font-bold ${s.color}`}>{s.value}</div>
                                            <div className="text-xs text-dark-400 dark:text-dark-500 mt-0.5">{s.label}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Chart area mockup */}
                                <div className="grid md:grid-cols-3 gap-3">
                                    <div className="md:col-span-2 bg-white dark:bg-dark-800 rounded-xl p-4 border border-dark-100 dark:border-dark-700 h-40">
                                        <div className="text-xs font-semibold text-dark-700 dark:text-dark-300 mb-3">📈 Data Throughput (real-time)</div>
                                        {/* Fake sparkline */}
                                        <svg viewBox="0 0 300 60" className="w-full h-20" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.3" />
                                                    <stop offset="100%" stopColor="#4f46e5" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>
                                            <path
                                                d="M0,45 C20,40 40,30 60,35 C80,40 100,15 120,20 C140,25 160,10 180,15 C200,20 220,5 240,8 C260,11 280,18 300,12"
                                                fill="none"
                                                stroke="#4f46e5"
                                                strokeWidth="2"
                                            />
                                            <path
                                                d="M0,45 C20,40 40,30 60,35 C80,40 100,15 120,20 C140,25 160,10 180,15 C200,20 220,5 240,8 C260,11 280,18 300,12 L300,60 L0,60 Z"
                                                fill="url(#sparkGrad)"
                                            />
                                        </svg>
                                    </div>
                                    <div className="bg-white dark:bg-dark-800 rounded-xl p-4 border border-dark-100 dark:border-dark-700 h-40">
                                        <div className="text-xs font-semibold text-dark-700 dark:text-dark-300 mb-3">🥧 Data Sources</div>
                                        <div className="space-y-2">
                                            {[
                                                { label: 'PostgreSQL', val: 65, color: 'bg-primary-500' },
                                                { label: 'REST API', val: 22, color: 'bg-blue-400' },
                                                { label: 'IoT Streams', val: 13, color: 'bg-emerald-400' },
                                            ].map((item) => (
                                                <div key={item.label}>
                                                    <div className="flex justify-between text-xs text-dark-400 dark:text-dark-500 mb-1">
                                                        <span>{item.label}</span>
                                                        <span>{item.val}%</span>
                                                    </div>
                                                    <div className="h-1.5 bg-dark-100 dark:bg-dark-700 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${item.color} rounded-full`}
                                                            style={{ width: `${item.val}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
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
                                className="card bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 p-6 rounded-2xl hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-200 hover:shadow-md"
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
                            <a href={`${ADMIN_URL}/register`} className="btn-primary">
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
