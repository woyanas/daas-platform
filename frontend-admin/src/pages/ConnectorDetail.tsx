import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader, ToggleLeft, ToggleRight } from 'lucide-react';
import { connectorsApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';

interface ConnectorDetail {
    id: string;
    name: string;
    type: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    config?: Record<string, any>;
}

export default function ConnectorDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [connector, setConnector] = useState<ConnectorDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [configText, setConfigText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { isDark } = useThemeStore();

    useEffect(() => {
        if (!id) return;
        const fetchConnector = async () => {
            try {
                setLoading(true);
                const response = await connectorsApi.getById(id);
                setConnector(response.data);
                setConfigText(JSON.stringify(response.data.config || {}, null, 2));
            } catch (fetchError) {
                console.error('Failed to load connector:', fetchError);
                setError('Unable to load connector details.');
            } finally {
                setLoading(false);
            }
        };

        fetchConnector();
    }, [id]);

    const toggleActive = async () => {
        if (!connector) return;
        const nextActive = !connector.isActive;
        setConnector({ ...connector, isActive: nextActive });
        try {
            await connectorsApi.update(connector.id, { isActive: nextActive });
        } catch (toggleError) {
            console.error('Failed to update connector status:', toggleError);
            setConnector({ ...connector, isActive: !nextActive });
            setError('Unable to update connector status.');
        }
    };

    const saveConnector = async () => {
        if (!connector) return;
        try {
            setSaving(true);
            const config = JSON.parse(configText || '{}');
            await connectorsApi.update(connector.id, {
                name: connector.name,
                type: connector.type,
                description: connector.description,
                isActive: connector.isActive,
                config,
            });
            setError(null);
        } catch (saveError: any) {
            console.error('Failed to save connector:', saveError);
            setError(saveError.message || 'Unable to save connector.');
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

    if (!connector) {
        return (
            <div className="space-y-4">
                <div className="text-center text-gray-700 dark:text-gray-300">Connector not found.</div>
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
                    <Link to="/services/connectors" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-500">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Connectors
                    </Link>
                    <div className="mt-4">
                        <div className="text-sm font-semibold uppercase tracking-wide text-primary-600">Connector Details</div>
                        <h1 className={`mt-2 text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{connector.name}</h1>
                        <p className={`mt-2 text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>{connector.description || 'No description available.'}</p>
                    </div>
                </div>
                <button
                    onClick={toggleActive}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${connector.isActive ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                    {connector.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    {connector.isActive ? 'Enabled' : 'Disabled'}
                </button>
            </div>

            <div className={`rounded-lg border p-6 ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">Type</div>
                        <div className={`mt-2 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{connector.type}</div>
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">Created</div>
                        <div className={`mt-2 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{new Date(connector.createdAt).toLocaleString()}</div>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">JSON Configuration</div>
                        <textarea
                            value={configText}
                            onChange={(event) => setConfigText(event.target.value)}
                            className="mt-2 w-full min-h-[220px] rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-mono text-gray-900 outline-none dark:border-dark-700 dark:bg-dark-900 dark:text-white focus:border-primary-500"
                        />
                    </div>

                    {error && <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">{error}</div>}

                    <button
                        onClick={saveConnector}
                        disabled={saving}
                        className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${saving ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
                    >
                        {saving ? 'Saving...' : 'Save Connector'}
                    </button>
                </div>
            </div>
        </div>
    );
}
