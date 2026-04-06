import { useEffect, useState } from 'react';
import { Loader, FileText, Plus } from 'lucide-react';
import { reportsApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';
import { Link } from 'react-router-dom';
import AddServiceModal from '../components/modals/AddServiceModal';

const reportFields = [
    { key: 'name', label: 'Report Name', placeholder: 'Monthly usage report', required: true },
    { key: 'type', label: 'Report Type', type: 'select', required: true, options: [
        { value: 'USAGE', label: 'Usage' },
        { value: 'TRANSACTION', label: 'Transaction' },
        { value: 'PERFORMANCE', label: 'Performance' },
    ] },
    { key: 'format', label: 'Format', type: 'select', required: true, options: [
        { value: 'EXCEL', label: 'Excel' },
        { value: 'PDF', label: 'PDF' },
        { value: 'CSV', label: 'CSV' },
    ] },
    { key: 'description', label: 'Description', type: 'textarea', placeholder: 'Use dashboard filters and export to Excel' },
    { key: 'dashboardId', label: 'Dashboard ID', placeholder: 'uuid' },
    { key: 'range', label: 'Date Range', placeholder: 'last_30_days' },
    { key: 'status', label: 'Status', type: 'select', options: [
        { value: 'DRAFT', label: 'Draft' },
        { value: 'SCHEDULED', label: 'Scheduled' },
        { value: 'COMPLETED', label: 'Completed' },
    ] },
];

export default function Reports() {
    const [reports, setReports] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const { isDark } = useThemeStore();

    useEffect(() => {
        const fetchReports = async () => {
            try {
                setLoading(true);
                const response = await reportsApi.getAll();
                setReports(response.data);
            } catch (error) {
                console.error('Failed to fetch reports:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleCreateReport = async (formData: any) => {
        const payload = {
            name: formData.name,
            type: formData.type,
            format: formData.format,
            description: formData.description,
            criteria: {
                dashboardId: formData.dashboardId,
                range: formData.range,
            },
            status: formData.status,
        };

        await reportsApi.create(payload);
        const response = await reportsApi.getAll();
        setReports(response.data);
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
                    <div className="text-sm font-semibold uppercase tracking-wide text-primary-600">Reports & Exports</div>
                    <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Reports and Export Config</h1>
                    <p className={`mt-2 text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                        Manage report schedules, destinations, and transformation pipelines.
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
                        Add Report
                    </button>
                </div>
            </div>

            <div className={`rounded-lg border p-6 overflow-x-auto ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <table className="min-w-full text-left">
                    <thead>
                        <tr className={`border-b ${isDark ? 'border-dark-700' : 'border-gray-200'}`}>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Schedule</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Destination</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                            <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-dark-700">
                        {reports.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="px-4 py-6 text-center text-sm text-gray-500">
                                    No reports configured.
                                </td>
                            </tr>
                        ) : (
                            reports.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-dark-700 transition-colors">
                                    <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">{report.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-dark-200">{report.schedule}</td>
                                    <td className="px-4 py-4 text-sm text-gray-600 dark:text-dark-200">{report.destination}</td>
                                    <td className="px-4 py-4">
                                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${report.isEnabled ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                            {report.isEnabled ? 'Enabled' : 'Disabled'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm">
                                        <Link
                                            to={`/services/reports/${report.id}`}
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
                title="Create Report"
                submitLabel="Create Report"
                fields={reportFields}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleCreateReport}
                initialValues={{ type: 'USAGE', format: 'EXCEL', status: 'DRAFT' }}
            />
        </div>
    );
}
