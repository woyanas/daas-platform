import { Link } from 'react-router-dom';
import { LayoutDashboard, Twitter, Github, Linkedin } from 'lucide-react';

const footerLinks = {
    product: [
        { name: 'Features', path: '/services' },
        { name: 'Pricing', path: '/pricing' },
        { name: 'Integrations', path: '/services' },
        { name: 'Changelog', path: '#' },
    ],
    company: [
        { name: 'About', path: '/about' },
        { name: 'Blog', path: '#' },
        { name: 'Careers', path: '#' },
        { name: 'Contact', path: '/contact' },
    ],
    resources: [
        { name: 'Documentation', path: '#' },
        { name: 'API Reference', path: '#' },
        { name: 'Tutorials', path: '#' },
        { name: 'Support', path: '/contact' },
    ],
    legal: [
        { name: 'Privacy', path: '#' },
        { name: 'Terms', path: '#' },
        { name: 'Security', path: '#' },
    ],
};

export default function Footer() {
    return (
        <footer className="border-t border-dark-800 bg-dark-950">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                    {/* Brand */}
                    <div className="col-span-2">
                        <Link to="/" className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                                <LayoutDashboard className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">DaaS</span>
                        </Link>
                        <p className="text-dark-400 text-sm mb-6">
                            Build stunning dashboards with ease. Enterprise-grade analytics and
                            visualization for your business.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="text-dark-400 hover:text-white transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-dark-400 hover:text-white transition-colors">
                                <Github className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-dark-400 hover:text-white transition-colors">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
                        <ul className="space-y-3">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-dark-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
                        <ul className="space-y-3">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-dark-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Resources</h4>
                        <ul className="space-y-3">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-dark-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-3">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-dark-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-dark-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-dark-500">
                        © {new Date().getFullYear()} DaaS Platform. All rights reserved.
                    </p>
                    <p className="text-sm text-dark-500">
                        Made with ❤️ for developers and businesses
                    </p>
                </div>
            </div>
        </footer>
    );
}
