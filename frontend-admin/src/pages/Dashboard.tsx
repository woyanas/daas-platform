import { Users, LayoutDashboard, TrendingUp, Activity } from 'lucide-react';
import {
    LineChart, Line, AreaChart, Area, BarChart, Bar,
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const stats = [
    { label: 'Total Users', value: '2,543', change: '+12%', icon: Users, color: 'primary' },
    { label: 'Dashboards', value: '1,234', change: '+8%', icon: LayoutDashboard, color: 'green' },
    { label: 'API Calls', value: '45.2K', change: '+23%', icon: Activity, color: 'blue' },
    { label: 'Growth', value: '+18.2%', change: '+2%', icon: TrendingUp, color: 'purple' },
];

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
    { user: 'John Doe', action: 'Created new dashboard', time: '2 min ago' },
    { user: 'Sarah Chen', action: 'Updated user role', time: '15 min ago' },
    { user: 'Mike Wilson', action: 'Exported analytics report', time: '1 hour ago' },
    { user: 'Emily Brown', action: 'Added new widget', time: '3 hours ago' },
];

export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="card">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-10 h-10 rounded-lg bg-${stat.color}-500/10 flex items-center justify-center`}>
                                <stat.icon className={`w-5 h-5 text-${stat.color}-400`} />
                            </div>
                            <span className="text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
                                {stat.change}
                            </span>
                        </div>
                        <div className="text-2xl font-bold text-white">{stat.value}</div>
                        <div className="text-sm text-dark-400">{stat.label}</div>
                    </div>
                ))}
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-2 gap-6">
                {/* User Growth Chart */}
                <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-4">User Growth</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#f1f5f9'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#6366f1"
                                    fillOpacity={1}
                                    fill="url(#colorUsers)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* API Usage Chart */}
                <div className="card">
                    <h3 className="text-lg font-semibold text-white mb-4">API Usage</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                                <YAxis stroke="#64748b" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: '1px solid #334155',
                                        borderRadius: '8px',
                                        color: '#f1f5f9'
                                    }}
                                />
                                <Bar dataKey="api" fill="#6366f1" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="card">
                <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
                <div className="space-y-4">
                    {recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center gap-4 pb-4 border-b border-dark-800 last:border-0 last:pb-0">
                            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium text-sm">
                                {activity.user.charAt(0)}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm text-white font-medium">{activity.user}</div>
                                <div className="text-sm text-dark-400">{activity.action}</div>
                            </div>
                            <div className="text-xs text-dark-500">{activity.time}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
