import { useEffect, useState } from 'react';
import { Loader, LayoutGrid, Plus } from 'lucide-react';
import { widgetPacksApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';
import AddServiceModal from '../components/modals/AddServiceModal';

const widgetPackFields = [
    { key: 'name', label: 'Pack Name', placeholder: 'Executive KPI Pack', required: true },
    { key: 'category', label: 'Category', type: 'select', required: true, options: [
        { value: 'CHART', label: 'Chart' },
        { value: 'TABLE', label: 'Table' },
        { value: 'SUMMARY', label: 'Summary' },
    ] },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Prebuilt KPI widget pack for founders' },
    { key: 'isActive', label: 'Active', type: 'checkbox', placeholder: 'Mark widget pack as active' },
];

export default function WidgetPacks() {
    const [packs, setPacks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const { isDark } = useThemeStore();

    useEffect(() => {
        const fetchPacks = async () => {
            try {
                setLoading(true);
                const response = await widgetPacksApi.getAll();
                setPacks(response.data);
            } catch (error) {
                console.error('Failed to fetch widget packs:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPacks();
    }, []);

    const handleCreateWidgetPack = async (formData: any) => {
        const payload = {
            name: formData.name,
            category: formData.category,
            description: formData.description,
            isActive: Boolean(formData.isActive),
        };

        await widgetPacksApi.create(payload);
        const response = await widgetPacksApi.getAll();
        setPacks(response.data);
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
                    <div className="text-sm font-semibold uppercase tracking-wide text-primary-600">Widget Packs</div>
                    <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Reusable Dashboard Templates</h1>
                    <p className={`mt-2 text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                        Manage reusable widget packs for dashboards and templates.
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
                        Add Widget Pack
                    </button>
                </div>
            </div>

            <div className={`rounded-lg border p-6 overflow-x-auto ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <table className="min-w-full text-left">
                    <thead>
                        <tr className={`border-b ${isDark ? 'border-dark-700' : 'border-gray-200'}`}>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Category</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Created</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                        {packs.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                                    No widget packs have been configured.
                                </td>
                            </tr>
                        ) : (
                            packs.map((pack) => (
                                <tr key={pack.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{pack.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-dark-200">{pack.category}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${pack.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {pack.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-dark-200">{new Date(pack.createdAt).toLocaleDateString()}</td>
                                    <td className="px-4 py-4 text-sm">
                                        <Link
                                            to={`/services/widget-packs/${pack.id}`}
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
                title="Create Widget Pack"
                submitLabel="Create Widget Pack"
                fields={widgetPackFields}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleCreateWidgetPack}
                initialValues={{ isActive: true }}
            />
        </div>
    );
}
