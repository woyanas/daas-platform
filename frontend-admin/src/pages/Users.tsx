import { useState, useEffect } from 'react';
import { Search, MoreVertical, UserPlus, Shield, Loader } from 'lucide-react';
import { usersApi } from '../services/api';

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

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [usersRes, statsRes] = await Promise.all([
                usersApi.getAll(page),
                usersApi.getStats().catch(() => ({ data: null })) // Handle non-admin error gracefully
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
            <div className="flex bg-dark-900 justify-center items-center h-64">
                <Loader className="w-8 h-8 text-primary-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-500" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-80 pl-10 pr-4 py-2 bg-dark-800 border border-dark-700 rounded-lg text-sm text-white placeholder-dark-500 focus:border-primary-500 outline-none"
                    />
                </div>
                <button className="btn-primary">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Add User
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
                <div className="card">
                    <div className="text-2xl font-bold text-white">{stats?.total || users.length}</div>
                    <div className="text-sm text-dark-400">Total Users</div>
                </div>
                <div className="card">
                    <div className="text-2xl font-bold text-green-400">{stats?.active || users.filter((u) => u.isActive).length}</div>
                    <div className="text-sm text-dark-400">Active Users</div>
                </div>
                <div className="card">
                    <div className="text-2xl font-bold text-red-400">{getRoleCount('admin')}</div>
                    <div className="text-sm text-dark-400">Admins</div>
                </div>
            </div>

            {/* Table */}
            <div className="card p-0 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-dark-800/50">
                            <tr>
                                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4">User</th>
                                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4">Role</th>
                                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4">Status</th>
                                <th className="text-left text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4">Joined</th>
                                <th className="text-right text-xs font-medium text-dark-400 uppercase tracking-wider px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-dark-800">
                            {filteredUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-dark-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center text-white font-medium">
                                                {user.fullName.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">{user.fullName}</div>
                                                <div className="text-sm text-dark-400">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium capitalize ${roleColors[user.role]}`}>
                                            <Shield className="w-3 h-3" />
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.isActive ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'
                                            }`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-dark-400">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 text-dark-400 hover:text-white transition-colors">
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-dark-400">
                                        No users found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {/* Pagination (Simple) */}
                <div className="border-t border-dark-800 px-6 py-3 flex justify-between items-center">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(p => p - 1)}
                        className="text-xs font-medium text-dark-400 hover:text-white disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-xs text-dark-500">Page {page} of {totalPages}</span>
                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(p => p + 1)}
                        className="text-xs font-medium text-dark-400 hover:text-white disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
