import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader, ToggleLeft, ToggleRight } from 'lucide-react';
import { alertsApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';

interface AlertDetail {
    id: string;
    name: string;
    type: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    settings?: Record<string, any>;
}

export default function AlertDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [alert, setAlert] = useState<AlertDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settingsText, setSettingsText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { isDark } = useThemeStore();

    useEffect(() => {
        if (!id) return;
        const fetchAlert = async () => {
            try {
                setLoading(true);
                const response = await alertsApi.getById(id);
                setAlert(response.data);
                setSettingsText(JSON.stringify(response.data.settings || {}, null, 2));
            } catch (fetchError) {
                console.error('Failed to load alert:', fetchError);
                setError('Unable to load alert details.');
            } finally {
                setLoading(false);
            }
        };

        fetchAlert();
    }, [id]);

    const toggleActive = async () => {
        if (!alert) return;
        const nextActive = !alert.isActive;
        setAlert({ ...alert, isActive: nextActive });
        try {
            await alertsApi.update(alert.id, { isActive: nextActive });
        } catch (toggleError) {
            console.error('Failed to update alert status:', toggleError);
            setAlert({ ...alert, isActive: !nextActive });
            setError('Unable to update alert status.');
        }
    };

    const saveAlert = async () => {
        if (!alert) return;
        try {
            setSaving(true);
            const settings = JSON.parse(settingsText || '{}');
            await alertsApi.update(alert.id, {
                name: alert.name,
                type: alert.type,
                description: alert.description,
                settings,
                isActive: alert.isActive,
            });
            setError(null);
        } catch (saveError: any) {
            console.error('Failed to save alert:', saveError);
            setError(saveError.message || 'Unable to save alert.');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (!alert) {
        return (
            <div className="space-y-4">
                <div className="text-center text-gray-700 dark:text-gray-300">Alert rule not found.</div>
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Go back
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <Link to="/services/alerts" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-500">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Alerts
                    </Link>
                    <div className="mt-4">
                        <div className="text-sm font-semibold uppercase tracking-wide text-primary-600">Alert Details</div>
                        <h1 className={`mt-2 text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{alert.name}</h1>
                        <p className={`mt-2 text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>{alert.description || 'No description available.'}</p>
                    </div>
                </div>
                <button
                    onClick={toggleActive}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${alert.isActive ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                    {alert.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    {alert.isActive ? 'Enabled' : 'Disabled'}
                </button>
            </div>

            <div className={`rounded-lg border p-6 ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">Type</div>
                        <div className={`mt-2 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{alert.type}</div>
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">Created</div>
                        <div className={`mt-2 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{new Date(alert.createdAt).toLocaleString()}</div>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">Settings JSON</div>
                        <textarea
                            value={settingsText}
                            onChange={(event) => setSettingsText(event.target.value)}
                            className="mt-2 w-full min-h-[220px] rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-mono text-gray-900 outline-none dark:border-dark-700 dark:bg-dark-900 dark:text-white focus:border-primary-500"
                        />
                    </div>
                    {error && <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">{error}</div>}
                    <button
                        onClick={saveAlert}
                        disabled={saving}
                        className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${saving ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
                    >
                        {saving ? 'Saving...' : 'Save Alert'}
                    </button>
                </div>
            </div>
        </div>
    );
}
