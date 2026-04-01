import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import { useThemeStore } from './store/themeStore';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Services from './pages/Services';
import Metrics from './pages/Metrics';
import Settings from './pages/Settings';

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
                <Route path="metrics" element={<Metrics />} />
                <Route path="settings" element={<Settings />} />
            </Route>
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
