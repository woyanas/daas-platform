import { useState, useEffect } from 'react';
import { BarChart3, Users, Code, Bell, Download, ToggleLeft, ToggleRight, Loader } from 'lucide-react';
import { servicesApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';

interface Service {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: any;
    isEnabled: boolean;
}

const serviceEmojis: Record<string, string> = {
    analytics: '📊',
    users: '👥',
    api: '⚡',
    notifications: '🔔',
    export: '📥',
};

const mockServices: Service[] = [
    { id: '1', name: 'Analytics Dashboard', slug: 'analytics', description: 'Real-time analytics and metrics visualization', icon: BarChart3, isEnabled: false },
    { id: '2', name: 'User Management', slug: 'users', description: 'Manage team members and permissions', icon: Users, isEnabled: false },
    { id: '3', name: 'API Gateway', slug: 'api', description: 'RESTful API access and management', icon: Code, isEnabled: false },
    { id: '4', name: 'Notifications', slug: 'notifications', description: 'Email and push notification services', icon: Bell, isEnabled: false },
    { id: '5', name: 'Data Export', slug: 'export', description: 'Export data to various formats', icon: Download, isEnabled: false },
];

export default function Services() {
    const [services, setServices] = useState<Service[]>(mockServices);
    const [loading, setLoading] = useState(true);
    const { isDark } = useThemeStore();

    useEffect(() => {
        const fetchServices = async () => {
            try {
                setLoading(true);
                // Try to fetch from API
                const res = await servicesApi.getAll();
                if (res.data && Array.isArray(res.data) && res.data.length > 0) {
                    setServices(res.data);
                } else {
                    // Use mock data if API returns empty
                    setServices(mockServices);
                }
            } catch (error) {
                console.error('Failed to fetch services:', error);
                // Fallback to mock data on error
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

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                    <div key={service.id} className={`rounded-lg p-6 transition-all border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'} ${service.isEnabled ? 'border-primary-500/30' : ''}`}>
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-2xl ${service.isEnabled ? 'bg-primary-500/10' : isDark ? 'bg-dark-800' : 'bg-gray-100'
                                }`}>
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
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${service.isEnabled
                                    ? 'bg-green-500/10 text-green-400'
                                    : isDark ? 'bg-dark-700 text-dark-400' : 'bg-gray-200 text-gray-600'
                                }`}>
                                {service.isEnabled ? '✅ Enabled' : '⛔ Disabled'}
                            </span>
                            <button className={`text-sm transition-colors ${isDark ? 'text-primary-400 hover:text-primary-300' : 'text-blue-600 hover:text-blue-700'}`}>
                                ⚙️ Configure
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
