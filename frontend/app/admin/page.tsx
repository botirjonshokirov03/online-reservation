'use client';

import { useEffect, useState } from 'react';
import { FiUsers, FiCalendar, FiDollarSign } from 'react-icons/fi';
import api from '@/lib/api';

interface Stats {
    totalUsers: number;
    totalCeremonies: number;
    totalTickets: number;
    totalRevenue: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('/admin/stats');
            setStats(response.data.stats);
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            title: 'Total Users',
            value: stats?.totalUsers || 0,
            icon: FiUsers,
            color: 'var(--color-primary)',
            bgColor: 'rgba(99, 102, 241, 0.1)',
        },
        {
            title: 'Total Ceremonies',
            value: stats?.totalCeremonies || 0,
            icon: FiCalendar,
            color: 'var(--color-secondary)',
            bgColor: 'rgba(236, 72, 153, 0.1)',
        },
        {
            title: 'Total Tickets',
            value: stats?.totalTickets || 0,
            icon: FiDollarSign,
            color: 'var(--color-accent)',
            bgColor: 'rgba(245, 158, 11, 0.1)',
        },
        {
            title: 'Total Revenue',
            value: `$${stats?.totalRevenue.toLocaleString() || 0}`,
            icon: FiDollarSign,
            color: 'var(--color-success)',
            bgColor: 'rgba(16, 185, 129, 0.1)',
        },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>
                Dashboard
            </h1>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="p-6 rounded-xl animate-pulse"
                            style={{ backgroundColor: 'var(--color-surface)' }}
                        >
                            <div className="h-20 bg-gray-300 rounded" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div
                                key={card.title}
                                className="p-6 rounded-xl"
                                style={{ backgroundColor: 'var(--color-surface)' }}
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div
                                        className="w-12 h-12 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: card.bgColor }}
                                    >
                                        <Icon className="w-6 h-6" style={{ color: card.color }} />
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                    {card.value}
                                </h3>
                                <p style={{ color: 'var(--color-text-secondary)' }}>{card.title}</p>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
