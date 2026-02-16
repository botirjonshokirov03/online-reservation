'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/store/adminStore';
import { FiMail, FiLock } from 'react-icons/fi';

export default function AdminLogin() {
    const router = useRouter();
    const { login } = useAdminStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            router.push('/admin');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
            <div className="w-full max-w-md p-8 rounded-2xl" style={{ backgroundColor: 'var(--color-surface)' }}>
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gradient mb-2">Tisky Admin</h1>
                    <p style={{ color: 'var(--color-text-secondary)' }}>Sign in to access the admin panel</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                        <div className="p-4 rounded-lg" style={{ backgroundColor: '#fee2e2', color: 'var(--color-error)' }}>
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                            Email
                        </label>
                        <div className="relative">
                            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--color-text-tertiary)' }} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-primary)',
                                }}
                                placeholder="admin@tisky.com"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                            Password
                        </label>
                        <div className="relative">
                            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: 'var(--color-text-tertiary)' }} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-primary)',
                                }}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </div>
    );
}
