import {
    LineChart, Line, AreaChart, Area,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Activity, Database, Clock, Zap } from 'lucide-react';

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
    { label: 'API Calls', value: '45,231', limit: '100,000', percent: 45, icon: Activity, color: 'primary' },
    { label: 'Storage Used', value: '2.3 GB', limit: '10 GB', percent: 23, icon: Database, color: 'blue' },
    { label: 'Bandwidth', value: '12.5 GB', limit: '50 GB', percent: 25, icon: Zap, color: 'green' },
    { label: 'Uptime', value: '99.98%', limit: 'SLA 99.9%', percent: 100, icon: Clock, color: 'purple' },
];

const subscription = {
    plan: 'Pro',
    price: '$29/month',
    nextBilling: 'January 15, 2025',
    features: ['Unlimited Dashboards', 'All Widget Types', 'Priority Support', '10 Team Members', 'API Access'],
};

export default function Metrics() {
    return (
        <div className="space-y-6">
            {/* Usage Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="card">
                        <div className="flex items-center gap-3 mb-4">
                            <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                            </div>
                            <div>
                                <div className="text-sm text-dark-400">{stat.label}</div>
                                <div className="text-xl font-bold text-white">{stat.value}</div>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <div className="flex justify-between text-xs">
                                <span className="text-dark-400">of {stat.limit}</span>
                                <span className="text-dark-300">{stat.percent}%</span>
                            </div>
                            <div className="h-2 bg-dark-800 rounded-full overflow-hidden">
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
                <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-4">API Usage Over Time</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={usageData}>
                                <defs>
                                    <linearGradient id="colorApi" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#f1f5f9'
                                    }}
                                />
                                <Area type="monotone" dataKey="apiCalls" stroke="#6366f1" fillOpacity={1} fill="url(#colorApi)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-4">Storage & Bandwidth</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={usageData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#f1f5f9'
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
            <div className="card">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-white">Current Subscription</h3>
                        <p className="text-dark-400 text-sm">Your plan and billing details</p>
                    </div>
                    <span className="px-3 py-1 bg-primary-500/10 text-primary-400 rounded-full text-sm font-medium">
                        {subscription.plan}
                    </span>
                </div>
                <div className="mt-6 grid md:grid-cols-3 gap-6">
                    <div>
                        <div className="text-sm text-dark-400 mb-1">Price</div>
                        <div className="text-xl font-bold text-white">{subscription.price}</div>
                    </div>
                    <div>
                        <div className="text-sm text-dark-400 mb-1">Next Billing</div>
                        <div className="text-xl font-bold text-white">{subscription.nextBilling}</div>
                    </div>
                    <div>
                        <div className="text-sm text-dark-400 mb-1">Features</div>
                        <ul className="space-y-1">
                            {subscription.features.slice(0, 3).map((f) => (
                                <li key={f} className="text-sm text-dark-300">• {f}</li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t border-dark-800 flex gap-4">
                    <button className="btn-primary">Upgrade Plan</button>
                    <button className="btn-secondary">View Billing History</button>
                </div>
            </div>
        </div>
    );
}
