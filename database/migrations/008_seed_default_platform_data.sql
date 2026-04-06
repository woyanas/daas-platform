-- Migration: 008_seed_default_platform_data
-- Description: Seed default service registry and platform service resources for production / SDLC flow

-- Ensure existing services have a category value
UPDATE services
SET category = 'core'
WHERE category IS NULL;

-- Seed service registry for new modules
INSERT INTO services (name, slug, category, description, icon, sort_order)
VALUES
('Data Connector Service', 'data-connectors', 'connector', 'Connect external data sources such as PostgreSQL, API, and Google Sheets.', 'plug', 10),
('Widget Marketplace', 'widget-marketplace', 'widget', 'Reusable widget packs and dashboard templates.', 'puzzle-piece', 20),
('Alert & Notification', 'alerts', 'alert', 'Create alerts and notifications for usage, failures, and thresholds.', 'bell', 30),
('Reporting & Export', 'reports', 'report', 'Generate PDF/Excel/CSV exports for dashboards and usage reports.', 'file-arrow-down', 40),
('Third-party Integrations', 'integrations', 'integration', 'Connect external services such as Slack, Teams, Zapier, and webhooks.', 'share-nodes', 50),
('Feature Flags', 'feature-flags', 'feature_flag', 'Toggle experimental or tenant-specific features per environment or customer.', 'toggle-on', 60)
ON CONFLICT (slug) DO UPDATE SET category = EXCLUDED.category;

-- Seed default connectors
INSERT INTO connectors (name, type, description, config, sort_order)
VALUES
('PostgreSQL Connector', 'postgres', 'Connect external PostgreSQL databases for dashboard data ingestion.', '{"host": "db.example.com", "port": 5432, "database": "source_db"}', 10),
('External API Connector', 'api', 'Pull data from third-party REST APIs and unified API endpoints.', '{"baseUrl": "https://api.example.com/v1"}', 20),
('Google Sheets Connector', 'google_sheets', 'Import reporting data directly from Google Sheets documents.', '{"spreadsheetId": "your-sheet-id"}', 30)
ON CONFLICT (name) DO NOTHING;

-- Seed default widget packs
INSERT INTO widget_packs (name, category, description, template, sort_order)
VALUES
('Executive KPI Pack', 'chart', 'A set of KPI widgets for executive dashboards.', '{"layout": [{"type":"metric"},{"type":"chart"}],"widgets": [{"title":"Revenue", "type":"metric"},{"title":"Growth Rate", "type":"chart"}]}', 10),
('Sales Overview Pack', 'table', 'Sales and pipeline performance dashboard template.', '{"layout": [{"type":"table"}],"widgets": [{"title":"Sales Funnel", "type":"table"},{"title":"Top Accounts", "type":"table"}]}', 20),
('Operations Metrics Pack', 'metric', 'Operational health metrics for daily monitoring.', '{"layout": [{"type":"metric"}],"widgets": [{"title":"System Uptime", "type":"metric"},{"title":"Error Rate", "type":"metric"}]}', 30)
ON CONFLICT (name) DO NOTHING;

-- Seed default alert rules
INSERT INTO alert_rules (name, type, description, settings, sort_order)
VALUES
('Usage Threshold Alert', 'usage', 'Notify when usage exceeds a configured threshold.', '{"threshold": 80, "channels": ["email"], "recipients": ["admin@daas.local"]}', 10),
('Data Refresh Failure Alert', 'failure', 'Alert when scheduled connector refresh fails.', '{"channels": ["email", "slack"], "recipients": ["ops@daas.local"]}', 20)
ON CONFLICT (name) DO NOTHING;

-- Seed default report definitions
INSERT INTO report_definitions (name, type, format, description, criteria, status)
VALUES
('Monthly Usage Report', 'usage', 'excel', 'Export monthly usage metrics for billing and operations.', '{"range": "last_30_days", "metrics": ["active_users", "api_calls"]}', 'ready'),
('Dashboard Summary Report', 'dashboard', 'pdf', 'Generate a PDF summary from selected dashboards.', '{"dashboardId": null, "layout": "summary"}', 'ready')
ON CONFLICT (name) DO NOTHING;

-- Seed default integration providers
INSERT INTO integrations (name, provider, description, config, sort_order)
VALUES
('Slack Alerts', 'slack', 'Send platform alerts and notifications to Slack channels.', '{"webhookUrl": "https://hooks.slack.com/services/..."}', 10),
('Teams Alerts', 'teams', 'Send platform notifications to Microsoft Teams channels.', '{"webhookUrl": "https://outlook.office.com/..."}', 20),
('Webhook Receiver', 'webhook', 'Forward alerts and status updates to custom webhook endpoints.', '{"targetUrl": "https://hooks.example.com/receive"}', 30)
ON CONFLICT (name) DO NOTHING;

-- Seed feature flags for production / SDLC readiness
INSERT INTO feature_flags (key, name, description, is_enabled, settings)
VALUES
('advanced_reporting', 'Advanced Reporting', 'Enable advanced report generation and scheduling.', false, '{}'),
('custom_widget_builder', 'Custom Widget Builder', 'Allow users to define custom dashboard widgets.', false, '{}'),
('tenant_isolation', 'Tenant Isolation', 'Enable tenant-specific feature control and data separation.', true, '{"requiresReview": true}')
ON CONFLICT (key) DO NOTHING;
