import { useState, useEffect } from 'react';
import { Users, LayoutDashboard, TrendingUp, Activity, Loader } from 'lucide-react';
import {
    AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { dashboardsApi, usersApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';

const chartData = [
    { name: 'Jan', users: 400, revenue: 2400, api: 2400 },
    { name: 'Feb', users: 300, revenue: 1398, api: 2210 },
    { name: 'Mar', users: 520, revenue: 9800, api: 2290 },
    { name: 'Apr', users: 478, revenue: 3908, api: 2000 },
    { name: 'May', users: 689, revenue: 4800, api: 2181 },
    { name: 'Jun', users: 839, revenue: 3800, api: 2500 },
    { name: 'Jul', users: 1020, revenue: 4300, api: 2100 },
];

const recentActivity = [
    { user: 'Admin User', action: '✅ System check', time: 'Just now', emoji: '⚙️' },
    { user: 'John Doe', action: '📊 Created new dashboard', time: '2 min ago', emoji: '📊' },
    { user: 'Sarah Chen', action: '👤 Updated user role', time: '15 min ago', emoji: '👤' },
    { user: 'Mike Wilson', action: '📥 Exported analytics report', time: '1 hour ago', emoji: '📥' },
];

export default function Dashboard() {
    const [analytics, setAnalytics] = useState<any>(null);
    const [userStats, setUserStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const { isDark } = useThemeStore();

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const [dashRes, userRes] = await Promise.all([
                    dashboardsApi.getAnalytics().catch(() => ({ data: { totalDashboards: 0 } })),
                    usersApi.getStats().catch(() => ({ data: { total: 0 } }))
                ]);
                setAnalytics(dashRes.data);
                setUserStats(userRes.data);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, []);

    const stats = [
        { label: '👥 Total Users', value: userStats?.total?.toLocaleString() || '0', change: '+12%', icon: Users, color: 'primary' },
        { label: '📊 Dashboards', value: analytics?.totalDashboards?.toLocaleString() || '0', change: '+8%', icon: LayoutDashboard, color: 'green' },
        { label: '⚡ API Calls', value: '45.2K', change: '+23%', icon: Activity, color: 'blue' },
        { label: '📈 Growth', value: '+18.2%', change: '+2%', icon: TrendingUp, color: 'purple' },
    ];

    if (loading) {
        return (
            <div className={`flex justify-center items-center h-64 transition-colors ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
                <Loader className={`w-8 h-8 animate-spin ${isDark ? 'text-primary-500' : 'text-blue-500'}`} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className={`rounded-lg p-6 transition-colors ${
                        isDark
                            ? 'bg-dark-800 border border-dark-700'
                            : 'bg-white border border-gray-200 shadow-sm'
                    }`}>
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                isDark
                                    ? 'bg-primary-500/10'
                                    : 'bg-blue-100'
                            }`}>
                                <stat.icon className={`w-5 h-5 ${
                                    isDark ? 'text-primary-400' : 'text-blue-600'
                                }`} />
                            </div>
                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                isDark
                                    ? 'text-green-400 bg-green-500/10'
                                    : 'text-green-700 bg-green-100'
                            }`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {stat.value}
                        </div>
                        <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* User Growth Chart */}
                <div className={`rounded-lg p-6 transition-colors ${
                    isDark
                        ? 'bg-dark-800 border border-dark-700'
                        : 'bg-white border border-gray-200 shadow-sm'
                }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        📊 User Growth
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={isDark ? '#4f46e5' : '#3b82f6'} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={isDark ? '#4f46e5' : '#3b82f6'} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e5e7eb'} strokeOpacity={0.5} vertical={false} />
                                <XAxis dataKey="name" stroke={isDark ? '#64748b' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke={isDark ? '#64748b' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#1e293b' : '#ffffff',
                                        border: isDark ? '1px solid #334155' : '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        color: isDark ? '#f1f5f9' : '#0f172a'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    stroke={isDark ? '#4f46e5' : '#3b82f6'}
                                    fillOpacity={1}
                                    fill="url(#colorUsers)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* API Usage Chart */}
                <div className={`rounded-lg p-6 transition-colors ${
                    isDark
                        ? 'bg-dark-800 border border-dark-700'
                        : 'bg-white border border-gray-200 shadow-sm'
                }`}>
                    <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        ⚡ API Usage
                    </h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#334155' : '#e5e7eb'} strokeOpacity={0.5} vertical={false} />
                                <XAxis dataKey="name" stroke={isDark ? '#64748b' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke={isDark ? '#64748b' : '#9ca3af'} fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#1e293b' : '#ffffff',
                                        border: isDark ? '1px solid #334155' : '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        color: isDark ? '#f1f5f9' : '#0f172a'
                                    }}
                                />
                                <Bar dataKey="api" fill={isDark ? '#4f46e5' : '#3b82f6'} radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className={`rounded-lg p-6 transition-colors ${
                isDark
                    ? 'bg-dark-800 border border-dark-700'
                    : 'bg-white border border-gray-200 shadow-sm'
            }`}>
                <h3 className={`text-lg font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    🕐 Recent Activity
                </h3>
                <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className={`flex items-center gap-4 pb-4 last:border-0 last:pb-0 border-b transition-colors ${
                            isDark ? 'border-dark-700' : 'border-gray-200'
                        }`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium text-sm ${
                                isDark
                                    ? 'bg-primary-600'
                                    : 'bg-gradient-to-br from-blue-500 to-purple-500'
                            }`}>
                                {activity.emoji}
                            </div>
                            <div className="flex-1">
                                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    {activity.user}
                                </div>
                                <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                                    {activity.action}
                                </div>
                            </div>
                            <div className={`text-xs ${isDark ? 'text-dark-500' : 'text-gray-500'}`}>
                                ⏰ {activity.time}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
