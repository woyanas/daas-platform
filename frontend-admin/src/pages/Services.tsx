import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BarChart3, Users, Code, Bell, Download, ToggleLeft, ToggleRight, Loader } from 'lucide-react';
import { servicesApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';

interface Service {
    id: string;
    name: string;
    slug: string;
    category?: string;
    description: string;
    icon: any;
    isEnabled?: boolean;
    settings?: Record<string, any>;
}

const serviceEmojis: Record<string, string> = {
    analytics: '📊',
    users: '👥',
    api: '⚡',
    notifications: '🔔',
    export: '📥',
    'data-connectors': '🔌',
    'widget-marketplace': '🧩',
    alerts: '🚨',
    reports: '📄',
    integrations: '🔗',
    'feature-flags': '⚙️',
};

const serviceCategoryLabels: Record<string, string> = {
    connector: 'Data Connectors',
    widget: 'Widget Marketplace',
    alert: 'Alert & Notification',
    report: 'Reporting & Export',
    integration: 'Third-party Integrations',
    feature_flag: 'Feature Flags',
    core: 'Core Platform Services',
};

const mockServices: Service[] = [
    { id: '1', name: 'Analytics Dashboard', slug: 'analytics', category: 'core', description: 'Real-time analytics and metrics visualization', icon: BarChart3, isEnabled: false },
    { id: '2', name: 'User Management', slug: 'users', category: 'core', description: 'Manage team members and permissions', icon: Users, isEnabled: false },
    { id: '3', name: 'API Gateway', slug: 'api', category: 'core', description: 'RESTful API access and management', icon: Code, isEnabled: false },
    { id: '4', name: 'Notifications', slug: 'notifications', category: 'core', description: 'Email and push notification services', icon: Bell, isEnabled: false },
    { id: '5', name: 'Data Export', slug: 'export', category: 'core', description: 'Export data to various formats', icon: Download, isEnabled: false },
    { id: '6', name: 'Data Connector Service', slug: 'data-connectors', category: 'connector', description: 'Connect external data sources such as PostgreSQL and Google Sheets.', icon: BarChart3, isEnabled: false },
    { id: '7', name: 'Widget Marketplace', slug: 'widget-marketplace', category: 'widget', description: 'Reusable dashboard widgets and templates.', icon: Users, isEnabled: false },
    { id: '8', name: 'Alert & Notification', slug: 'alerts', category: 'alert', description: 'Create alerts for failures, thresholds, and usage.', icon: Bell, isEnabled: false },
    { id: '9', name: 'Reporting & Export', slug: 'reports', category: 'report', description: 'Generate exportable reports in PDF, Excel, and CSV.', icon: Download, isEnabled: false },
    { id: '10', name: 'Third-party Integrations', slug: 'integrations', category: 'integration', description: 'Connect Slack, Teams, Zapier, and webhooks.', icon: Code, isEnabled: false },
    { id: '11', name: 'Feature Flags', slug: 'feature-flags', category: 'feature_flag', description: 'Enable experimental or tenant-specific features.', icon: ToggleLeft, isEnabled: false },
];

export default function Services() {
    const [services, setServices] = useState<Service[]>(mockServices);
    const [loading, setLoading] = useState(true);
    const { isDark } = useThemeStore();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                const res = await servicesApi.getMyConfig();
                if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                    setServices(res.data);
                } else {
                    setServices(mockServices);
                }
            } catch (error) {
                console.error('Failed to fetch services:', error);
                setServices(mockServices);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const toggleService = async (id: string) => {
        const serviceToUpdate = services.find((s) => s.id === id);
        if (!serviceToUpdate) return;

        const newState = !serviceToUpdate.isEnabled;

        // Optimistic update - update UI immediately
        setServices(services.map((s) =>
            s.id === id ? { ...s, isEnabled: newState } : s
        ));

        try {
            // Call API to toggle service
            await servicesApi.toggle(id, newState);
            console.log(`Service ${id} toggled to ${newState ? 'enabled' : 'disabled'}`);
        } catch (error) {
            console.error('Failed to toggle service:', error);
            // Rollback on error - revert state
            setServices(services.map((s) =>
                s.id === id ? { ...s, isEnabled: !newState } : s
            ));
            // Optionally show error to user
            alert('Failed to update service. Please try again.');
        }
    };

    const enabledCount = services.filter((s) => s.isEnabled).length;
    const categoryOrder = ['core', 'connector', 'widget', 'alert', 'report', 'integration', 'feature_flag'];
    const categories = categoryOrder.filter((category) =>
        services.some((service) => (service.category || 'core') === category),
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className={`rounded-lg p-6 transition-colors ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'} border`}>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>📦 {services.length}</div>
                    <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>Total Services</div>
                </div>
                <div className={`rounded-lg p-6 transition-colors ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'} border`}>
                    <div className="text-2xl font-bold text-green-400">✅ {enabledCount}</div>
                    <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>Enabled</div>
                </div>
                <div className={`rounded-lg p-6 transition-colors ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'} border`}>
                    <div className="text-2xl font-bold text-orange-400">⛔ {services.length - enabledCount}</div>
                    <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>Disabled</div>
                </div>
            </div>

            {/* Quick service category navigation */}
            <div className="grid gap-4 md:grid-cols-3">
                <Link
                    to="/services/connectors"
                    className="rounded-xl border p-5 transition hover:border-primary-400 hover:bg-primary-50 dark:border-dark-700 dark:hover:bg-dark-800"
                >
                    <div className="text-sm font-semibold text-primary-600">🔌 Connectors</div>
                    <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Data source and system connectors</div>
                </Link>
                <Link
                    to="/services/widget-packs"
                    className="rounded-xl border p-5 transition hover:border-primary-400 hover:bg-primary-50 dark:border-dark-700 dark:hover:bg-dark-800"
                >
                    <div className="text-sm font-semibold text-primary-600">🧩 Widget Packs</div>
                    <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Widget marketplace and reusable UI components</div>
                </Link>
                <Link
                    to="/services/alerts"
                    className="rounded-xl border p-5 transition hover:border-primary-400 hover:bg-primary-50 dark:border-dark-700 dark:hover:bg-dark-800"
                >
                    <div className="text-sm font-semibold text-primary-600">🚨 Alerts</div>
                    <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Alerting rules and notification workflows</div>
                </Link>
                <Link
                    to="/services/reports"
                    className="rounded-xl border p-5 transition hover:border-primary-400 hover:bg-primary-50 dark:border-dark-700 dark:hover:bg-dark-800"
                >
                    <div className="text-sm font-semibold text-primary-600">📄 Reports</div>
                    <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Export and scheduled report management</div>
                </Link>
                <Link
                    to="/services/integrations"
                    className="rounded-xl border p-5 transition hover:border-primary-400 hover:bg-primary-50 dark:border-dark-700 dark:hover:bg-dark-800"
                >
                    <div className="text-sm font-semibold text-primary-600">🔗 Integrations</div>
                    <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">External system and API integrations</div>
                </Link>
                <Link
                    to="/services/feature-flags"
                    className="rounded-xl border p-5 transition hover:border-primary-400 hover:bg-primary-50 dark:border-dark-700 dark:hover:bg-dark-800"
                >
                    <div className="text-sm font-semibold text-primary-600">⚙️ Feature Flags</div>
                    <div className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Feature rollout controls and gating</div>
                </Link>
            </div>

            {/* Services Grid */}
            {categories.map((category) => (
                <div key={category} className="space-y-4">
                    <div className="text-lg font-semibold text-gray-800 dark:text-white">{serviceCategoryLabels[category] || 'Other Services'}</div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {services
                            .filter((service) => (service.category || 'core') === category)
                            .map((service) => (
                                <div key={service.id} className={`rounded-lg p-6 transition-all border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'} ${service.isEnabled ? 'border-primary-500/30' : ''}`}>
                                    <div className="flex items-start gap-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${service.isEnabled ? 'bg-primary-500/10' : isDark ? 'bg-dark-800' : 'bg-gray-100'}`}>
                                            {serviceEmojis[service.slug] || '🔧'}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{service.name}</h3>
                                            <p className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'} mt-1`}>{service.description}</p>
                                        </div>
                                        <button
                                            onClick={() => toggleService(service.id)}
                                            className={`transition-colors ${service.isEnabled ? 'text-green-400' : isDark ? 'text-dark-500' : 'text-gray-500'}`}
                                        >
                                            {service.isEnabled ? (
                                                <ToggleRight className="w-8 h-8" />
                                            ) : (
                                                <ToggleLeft className="w-8 h-8" />
                                            )}
                                        </button>
                                    </div>
                                    <div className={`mt-4 pt-4 border-t ${isDark ? 'border-dark-800' : 'border-gray-200'} flex items-center justify-between`}>
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${service.isEnabled ? 'bg-green-500/10 text-green-400' : isDark ? 'bg-dark-700 text-dark-400' : 'bg-gray-200 text-gray-600'}`}>
                                            {service.isEnabled ? '✅ Enabled' : '⛔ Disabled'}
                                        </span>
                                        <Link
                                            to={`/services/${service.id}`}
                                            className={`text-sm transition-colors ${isDark ? 'text-primary-400 hover:text-primary-300' : 'text-blue-600 hover:text-blue-700'}`}
                                        >
                                            ⚙️ Configure
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
