import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Target, Heart, Lightbulb, Award, Users, Globe } from 'lucide-react';

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
                <title>About Us - DaaS Platform</title>
                <meta name="description" content="Learn about DaaS Platform, our mission to democratize data analytics, and the team behind the product." />
            </Helmet>

            {/* Hero */}
            <section className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="section-title mb-6">About DaaS Platform</h1>
                        <p className="text-xl text-dark-300 max-w-3xl mx-auto">
                            We're on a mission to make data analytics accessible to everyone.
                            Founded in 2023, we've helped thousands of companies make better
                            decisions with beautiful, intuitive dashboards.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Story */}
            <section className="py-20 bg-dark-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                            <div className="space-y-4 text-dark-300">
                                <p>
                                    DaaS was born from frustration. As data engineers and analysts,
                                    we spent countless hours wrestling with complex BI tools that
                                    were expensive, hard to use, and slow.
                                </p>
                                <p>
                                    We knew there had to be a better way. So we built DaaS – a
                                    platform that combines the power of enterprise analytics with
                                    the simplicity of modern design.
                                </p>
                                <p>
                                    Today, we're proud to serve over 10,000 companies worldwide,
                                    from startups to Fortune 500 enterprises.
                                </p>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="grid grid-cols-2 gap-4"
                        >
                            <div className="card text-center">
                                <div className="text-4xl font-bold gradient-text">2023</div>
                                <div className="text-dark-400 text-sm">Founded</div>
                            </div>
                            <div className="card text-center">
                                <div className="text-4xl font-bold gradient-text">50+</div>
                                <div className="text-dark-400 text-sm">Team Members</div>
                            </div>
                            <div className="card text-center">
                                <div className="text-4xl font-bold gradient-text">10K+</div>
                                <div className="text-dark-400 text-sm">Customers</div>
                            </div>
                            <div className="card text-center">
                                <div className="text-4xl font-bold gradient-text">$15M</div>
                                <div className="text-dark-400 text-sm">Funded</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="section-title mb-4">Our Values</h2>
                        <p className="text-dark-400 max-w-2xl mx-auto">
                            The principles that guide everything we do.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="card text-center"
                            >
                                <div className="w-14 h-14 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                                    <value.icon className="w-7 h-7 text-primary-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-white mb-2">{value.title}</h3>
                                <p className="text-dark-400 text-sm">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-20 bg-dark-900/30">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="section-title mb-4">Meet Our Team</h2>
                        <p className="text-dark-400 max-w-2xl mx-auto">
                            The talented people behind DaaS Platform.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {team.map((member, index) => (
                            <motion.div
                                key={member.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="card text-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-white">
                                    {member.avatar}
                                </div>
                                <h3 className="font-semibold text-white">{member.name}</h3>
                                <p className="text-dark-400 text-sm">{member.role}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
