import { Bell, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
    '/': 'Dashboard',
    '/users': 'User Management',
    '/services': 'Services',
    '/metrics': 'Usage Metrics',
    '/settings': 'Settings',
};

export default function Header() {
    const location = useLocation();
    const title = pageTitles[location.pathname] || 'Dashboard';

    return (
        <header className="h-16 bg-dark-900 border-b border-dark-800 flex items-center justify-between px-6">
            <h1 className="text-xl font-semibold text-white">{title}</h1>

            <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-64 pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm text-white placeholder-dark-500 focus:border-primary-500 outline-none"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-dark-400 hover:text-white transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>
            </div>
        </header>
    );
}
