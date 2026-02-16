'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiMapPin, FiHeart, FiShoppingCart } from 'react-icons/fi';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { useWishlistStore } from '@/store/wishlistStore';

interface Ceremony {
    _id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    time: string;
    location: string;
    status: string;
}

export default function AppPage() {
    const [ceremonies, setCeremonies] = useState<Ceremony[]>([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuthStore();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();

    useEffect(() => {
        fetchCeremonies();
    }, []);

    const fetchCeremonies = async () => {
        try {
            const response = await api.get('/ceremonies');
            setCeremonies(response.data);
        } catch (error) {
            console.error('Error fetching ceremonies:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleWishlistToggle = (ceremony: Ceremony) => {
        if (!isAuthenticated) {
            alert('Please login to add items to wishlist');
            return;
        }

        if (isInWishlist(ceremony._id)) {
            removeFromWishlist(ceremony._id);
        } else {
            addToWishlist({
                ceremonyId: ceremony._id,
                ceremonyTitle: ceremony.title,
                ceremonyDate: ceremony.date,
                ceremonyImage: ceremony.image,
                ceremonyLocation: ceremony.location,
            });
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                    All Events
                </h1>
                <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                    Browse and book tickets for upcoming ceremonies
                </p>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className="rounded-2xl overflow-hidden animate-pulse" style={{ backgroundColor: 'var(--surface)' }}>
                            <div className="h-64 bg-gray-300" />
                            <div className="p-6">
                                <div className="h-6 bg-gray-300 rounded mb-4" />
                                <div className="h-4 bg-gray-300 rounded mb-2" />
                                <div className="h-4 bg-gray-300 rounded w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : ceremonies.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {ceremonies.map((ceremony) => (
                        <div
                            key={ceremony._id}
                            className="rounded-2xl overflow-hidden card-hover relative"
                            style={{ backgroundColor: 'var(--surface)' }}
                        >
                            <button
                                onClick={() => handleWishlistToggle(ceremony)}
                                className="absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md transition-all hover:scale-110"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    color: isInWishlist(ceremony._id) ? 'var(--secondary)' : 'var(--text-secondary)',
                                }}
                            >
                                <FiHeart className={`w-6 h-6 ${isInWishlist(ceremony._id) ? 'fill-current' : ''}`} />
                            </button>

                            <Link href={`/app/ceremony/${ceremony._id}`}>
                                <div className="relative h-64">
                                    <Image
                                        src={ceremony.image || '/images/ceremony-placeholder.png'}
                                        alt={ceremony.title}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                                        {ceremony.title}
                                    </h3>
                                    <p className="mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                                        {ceremony.description}
                                    </p>
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center space-x-2" style={{ color: 'var(--text-secondary)' }}>
                                            <FiCalendar className="w-4 h-4" />
                                            <span>{new Date(ceremony.date).toLocaleDateString()} at {ceremony.time}</span>
                                        </div>
                                        <div className="flex items-center space-x-2" style={{ color: 'var(--text-secondary)' }}>
                                            <FiMapPin className="w-4 h-4" />
                                            <span>{ceremony.location}</span>
                                        </div>
                                    </div>
                                    <button className="btn-primary w-full flex items-center justify-center space-x-2">
                                        <FiShoppingCart className="w-5 h-5" />
                                        <span>Buy Tickets</span>
                                    </button>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <p className="text-xl" style={{ color: 'var(--text-secondary)' }}>
                        No events available at the moment. Check back soon!
                    </p>
                </div>
            )}
        </div>
    );
}
