import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, Users, Settings, Plug, Package,
    BellRing, FileText, Link2, ToggleLeft, TrendingUp,
    LogOut, Wrench
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';

const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'Users', path: '/users', icon: Users },
    { label: 'Services', path: '/services', icon: Wrench },
    { label: 'Connectors', path: '/services/connectors', icon: Plug },
    { label: 'Widget Packs', path: '/services/widget-packs', icon: Package },
    { label: 'Alerts', path: '/services/alerts', icon: BellRing },
    { label: 'Reports', path: '/services/reports', icon: FileText },
    { label: 'Integrations', path: '/services/integrations', icon: Link2 },
    { label: 'Feature Flags', path: '/services/feature-flags', icon: ToggleLeft },
    { label: 'Metrics', path: '/metrics', icon: TrendingUp },
    { label: 'Settings', path: '/settings', icon: Settings },
];

export default function Sidebar() {
    const { logout, user } = useAuthStore();
    const { isDark } = useThemeStore();

    return (
        <aside className={`w-64 border-r flex flex-col transition-colors duration-300 ${
            isDark
                ? 'bg-dark-900 border-dark-800'
                : 'bg-gray-50 border-gray-200'
        }`}>
            {/* Logo */}
            <div className={`h-16 flex items-center px-6 border-b transition-colors duration-300 ${
                isDark
                    ? 'border-dark-800'
                    : 'border-gray-200'
            }`}>
                <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        isDark
                            ? 'bg-gradient-to-br from-primary-500 to-primary-600'
                            : 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-md'
                    }`}>
                        <LayoutDashboard className="w-4 h-4 text-white" />
                    </div>
                    <span className={`text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        DaaS Admin
                    </span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                            isActive ? 'sidebar-link active' : 'sidebar-link'
                        }
                    >
                        <item.icon className="w-4 h-4 shrink-0" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* User section */}
            <div className={`p-4 border-t transition-colors duration-300 ${
                isDark
                    ? 'border-dark-800'
                    : 'border-gray-200'
            }`}>
                <div className="flex items-center gap-3 mb-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-sm shrink-0 ${
                        isDark
                            ? 'bg-primary-600'
                            : 'bg-gradient-to-br from-blue-500 to-purple-500'
                    }`}>
                        {user?.fullName?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className={`text-sm font-medium truncate ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user?.fullName || 'User'}
                        </div>
                        <div className={`text-xs truncate capitalize flex items-center gap-1 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>
                            {user?.role === 'admin' && <span className="text-yellow-500">👑</span>}
                            {user?.role === 'editor' && <span>✏️</span>}
                            {user?.role === 'viewer' && <span>👁️</span>}
                            <span>{user?.role || 'viewer'}</span>
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => logout()}
                    className={`flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        isDark
                            ? 'text-red-400 hover:text-red-300 hover:bg-red-500/10'
                            : 'text-red-600 hover:text-red-700 hover:bg-red-50'
                    }`}
                >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
