import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard } from 'lucide-react';

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:3002';

const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'Contact', path: '/contact' },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    return (
        <header className="fixed top-0 left-0 right-0 z-50">
            <div className="bg-white/90 dark:bg-dark-950/90 backdrop-blur-md border-b border-dark-200 dark:border-dark-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                                <LayoutDashboard className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-dark-900 dark:text-white">DaaS Platform</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-sm font-medium transition-colors ${location.pathname === link.path
                                            ? 'text-primary-600 dark:text-primary-400'
                                            : 'text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <a href={`${ADMIN_URL}`} className="btn-secondary text-sm">
                                Login
                            </a>
                            <a href={`${ADMIN_URL}/register`} className="btn-primary text-sm">
                                Get Started
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-dark-600 dark:text-dark-300 hover:text-dark-900 dark:hover:text-white"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-dark-950 border-b border-dark-200 dark:border-dark-800">
                    <nav className="p-4 space-y-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.path
                                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400'
                                        : 'text-dark-600 dark:text-dark-300 hover:bg-dark-50 dark:hover:bg-dark-800 hover:text-dark-900 dark:hover:text-white'
                                    }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <div className="pt-4 space-y-2">
                            <a href={`${ADMIN_URL}`} className="btn-secondary w-full text-sm">
                                Login
                            </a>
                            <a href={`${ADMIN_URL}/register`} className="btn-primary w-full text-sm">
                                Get Started
                            </a>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}
