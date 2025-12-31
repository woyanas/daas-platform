-- Migration: 004_create_dashboards_widgets
-- Description: Create dashboard and widget tables for customizable dashboards

CREATE TYPE widget_type AS ENUM ('line_chart', 'bar_chart', 'pie_chart', 'kpi_card', 'data_table', 'stat_card', 'area_chart', 'gauge');

CREATE TABLE dashboards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    layout JSONB DEFAULT '{"columns": 12, "rows": []}',
    is_public BOOLEAN DEFAULT false,
    is_default BOOLEAN DEFAULT false,
    thumbnail_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE widgets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dashboard_id UUID NOT NULL REFERENCES dashboards(id) ON DELETE CASCADE,
    type widget_type NOT NULL,
    title VARCHAR(255) NOT NULL,
    config JSONB DEFAULT '{}',
    position JSONB DEFAULT '{"x": 0, "y": 0, "w": 4, "h": 3}',
    data_source JSONB DEFAULT '{}',
    refresh_interval INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_dashboards_user ON dashboards(user_id);
CREATE INDEX idx_widgets_dashboard ON widgets(dashboard_id);
