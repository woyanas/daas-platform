import { Outlet } from 'react-router-dom';
import { useThemeStore } from '../../store/themeStore';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
    const { isDark } = useThemeStore();

    return (
        <div className={`flex h-screen transition-colors duration-300 ${
            isDark ? 'bg-dark-950' : 'bg-gray-100'
        }`}>
            <Sidebar />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header />
                <main className={`flex-1 overflow-y-auto p-6 transition-colors duration-300 ${
                    isDark ? 'bg-dark-950' : 'bg-gray-100'
                }`}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
