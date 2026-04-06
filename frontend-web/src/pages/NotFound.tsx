import { Link } from 'react-router-dom';
import { Home, ArrowLeft, LayoutDashboard } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white dark:bg-dark-950 px-6">
            <div className="text-center max-w-md">
                {/* Animated 404 */}
                <div className="relative mb-8">
                    <div className="text-9xl font-black text-dark-100 dark:text-dark-800 select-none">
                        404
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-2xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center">
                            <LayoutDashboard className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                        </div>
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-dark-900 dark:text-white mb-3">
                    Page not found
                </h1>
                <p className="text-dark-500 dark:text-dark-400 mb-8 text-sm">
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
                        <Home className="w-4 h-4" />
                        Home Page
                    </Link>
                </div>
            </div>
        </div>
    );
}
