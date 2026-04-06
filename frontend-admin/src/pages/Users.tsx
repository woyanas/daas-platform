import { useState, useEffect } from 'react';
import { Search, MoreVertical, UserPlus, Loader, ShieldCheck, Eye, Pencil, UserX, UserCheck } from 'lucide-react';
import { usersApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';
import AddUserModal from '../components/modals/AddUserModal';

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
    admin: 'bg-red-500/10 text-red-500 dark:text-red-400',
    editor: 'bg-blue-500/10 text-blue-500 dark:text-blue-400',
    viewer: 'bg-gray-500/10 text-gray-500 dark:text-gray-400',
};

function ActionsDropdown({ user, onRefresh, isDark }: { user: User; onRefresh: () => void; isDark: boolean }) {
    const [open, setOpen] = useState(false);

    const handleToggleActive = async () => {
        try {
            await usersApi.updateMe({ isActive: !user.isActive } as any);
            onRefresh();
        } catch {
            console.error('Failed to toggle user status');
        }
        setOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setOpen((v) => !v)}
                className={`p-1.5 rounded-lg transition-colors ${isDark ? 'hover:bg-dark-700 text-dark-400 hover:text-white' : 'hover:bg-gray-100 text-gray-400 hover:text-gray-700'}`}
                title="Actions"
            >
                <MoreVertical className="w-4 h-4" />
            </button>

            {open && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
                    <div className={`absolute right-0 top-full mt-1 w-44 rounded-xl border shadow-lg z-20 overflow-hidden ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                        <div className="py-1">
                            <button
                                className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors ${isDark ? 'text-dark-200 hover:bg-dark-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                onClick={() => setOpen(false)}
                            >
                                <Pencil className="w-3.5 h-3.5" /> Edit User
                            </button>
                            <button
                                className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors ${isDark ? 'text-dark-200 hover:bg-dark-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                onClick={() => setOpen(false)}
                            >
                                <ShieldCheck className="w-3.5 h-3.5" /> Change Role
                            </button>
                            <button
                                className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors ${isDark ? 'text-dark-200 hover:bg-dark-700' : 'text-gray-700 hover:bg-gray-50'}`}
                                onClick={() => setOpen(false)}
                            >
                                <Eye className="w-3.5 h-3.5" /> View Details
                            </button>
                            <div className={`my-1 border-t ${isDark ? 'border-dark-700' : 'border-gray-100'}`} />
                            <button
                                className={`flex items-center gap-2.5 w-full px-3 py-2 text-sm transition-colors ${user.isActive ? 'text-orange-500 hover:bg-orange-500/10' : 'text-green-500 hover:bg-green-500/10'}`}
                                onClick={handleToggleActive}
                            >
                                {user.isActive ? (
                                    <><UserX className="w-3.5 h-3.5" /> Deactivate</>
                                ) : (
                                    <><UserCheck className="w-3.5 h-3.5" /> Activate</>
                                )}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

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
            <div className={`flex justify-center items-center h-64 transition-colors ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
                <Loader className={`w-8 h-8 animate-spin ${isDark ? 'text-primary-500' : 'text-primary-600'}`} />
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
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="input w-80 pl-10"
                    />
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="btn-primary flex items-center gap-2"
                >
                    <UserPlus className="w-4 h-4" />
                    Add User
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
                    <div className="text-2xl font-bold text-green-500">
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
            <div className={`rounded-xl overflow-hidden transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className={`border-b transition-colors ${isDark ? 'bg-dark-900/50 border-dark-700' : 'bg-gray-50 border-gray-200'}`}>
                            <tr>
                                <th className={`text-left text-xs font-semibold uppercase tracking-wider px-6 py-4 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>User</th>
                                <th className={`text-left text-xs font-semibold uppercase tracking-wider px-6 py-4 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>Role</th>
                                <th className={`text-left text-xs font-semibold uppercase tracking-wider px-6 py-4 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>Status</th>
                                <th className={`text-left text-xs font-semibold uppercase tracking-wider px-6 py-4 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>Joined</th>
                                <th className={`text-right text-xs font-semibold uppercase tracking-wider px-6 py-4 ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>Actions</th>
                            </tr>
                        </thead>
                        <tbody className={`divide-y ${isDark ? 'divide-dark-700' : 'divide-gray-100'}`}>
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className={`px-6 py-12 text-center text-sm ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>
                                        {search ? `No users found matching "${search}"` : 'No users yet.'}
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className={`transition-colors ${isDark ? 'hover:bg-dark-700/30' : 'hover:bg-gray-50'}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                                                    {user.fullName.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{user.fullName}</div>
                                                    <div className={`text-xs ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize ${roleColors[user.role]}`}>
                                                {roleEmojis[user.role]} {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.isActive
                                                ? isDark ? 'bg-green-500/10 text-green-400' : 'bg-green-100 text-green-700'
                                                : isDark ? 'bg-gray-500/10 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
                                                {user.isActive ? '● Active' : '○ Inactive'}
                                            </span>
                                        </td>
                                        <td className={`px-6 py-4 text-sm ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>
                                            {new Date(user.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <ActionsDropdown user={user} onRefresh={fetchData} isDark={isDark} />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className={`border-t px-6 py-3 flex justify-between items-center transition-colors ${isDark ? 'bg-dark-900/50 border-dark-700' : 'bg-gray-50 border-gray-200'}`}>
                    <button
                        disabled={page === 1}
                        onClick={() => setPage((p) => p - 1)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${isDark ? 'text-dark-300 hover:bg-dark-800' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                        ← Previous
                    </button>
                    <span className={`text-xs ${isDark ? 'text-dark-500' : 'text-gray-400'}`}>
                        Page {page} of {totalPages}
                    </span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage((p) => p + 1)}
                        className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${isDark ? 'text-dark-300 hover:bg-dark-800' : 'text-gray-600 hover:bg-gray-200'}`}
                    >
                        Next →
                    </button>
                </div>
            </div>

            <AddUserModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onUserAdded={fetchData} />
        </div>
    );
}