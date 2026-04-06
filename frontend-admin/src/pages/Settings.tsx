import { useState } from 'react';
import { User, Lock, Bell, Loader, Save, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
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
    const [passwordMessageType, setPasswordMessageType] = useState<'success' | 'error'>('success');

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
            setMessage('Profile updated successfully!');
            setMessageType('success');
        } catch {
            setMessage('Failed to update profile. Please try again.');
            setMessageType('error');
        } finally {
            setLoading(false);
            setTimeout(() => setMessage(''), 4000);
        }
    };

    const handleChangePassword = async () => {
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordMessage('Passwords do not match');
            setPasswordMessageType('error');
            return;
        }
        if (passwordData.newPassword.length < 6) {
            setPasswordMessage('New password must be at least 6 characters');
            setPasswordMessageType('error');
            return;
        }
        setPasswordLoading(true);
        setPasswordMessage('');
        try {
            await usersApi.changePassword(passwordData);
            setPasswordMessage('Password changed successfully!');
            setPasswordMessageType('success');
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error: any) {
            setPasswordMessage(error.response?.data?.message || 'Failed to change password. Please try again.');
            setPasswordMessageType('error');
        } finally {
            setPasswordLoading(false);
            setTimeout(() => setPasswordMessage(''), 5000);
        }
    };

    const sectionClass = `rounded-xl p-6 transition-colors border ${isDark ? 'bg-dark-800 border-dark-700' : 'bg-white border-gray-200'}`;
    const sectionHeaderClass = () => `flex items-center gap-3 mb-6 pb-4 border-b ${isDark ? 'border-dark-700' : 'border-gray-100'}`;

    return (
        <div className="max-w-3xl space-y-6">
            {/* Profile */}
            <div className={sectionClass}>
                <div className={sectionHeaderClass()}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'bg-primary-500/10' : 'bg-primary-50'}`}>
                        <User className={`w-4 h-4 ${isDark ? 'text-primary-400' : 'text-primary-600'}`} />
                    </div>
                    <div>
                        <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Profile Settings</h3>
                        <p className={`text-xs ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>Update your personal information</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="label">Full Name</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="input"
                            placeholder="Your full name"
                        />
                    </div>
                    <div>
                        <label className="label">Email Address</label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            disabled
                            className="input opacity-50 cursor-not-allowed"
                        />
                        <p className={`text-xs mt-1 ${isDark ? 'text-dark-500' : 'text-gray-400'}`}>Email cannot be changed</p>
                    </div>
                    <div>
                        <label className="label">Role</label>
                        <input
                            type="text"
                            value={user?.role || 'viewer'}
                            disabled
                            className="input opacity-50 cursor-not-allowed capitalize"
                        />
                    </div>

                    {message && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm border ${
                            messageType === 'success'
                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                            {messageType === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                            {message}
                        </div>
                    )}

                    <button
                        onClick={handleSaveProfile}
                        disabled={loading}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <><Loader className="w-4 h-4 animate-spin" /> Saving...</>
                        ) : (
                            <><Save className="w-4 h-4" /> Save Changes</>
                        )}
                    </button>
                </div>
            </div>

            {/* Security */}
            <div className={sectionClass}>
                <div className={sectionHeaderClass()}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'bg-primary-500/10' : 'bg-primary-50'}`}>
                        <Lock className={`w-4 h-4 ${isDark ? 'text-primary-400' : 'text-primary-600'}`} />
                    </div>
                    <div>
                        <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Security & Password</h3>
                        <p className={`text-xs ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>Manage your account security</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="label">Current Password</label>
                        <input
                            type="password"
                            value={passwordData.currentPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                            className="input"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="label">New Password</label>
                        <input
                            type="password"
                            value={passwordData.newPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                            className="input"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <label className="label">Confirm New Password</label>
                        <input
                            type="password"
                            value={passwordData.confirmPassword}
                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                            className="input"
                            placeholder="••••••••"
                        />
                    </div>

                    {passwordMessage && (
                        <div className={`flex items-center gap-2 p-3 rounded-lg text-sm border ${
                            passwordMessageType === 'success'
                                ? 'bg-green-500/10 text-green-500 border-green-500/20'
                                : 'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                            {passwordMessageType === 'success' ? <CheckCircle className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />}
                            {passwordMessage}
                        </div>
                    )}

                    <button
                        onClick={handleChangePassword}
                        disabled={passwordLoading}
                        className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                        {passwordLoading ? (
                            <><Loader className="w-4 h-4 animate-spin" /> Updating...</>
                        ) : (
                            <><RefreshCw className="w-4 h-4" /> Update Password</>
                        )}
                    </button>
                </div>
            </div>

            {/* Notifications */}
            <div className={sectionClass}>
                <div className={sectionHeaderClass()}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${isDark ? 'bg-primary-500/10' : 'bg-primary-50'}`}>
                        <Bell className={`w-4 h-4 ${isDark ? 'text-primary-400' : 'text-primary-600'}`} />
                    </div>
                    <div>
                        <h3 className={`text-base font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Notifications</h3>
                        <p className={`text-xs ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>Configure how you receive alerts</p>
                    </div>
                </div>

                <div className="space-y-1">
                    {[
                        { key: 'email', label: 'Email Notifications', desc: 'Receive notifications via email' },
                        { key: 'push', label: 'Push Notifications', desc: 'Receive push notifications in browser' },
                        { key: 'weekly', label: 'Weekly Digest', desc: 'Get a weekly summary of activity' },
                    ].map((item) => (
                        <div key={item.key} className={`flex items-center justify-between py-3.5 border-b last:border-0 ${isDark ? 'border-dark-700' : 'border-gray-100'}`}>
                            <div>
                                <div className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.label}</div>
                                <div className={`text-xs ${isDark ? 'text-dark-400' : 'text-gray-500'}`}>{item.desc}</div>
                            </div>
                            <button
                                onClick={() => setNotifications({ ...notifications, [item.key]: !notifications[item.key as keyof typeof notifications] })}
                                className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
                                    notifications[item.key as keyof typeof notifications]
                                        ? 'bg-primary-600'
                                        : isDark ? 'bg-dark-600' : 'bg-gray-300'
                                }`}
                                aria-label={`Toggle ${item.label}`}
                            >
                                <div
                                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                                        notifications[item.key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0.5'
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
