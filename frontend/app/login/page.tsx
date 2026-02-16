'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuthStore();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await api.post('/auth/login', formData);
            login(response.data, response.data.token);
            router.push('/app');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4">
            <div className="max-w-md w-full p-8 rounded-2xl" style={{ backgroundColor: 'var(--surface)' }}>
                <h1 className="text-3xl font-bold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
                    Welcome Back
                </h1>

                {error && (
                    <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--error)', opacity: 0.1 }}>
                        <p style={{ color: 'var(--error)' }}>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                            Password
                        </label>
                        <input
                            type="password"
                            required
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
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary w-full"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                <p className="mt-6 text-center" style={{ color: 'var(--text-secondary)' }}>
                    Don't have an account?{' '}
                    <Link href="/register" className="font-semibold" style={{ color: 'var(--primary)' }}>
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
