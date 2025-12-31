-- Migration: 002_create_plans_and_subscriptions
-- Description: Create pricing plans and user subscriptions

CREATE TYPE subscription_status AS ENUM ('active', 'cancelled', 'expired', 'trial');

CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0,
    billing_cycle VARCHAR(20) DEFAULT 'monthly',
    features JSONB DEFAULT '[]',
    limits JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES plans(id),
    status subscription_status DEFAULT 'trial',
    starts_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ends_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);

-- Insert default plans
INSERT INTO plans (name, slug, description, price, features, limits, sort_order) VALUES 
('Free', 'free', 'Get started with basic features', 0, '["5 Dashboards", "Basic Widgets", "Email Support"]', '{"dashboards": 5, "widgets_per_dashboard": 10}', 1),
('Pro', 'pro', 'For growing teams', 29.99, '["Unlimited Dashboards", "All Widgets", "Priority Support", "API Access"]', '{"dashboards": -1, "widgets_per_dashboard": -1}', 2),
('Enterprise', 'enterprise', 'For large organizations', 99.99, '["Everything in Pro", "SSO Integration", "Dedicated Support", "Custom Branding"]', '{"dashboards": -1, "widgets_per_dashboard": -1}', 3);
