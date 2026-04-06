import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader, ToggleLeft, ToggleRight } from 'lucide-react';
import { reportsApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';

interface ReportDetail {
    id: string;
    name: string;
    type: string;
    format: string;
    description?: string;
    status?: string;
    outputUrl?: string;
    criteria?: Record<string, any>;
    createdAt: string;
}

export default function ReportDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [report, setReport] = useState<ReportDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [criteriaText, setCriteriaText] = useState('');
    const [error, setError] = useState<string | null>(null);
    const { isDark } = useThemeStore();

    useEffect(() => {
        if (!id) return;
        const fetchReport = async () => {
            try {
                setLoading(true);
                const response = await reportsApi.getById(id);
                setReport(response.data);
                setCriteriaText(JSON.stringify(response.data.criteria || {}, null, 2));
            } catch (fetchError) {
                console.error('Failed to load report:', fetchError);
                setError('Unable to load report details.');
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    const toggleStatus = async () => {
        if (!report) return;
        const nextStatus = report.status === 'COMPLETED' ? 'DRAFT' : 'COMPLETED';
        setReport({ ...report, status: nextStatus });
        try {
            await reportsApi.update(report.id, { status: nextStatus });
        } catch (toggleError) {
            console.error('Failed to update report status:', toggleError);
            setReport({ ...report, status: report.status });
            setError('Unable to update report status.');
        }
    };

    const saveReport = async () => {
        if (!report) return;
        try {
            setSaving(true);
            const criteria = JSON.parse(criteriaText || '{}');
            await reportsApi.update(report.id, {
                name: report.name,
                type: report.type,
                format: report.format,
                description: report.description,
                status: report.status,
                criteria,
            });
            setError(null);
        } catch (saveError: any) {
            console.error('Failed to save report:', saveError);
            setError(saveError.message || 'Unable to save report.');
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

    if (!report) {
        return (
            <div className="space-y-4">
                <div className="text-center text-gray-700 dark:text-gray-300">Report not found.</div>
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
                    <Link to="/services/reports" className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-500">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Reports
                    </Link>
                    <div className="mt-4">
                        <div className="text-sm font-semibold uppercase tracking-wide text-primary-600">Report Details</div>
                        <h1 className={`mt-2 text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{report.name}</h1>
                        <p className={`mt-2 text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>{report.description || 'No description available.'}</p>
                    </div>
                </div>
                <button
                    onClick={toggleStatus}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${report.status === 'COMPLETED' ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                >
                    {report.status === 'COMPLETED' ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                    {report.status === 'COMPLETED' ? 'Completed' : 'Draft'}
                </button>
            </div>

            <div className={`rounded-lg border p-6 ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <div className="grid gap-4 md:grid-cols-3">
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">Type</div>
                        <div className={`mt-2 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{report.type}</div>
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">Format</div>
                        <div className={`mt-2 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{report.format}</div>
                    </div>
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">Created</div>
                        <div className={`mt-2 text-lg font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{new Date(report.createdAt).toLocaleString()}</div>
                    </div>
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <div className="text-sm font-semibold text-gray-500 dark:text-dark-400">Criteria</div>
                        <textarea
                            value={criteriaText}
                            onChange={(event) => setCriteriaText(event.target.value)}
                            className="mt-2 w-full min-h-[220px] rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-mono text-gray-900 outline-none dark:border-dark-700 dark:bg-dark-900 dark:text-white focus:border-primary-500"
                        />
                    </div>
                    {report.outputUrl && (
                        <div className="rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-4 text-sm text-indigo-200">
                            Output URL: <a href={report.outputUrl} target="_blank" rel="noreferrer" className="underline">{report.outputUrl}</a>
                        </div>
                    )}
                    {error && <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">{error}</div>}
                    <button
                        onClick={saveReport}
                        disabled={saving}
                        className={`rounded-lg px-4 py-3 text-sm font-semibold transition ${saving ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-primary-600 text-white hover:bg-primary-700'}`}
                    >
                        {saving ? 'Saving...' : 'Save Report'}
                    </button>
                </div>
            </div>
        </div>
    );
}
