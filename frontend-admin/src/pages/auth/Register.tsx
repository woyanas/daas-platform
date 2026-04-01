import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, AlertCircle, Moon, Sun } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useThemeStore } from '../../store/themeStore';

export default function Register() {
    const navigate = useNavigate();
    const { register, isLoading, error, clearError } = useAuthStore();
    const { isDark, toggleTheme } = useThemeStore();
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await register(email, password, fullName);
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
                        <span className="text-3xl">📋</span>
                    </div>
                    <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Create account ✨
                    </h1>
                    <p className={`${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                        Start your 14-day free trial
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
                        {/* Full Name Field */}
                        <div>
                            <label htmlFor="fullName" className={`block text-sm font-semibold mb-2 ${
                                isDark ? 'text-dark-200' : 'text-gray-700'
                            }`}>
                                👤 Full Name
                            </label>
                            <div className="relative">
                                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${
                                    isDark ? 'text-dark-500' : 'text-gray-400'
                                }`} />
                                <input
                                    type="text"
                                    id="fullName"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    className={`w-full pl-12 pr-4 py-3 rounded-lg font-medium transition-all ${
                                        isDark
                                            ? 'bg-dark-800/50 border border-dark-700 text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none'
                                            : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                                    }`}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className={`w-full pl-12 pr-4 py-3 rounded-lg font-medium transition-all ${
                                        isDark
                                            ? 'bg-dark-800/50 border border-dark-700 text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none'
                                            : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                                    }`}
                                    placeholder="you@example.com"
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={`w-full pl-12 pr-4 py-3 rounded-lg font-medium transition-all ${
                                        isDark
                                            ? 'bg-dark-800/50 border border-dark-700 text-white placeholder-dark-500 focus:border-primary-500 focus:outline-none'
                                            : 'bg-gray-100 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none'
                                    }`}
                                    placeholder="••••••••"
                                    minLength={6}
                                    required
                                />
                            </div>
                            <p className={`text-xs mt-2 ${isDark ? 'text-dark-500' : 'text-gray-500'}`}>
                                At least 6 characters
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 disabled:opacity-50 ${
                                isDark
                                    ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800'
                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                            }`}
                        >
                            {isLoading ? '⏳ Creating account...' : '✨ Create account'}
                        </button>
                    </form>

                    <div className={`mt-6 text-center text-sm ${
                        isDark ? 'text-dark-400' : 'text-gray-600'
                    }`}>
                        Already have an account?{' '}
                        <Link to="/login" className={`font-semibold transition-colors ${
                            isDark
                                ? 'text-primary-400 hover:text-primary-300'
                                : 'text-blue-600 hover:text-blue-700'
                        }`}>
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
