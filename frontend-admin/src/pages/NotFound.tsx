import { Link } from 'react-router-dom';
import { LayoutDashboard, ArrowLeft } from 'lucide-react';
import { useThemeStore } from '../store/themeStore';

export default function NotFound() {
    const { isDark } = useThemeStore();

    return (
        <div className={`min-h-screen flex items-center justify-center px-6 transition-colors ${isDark ? 'bg-dark-950' : 'bg-gray-50'}`}>
            <div className="text-center max-w-md">
                {/* Animated 404 */}
                <div className="relative mb-8">
                    <div className={`text-9xl font-black select-none ${isDark ? 'text-dark-800' : 'text-gray-100'}`}>
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center ${isDark ? 'bg-primary-500/10' : 'bg-primary-50'}`}>
                            <LayoutDashboard className={`w-10 h-10 ${isDark ? 'text-primary-400' : 'text-primary-600'}`} />
                        </div>
                    </div>
                </div>

                <h1 className={`text-2xl font-bold mb-3 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                    Page not found
                </h1>
                <p className={`mb-8 text-sm ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>
                    Sorry, the page you're looking for doesn't exist or has been moved.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                        onClick={() => window.history.back()}
                        className="btn-secondary flex items-center gap-2"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Go Back
                    </button>
                    <Link to="/" className="btn-primary flex items-center gap-2">
                        <LayoutDashboard className="w-4 h-4" />
                        Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
