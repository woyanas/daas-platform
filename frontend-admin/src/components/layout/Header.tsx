import { useState, useRef, useEffect } from 'react';
import { Bell, Search, Moon, Sun, X, Clock, CheckCheck } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useThemeStore } from '../../store/themeStore';

const pageTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/users': 'User Management',
    '/services': 'Services',
    '/services/connectors': 'Data Connectors',
    '/services/widget-packs': 'Widget Packs',
    '/services/alerts': 'Alerts',
    '/services/reports': 'Reports',
    '/services/integrations': 'Integrations',
    '/services/feature-flags': 'Feature Flags',
    '/metrics': 'Usage Metrics',
    '/settings': 'Settings',
};

const mockNotifications = [
    { id: 1, text: 'New user registered', time: '2 min ago', read: false },
    { id: 2, text: 'API usage exceeded 80%', time: '15 min ago', read: false },
    { id: 3, text: 'Dashboard export completed', time: '1 hour ago', read: true },
    { id: 4, text: 'System health check passed', time: '3 hours ago', read: true },
];

export default function Header() {
    const location = useLocation();
    const { isDark, toggleTheme } = useThemeStore();
    const [searchFocus, setSearchFocus] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const [notifications, setNotifications] = useState(mockNotifications);
    const notifRef = useRef<HTMLDivElement>(null);

    // Resolve title — fallback for dynamic sub-routes
    const getTitle = () => {
        const exact = pageTitles[location.pathname];
        if (exact) return exact;
        // Match dynamic routes like /services/:id
        const parts = location.pathname.split('/');
        if (parts[1] === 'services' && parts[2]) {
            return pageTitles[`/services/${parts[2]}`] || 'Service Detail';
        }
        return 'Dashboard';
    };

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    };

    // Close dropdown on outside click
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
                setNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <header className={`h-16 border-b flex items-center justify-between px-6 transition-colors duration-300 ${
            isDark
                ? 'bg-dark-900 border-dark-800'
                : 'bg-white border-gray-200'
        }`}>
            <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {getTitle()}
            </h1>

            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                        isDark ? 'text-dark-500' : 'text-gray-400'
                    }`} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className={`w-56 pl-9 pr-4 py-2 rounded-lg text-sm transition-all duration-300 outline-none ${
                            isDark
                                ? 'bg-dark-800 border border-dark-700 text-white placeholder-dark-500 focus:border-primary-500'
                                : 'bg-gray-100 border border-transparent text-gray-900 placeholder-gray-500 focus:bg-white focus:border-gray-300'
                        }`}
                        onFocus={() => setSearchFocus(true)}
                        onBlur={() => setSearchFocus(false)}
                    />
                    {searchFocus && (
                        <div className={`absolute top-full mt-2 w-full rounded-lg p-3 text-xs z-10 shadow-lg ${
                            isDark
                                ? 'bg-dark-800 border border-dark-700 text-dark-400'
                                : 'bg-white border border-gray-200 text-gray-500'
                        }`}>
                            Use search to find users, services, metrics, and more
                        </div>
                    )}
                </div>

                {/* Dark/Light Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-colors duration-200 ${
                        isDark
                            ? 'hover:bg-dark-800 text-dark-400 hover:text-yellow-400'
                            : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                    }`}
                    title="Toggle dark/light mode"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setNotifOpen((v) => !v)}
                        className={`relative p-2 rounded-lg transition-colors duration-200 ${
                            isDark
                                ? 'hover:bg-dark-800 text-dark-400 hover:text-white'
                                : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'
                        }`}
                        title="Notifications"
                    >
                        <Bell className="w-5 h-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {/* Notification Panel */}
                    {notifOpen && (
                        <div className={`absolute right-0 top-full mt-2 w-80 rounded-xl shadow-xl border z-50 overflow-hidden ${
                            isDark
                                ? 'bg-dark-800 border-dark-700'
                                : 'bg-white border-gray-200'
                        }`}>
                            <div className={`flex items-center justify-between px-4 py-3 border-b ${
                                isDark ? 'border-dark-700' : 'border-gray-100'
                            }`}>
                                <span className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                                    Notifications {unreadCount > 0 && <span className="ml-1 px-1.5 py-0.5 bg-red-500 text-white rounded-full text-xs">{unreadCount}</span>}
                                </span>
                                <div className="flex items-center gap-2">
                                    {unreadCount > 0 && (
                                        <button
                                            onClick={markAllRead}
                                            className="text-xs text-primary-500 hover:text-primary-400 flex items-center gap-1"
                                        >
                                            <CheckCheck className="w-3.5 h-3.5" />
                                            Mark all read
                                        </button>
                                    )}
                                    <button
                                        onClick={() => setNotifOpen(false)}
                                        className={`p-1 rounded ${isDark ? 'hover:bg-dark-700 text-dark-400' : 'hover:bg-gray-100 text-gray-400'}`}
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="divide-y divide-gray-100 dark:divide-dark-700 max-h-64 overflow-y-auto">
                                {notifications.map((n) => (
                                    <div
                                        key={n.id}
                                        className={`px-4 py-3 flex items-start gap-3 transition-colors ${
                                            n.read
                                                ? isDark ? 'opacity-60' : 'opacity-60'
                                                : isDark ? 'bg-primary-500/5' : 'bg-primary-50/50'
                                        }`}
                                    >
                                        <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${n.read ? 'bg-transparent' : 'bg-primary-500'}`} />
                                        <div className="flex-1 min-w-0">
                                            <p className={`text-sm ${isDark ? 'text-dark-200' : 'text-gray-800'}`}>{n.text}</p>
                                            <p className={`text-xs flex items-center gap-1 mt-0.5 ${isDark ? 'text-dark-500' : 'text-gray-400'}`}>
                                                <Clock className="w-3 h-3" /> {n.time}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
