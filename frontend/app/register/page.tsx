'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useAuthStore();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/register', formData);
            login(response.data, response.data.token);
            router.push('/app');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full p-8 rounded-2xl" style={{ backgroundColor: 'var(--surface)' }}>
                <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
                    Create Account
                </h1>

                {error && (
                    <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--error)', opacity: 0.1 }}>
                        <p style={{ color: 'var(--error)' }}>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>
                            Full Name
                        </label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
                            style={{
                                backgroundColor: 'var(--background)',
                                borderColor: 'var(--border)',
                                color: 'var(--text-primary)',
                            }}
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
                            style={{
                                backgroundColor: 'var(--background)',
                                borderColor: 'var(--border)',
                                color: 'var(--text-primary)',
                            }}
                            placeholder="your@email.com"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>
                            Phone
                        </label>
                        <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
                            style={{
                                backgroundColor: 'var(--background)',
                                borderColor: 'var(--border)',
                                color: 'var(--text-primary)',
                            }}
                            placeholder="+1234567890"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium" style={{ color: 'var(--text-primary)' }}>
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            minLength={6}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-3 rounded-lg border outline-none transition-all"
                            style={{
                                backgroundColor: 'var(--background)',
                                borderColor: 'var(--border)',
                                color: 'var(--text-primary)',
                            }}
                            placeholder="••••••••"
                        />
                        <p className="mt-1 text-sm" style={{ color: 'var(--text-tertiary)' }}>
                            Minimum 6 characters
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full"
                    >
                        {loading ? 'Creating account...' : 'Register'}
                    </button>
                </form>

                <p className="mt-6 text-center" style={{ color: 'var(--text-secondary)' }}>
                    Already have an account?{' '}
                    <Link href="/login" className="font-semibold" style={{ color: 'var(--primary)' }}>
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
