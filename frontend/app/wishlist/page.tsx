'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useWishlistStore } from '@/store/wishlistStore';
import { useAuthStore } from '@/store/authStore';
import { FiTrash2, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useEffect } from 'react';

export default function WishlistPage() {
    const router = useRouter();
    const { items, removeFromWishlist } = useWishlistStore();
    const { isAuthenticated } = useAuthStore();

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) {
        return null;
    }

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center py-20">
                    <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                        Your Wishlist is Empty
                    </h1>
                    <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
                        Start adding events you're interested in!
                    </p>
                    <button
                        onClick={() => router.push('/app')}
                        className="btn-primary"
                    >
                        Browse Events
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>
                My Wishlist
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {items.map((item) => (
                    <div
                        key={item.ceremonyId}
                        className="rounded-2xl overflow-hidden card-hover relative"
                        style={{ backgroundColor: 'var(--surface)' }}
                    >
                        <button
                            onClick={() => removeFromWishlist(item.ceremonyId)}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full backdrop-blur-md transition-all hover:scale-110"
                            style={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                color: 'var(--error)',
                            }}
                        >
                            <FiTrash2 className="w-5 h-5" />
                        </button>

                        <div
                            onClick={() => router.push(`/ceremony/${item.ceremonyId}`)}
                            className="cursor-pointer"
                        >
                            <div className="relative h-64">
                                <Image
                                    src={item.ceremonyImage || '/images/ceremony-placeholder.png'}
                                    alt={item.ceremonyTitle}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                                    {item.ceremonyTitle}
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2" style={{ color: 'var(--text-secondary)' }}>
                                        <FiCalendar className="w-4 h-4" />
                                        <span>{new Date(item.ceremonyDate).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center space-x-2" style={{ color: 'var(--text-secondary)' }}>
                                        <FiMapPin className="w-4 h-4" />
                                        <span>{item.ceremonyLocation}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
