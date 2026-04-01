import { Helmet } from 'react-helmet-async';
import { Target, Heart, Lightbulb, Award } from 'lucide-react';

const values = [
    {
        icon: Target,
        title: 'Mission-Driven',
        description: 'We exist to democratize data analytics for businesses of all sizes.',
    },
    {
        icon: Heart,
        title: 'Customer First',
        description: 'Every decision we make starts with our customers needs.',
    },
    {
        icon: Lightbulb,
        title: 'Innovation',
        description: 'We push boundaries to deliver cutting-edge solutions.',
    },
    {
        icon: Award,
        title: 'Excellence',
        description: 'We strive for excellence in everything we build.',
    },
];

const team = [
    { name: 'Alex Johnson', role: 'CEO & Founder', avatar: 'A' },
    { name: 'Sarah Chen', role: 'CTO', avatar: 'S' },
    { name: 'Michael Brown', role: 'Head of Product', avatar: 'M' },
    { name: 'Emily Davis', role: 'Head of Design', avatar: 'E' },
];

export default function About() {
    return (
        <>
            <Helmet>
                <title>About Us - Platform</title>
                <meta name="description" content="Learn about our Platform, our mission to democratize data analytics, and the team behind the product." />
            </Helmet>

            {/* Hero */}
            <section className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-6">About Our Platform 🎯</h1>
                        <p className="text-xl text-dark-600 dark:text-dark-300 max-w-3xl mx-auto">
                            We're on a mission to make data analytics accessible to everyone.
                            Founded in 2023, we've helped thousands of companies make better
                            decisions with beautiful, intuitive dashboards.
                        </p>
                    </div>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 bg-dark-50 dark:bg-dark-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-dark-900 dark:text-white mb-6">Our Story 📖</h2>
                            <div className="space-y-4 text-dark-600 dark:text-dark-300">
                                <p>
                                    Our platform was born from frustration. As data engineers and analysts,
                                    we spent countless hours wrestling with complex BI tools that
                                    were expensive, hard to use, and slow.
                                </p>
                                <p>
                                    We knew there had to be a better way. So we built this platform – a
                                    solution that combines the power of enterprise analytics with
                                    the simplicity of modern design.
                                </p>
                                <p>
                                    Today, we're proud to serve over 10,000 companies worldwide,
                                    from startups to Fortune 500 enterprises.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="card bg-white dark:bg-dark-950 border border-dark-200 dark:border-dark-800 text-center rounded-2xl p-6">
                                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">2023</div>
                                <div className="text-dark-600 dark:text-dark-400 text-sm">Founded</div>
                            </div>
                            <div className="card bg-white dark:bg-dark-950 border border-dark-200 dark:border-dark-800 text-center rounded-2xl p-6">
                                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">50+</div>
                                <div className="text-dark-600 dark:text-dark-400 text-sm">Team Members</div>
                            </div>
                            <div className="card bg-white dark:bg-dark-950 border border-dark-200 dark:border-dark-800 text-center rounded-2xl p-6">
                                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">10K+</div>
                                <div className="text-dark-600 dark:text-dark-400 text-sm">Customers</div>
                            </div>
                            <div className="card bg-white dark:bg-dark-950 border border-dark-200 dark:border-dark-800 text-center rounded-2xl p-6">
                                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400">$15M</div>
                                <div className="text-dark-600 dark:text-dark-400 text-sm">Funded</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">Our Values 🌟</h2>
                        <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
                            The principles that guide everything we do.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value) => (
                            <div
                                key={value.title}
                                className="card bg-white dark:bg-dark-900 border border-dark-200 dark:border-dark-800 text-center rounded-2xl p-6"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900 flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">{value.title}</h3>
                                <p className="text-dark-600 dark:text-dark-400 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-dark-50 dark:bg-dark-900">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-4">Meet Our Team 👥</h2>
                        <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
                            The talented people behind our platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {team.map((member) => (
                            <div
                                key={member.name}
                                className="card bg-white dark:bg-dark-950 border border-dark-200 dark:border-dark-800 text-center rounded-2xl p-6"
                            >
                                <div className="w-20 h-20 rounded-full bg-primary-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                                    {member.avatar}
                                </div>
                                <h3 className="font-semibold text-dark-900 dark:text-white">{member.name}</h3>
                                <p className="text-dark-600 dark:text-dark-400 text-sm">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
