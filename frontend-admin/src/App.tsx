import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Connectors from './pages/Connectors';
import ConnectorDetail from './pages/ConnectorDetail';
import WidgetPacks from './pages/WidgetPacks';
import WidgetPackDetail from './pages/WidgetPackDetail';
import Alerts from './pages/Alerts';
import AlertDetail from './pages/AlertDetail';
import Reports from './pages/Reports';
import ReportDetail from './pages/ReportDetail';
import Integrations from './pages/Integrations';
import IntegrationDetail from './pages/IntegrationDetail';
import FeatureFlags from './pages/FeatureFlags';
import Metrics from './pages/Metrics';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

function AppContent() {
    return (
        <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="services" element={<Services />} />
                <Route path="services/connectors" element={<Connectors />} />
                <Route path="services/connectors/:id" element={<ConnectorDetail />} />
                <Route path="services/widget-packs" element={<WidgetPacks />} />
                <Route path="services/widget-packs/:id" element={<WidgetPackDetail />} />
                <Route path="services/alerts" element={<Alerts />} />
                <Route path="services/alerts/:id" element={<AlertDetail />} />
                <Route path="services/reports" element={<Reports />} />
                <Route path="services/reports/:id" element={<ReportDetail />} />
                <Route path="services/integrations" element={<Integrations />} />
                <Route path="services/integrations/:id" element={<IntegrationDetail />} />
                <Route path="services/feature-flags" element={<FeatureFlags />} />
                <Route path="services/:id" element={<ServiceDetail />} />
                <Route path="metrics" element={<Metrics />} />
                <Route path="settings" element={<Settings />} />
            </Route>

            {/* 404 Fallback */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

function App() {
    const isDark = useThemeStore((state) => state.isDark);

    useEffect(() => {
        const htmlElement = document.documentElement;
        if (isDark) {
            htmlElement.classList.add('dark');
        } else {
            htmlElement.classList.remove('dark');
        }
    }, [isDark]);

    return <AppContent />;
}

export default App;
