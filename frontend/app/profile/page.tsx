'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import { FiUser, FiMail, FiPhone, FiCalendar, FiMapPin } from 'react-icons/fi';
import Image from 'next/image';

interface Transaction {
    _id: string;
    ceremony: {
        title: string;
        date: string;
        location: string;
        image: string;
    };
    tickets: Array<{
        ticket: {
            type: string;
            section: string;
            row: string;
        };
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    status: string;
    transactionId: string;
    createdAt: string;
}

export default function ProfilePage() {
    const router = useRouter();
    const { isAuthenticated, user } = useAuthStore();
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        fetchTransactions();
    }, [isAuthenticated, router]);

    const fetchTransactions = async () => {
        try {
            const response = await api.get('/transactions/my-transactions');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated || !user) {
        return null;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
                My Profile
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="p-8 rounded-2xl" style={{ backgroundColor: 'var(--surface)' }}>
                    <div className="text-center mb-6">
                        <div
                            className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center"
                            style={{ backgroundColor: 'var(--primary)', opacity: 0.2 }}
                        >
                            <FiUser className="w-12 h-12" style={{ color: 'var(--primary)' }} />
                        </div>
                        <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                            {user.name}
                        </h2>
                        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                            {user.role === 'admin' ? 'Administrator' : 'Member'}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <FiMail className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                            <span style={{ color: 'var(--text-primary)' }}>{user.email}</span>
                        </div>
                        {user.phone && (
                            <div className="flex items-center space-x-3">
                                <FiPhone className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
                                <span style={{ color: 'var(--text-primary)' }}>{user.phone}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-2">
                    <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                        My Tickets
                    </h2>

                    {loading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="p-6 rounded-2xl animate-pulse"
                                    style={{ backgroundColor: 'var(--surface)' }}
                                >
                                    <div className="h-6 bg-gray-300 rounded mb-4" />
                                    <div className="h-4 bg-gray-300 rounded w-2/3" />
                                </div>
                            ))}
                        </div>
                    ) : transactions.length > 0 ? (
                        <div className="space-y-4">
                            {transactions.map((transaction) => (
                                <div
                                    key={transaction._id}
                                    className="p-6 rounded-2xl"
                                    style={{ backgroundColor: 'var(--surface)' }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                            <Image
                                                src={transaction.ceremony.image || '/images/ceremony-placeholder.png'}
                                                alt={transaction.ceremony.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        <div className="flex-grow">
                                            <h3 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                                                {transaction.ceremony.title}
                                            </h3>
                                            <div className="space-y-1 mb-3">
                                                <div className="flex items-center space-x-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                    <FiCalendar className="w-4 h-4" />
                                                    <span>{new Date(transaction.ceremony.date).toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex items-center space-x-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                    <FiMapPin className="w-4 h-4" />
                                                    <span>{transaction.ceremony.location}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                {transaction.tickets.map((ticket, idx) => (
                                                    <p key={idx} className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                                                        {ticket.quantity}x {ticket.ticket.type} - ${ticket.price}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>
                                                Total
                                            </p>
                                            <p className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
                                                ${transaction.totalAmount}
                                            </p>
                                            <p
                                                className="text-xs mt-2 px-3 py-1 rounded-full inline-block"
                                                style={{
                                                    backgroundColor: transaction.status === 'completed' ? 'var(--success)' : 'var(--warning)',
                                                    color: 'white',
                                                    opacity: 0.9,
                                                }}
                                            >
                                                {transaction.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 rounded-2xl" style={{ backgroundColor: 'var(--surface)' }}>
                            <p className="text-xl mb-4" style={{ color: 'var(--text-secondary)' }}>
                                No tickets purchased yet
                            </p>
                            <button
                                onClick={() => router.push('/app')}
                                className="btn-primary"
                            >
                                Browse Events
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
