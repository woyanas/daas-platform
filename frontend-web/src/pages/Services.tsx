import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
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
            <section className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="section-title mb-6">Our Services</h1>
                        <p className="text-xl text-dark-300 max-w-3xl mx-auto">
                            Everything you need to build, analyze, and share powerful
                            dashboards that drive business decisions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Widget Types */}
            <section className="py-16 bg-dark-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-2xl font-bold text-white text-center mb-12">Widget Library</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {widgets.map((widget, index) => (
                            <motion.div
                                key={widget.name}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="card text-center group hover:border-primary-500/30"
                            >
                                <widget.icon className="w-8 h-8 text-primary-400 mx-auto mb-3" />
                                <h3 className="text-sm font-semibold text-white">{widget.name}</h3>
                                <p className="text-xs text-dark-400 mt-1">{widget.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Detail */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="card group hover:border-primary-500/30"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center mb-6 group-hover:bg-primary-500/20 transition-colors">
                                    <service.icon className="w-7 h-7 text-primary-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                                <p className="text-dark-400 mb-6">{service.description}</p>
                                <ul className="space-y-2">
                                    {service.features.map((feature) => (
                                        <li key={feature} className="flex items-center gap-2 text-sm text-dark-300">
                                            <Zap className="w-4 h-4 text-primary-400" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
