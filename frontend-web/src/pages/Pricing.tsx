import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Check, X, Zap } from 'lucide-react';

const plans = [
    {
        name: 'Free',
        price: 0,
        description: 'Perfect for getting started',
        features: [
            { name: '5 Dashboards', included: true },
            { name: 'Basic Widgets', included: true },
            { name: 'Email Support', included: true },
            { name: '1 Team Member', included: true },
            { name: 'API Access', included: false },
            { name: 'Custom Branding', included: false },
            { name: 'SSO Integration', included: false },
        ],
        cta: 'Get Started',
        popular: false,
    },
    {
        name: 'Pro',
        price: 29,
        description: 'For growing teams',
        features: [
            { name: 'Unlimited Dashboards', included: true },
            { name: 'All Widget Types', included: true },
            { name: 'Priority Support', included: true },
            { name: '10 Team Members', included: true },
            { name: 'API Access', included: true },
            { name: 'Custom Branding', included: false },
            { name: 'SSO Integration', included: false },
        ],
        cta: 'Start Free Trial',
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 99,
        description: 'For large organizations',
        features: [
            { name: 'Unlimited Everything', included: true },
            { name: 'All Widget Types', included: true },
            { name: 'Dedicated Support', included: true },
            { name: 'Unlimited Team Members', included: true },
            { name: 'API Access', included: true },
            { name: 'Custom Branding', included: true },
            { name: 'SSO Integration', included: true },
        ],
        cta: 'Contact Sales',
        popular: false,
    },
];

const faqs = [
    {
        question: 'Can I try DaaS for free?',
        answer: 'Yes! We offer a free plan with 5 dashboards. You can also start a 14-day free trial of our Pro plan with no credit card required.',
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express) as well as PayPal and bank transfers for Enterprise plans.',
    },
    {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Absolutely. You can cancel your subscription at any time from your account settings. No questions asked.',
    },
    {
        question: 'Do you offer discounts for startups or non-profits?',
        answer: 'Yes! We offer 50% off for eligible startups and non-profit organizations. Contact our sales team for details.',
    },
];

export default function Pricing() {
    return (
        <>
            <Helmet>
                <title>Pricing - DaaS Platform</title>
                <meta name="description" content="Simple, transparent pricing for teams of all sizes. Start free and scale as you grow." />
            </Helmet>

            {/* Hero */}
            <section className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="section-title mb-6">Simple, Transparent Pricing</h1>
                        <p className="text-xl text-dark-300 max-w-2xl mx-auto">
                            Start free and scale as you grow. No hidden fees.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan, index) => (
                            <motion.div
                                key={plan.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`card relative ${plan.popular
                                        ? 'border-primary-500/50 bg-gradient-to-b from-primary-900/20 to-dark-900/50'
                                        : ''
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-500 rounded-full text-xs font-semibold text-white flex items-center gap-1">
                                        <Zap className="w-3 h-3" /> Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                                    <p className="text-dark-400 text-sm mb-4">{plan.description}</p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-5xl font-bold text-white">${plan.price}</span>
                                        <span className="text-dark-400">/month</span>
                                    </div>
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature.name} className="flex items-center gap-3">
                                            {feature.included ? (
                                                <Check className="w-5 h-5 text-primary-400 shrink-0" />
                                            ) : (
                                                <X className="w-5 h-5 text-dark-600 shrink-0" />
                                            )}
                                            <span className={feature.included ? 'text-dark-200' : 'text-dark-500'}>
                                                {feature.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href="http://localhost:3002/register"
                                    className={`w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                                >
                                    {plan.cta}
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-dark-900/30">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="section-title text-center mb-12">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="card"
                            >
                                <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                                <p className="text-dark-400">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
