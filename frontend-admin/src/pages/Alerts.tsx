import { useEffect, useState } from 'react';
import { Loader, Bell, Plus } from 'lucide-react';
import { alertsApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';
import AddServiceModal from '../components/modals/AddServiceModal';

const alertFields = [
    { key: 'name', label: 'Alert Name', placeholder: 'High usage alert', required: true },
    { key: 'type', label: 'Alert Type', type: 'select', required: true, options: [
        { value: 'USAGE', label: 'Usage' },
        { value: 'ERROR', label: 'Error' },
        { value: 'PERFORMANCE', label: 'Performance' },
    ] },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Notify when usage exceeds threshold' },
    { key: 'threshold', label: 'Threshold (%)', placeholder: '90' },
    { key: 'channels', label: 'Channels', placeholder: 'email,slack' },
    { key: 'isActive', label: 'Active', type: 'checkbox', placeholder: 'Enable alert rule' },
];

export default function Alerts() {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const { isDark } = useThemeStore();

    useEffect(() => {
        const fetchAlerts = async () => {
            try {
                setLoading(true);
                const response = await alertsApi.getAll();
                setAlerts(response.data);
            } catch (error) {
                console.error('Failed to fetch alerts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAlerts();
    }, []);

    const handleCreateAlert = async (formData: any) => {
        const payload = {
            name: formData.name,
            type: formData.type,
            description: formData.description,
            settings: {
                threshold: Number(formData.threshold) || 0,
                channels: formData.channels?.split(',').map((item: string) => item.trim()).filter(Boolean),
            },
            isActive: Boolean(formData.isActive),
        };

        await alertsApi.create(payload);
        const response = await alertsApi.getAll();
        setAlerts(response.data);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <div className="text-sm font-semibold uppercase tracking-wide text-primary-600">Alert Rules</div>
                    <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Alert & Notification Rules</h1>
                    <p className={`mt-2 text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                        Review alert rules for usage, threshold, and failure notifications.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Link
                        to="/services"
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-200"
                    >
                        <Plus className="w-4 h-4" />
                        Back to Services
                    </Link>
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700"
                    >
                        <Plus className="w-4 h-4" />
                        Add Alert Rule
                    </button>
                </div>
            </div>

            <div className={`rounded-lg border p-6 overflow-x-auto ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <table className="min-w-full text-left">
                    <thead>
                        <tr className={`border-b ${isDark ? 'border-dark-700' : 'border-gray-200'}`}>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Type</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Created</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                        {alerts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                                    No alert rules configured.
                                </td>
                            </tr>
                        ) : (
                            alerts.map((alert) => (
                                <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{alert.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-dark-200">{alert.type}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${alert.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {alert.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-dark-200">{new Date(alert.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-4 text-sm">
                                        <Link
                                            to={`/services/alerts/${alert.id}`}
                                            className="text-sm font-semibold text-primary-600 hover:text-primary-500"
                                        >
                                            Configure
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <AddServiceModal
                isOpen={showAddModal}
                title="Create Alert Rule"
                submitLabel="Create Alert"
                fields={alertFields}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleCreateAlert}
                initialValues={{ isActive: true }}
            />
        </div>
    );
}
