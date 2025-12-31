import { useState } from 'react';
import { User, Lock, Bell, Palette } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export default function Settings() {
    const { user } = useAuthStore();
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        weekly: true,
    });

    return (
        <div className="max-w-3xl space-y-6">
            {/* Profile */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <User className="w-5 h-5 text-primary-400" />
                    <h3 className="text-lg font-semibold text-white">Profile Settings</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="label">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="input"
                        />
                    </div>
                    <div>
                        <label className="label">Email</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="input opacity-60"
                        />
                        <p className="text-xs text-dark-500 mt-1">Email cannot be changed</p>
                    </div>
                    <div>
                        <label className="label">Role</label>
                        <input
                            type="text"
                            value={user?.role || 'viewer'}
                            disabled
                            className="input opacity-60 capitalize"
                        />
                    </div>
                    <button className="btn-primary">Save Changes</button>
                </div>
            </div>

            {/* Security */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <Lock className="w-5 h-5 text-primary-400" />
                    <h3 className="text-lg font-semibold text-white">Security</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="label">Current Password</label>
                        <input type="password" className="input" placeholder="••••••••" />
                    </div>
                    <div>
                        <label className="label">New Password</label>
                        <input type="password" className="input" placeholder="••••••••" />
                    </div>
                    <div>
                        <label className="label">Confirm New Password</label>
                        <input type="password" className="input" placeholder="••••••••" />
                    </div>
                    <button className="btn-primary">Update Password</button>
                </div>
            </div>

            {/* Notifications */}
            <div className="card">
                <div className="flex items-center gap-3 mb-6">
                    <Bell className="w-5 h-5 text-primary-400" />
                    <h3 className="text-lg font-semibold text-white">Notifications</h3>
                </div>
                <div className="space-y-4">
                    {[
                        { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
                        { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications in browser' },
                        { key: 'weekly', label: 'Weekly Digest', desc: 'Get a weekly summary of activity' },
                    ].map((item) => (
                        <div key={item.key} className="flex items-center justify-between py-3 border-b border-dark-800 last:border-0">
                            <div>
                                <div className="text-sm font-medium text-white">{item.label}</div>
                                <div className="text-xs text-dark-400">{item.desc}</div>
                            </div>
                            <button
                                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                                className={`w-11 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-primary-600' : 'bg-dark-700'
                                    }`}
                            >
                                <div
                                    className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${notifications[item.key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0.5'
                                        }`}
                                />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
