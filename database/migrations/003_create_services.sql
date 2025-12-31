-- Migration: 003_create_services
-- Description: Create services and configuration tables

CREATE TABLE services (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    icon VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE service_configs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    service_id UUID NOT NULL REFERENCES services(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    is_enabled BOOLEAN DEFAULT true,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(service_id, user_id)
);

CREATE INDEX idx_service_configs_user ON service_configs(user_id);

-- Insert default services
INSERT INTO services (name, slug, description, icon, sort_order) VALUES 
('Analytics Dashboard', 'analytics', 'Real-time analytics and metrics visualization', 'chart-bar', 1),
('User Management', 'users', 'Manage team members and permissions', 'users', 2),
('API Gateway', 'api', 'RESTful API access and management', 'code', 3),
('Notifications', 'notifications', 'Email and push notification services', 'bell', 4),
('Data Export', 'export', 'Export data to various formats', 'download', 5);
