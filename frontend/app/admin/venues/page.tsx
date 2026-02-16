'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiMapPin } from 'react-icons/fi';
import api from '@/lib/api';

interface Venue {
    _id: string;
    name: string;
    type: string;
    location: string;
    totalCapacity: number;
    sections: any[];
    status: string;
}

export default function VenuesPage() {
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = async () => {
        try {
            const response = await api.get('/venues');
            setVenues(response.data);
        } catch (error) {
            console.error('Error fetching venues:', error);
        } finally {
            setLoading(false);
        }
    };

    const deleteVenue = async (id: string) => {
        if (!confirm('Are you sure you want to delete this venue?')) return;

        try {
            await api.delete(`/venues/${id}`);
            fetchVenues();
        } catch (error) {
            console.error('Error deleting venue:', error);
        }
    };

    const getVenueTypeColor = (type: string) => {
        const colors: Record<string, string> = {
            stadium: 'var(--color-primary)',
            theater: 'var(--color-secondary)',
            palace: 'var(--color-accent)',
            arena: 'var(--color-success)',
            hall: 'var(--color-warning)',
        };
        return colors[type] || 'var(--color-primary)';
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold" style={{ color: 'var(--color-text-primary)' }}>
                    Venues
                </h1>
                <Link
                    href="/admin/venues/create"
                    className="btn-primary flex items-center space-x-2"
                >
                    <FiPlus />
                    <span>Create Venue</span>
                </Link>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="p-6 rounded-xl animate-pulse"
                            style={{ backgroundColor: 'var(--color-surface)' }}
                        >
                            <div className="h-40 bg-gray-300 rounded" />
                        </div>
                    ))}
                </div>
            ) : venues.length === 0 ? (
                <div className="text-center py-12" style={{ backgroundColor: 'var(--color-surface)', borderRadius: '1rem' }}>
                    <FiMapPin className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--color-text-tertiary)' }} />
                    <p className="text-xl mb-4" style={{ color: 'var(--color-text-secondary)' }}>
                        No venues yet
                    </p>
                    <Link href="/admin/venues/create" className="btn-primary">
                        Create Your First Venue
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {venues.map((venue) => (
                        <div
                            key={venue._id}
                            className="p-6 rounded-xl"
                            style={{ backgroundColor: 'var(--color-surface)' }}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold mb-1" style={{ color: 'var(--color-text-primary)' }}>
                                        {venue.name}
                                    </h3>
                                    <span
                                        className="inline-block px-3 py-1 rounded-full text-sm font-medium"
                                        style={{
                                            backgroundColor: `${getVenueTypeColor(venue.type)}20`,
                                            color: getVenueTypeColor(venue.type),
                                        }}
                                    >
                                        {venue.type}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2 mb-4">
                                <p style={{ color: 'var(--color-text-secondary)' }}>
                                    <FiMapPin className="inline w-4 h-4 mr-2" />
                                    {venue.location}
                                </p>
                                <p style={{ color: 'var(--color-text-secondary)' }}>
                                    Capacity: {venue.totalCapacity.toLocaleString()}
                                </p>
                                <p style={{ color: 'var(--color-text-secondary)' }}>
                                    Sections: {venue.sections.length}
                                </p>
                            </div>

                            <div className="flex space-x-2">
                                <Link
                                    href={`/admin/venues/edit/${venue._id}`}
                                    className="flex-1 px-4 py-2 rounded-lg text-center transition-all"
                                    style={{
                                        backgroundColor: 'var(--color-primary)',
                                        color: 'white',
                                    }}
                                >
                                    <FiEdit2 className="inline w-4 h-4 mr-2" />
                                    Edit
                                </Link>
                                <button
                                    onClick={() => deleteVenue(venue._id)}
                                    className="px-4 py-2 rounded-lg transition-all"
                                    style={{
                                        backgroundColor: '#fee2e2',
                                        color: 'var(--color-error)',
                                    }}
                                >
                                    <FiTrash2 className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
