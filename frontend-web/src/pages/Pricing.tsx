import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, X, Zap } from 'lucide-react';

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:3002';

const plans = [
    {
        name: 'Free',
        priceMonthly: 0,
        priceYearly: 0,
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
        salesLink: false,
    },
    {
        name: 'Pro',
        priceMonthly: 29,
        priceYearly: 23,
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
        salesLink: false,
    },
    {
        name: 'Enterprise',
        priceMonthly: 99,
        priceYearly: 79,
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
        salesLink: true,
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
    const [isYearly, setIsYearly] = useState(false);

    return (
        <>
            <Helmet>
                <title>Pricing — DaaS Platform</title>
                <meta name="description" content="Simple, transparent pricing for teams of all sizes. Start free and scale as you grow." />
            </Helmet>

            {/* Hero */}
            <section className="pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white mb-6">Simple, Transparent Pricing 💳</h1>
                        <p className="text-xl text-dark-600 dark:text-dark-300 max-w-2xl mx-auto mb-8">
                            Start free and scale as you grow. No hidden fees.
                        </p>

                        {/* Billing Toggle */}
                        <div className="inline-flex items-center gap-3 bg-dark-100 dark:bg-dark-800 rounded-full px-2 py-2 border border-dark-200 dark:border-dark-700">
                            <button
                                onClick={() => setIsYearly(false)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                    !isYearly
                                        ? 'bg-white dark:bg-dark-900 text-dark-900 dark:text-white shadow-sm'
                                        : 'text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200'
                                }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setIsYearly(true)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                                    isYearly
                                        ? 'bg-white dark:bg-dark-900 text-dark-900 dark:text-white shadow-sm'
                                        : 'text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200'
                                }`}
                            >
                                Yearly
                                <span className="text-xs bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-1.5 py-0.5 rounded-full font-semibold">
                                    Save 20%
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="pb-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {plans.map((plan) => (
                            <div
                                key={plan.name}
                                className={`card relative bg-white dark:bg-dark-900 border rounded-2xl p-6 transition-all duration-200 ${plan.popular
                                        ? 'border-primary-500 shadow-lg shadow-primary-500/10'
                                        : 'border-dark-200 dark:border-dark-800 hover:border-dark-300 dark:hover:border-dark-700'
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary-600 rounded-full text-xs font-semibold text-white flex items-center gap-1 shadow-sm">
                                        <Zap className="w-3 h-3" /> Most Popular
                                    </div>
                                )}

                                <div className="text-center mb-8">
                                    <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">{plan.name}</h3>
                                    <p className="text-dark-600 dark:text-dark-400 text-sm mb-4">{plan.description}</p>
                                    <div className="flex items-baseline justify-center gap-1">
                                        <span className="text-5xl font-bold text-dark-900 dark:text-white">
                                            ${isYearly ? plan.priceYearly : plan.priceMonthly}
                                        </span>
                                        <span className="text-dark-600 dark:text-dark-400">/month</span>
                                    </div>
                                    {isYearly && plan.priceMonthly > 0 && (
                                        <p className="text-xs text-dark-400 dark:text-dark-500 mt-1">
                                            Billed ${plan.priceYearly * 12}/year
                                        </p>
                                    )}
                                </div>

                                <ul className="space-y-3 mb-8">
                                    {plan.features.map((feature) => (
                                        <li key={feature.name} className="flex items-center gap-3">
                                            {feature.included ? (
                                                <Check className="w-5 h-5 text-primary-600 dark:text-primary-400 shrink-0" />
                                            ) : (
                                                <X className="w-5 h-5 text-dark-300 dark:text-dark-600 shrink-0" />
                                            )}
                                            <span className={feature.included ? 'text-dark-800 dark:text-dark-200' : 'text-dark-400 dark:text-dark-500'}>
                                                {feature.name}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                {plan.salesLink ? (
                                    <a
                                        href="/contact"
                                        className={`w-full block text-center ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                                    >
                                        {plan.cta}
                                    </a>
                                ) : (
                                    <a
                                        href={`${ADMIN_URL}/register`}
                                        className={`w-full block text-center ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}
                                    >
                                        {plan.cta}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24 bg-dark-50 dark:bg-dark-900">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-dark-900 dark:text-white text-center mb-12">Frequently Asked Questions ❓</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="card bg-white dark:bg-dark-950 border border-dark-200 dark:border-dark-800 rounded-2xl p-6"
                            >
                                <h3 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">{faq.question}</h3>
                                <p className="text-dark-600 dark:text-dark-400">{faq.answer}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}
