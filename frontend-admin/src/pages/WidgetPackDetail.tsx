import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader, ToggleLeft, ToggleRight } from 'lucide-react';
import { widgetPacksApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';

interface WidgetPackDetail {
    id: string;
    name: string;
    category: string;
    description?: string;
    isActive: boolean;
    createdAt: string;
    template?: Record<string, any>;
}

export default function WidgetPackDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pack, setPack] = useState<WidgetPackDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [templateText, setTemplateText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { isDark } = useThemeStore();

    useEffect(() => {
        if (!id) return;
        const fetchPack = async () => {
            try {
                setLoading(true);
                const response = await widgetPacksApi.getById(id);
                setPack(response.data);
                setTemplateText(JSON.stringify(response.data.template || {}, null, 2));
            } catch (fetchError) {
                console.error('Failed to load widget pack:', fetchError);
                setError('Unable to load widget pack details.');
            } finally {
                setLoading(false);
            }
        };

        fetchPack();
    }, [id]);

    const toggleActive = async () => {
        if (!pack) return;
        const nextActive = !pack.isActive;
        setPack({ ...pack, isActive: nextActive });
        try {
            await widgetPacksApi.update(pack.id, { isActive: nextActive });
        } catch (toggleError) {
            console.error('Failed to update widget pack status:', toggleError);
            setPack({ ...pack, isActive: !nextActive });
            setError('Unable to update widget pack status.');
        }
    };

    const savePack = async () => {
        if (!pack) return;
        try {
            setSaving(true);
            const template = JSON.parse(templateText || '{}');
            await widgetPacksApi.update(pack.id, {
                name: pack.name,
                category: pack.category,
                description: pack.description,
                isActive: pack.isActive,
                template,
            });
            setError(null);
        } catch (saveError: any) {
            console.error('Failed to save widget pack:', saveError);
            setError(saveError.message || 'Unable to save widget pack.');
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

    if (!pack) {
        return (
            <div className="space-y-4">
                <div className="text-center text-gray-700 dark:text-gray-300">Widget pack not found.</div>
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
                    <Link to="/services/widget-packs" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-500">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Widget Packs
                    </Link>
                    <div className="mt-4">
                        <div className="text-sm font-semibold uppercase tracking-wide text-primary-600">Widget Pack Details</div>
                        <h1 className={`mt-2 text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{pack.name}</h1>
                        <p className={`mt-2 text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>{pack.description || 'No description available.'}</p>
                    </div>
                </div>
                <button
                    onClick={toggleActive}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${pack.isActive ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                    {pack.isActive ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    {pack.isActive ? 'Enabled' : 'Disabled'}
                </button>
            </div>

            <div className={`rounded-lg border p-6 ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">Category</div>
                        <div className={`mt-2 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{pack.category}</div>
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">Created</div>
                        <div className={`mt-2 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{new Date(pack.createdAt).toLocaleString()}</div>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">Template JSON</div>
                        <textarea
                            value={templateText}
                            onChange={(event) => setTemplateText(event.target.value)}
                            className="mt-2 w-full min-h-[220px] rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-mono text-gray-900 outline-none dark:border-dark-700 dark:bg-dark-900 dark:text-white focus:border-primary-500"
                        />
                    </div>
                    {error && <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">{error}</div>}
                    <button
                        onClick={savePack}
                        disabled={saving}
                        className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${saving ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
                    >
                        {saving ? 'Saving...' : 'Save Widget Pack'}
                    </button>
                </div>
            </div>
        </div>
    );
}
