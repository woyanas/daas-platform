import { useEffect, useState } from 'react';
import { Loader, Plus } from 'lucide-react';
import { integrationsApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';
import AddServiceModal from '../components/modals/AddServiceModal';

const integrationFields = [
    { key: 'name', label: 'Integration Name', placeholder: 'Slack alerts', required: true },
    { key: 'provider', label: 'Provider', type: 'select', required: true, options: [
        { value: 'SLACK', label: 'Slack' },
        { value: 'TEAMS', label: 'Microsoft Teams' },
        { value: 'WEBHOOK', label: 'Webhook' },
    ] },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Send alerts to Slack channel' },
    { key: 'webhookUrl', label: 'Webhook URL', placeholder: 'https://hooks.slack.com/services/...'},
    { key: 'isActive', label: 'Active', type: 'checkbox', placeholder: 'Mark integration as active' },
];

export default function Integrations() {
    const [integrations, setIntegrations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const { isDark } = useThemeStore();

    useEffect(() => {
        const fetchIntegrations = async () => {
            try {
                setLoading(true);
                const response = await integrationsApi.getAll();
                setIntegrations(response.data);
            } catch (error) {
                console.error('Failed to fetch integrations:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchIntegrations();
    }, []);

    const handleCreateIntegration = async (formData: any) => {
        const payload = {
            name: formData.name,
            provider: formData.provider,
            description: formData.description,
            config: {
                webhookUrl: formData.webhookUrl,
            },
            isActive: Boolean(formData.isActive),
        };

        await integrationsApi.create(payload);
        const response = await integrationsApi.getAll();
        setIntegrations(response.data);
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
                    <div className="text-sm font-semibold uppercase tracking-wide text-primary-600">Third-Party Integrations</div>
                    <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Integration Configuration</h1>
                    <p className={`mt-2 text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                        Manage external systems, API keys, and data sync pipelines.
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
                        Add Integration
                    </button>
                </div>
            </div>

            <div className={`rounded-lg border p-6 overflow-x-auto ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <table className="min-w-full text-left">
                    <thead>
                        <tr className={`border-b ${isDark ? 'border-dark-700' : 'border-gray-200'}`}>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Provider</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Last Sync</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                        {integrations.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                                    No integrations configured.
                                </td>
                            </tr>
                        ) : (
                            integrations.map((integration) => (
                                <tr key={integration.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{integration.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-dark-200">{integration.provider}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${integration.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {integration.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-dark-200">{integration.lastSync ? new Date(integration.lastSync).toLocaleString() : 'Never'}</td>
                                    <td className="px-4 py-4 text-sm">
                                        <Link
                                            to={`/services/integrations/${integration.id}`}
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
                title="Create Integration"
                submitLabel="Create Integration"
                fields={integrationFields}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleCreateIntegration}
                initialValues={{ isActive: true }}
            />
        </div>
    );
}
