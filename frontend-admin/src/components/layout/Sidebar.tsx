import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard, Users, Settings, BarChart3,
    Layers, LogOut
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Users', path: '/users' },
    { icon: Layers, label: 'Services', path: '/services' },
    { icon: BarChart3, label: 'Metrics', path: '/metrics' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

export default function Sidebar() {
    const { logout, user } = useAuthStore();

    return (
        <aside className="w-64 bg-dark-900 border-r border-dark-800 flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center px-6 border-b border-dark-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                        <LayoutDashboard className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-lg font-bold text-white">DaaS Admin</span>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        className={({ isActive }) =>
                            `sidebar-link ${isActive ? 'active' : ''}`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            {/* User section */}
            <div className="p-4 border-t border-dark-800">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                        {user?.fullName?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-white truncate">
                            {user?.fullName || 'User'}
                        </div>
                        <div className="text-xs text-dark-400 truncate capitalize">
                            {user?.role || 'viewer'}
                        </div>
                    </div>
                </div>
                <button
                    onClick={() => logout()}
                    className="sidebar-link w-full text-red-400 hover:text-red-300 hover:bg-red-500/10"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}
