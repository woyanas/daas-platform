import { useEffect, useState } from 'react';
import { X, Loader } from 'lucide-react';

interface FieldDefinition {
  key: string;
  label: string;
  placeholder?: string;
  type?: 'text' | 'textarea' | 'password' | 'checkbox' | 'select';
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface AddServiceModalProps {
  isOpen: boolean;
  title: string;
  submitLabel: string;
  fields: FieldDefinition[];
  initialValues?: Record<string, any>;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => Promise<void>;
}

export default function AddServiceModal({
  isOpen,
  title,
  submitLabel,
  fields,
  initialValues = {},
  onClose,
  onSubmit,
}: AddServiceModalProps) {
  const [formValues, setFormValues] = useState<Record<string, any>>(initialValues);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setFormValues(initialValues);
  }, [initialValues]);

  const handleChange = (key: string, value: any) => {
    setFormValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(formValues);
      setFormValues(initialValues);
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-6">
      <div className="w-full max-w-lg rounded-2xl bg-dark-900 border border-dark-800 p-6 shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="text-dark-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.key}>
              <label className="block text-sm font-medium text-white mb-2">{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  value={formValues[field.key] ?? ''}
                  placeholder={field.placeholder}
                  onChange={(event) => handleChange(field.key, event.target.value)}
                  className="w-full min-h-[120px] rounded-xl border border-dark-700 bg-dark-900 px-4 py-3 text-sm text-white outline-none focus:border-primary-500"
                  required={field.required}
                />
              ) : field.type === 'select' ? (
                <select
                  value={formValues[field.key] ?? ''}
                  onChange={(event) => handleChange(field.key, event.target.value)}
                  className="w-full rounded-xl border border-dark-700 bg-dark-900 px-4 py-3 text-sm text-white outline-none focus:border-primary-500"
                  required={field.required}
                >
                  <option value="">Select {field.label}</option>
                  {field.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'checkbox' ? (
                <label className="inline-flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={Boolean(formValues[field.key])}
                    onChange={(event) => handleChange(field.key, event.target.checked)}
                    className="h-4 w-4 rounded border-dark-600 bg-dark-900 text-primary-500 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-300">{field.placeholder || field.label}</span>
                </label>
              ) : (
                <input
                  type={field.type || 'text'}
                  value={formValues[field.key] ?? ''}
                  placeholder={field.placeholder}
                  onChange={(event) => handleChange(field.key, event.target.value)}
                  className="w-full rounded-xl border border-dark-700 bg-dark-900 px-4 py-3 text-sm text-white outline-none focus:border-primary-500"
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-dark-700 bg-dark-800 px-4 py-3 text-sm font-medium text-white transition hover:bg-dark-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-primary-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-primary-500 disabled:opacity-60"
            >
              {loading ? (
                <span className="inline-flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  Saving...
                </span>
              ) : (
                submitLabel
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
