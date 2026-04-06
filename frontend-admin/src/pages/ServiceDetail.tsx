import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader, ToggleLeft, ToggleRight } from 'lucide-react';
import { servicesApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';

interface Service {
    id: string;
    name: string;
    slug: string;
    category?: string;
    description: string;
    isEnabled?: boolean;
    settings?: Record<string, any>;
}

const categoryLabels: Record<string, string> = {
    core: 'Core Platform Service',
    connector: 'Data Connector',
    widget: 'Widget Marketplace',
    alert: 'Alert & Notification',
    report: 'Reporting & Export',
    integration: 'Third-party Integration',
    feature_flag: 'Feature Flag',
};

const connectorFields = [
    { key: 'host', label: 'Host', placeholder: 'db.example.com' },
    { key: 'port', label: 'Port', placeholder: '5432' },
    { key: 'database', label: 'Database', placeholder: 'source_db' },
    { key: 'username', label: 'Username', placeholder: 'db_user' },
    { key: 'password', label: 'Password', placeholder: 'secret' },
    { key: 'baseUrl', label: 'Base URL', placeholder: 'https://api.example.com/v1' },
];

const integrationFields = [
    { key: 'webhookUrl', label: 'Webhook URL', placeholder: 'https://hooks.slack.com/services/...'},
    { key: 'channel', label: 'Channel / Target', placeholder: '#alerts or inbox@example.com'},
];

const reportFields = [
    { key: 'dashboardId', label: 'Dashboard ID', placeholder: 'uuid' },
    { key: 'range', label: 'Date Range', placeholder: 'last_30_days' },
    { key: 'format', label: 'Format', placeholder: 'pdf' },
];

const alertFields = [
    { key: 'threshold', label: 'Threshold', placeholder: '80' },
    { key: 'channels', label: 'Channels', placeholder: 'email,slack' },
];

export default function ServiceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [service, setService] = useState<Service | null>(null);
    const [settings, setSettings] = useState<Record<string, any>>({});
    const [settingsText, setSettingsText] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { isDark } = useThemeStore();

    useEffect(() => {
        const normalizeSettings = (payload: any) => {
            if (!payload || typeof payload !== 'object') return {};
            if (payload.settings !== undefined) return payload.settings;
            if (payload.config !== undefined) return payload.config;
            if (payload.criteria !== undefined) return payload.criteria;
            return {};
        };

        const fetchService = async () => {
            try {
                setLoading(true);
                const response = await servicesApi.getMyConfig();
                const payload = response.data;
                const item = Array.isArray(payload) ? payload.find((item: Service) => item.id === id) : null;
                if (item) {
                    setService(item);
                    const initialSettings = normalizeSettings(item);
                    setSettings(initialSettings);
                    setSettingsText(JSON.stringify(initialSettings, null, 2));
                    return;
                }

                const fallbackResponse = await servicesApi.getById(id || '');
                const fallbackService = fallbackResponse.data;
                const initialSettings = {};
                setService({ ...fallbackService, isEnabled: false, settings: initialSettings });
                setSettings(initialSettings);
                setSettingsText(JSON.stringify(initialSettings, null, 2));
            } catch (fetchError) {
                console.error('Failed to load service details:', fetchError);
                setError('Tidak dapat memuat detail layanan. Silakan coba lagi.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchService();
        }
    }, [id]);

    const handleFieldChange = (key: string, value: string) => {
        setSettings((prev) => ({ ...prev, [key]: value }));
        setSettingsText(JSON.stringify({ ...settings, [key]: value }, null, 2));
    };

    const toggleService = async () => {
        if (!service) return;
        const previousValue = service.isEnabled;
        const newEnabled = !service.isEnabled;
        setService({ ...service, isEnabled: newEnabled });

        try {
            await servicesApi.toggle(service.id, newEnabled);
        } catch (toggleError) {
            console.error('Failed to toggle service:', toggleError);
            setService({ ...service, isEnabled: previousValue });
            setError('Gagal mengubah status layanan. Coba lagi.');
        }
    };

    const saveSettings = async () => {
        if (!service) return;

        try {
            setSaving(true);
            let payload = settings;
            if (settingsText.trim()) {
                payload = JSON.parse(settingsText);
                setSettings(payload);
            }
            await servicesApi.updateConfig(service.id, { settings: payload });
            setService({ ...service, settings: payload });
            setError(null);
        } catch (saveError: any) {
            console.error('Failed to save settings:', saveError);
            setError(saveError?.message || 'Gagal menyimpan konfigurasi. Periksa JSON settings.');
        } finally {
            setSaving(false);
        }
    };

    const renderCategoryFields = () => {
        if (!service) return null;
        const category = service.category || 'core';
        const fields =
            category === 'connector'
                ? connectorFields
                : category === 'integration'
                ? integrationFields
                : category === 'report'
                ? reportFields
                : category === 'alert'
                ? alertFields
                : null;

        if (!fields) return null;

        return (
            <div className="grid gap-4 sm:grid-cols-2">
                {fields.map((field) => (
                    <div key={field.key} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-white">{field.label}</label>
                        <input
                            type="text"
                            value={settings[field.key] ?? ''}
                            placeholder={field.placeholder}
                            onChange={(event) => handleFieldChange(field.key, event.target.value)}
                            className="w-full rounded-lg border p-3 text-sm text-gray-900 dark:text-white bg-gray-50 dark:bg-dark-900 border-gray-200 dark:border-dark-700 focus:ring-2 focus:ring-primary-500"
                        />
                    </div>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader className="w-8 h-8 text-primary-600 animate-spin" />
            </div>
        );
    }

    if (!service) {
        return (
            <div className="space-y-6">
                <div className="text-center text-gray-700 dark:text-gray-300">Layanan tidak ditemukan.</div>
                <div className="flex justify-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="rounded-lg px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
                    >
                        Kembali
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <Link to="/services" className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-500">
                        <ArrowLeft className="w-4 h-4" />
                        Kembali ke Layanan
                    </Link>
                    <div className="mt-4">
                        <div className="text-sm font-semibold uppercase tracking-wide text-primary-600">
                            {categoryLabels[service.category || 'core']}
                        </div>
                        <h1 className={`mt-2 text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{service.name}</h1>
                        <p className={`mt-2 text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>{service.description}</p>
                    </div>
                </div>
                <button
                    onClick={toggleService}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${service.isEnabled ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                    {service.isEnabled ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    {service.isEnabled ? 'Enabled' : 'Disabled'}
                </button>
            </div>

            <div className={`rounded-lg border p-6 ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Configuration</h2>
                        <p className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                            Save user-specific settings for this service.
                        </p>
                    </div>
                    <button
                        onClick={saveSettings}
                        disabled={saving}
                        className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${saving ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
                    >
                        {saving ? 'Saving...' : 'Save Settings'}
                    </button>
                </div>

                {renderCategoryFields()}

                <div className="mt-6">
                    <div className="mb-2 text-sm font-medium text-gray-700 dark:text-white">Advanced Settings (JSON)</div>
                    <textarea
                        value={settingsText}
                        onChange={(event) => {
                            setSettingsText(event.target.value);
                            try {
                                const parsed = JSON.parse(event.target.value);
                                setSettings(parsed);
                                setError(null);
                            } catch {
                                // Keep raw JSON until save
                            }
                        }}
                        className="w-full min-h-[240px] rounded-lg border p-4 text-sm font-mono text-gray-900 dark:text-white bg-gray-50 dark:bg-dark-900 border-gray-200 dark:border-dark-700 focus:ring-2 focus:ring-primary-500"
                    />
                </div>

                {error && <div className="mt-4 text-sm text-red-500">{error}</div>}
            </div>
        </div>
    );
}
