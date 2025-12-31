import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LayoutDashboard } from 'lucide-react';

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
            <div className="glass mx-4 mt-4 rounded-2xl">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                                <LayoutDashboard className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">DaaS</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-sm font-medium transition-colors ${location.pathname === link.path
                                            ? 'text-primary-400'
                                            : 'text-dark-300 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* CTA Buttons */}
                        <div className="hidden md:flex items-center gap-4">
                            <a href="http://localhost:3002" className="btn-secondary text-sm">
                                Login
                            </a>
                            <a href="http://localhost:3002/register" className="btn-primary text-sm">
                                Get Started
                            </a>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="md:hidden p-2 text-dark-300 hover:text-white"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="md:hidden glass mx-4 mt-2 rounded-2xl overflow-hidden"
                    >
                        <nav className="p-4 space-y-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${location.pathname === link.path
                                            ? 'bg-primary-500/20 text-primary-400'
                                            : 'text-dark-300 hover:bg-dark-800 hover:text-white'
                                        }`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-4 space-y-2">
                                <a href="http://localhost:3002" className="btn-secondary w-full text-sm">
                                    Login
                                </a>
                                <a href="http://localhost:3002/register" className="btn-primary w-full text-sm">
                                    Get Started
                                </a>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
