import { Bell, Search, Moon, Sun } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useThemeStore } from '../../store/themeStore';

const pageTitles: Record<string, string> = {
    '/': '📊 Dashboard',
    '/users': '👥 User Management',
    '/services': '🔧 Services',
    '/metrics': '📈 Usage Metrics',
    '/settings': '⚙️ Settings',
};

export default function Header() {
    const location = useLocation();
    const title = pageTitles[location.pathname] || '📊 Dashboard';
    const [searchFocus, setSearchFocus] = useState(false);
    const { isDark, toggleTheme } = useThemeStore();

    return (
        <header className={`h-16 border-b flex items-center justify-between px-6 transition-colors duration-300 ${
            isDark
                ? 'bg-dark-900 border-dark-800'
                : 'bg-white border-gray-200'
        }`}>
            <h1 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {title}
            </h1>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
                        isDark ? 'text-dark-500' : 'text-gray-400'
                    }`} />
                    <input
                        type="text"
                        placeholder="🔍 Search..."
                        className={`w-64 pl-10 pr-4 py-2 rounded-lg text-sm transition-all duration-300 outline-none ${
                            isDark
                                ? 'bg-dark-800 border border-dark-700 text-white placeholder-dark-500 focus:border-primary-500'
                                : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-500 focus:bg-white focus:border-blue-500'
                        }`}
                        onFocus={() => setSearchFocus(true)}
                        onBlur={() => setSearchFocus(false)}
                    />
                    {searchFocus && (
                        <div className={`absolute top-full mt-2 w-full rounded-lg p-3 text-xs z-10 ${
                            isDark
                                ? 'bg-dark-800 border border-dark-700 text-dark-400'
                                : 'bg-white border border-gray-200 text-gray-600 shadow-lg'
                        }`}>
                            💡 Use search to find users, services, and metrics on each page
                        </div>
                    )}
                </div>

                {/* Dark/Light Toggle */}
                <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-lg transition-colors duration-300 ${
                        isDark
                            ? 'hover:bg-dark-800 text-dark-400 hover:text-white'
                            : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                    }`}
                    title="Toggle dark/light mode"
                >
                    {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>

                {/* Notifications */}
                <button className={`relative p-2 rounded-lg transition-colors duration-300 ${
                    isDark
                        ? 'hover:bg-dark-800 text-dark-400 hover:text-white'
                        : 'hover:bg-gray-200 text-gray-600 hover:text-gray-900'
                }`} title="🔔 Notifications">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
            </div>
        </header>
    );
}
