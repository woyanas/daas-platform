import {
    LineChart, Line, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Activity, Database, Clock, Zap } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

const usageData = [
    { date: 'Dec 1', apiCalls: 1200, storage: 45, bandwidth: 120 },
    { date: 'Dec 5', apiCalls: 1800, storage: 48, bandwidth: 150 },
    { date: 'Dec 10', apiCalls: 2200, storage: 52, bandwidth: 180 },
    { date: 'Dec 15', apiCalls: 1900, storage: 55, bandwidth: 160 },
    { date: 'Dec 20', apiCalls: 2800, storage: 60, bandwidth: 220 },
    { date: 'Dec 25', apiCalls: 3200, storage: 65, bandwidth: 280 },
    { date: 'Dec 30', apiCalls: 3800, storage: 70, bandwidth: 320 },
];

const stats = [
    { label: '⚡ API Calls', value: '45,231', limit: '100,000', percent: 45, icon: Activity, color: 'primary' },
    { label: '💾 Storage Used', value: '2.3 GB', limit: '10 GB', percent: 23, icon: Database, color: 'blue' },
    { label: '🌐 Bandwidth', value: '12.5 GB', limit: '50 GB', percent: 25, icon: Zap, color: 'green' },
    { label: '⏱️ Uptime', value: '99.98%', limit: 'SLA 99.9%', percent: 100, icon: Clock, color: 'purple' },
];

const subscription = {
    plan: 'Pro',
    price: '$29/month',
    nextBilling: 'January 15, 2025',
    features: ['Unlimited Dashboards', 'All Widget Types', 'Priority Support', '10 Team Members', 'API Access'],
};

export default function Metrics() {
    const { isDark } = useThemeStore();
    return (
        <div className="space-y-6">
            {/* Usage Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className={`rounded-lg p-6 transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                            </div>
                            <div>
                                <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>{stat.label}</div>
                                <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{stat.value}</div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className={isDark ? 'text-dark-400' : 'text-gray-600'}>of {stat.limit}</span>
                                <span className={isDark ? 'text-dark-300' : 'text-gray-700'}>{stat.percent}%</span>
                            </div>
                            <div className={`h-2 rounded-full overflow-hidden ${isDark ? 'bg-dark-800' : 'bg-gray-300'}`}>
                                <div
                                    className={`h-full bg-${stat.color}-500 rounded-full transition-all`}
                                    style={{ width: `${stat.percent}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
                <div className={`rounded-lg p-6 transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>📊 API Usage Over Time</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={usageData}>
                                <defs>
                                    <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e5e7eb"} />
                                <XAxis dataKey="date" stroke={isDark ? "#64748b" : "#9ca3af"} fontSize={12} />
                                <YAxis stroke={isDark ? "#64748b" : "#9ca3af"} fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#1e293b' : '#f3f4f6',
                                        border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                                        borderRadius: '8px',
                                        color: isDark ? '#f1f5f9' : '#1f2937'
                                    }}
                                />
                                <Area type="monotone" dataKey="apiCalls" stroke="#6366f1" fillOpacity={1} fill="url(#colorApi)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className={`rounded-lg p-6 transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>💾 Storage & Bandwidth</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={usageData}>
                                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e5e7eb"} />
                                <XAxis dataKey="date" stroke={isDark ? "#64748b" : "#9ca3af"} fontSize={12} />
                                <YAxis stroke={isDark ? "#64748b" : "#9ca3af"} fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: isDark ? '#1e293b' : '#f3f4f6',
                                        border: `1px solid ${isDark ? '#334155' : '#e5e7eb'}`,
                                        borderRadius: '8px',
                                        color: isDark ? '#f1f5f9' : '#1f2937'
                                    }}
                                />
                                <Line type="monotone" dataKey="storage" stroke="#22c55e" strokeWidth={2} dot={false} />
                                <Line type="monotone" dataKey="bandwidth" stroke="#3b82f6" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Subscription */}
            <div className={`rounded-lg p-6 transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>💳 Current Subscription</h3>
                        <p className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>Your plan and billing details</p>
                    </div>
                    <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-sm font-medium">
                        ⭐ {subscription.plan}
                    </span>
                </div>
                <div className="mt-6 grid md:grid-cols-3 gap-6">
                    <div>
                        <div className={`text-sm mb-1 ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>💰 Price</div>
                        <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{subscription.price}</div>
                    </div>
                    <div>
                        <div className={`text-sm mb-1 ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>📅 Next Billing</div>
                        <div className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{subscription.nextBilling}</div>
                    </div>
                    <div>
                        <div className={`text-sm mb-1 ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>✨ Features</div>
                        <ul className="space-y-1">
                            {subscription.features.slice(0, 3).map((f) => (
                                <li key={f} className={`text-sm ${isDark ? 'text-dark-300' : 'text-gray-700'}`}>✅ {f}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className={`mt-6 pt-6 flex gap-4 ${isDark ? 'border-t border-dark-800' : 'border-t border-gray-200'}`}>
                    <button className={`px-4 py-2 rounded font-medium transition-colors ${isDark ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-primary-600 text-white hover:bg-primary-700'}`}>⬆️ Upgrade Plan</button>
                    <button className={`px-4 py-2 rounded font-medium transition-colors ${isDark ? 'border border-dark-700 text-gray-300 hover:bg-dark-900' : 'border border-gray-300 text-gray-700 hover:bg-gray-100'}`}>📜 View Billing History</button>
                </div>
            </div>
        </div>
    );
}
