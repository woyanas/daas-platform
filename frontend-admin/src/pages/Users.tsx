import { useState, useEffect } from 'react';
import { Search, MoreVertical, UserPlus, Loader } from 'lucide-react';
import { usersApi } from '../services/api';import { useThemeStore } from '../store/themeStore';import AddUserModal from '../components/modals/AddUserModal';

interface User {
    id: string;
    fullName: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    isActive: boolean;
    createdAt: string;
}

interface UserStats {
    total: number;
    active: number;
    inactive: number;
    byRole: { role: string; count: string }[];
}

const roleEmojis: Record<string, string> = {
    admin: '👑',
    editor: '✏️',
    viewer: '👁️',
};

const roleColors: Record<string, string> = {
    admin: 'bg-red-500/10 text-red-400',
    editor: 'bg-blue-500/10 text-blue-400',
    viewer: 'bg-gray-500/10 text-gray-400',
};

export default function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const [stats, setStats] = useState<UserStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showAddModal, setShowAddModal] = useState(false);
    const { isDark } = useThemeStore();

    const fetchData = async () => {
        try {
            setLoading(true);
            const [usersRes, statsRes] = await Promise.all([
                usersApi.getAll(page),
                usersApi.getStats().catch(() => ({ data: null }))
            ]);

            setUsers(usersRes.data.data);
            setTotalPages(usersRes.data.meta.totalPages);
            if (statsRes.data) {
                setStats(statsRes.data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    const getRoleCount = (role: string) => {
        const roleStat = stats?.byRole.find((r) => r.role === role);
        return roleStat ? parseInt(roleStat.count) : 0;
    };

    const filteredUsers = users.filter(
        (user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

    if (loading && users.length === 0) {
        return (
            <div className={`flex justify-center items-center h-64 transition-colors ${
                isDark ? 'bg-dark-900' : 'bg-white'
            }`}>
                <Loader className={`w-8 h-8 animate-spin ${
                    isDark ? 'text-primary-500' : 'text-primary-600'
                }`} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400 dark:text-dark-500" />
                    <input
                        type="text"
                        placeholder="🔍 Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-80 pl-10 pr-4 py-2 bg-white dark:bg-dark-800 border border-dark-200 dark:border-dark-700 rounded-lg text-sm text-dark-900 dark:text-white placeholder-dark-400 dark:placeholder-dark-500 focus:border-primary-500 outline-none"
                    />
                </div>
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary flex items-center gap-2">
                    <UserPlus className="w-4 h-4" />
                    👤 Add User
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className={`rounded-lg p-6 transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        👥 {stats?.total || users.length}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>Total Users</div>
                </div>
                <div className={`rounded-lg p-6 transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                    <div className="text-2xl font-bold text-green-400">
                        ✅ {stats?.active || users.filter((u) => u.isActive).length}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>Active Users</div>
                </div>
                <div className={`rounded-lg p-6 transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                    <div className="text-2xl font-bold text-orange-400">
                        👑 {getRoleCount('admin')}
                    </div>
                    <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>Admins</div>
                </div>
            </div>

            {/* Table */}
            <div className={`rounded-lg overflow-hidden transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className={`border-b transition-colors ${isDark ? 'bg-dark-900/50 border-dark-700' : 'bg-gray-50 border-gray-200'}`}>
                            <tr>
                                <th className={`text-left text-xs font-medium uppercase tracking-wider px-6 py-4 ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>👤 User</th>
                                <th className={`text-left text-xs font-medium uppercase tracking-wider px-6 py-4 ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>🎭 Role</th>
                                <th className={`text-left text-xs font-medium uppercase tracking-wider px-6 py-4 ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>📊 Status</th>
                                <th className={`text-left text-xs font-medium uppercase tracking-wider px-6 py-4 ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>📅 Joined</th>
                                <th className={`text-right text-xs font-medium uppercase tracking-wider px-6 py-4 ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>⚙️ Actions</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDark ? 'divide-dark-700' : 'divide-gray-200'}`}>
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className={`hover:transition-colors ${isDark ? 'hover:bg-dark-700/30' : 'hover:bg-gray-50'}`}>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                                                {user.fullName.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.fullName}</div>
                                                <div className={`text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize ${roleColors[user.role]}`}>
                                            {roleEmojis[user.role]} {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? (isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-700') : (isDark ? 'bg-gray-500/10 text-gray-400' : 'bg-gray-100 text-gray-700')}`}>
                                            {user.isActive ? '✅ Active' : '⛔ Inactive'}
                                        </span>
                                    </td>
                                    <td className={`px-6 py-4 text-sm ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>
                                        📅 {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className={`transition-colors ${isDark ? 'text-dark-400 hover:text-white' : 'text-gray-400 hover:text-gray-600'}`}>
                                            {/* More options icon removed to avoid redundancy with header title */}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className={`border-t px-6 py-3 flex justify-between items-center transition-colors ${isDark ? 'bg-dark-900/50 border-dark-700' : 'bg-gray-50 border-gray-200'}`}>
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className={`text-xs font-medium disabled:opacity-50 transition-colors ${isDark ? 'text-dark-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        ← Previous
                    </button>
                    <span className={`text-xs ${isDark ? 'text-dark-500' : 'text-gray-500'}`}>Page {page} of {totalPages}</span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className={`text-xs font-medium disabled:opacity-50 transition-colors ${isDark ? 'text-dark-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                    >
                        Next →
                    </button>
                </div>
            </div>

            <AddUserModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onUserAdded={fetchData} />
        </div>
    );
}