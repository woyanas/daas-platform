-- Migration: 007_create_service_extensions_and_feature_tables
-- Description: Add service category, connector/widget/alert/report/integration/feature flag tables

CREATE TYPE IF NOT EXISTS service_category AS ENUM (
    'connector',
    'widget',
    'alert',
    'report',
    'integration',
    'feature_flag',
    'core'
);

ALTER TABLE services
    ADD COLUMN IF NOT EXISTS category service_category NOT NULL DEFAULT 'core';

CREATE TYPE IF NOT EXISTS connector_type AS ENUM (
    'postgres',
    'api',
    'google_sheets',
    'csv',
    'other'
);

CREATE TABLE IF NOT EXISTS connectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type connector_type NOT NULL DEFAULT 'other',
    description TEXT,
    config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE IF NOT EXISTS widget_pack_category AS ENUM (
    'chart',
    'table',
    'metric',
    'custom'
);

CREATE TABLE IF NOT EXISTS widget_packs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    category widget_pack_category NOT NULL DEFAULT 'custom',
    description TEXT,
    template JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE IF NOT EXISTS alert_type AS ENUM (
    'usage',
    'threshold',
    'failure'
);

CREATE TABLE IF NOT EXISTS alert_rules (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type alert_type NOT NULL DEFAULT 'failure',
    description TEXT,
    settings JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE IF NOT EXISTS report_type AS ENUM (
    'dashboard',
    'usage',
    'custom'
);

CREATE TYPE IF NOT EXISTS report_format AS ENUM (
    'pdf',
    'excel',
    'csv'
);

CREATE TYPE IF NOT EXISTS report_status AS ENUM (
    'draft',
    'ready',
    'completed'
);

CREATE TABLE IF NOT EXISTS report_definitions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    type report_type NOT NULL DEFAULT 'dashboard',
    format report_format NOT NULL DEFAULT 'pdf',
    description TEXT,
    criteria JSONB DEFAULT '{}',
    status report_status NOT NULL DEFAULT 'draft',
    output_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TYPE IF NOT EXISTS integration_provider AS ENUM (
    'slack',
    'teams',
    'webhook',
    'zapier',
    'custom'
);

CREATE TABLE IF NOT EXISTS integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    provider integration_provider NOT NULL DEFAULT 'custom',
    description TEXT,
    config JSONB DEFAULT '{}',
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS feature_flags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key VARCHAR(100) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    is_enabled BOOLEAN DEFAULT false,
    settings JSONB DEFAULT '{}',
    tenant_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_connectors_type ON connectors(type);
CREATE INDEX IF NOT EXISTS idx_widget_packs_category ON widget_packs(category);
CREATE INDEX IF NOT EXISTS idx_alert_rules_type ON alert_rules(type);
CREATE INDEX IF NOT EXISTS idx_report_definitions_status ON report_definitions(status);
CREATE INDEX IF NOT EXISTS idx_integrations_provider ON integrations(provider);
CREATE INDEX IF NOT EXISTS idx_feature_flags_key ON feature_flags(key);
