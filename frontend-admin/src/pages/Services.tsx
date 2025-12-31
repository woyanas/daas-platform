import { useState } from 'react';
import { BarChart3, Users, Code, Bell, Download, ToggleLeft, ToggleRight } from 'lucide-react';

interface Service {
    id: string;
    name: string;
    slug: string;
    description: string;
    icon: any;
    isEnabled: boolean;
}

const mockServices: Service[] = [
    { id: '1', name: 'Analytics Dashboard', slug: 'analytics', description: 'Real-time analytics and metrics visualization', icon: BarChart3, isEnabled: true },
    { id: '2', name: 'User Management', slug: 'users', description: 'Manage team members and permissions', icon: Users, isEnabled: true },
    { id: '3', name: 'API Gateway', slug: 'api', description: 'RESTful API access and management', icon: Code, isEnabled: false },
    { id: '4', name: 'Notifications', slug: 'notifications', description: 'Email and push notification services', icon: Bell, isEnabled: true },
    { id: '5', name: 'Data Export', slug: 'export', description: 'Export data to various formats', icon: Download, isEnabled: false },
];

export default function Services() {
    const [services, setServices] = useState<Service[]>(mockServices);

    const toggleService = (id: string) => {
        setServices(services.map((s) =>
            s.id === id ? { ...s, isEnabled: !s.isEnabled } : s
        ));
    };

    const enabledCount = services.filter((s) => s.isEnabled).length;

    return (
        <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="card">
                    <div className="text-2xl font-bold text-white">{services.length}</div>
                    <div className="text-sm text-dark-400">Total Services</div>
                </div>
                <div className="card">
                    <div className="text-2xl font-bold text-green-400">{enabledCount}</div>
                    <div className="text-sm text-dark-400">Enabled</div>
                </div>
                <div className="card">
                    <div className="text-2xl font-bold text-dark-400">{services.length - enabledCount}</div>
                    <div className="text-sm text-dark-400">Disabled</div>
                </div>
            </div>

            {/* Services Grid */}
            <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                    <div key={service.id} className={`card transition-all ${service.isEnabled ? 'border-primary-500/30' : ''}`}>
                        <div className="flex items-start gap-4">
                            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${service.isEnabled ? 'bg-primary-500/10' : 'bg-dark-800'
                                }`}>
                                <service.icon className={`w-6 h-6 ${service.isEnabled ? 'text-primary-400' : 'text-dark-500'}`} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                                <p className="text-sm text-dark-400 mt-1">{service.description}</p>
                            </div>
                            <button
                                onClick={() => toggleService(service.id)}
                                className={`transition-colors ${service.isEnabled ? 'text-primary-400' : 'text-dark-500'}`}
                            >
                                {service.isEnabled ? (
                                    <ToggleRight className="w-8 h-8" />
                                ) : (
                                    <ToggleLeft className="w-8 h-8" />
                                )}
                            </button>
                        </div>
                        <div className="mt-4 pt-4 border-t border-dark-800 flex items-center justify-between">
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${service.isEnabled
                                    ? 'bg-green-500/10 text-green-400'
                                    : 'bg-dark-700 text-dark-400'
                                }`}>
                                {service.isEnabled ? 'Enabled' : 'Disabled'}
                            </span>
                            <button className="text-sm text-primary-400 hover:text-primary-300">
                                Configure
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
