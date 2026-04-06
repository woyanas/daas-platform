import { useEffect, useState } from 'react';
import { Loader, Database, Plus } from 'lucide-react';
import { connectorsApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';
import AddServiceModal from '../components/modals/AddServiceModal';

const connectorFields = [
    { key: 'name', label: 'Connector Name', placeholder: 'PostgreSQL source', required: true },
    { key: 'type', label: 'Connector Type', type: 'select', required: true, options: [
        { value: 'POSTGRES', label: 'PostgreSQL' },
        { value: 'MYSQL', label: 'MySQL' },
        { value: 'REST', label: 'REST API' },
        { value: 'GOOGLE_SHEETS', label: 'Google Sheets' },
    ] },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Connection settings for external database' },
    { key: 'host', label: 'Host', placeholder: 'db.example.com' },
    { key: 'port', label: 'Port', placeholder: '5432' },
    { key: 'database', label: 'Database', placeholder: 'source_db' },
    { key: 'username', label: 'Username', placeholder: 'db_user' },
    { key: 'password', label: 'Password', type: 'password', placeholder: 'secret' },
    { key: 'isActive', label: 'Active', type: 'checkbox', placeholder: 'Mark connector as active' },
];

export default function Connectors() {
    const [connectors, setConnectors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const { isDark } = useThemeStore();

    useEffect(() => {
        const fetchConnectors = async () => {
            try {
                setLoading(true);
                const response = await connectorsApi.getAll();
                setConnectors(response.data);
            } catch (error) {
                console.error('Failed to fetch connectors:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchConnectors();
    }, []);

    const handleCreateConnector = async (formData: any) => {
        const payload = {
            name: formData.name,
            type: formData.type,
            description: formData.description,
            config: {
                host: formData.host,
                port: Number(formData.port) || undefined,
                database: formData.database,
                username: formData.username,
                password: formData.password,
            },
            isActive: Boolean(formData.isActive),
        };

        await connectorsApi.create(payload);
        const response = await connectorsApi.getAll();
        setConnectors(response.data);
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
                    <div className="text-sm font-semibold uppercase tracking-wide text-primary-600">Connectors</div>
                    <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Data Sources & External Connectors</h1>
                    <p className={`mt-2 text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                        Manage external connector settings for PostgreSQL, APIs, Google Sheets, and more.
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
                        Add Connector
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
                        {connectors.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                                    No connectors configured yet.
                                </td>
                            </tr>
                        ) : (
                            connectors.map((connector) => (
                                <tr key={connector.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{connector.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-dark-200">{connector.type}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${connector.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {connector.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-dark-200">{new Date(connector.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-4 text-sm">
                                        <Link
                                            to={`/services/connectors/${connector.id}`}
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
                title="Create New Connector"
                submitLabel="Create Connector"
                fields={connectorFields}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleCreateConnector}
                initialValues={{ isActive: true }}
            />
        </div>
    );
}

