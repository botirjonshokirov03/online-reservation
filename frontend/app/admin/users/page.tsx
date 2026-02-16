'use client';

import { useEffect, useState } from 'react';
import { FiUsers, FiMail, FiCalendar } from 'react-icons/fi';
import api from '@/lib/api';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, [currentPage, search]);

    const fetchUsers = async () => {
        try {
            const response = await api.get(`/admin/users?page=${currentPage}&limit=10&search=${search}`);
            setUsers(response.data.users);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    Users
                </h1>
            </div>

            <div className="mb-6">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search users by name or email..."
                    className="w-full px-4 py-3 rounded-lg border"
                    style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text-primary)',
                    }}
                />
            </div>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="p-6 rounded-xl animate-pulse"
                            style={{ backgroundColor: 'var(--color-surface)' }}
                        >
                            <div className="h-20 bg-gray-300 rounded" />
                        </div>
                    ))}
                </div>
            ) : users.length === 0 ? (
                <div className="text-center py-12" style={{ backgroundColor: 'var(--color-surface)', borderRadius: '1rem' }}>
                    <FiUsers className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-text-tertiary)' }} />
                    <p className="text-xl" style={{ color: 'var(--color-text-secondary)' }}>
                        No users found
                    </p>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {users.map((user) => (
                            <div
                                key={user._id}
                                className="p-6 rounded-xl"
                                style={{ backgroundColor: 'var(--color-surface)' }}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div
                                            className="w-12 h-12 rounded-full flex items-center justify-center"
                                            style={{ backgroundColor: 'var(--color-primary)', opacity: 0.2 }}
                                        >
                                            <FiUsers className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                                {user.name}
                                            </h3>
                                            <p className="flex items-center space-x-2" style={{ color: 'var(--color-text-secondary)' }}>
                                                <FiMail className="w-4 h-4" />
                                                <span>{user.email}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span
                                            className="inline-block px-3 py-1 rounded-full text-sm font-medium mb-2"
                                            style={{
                                                backgroundColor: user.role === 'admin' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                                                color: user.role === 'admin' ? 'var(--color-primary)' : 'var(--color-success)',
                                            }}
                                        >
                                            {user.role}
                                        </span>
                                        <p className="flex items-center justify-end space-x-2" style={{ color: 'var(--color-text-secondary)' }}>
                                            <FiCalendar className="w-4 h-4" />
                                            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {totalPages > 1 && (
                        <div className="flex justify-center space-x-2 mt-6">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg"
                                style={{
                                    backgroundColor: 'var(--color-surface)',
                                    color: 'var(--color-text-primary)',
                                    opacity: currentPage === 1 ? 0.5 : 1,
                                }}
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2" style={{ color: 'var(--color-text-primary)' }}>
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 rounded-lg"
                                style={{
                                    backgroundColor: 'var(--color-surface)',
                                    color: 'var(--color-text-primary)',
                                    opacity: currentPage === totalPages ? 0.5 : 1,
                                }}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
