import { Helmet } from 'react-helmet-async';
import {
    BarChart3, LineChart, PieChart, Table2, Gauge,
    Layers, Zap, Shield, Database, Cloud, Workflow, Globe
} from 'lucide-react';

const widgets = [
    { icon: LineChart, name: 'Line Charts', description: 'Time series visualization' },
    { icon: BarChart3, name: 'Bar Charts', description: 'Categorical comparisons' },
    { icon: PieChart, name: 'Pie Charts', description: 'Distribution display' },
    { icon: Table2, name: 'Data Tables', description: 'Sortable, filterable tables' },
    { icon: Gauge, name: 'Gauges', description: 'KPI indicators' },
    { icon: Layers, name: 'KPI Cards', description: 'Metric highlights' },
];

const services = [
    {
        icon: BarChart3,
        title: 'Analytics Dashboard',
        description: 'Build beautiful, real-time dashboards with our drag-and-drop builder. Connect to any data source and visualize your metrics.',
        features: ['Drag & drop builder', 'Real-time updates', '20+ widget types', 'Custom themes'],
    },
    {
        icon: Database,
        title: 'Data Connectors',
        description: 'Connect to 50+ data sources including databases, APIs, spreadsheets, and cloud services.',
        features: ['PostgreSQL, MySQL, MongoDB', 'REST API integration', 'Google Sheets, Excel', 'Real-time sync'],
    },
    {
        icon: Shield,
        title: 'Enterprise Security',
        description: 'Bank-grade security with SOC 2 compliance, SSO, and role-based access control.',
        features: ['SSO/SAML integration', 'Role-based access', 'Audit logging', 'Data encryption'],
    },
    {
        icon: Cloud,
        title: 'Cloud Infrastructure',
        description: 'Scalable, reliable cloud infrastructure with 99.9% uptime SLA guarantee.',
        features: ['Auto-scaling', 'Global CDN', 'Daily backups', '99.9% uptime SLA'],
    },
    {
        icon: Workflow,
        title: 'API Access',
        description: 'Full REST API access for custom integrations and automation workflows.',
        features: ['RESTful API', 'Webhooks', 'SDK libraries', 'API documentation'],
    },
    {
        icon: Globe,
        title: 'Collaboration',
        description: 'Share dashboards with your team, embed in websites, or export to various formats.',
        features: ['Team sharing', 'Public dashboards', 'PDF/CSV export', 'Embed widgets'],
    },
];

export default function Services() {
    return (
        <>
            <Helmet>
                <title>Services & Features - DaaS Platform</title>
                <meta name="description" content="Explore DaaS Platform features: analytics dashboards, data connectors, enterprise security, and more." />
            </Helmet>

            {/* Hero */}
            <section className="pt-32 pb-20 bg-dark-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h1>
                        <p className="text-xl text-dark-300 max-w-3xl mx-auto">
                            Everything you need to build, analyze, and share powerful
                            dashboards that drive business decisions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Widget Types */}
            <section className="py-16 bg-dark-950 border-y border-dark-800">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-white text-center mb-12">Widget Library</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {widgets.map((widget) => (
                            <div
                                key={widget.name}
                                className="p-4 rounded-xl border border-dark-800 bg-dark-900 text-center"
                            >
                                <widget.icon className="w-8 h-8 text-primary-500 mx-auto mb-3" />
                                <h3 className="text-sm font-semibold text-white">{widget.name}</h3>
                                <p className="text-xs text-dark-400 mt-1">{widget.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Detail */}
            <section className="py-24 bg-dark-950">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service) => (
                            <div
                                key={service.title}
                                className="p-6 rounded-2xl border border-dark-800 bg-dark-900"
                            >
                                <div className="w-14 h-14 rounded-xl bg-dark-800 flex items-center justify-center mb-6">
                                    <service.icon className="w-7 h-7 text-primary-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-dark-400 mb-6">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-dark-300">
                                            <Zap className="w-4 h-4 text-primary-500" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
