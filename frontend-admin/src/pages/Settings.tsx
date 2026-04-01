import { useState } from 'react';
import { User, Lock, Bell, Loader } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { usersApi } from '../services/api';
import { useThemeStore } from '../store/themeStore';

export default function Settings() {
    const { user } = useAuthStore();
    const { isDark } = useThemeStore();
    const [fullName, setFullName] = useState(user?.fullName || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<'success' | 'error'>('success');

    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');

    const [notifications, setNotifications] = useState({
        email: true,
        push: false,
        weekly: true,
    });

    const handleSaveProfile = async () => {
        setLoading(true);
        setMessage('');
        try {
            await usersApi.updateMe({ fullName });
            setMessage('✅ Profile updated successfully!');
            setMessageType('success');
        } catch (error: any) {
            setMessage('❌ Failed to update profile');
            setMessageType('error');
        } finally {
            setLoading(false);
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordMessage('❌ Passwords do not match');
            return;
        }

        if (passwordData.newPassword.length < 6) {
            setPasswordMessage('❌ New password must be at least 6 characters');
            return;
        }

        setPasswordLoading(true);
        setPasswordMessage('');
        try {
            await usersApi.changePassword(passwordData);
            setPasswordMessage('✅ Password changed successfully!');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            setPasswordMessage(error.response?.data?.message || '❌ Failed to change password');
        } finally {
            setPasswordLoading(false);
        }
    };

    return (
        <div className="max-w-3xl space-y-6">
            {/* Profile */}
            <div className={`rounded-lg p-6 transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-xl">👤</span>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Profile Settings</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>👤 Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className={`w-full px-3 py-2 rounded border transition-colors ${isDark ? 'bg-dark-900 border-dark-700 text-white placeholder-dark-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>📧 Email</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className={`w-full px-3 py-2 rounded border opacity-60 transition-colors ${isDark ? 'bg-dark-900 border-dark-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                        />
                        <p className={`text-xs mt-1 ${isDark ? 'text-dark-500' : 'text-gray-500'}`}>Email cannot be changed</p>
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>🎭 Role</label>
                        <input
                            type="text"
                            value={user?.role || 'viewer'}
                            disabled
                            className={`w-full px-3 py-2 rounded border opacity-60 capitalize transition-colors ${isDark ? 'bg-dark-900 border-dark-700 text-white' : 'bg-gray-50 border-gray-300 text-gray-900'}`}
                        />
                    </div>
                    {message && (
                        <div className={`p-3 rounded text-sm ${
                            messageType === 'success'
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                            {message}
                        </div>
                    )}
                    <button 
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className={`w-full py-2 rounded font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${isDark ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-primary-600 text-white hover:bg-primary-700'}`}>
                        {loading ? (
                            <>
                                <Loader className="w-4 h-4 animate-spin" />
                                Saving...
                            </>
                        ) : (
                            <>
                                💾 Save Changes
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Security - Password Change */}
            <div className={`rounded-lg p-6 transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-xl">🔐</span>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Security & Password</h3>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>🔒 Current Password</label>
                        <input 
                            type="password" 
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            className={`w-full px-3 py-2 rounded border transition-colors ${isDark ? 'bg-dark-900 border-dark-700 text-white placeholder-dark-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
                            placeholder="••••••••" 
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>🔑 New Password</label>
                        <input 
                            type="password" 
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            className={`w-full px-3 py-2 rounded border transition-colors ${isDark ? 'bg-dark-900 border-dark-700 text-white placeholder-dark-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
                            placeholder="••••••••" 
                        />
                    </div>
                    <div>
                        <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>✔️ Confirm New Password</label>
                        <input 
                            type="password" 
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            className={`w-full px-3 py-2 rounded border transition-colors ${isDark ? 'bg-dark-900 border-dark-700 text-white placeholder-dark-500' : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400'}`}
                            placeholder="••••••••" 
                        />
                    </div>
                    {passwordMessage && (
                        <div className={`p-3 rounded text-sm ${
                            passwordMessage.includes('✅')
                                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                                : 'bg-red-500/10 text-red-400 border border-red-500/20'
                        }`}>
                            {passwordMessage}
                        </div>
                    )}
                    <button 
                        onClick={handleChangePassword}
                        disabled={passwordLoading}
                        className={`w-full py-2 rounded font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2 ${isDark ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-primary-600 text-white hover:bg-primary-700'}`}>
                        {passwordLoading ? (
                            <>
                                <Loader className="w-4 h-4 animate-spin" />
                                Updating...
                            </>
                        ) : (
                            <>
                                🔄 Update Password
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Notifications */}
            <div className={`rounded-lg p-6 transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`}>
                <div className="flex items-center gap-3 mb-6">
                    <span className="text-xl">🔔</span>
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                </div>
                <div className="space-y-4">
                    {[
                        { key: 'email', label: '📧 Email Notifications', desc: 'Receive notifications via email' },
                        { key: 'push', label: '🔔 Push Notifications', desc: 'Receive push notifications in browser' },
                        { key: 'weekly', label: '📊 Weekly Digest', desc: 'Get a weekly summary of activity' },
                    ].map((item) => (
                        <div key={item.key} className={`flex items-center justify-between py-3 border-b ${isDark ? 'border-dark-800' : 'border-gray-200'} last:border-0`}>
                            <div>
                                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.label}</div>
                                <div className={`text-xs ${isDark ? 'text-dark-400' : 'text-gray-600'}`}>{item.desc}</div>
                            </div>
                            <button
                                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                                className={`w-11 h-6 rounded-full transition-colors ${notifications[item.key as keyof typeof notifications] ? 'bg-primary-600' : isDark ? 'bg-dark-700' : 'bg-gray-300'
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
