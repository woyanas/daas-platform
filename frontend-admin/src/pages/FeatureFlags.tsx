import { useEffect, useState } from 'react';
import { Loader, ToggleLeft, Plus } from 'lucide-react';
import { featureFlagsApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';
import AddServiceModal from '../components/modals/AddServiceModal';

const featureFlagFields = [
    { key: 'name', label: 'Flag Name', placeholder: 'Enable advanced reporting', required: true },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Turn on the advanced reporting feature' },
    { key: 'tenantId', label: 'Tenant ID', placeholder: 'tenant-123' },
    { key: 'isEnabled', label: 'Enabled', type: 'checkbox', placeholder: 'Turn feature on for this flag' },
];

export default function FeatureFlags() {
    const [flags, setFlags] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showEditModal, setShowEditModal] = useState(false);
    const [activeFlag, setActiveFlag] = useState<any | null>(null);
    const { isDark } = useThemeStore();

    useEffect(() => {
        const fetchFlags = async () => {
            try {
                setLoading(true);
                const response = await featureFlagsApi.getAll();
                setFlags(response.data);
            } catch (error) {
                console.error('Failed to fetch feature flags:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFlags();
    }, []);

    const toggleFlag = async (flagId: string, enabled: boolean) => {
        try {
            await featureFlagsApi.update(flagId, { isEnabled: enabled });
            setFlags((current) => current.map((flag) => (flag.id === flagId ? { ...flag, isEnabled: enabled } : flag)));
        } catch (error) {
            console.error('Failed to toggle feature flag:', error);
        }
    };

    const handleEditFlag = (flag: any) => {
        setActiveFlag(flag);
        setShowEditModal(true);
    };

    const handleSaveFlag = async (formData: any) => {
        if (!activeFlag) return;
        const payload: any = {
            name: formData.name,
            description: formData.description,
            tenantId: formData.tenantId,
            isEnabled: Boolean(formData.isEnabled),
        };

        await featureFlagsApi.update(activeFlag.id, payload);
        const response = await featureFlagsApi.getAll();
        setFlags(response.data);
        setActiveFlag(null);
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
                    <div className="text-sm font-semibold uppercase tracking-wide text-primary-600">Feature Flags</div>
                    <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Launch Controls</h1>
                    <p className={`mt-2 text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                        Manage feature rollouts, environments, and gradual release targeting.
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
                        disabled
                        className="inline-flex items-center gap-2 rounded-lg bg-gray-300 px-4 py-2 text-sm font-semibold text-gray-500 cursor-not-allowed"
                    >
                        <Plus className="w-4 h-4" />
                        Create Flag (Coming Soon)
                    </button>
                </div>
            </div>

            <div className={`rounded-lg border p-6 overflow-x-auto ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <table className="min-w-full text-left">
                    <thead>
                        <tr className={`border-b ${isDark ? 'border-dark-700' : 'border-gray-200'}`}>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Flag</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Description</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Environment</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                        {flags.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                                    No feature flags configured.
                                </td>
                            </tr>
                        ) : (
                            flags.map((flag) => (
                                <tr key={flag.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{flag.key}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-dark-200">{flag.description}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${flag.isEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {flag.isEnabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-dark-200">{flag.environment || flag.tenantId || 'global'}</td>
                                    <td className="px-4 py-4 flex items-center gap-2">
                                        <button
                                            onClick={() => toggleFlag(flag.id, !flag.isEnabled)}
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${flag.isEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}
                                        >
                                            {flag.isEnabled ? 'Disable' : 'Enable'}
                                        </button>
                                        <button
                                            onClick={() => handleEditFlag(flag)}
                                            className="rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white hover:bg-primary-500"
                                        >
                                            Edit
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <AddServiceModal
                isOpen={showEditModal && Boolean(activeFlag)}
                title="Edit Feature Flag"
                submitLabel="Save Flag"
                fields={featureFlagFields}
                initialValues={activeFlag ?? { isEnabled: false }}
                onClose={() => {
                    setShowEditModal(false);
                    setActiveFlag(null);
                }}
                onSubmit={handleSaveFlag}
            />
        </div>
    );
}
