import { useState } from 'react';
import { X, Loader } from 'lucide-react';
import { usersApi } from '../../services/api';

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserAdded: () => void;
}

export default function AddUserModal({ isOpen, onClose, onUserAdded }: AddUserModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    role: 'viewer',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await usersApi.create(formData);
      setFormData({ email: '', fullName: '', password: '', role: 'viewer' });
      onUserAdded();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-dark-900 rounded-lg p-6 w-full max-w-md border border-dark-800">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white flex items-center gap-2">
            👤 Add New User
          </h2>
          <button onClick={onClose} className="text-dark-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded text-white placeholder-dark-500 focus:border-primary-500 outline-none"
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded text-white placeholder-dark-500 focus:border-primary-500 outline-none"
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded text-white placeholder-dark-500 focus:border-primary-500 outline-none"
              placeholder="••••••••"
              minLength={6}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-3 py-2 bg-dark-800 border border-dark-700 rounded text-white focus:border-primary-500 outline-none"
            >
              <option value="viewer">👁️ Viewer</option>
              <option value="editor">✏️ Editor</option>
              <option value="admin">👑 Admin</option>
            </select>
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-dark-800 hover:bg-dark-700 text-white rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  ✨ Create User
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
