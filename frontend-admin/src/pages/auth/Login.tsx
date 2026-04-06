import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';

export default function Login() {
    const navigate = useNavigate();
    const { login, isLoading, error, clearError } = useAuthStore();
    const { isDark, toggleTheme } = useThemeStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/');
        } catch {
            // Error is handled in store
        }
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 ${
            isDark 
                ? 'bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800' 
                : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
        } flex items-center justify-center p-4`}>
            {/* Dark/Light Mode Toggle */}
            <button
                onClick={toggleTheme}
                className={`fixed top-6 right-6 p-3 rounded-full transition-all duration-300 ${
                    isDark
                        ? 'bg-dark-800 hover:bg-dark-700 text-yellow-400'
                        : 'bg-white hover:bg-gray-100 text-gray-700 shadow-md'
                }`}
                title="Toggle dark/light mode"
            >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <div className="w-full max-w-md">
                {/* Logo & Header */}
                <div className={`text-center mb-8 ${isDark ? '' : 'text-gray-900'}`}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                        isDark
                            ? 'bg-gradient-to-br from-primary-500 to-primary-600'
                            : 'bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg'
                    }`}>
                        <span className="text-3xl">📊</span>
                    </div>
                    <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Welcome back 👋
                    </h1>
                    <p className={`${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                        Sign in to your admin dashboard
                    </p>
                </div>

                {/* Form Card */}
                <div className={`rounded-2xl p-8 backdrop-blur transition-all duration-300 ${
                    isDark
                        ? 'bg-dark-900/80 border border-dark-700 shadow-2xl'
                        : 'bg-white/90 border border-blue-100 shadow-xl'
                }`}>
                    {error && (
                        <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 text-sm transition-colors ${
                            isDark
                                ? 'bg-red-500/15 border border-red-500/30 text-red-400'
                                : 'bg-red-50 border border-red-200 text-red-700'
                        }`}>
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span>{error}</span>
                            <button 
                                onClick={clearError} 
                                className={`ml-auto font-semibold hover:opacity-70 transition-opacity`}
                            >
                                ✕
                            </button>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className={`block text-sm font-semibold mb-2 ${
                                isDark ? 'text-dark-200' : 'text-gray-700'
                            }`}>
                                📧 Email Address
                            </label>
                            <div className="relative">
                                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                                    isDark ? 'text-dark-500' : 'text-gray-400'
                                }`} />
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    autoComplete="username"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
                                        isDark
                                            ? 'bg-dark-800 border-dark-700 text-white placeholder-dark-500 focus:border-primary-500 focus:bg-dark-800/50'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white'
                                    }`}
                                    placeholder="admin@example.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className={`block text-sm font-semibold mb-2 ${
                                isDark ? 'text-dark-200' : 'text-gray-700'
                            }`}>
                                🔐 Password
                            </label>
                            <div className="relative">
                                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                                    isDark ? 'text-dark-500' : 'text-gray-400'
                                }`} />
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    autoComplete="current-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none ${
                                        isDark
                                            ? 'bg-dark-800 border-dark-700 text-white placeholder-dark-500 focus:border-primary-500 focus:bg-dark-800/50'
                                            : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:bg-white'
                                    }`}
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                                isDark
                                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg'
                                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg'
                            }`}
                        >
                            {isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    🚀 Sign in
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className={`mt-8 text-center text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                        Don't have an account?{' '}
                        <Link 
                            to="/register" 
                            className={`font-semibold transition-colors ${
                                isDark
                                    ? 'text-primary-400 hover:text-primary-300'
                                    : 'text-blue-600 hover:text-blue-700'
                            }`}
                        >
                            ✍️ Sign up
                        </Link>
                    </div>
                </div>

                {/* Demo Credentials Hint */}
                <div className={`mt-6 p-4 rounded-lg text-center text-xs ${
                    isDark
                        ? 'bg-dark-800/50 text-dark-400 border border-dark-700'
                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}>
                    💡 <strong>Demo:</strong> admin@daas.local / admin123
                </div>
            </div>
        </div>
    );
}
