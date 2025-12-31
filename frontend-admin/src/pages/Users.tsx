import { useState } from 'react';
import { Search, MoreVertical, UserPlus, Shield } from 'lucide-react';

interface User {
    id: string;
    fullName: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
    isActive: boolean;
    createdAt: string;
}

const mockUsers: User[] = [
    { id: '1', fullName: 'John Doe', email: 'john@example.com', role: 'admin', isActive: true, createdAt: '2024-01-15' },
    { id: '2', fullName: 'Sarah Chen', email: 'sarah@example.com', role: 'editor', isActive: true, createdAt: '2024-02-20' },
    { id: '3', fullName: 'Mike Wilson', email: 'mike@example.com', role: 'viewer', isActive: true, createdAt: '2024-03-10' },
    { id: '4', fullName: 'Emily Brown', email: 'emily@example.com', role: 'editor', isActive: false, createdAt: '2024-03-25' },
    { id: '5', fullName: 'Alex Johnson', email: 'alex@example.com', role: 'viewer', isActive: true, createdAt: '2024-04-01' },
];

const roleColors = {
    admin: 'bg-red-500/10 text-red-400',
    editor: 'bg-blue-500/10 text-blue-400',
    viewer: 'bg-gray-500/10 text-gray-400',
};

export default function Users() {
    const [users] = useState<User[]>(mockUsers);
    const [search, setSearch] = useState('');

    const filteredUsers = users.filter(
        (user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
    );

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
                    <div className="text-2xl font-bold text-white">{users.length}</div>
                    <div className="text-sm text-dark-400">Total Users</div>
                </div>
                <div className="card">
                    <div className="text-2xl font-bold text-green-400">{users.filter((u) => u.isActive).length}</div>
                    <div className="text-sm text-dark-400">Active Users</div>
                </div>
                <div className="card">
                    <div className="text-2xl font-bold text-red-400">{users.filter((u) => u.role === 'admin').length}</div>
                    <div className="text-sm text-dark-400">Admins</div>
                </div>
            </div>

            {/* Table */}
            <div className="card p-0 overflow-hidden">
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
                    </tbody>
                </table>
            </div>
        </div>
    );
}
