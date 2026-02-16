'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';
import { FiTrash2, FiMinus, FiPlus } from 'react-icons/fi';
import { useState } from 'react';
import api from '@/lib/api';

export default function CartPage() {
    const router = useRouter();
    const { items, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useCartStore();
    const { isAuthenticated } = useAuthStore();
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        if (!isAuthenticated) {
            alert('Please login to complete your purchase');
            router.push('/login');
            return;
        }

        setLoading(true);
        try {
            const groupedByEvent = items.reduce((acc, item) => {
                if (!acc[item.ceremonyId]) {
                    acc[item.ceremonyId] = [];
                }
                acc[item.ceremonyId].push({
                    ticket: item.ticketId,
                    quantity: item.quantity,
                });
                return acc;
            }, {} as Record<string, any[]>);

            for (const [ceremonyId, tickets] of Object.entries(groupedByEvent)) {
                await api.post('/transactions', {
                    ceremony: ceremonyId,
                    tickets,
                    paymentMethod: 'online',
                });
            }

            clearCart();
            alert('Purchase successful! Check your profile for tickets.');
            router.push('/profile');
        } catch (error: any) {
            alert(error.response?.data?.message || 'Purchase failed');
        } finally {
            setLoading(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="text-center py-20">
                    <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                        Your Cart is Empty
                    </h1>
                    <p className="text-xl mb-8" style={{ color: 'var(--text-secondary)' }}>
                        Start adding some tickets to your cart!
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
                Shopping Cart
            </h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div
                            key={item.ticketId}
                            className="p-6 rounded-2xl flex items-center space-x-4"
                            style={{ backgroundColor: 'var(--surface)' }}
                        >
                            <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                                <Image
                                    src={item.ceremonyImage || '/images/ceremony-placeholder.png'}
                                    alt={item.ceremonyTitle}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-grow">
                                <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                                    {item.ceremonyTitle}
                                </h3>
                                <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>
                                    {item.ticketType} • {new Date(item.ceremonyDate).toLocaleDateString()}
                                </p>
                                <p className="font-semibold" style={{ color: 'var(--primary)' }}>
                                    ${item.price}
                                </p>
                            </div>

                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => updateQuantity(item.ticketId, Math.max(1, item.quantity - 1))}
                                    className="p-2 rounded-lg transition-colors"
                                    style={{ backgroundColor: 'var(--surface-hover)' }}
                                >
                                    <FiMinus className="w-4 h-4" />
                                </button>
                                <span className="font-semibold w-8 text-center" style={{ color: 'var(--text-primary)' }}>
                                    {item.quantity}
                                </span>
                                <button
                                    onClick={() => updateQuantity(item.ticketId, item.quantity + 1)}
                                    className="p-2 rounded-lg transition-colors"
                                    style={{ backgroundColor: 'var(--surface-hover)' }}
                                >
                                    <FiPlus className="w-4 h-4" />
                                </button>
                            </div>

                            <button
                                onClick={() => removeFromCart(item.ticketId)}
                                className="p-2 rounded-lg transition-colors"
                                style={{ color: 'var(--error)' }}
                            >
                                <FiTrash2 className="w-5 h-5" />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="lg:col-span-1">
                    <div className="p-6 rounded-2xl sticky top-24" style={{ backgroundColor: 'var(--surface)' }}>
                        <h2 className="text-2xl font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
                            Order Summary
                        </h2>

                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between">
                                <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                                    ${getTotalPrice().toFixed(2)}
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span style={{ color: 'var(--text-secondary)' }}>Service Fee</span>
                                <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                                    $0.00
                                </span>
                            </div>
                            <div className="border-t pt-4" style={{ borderColor: 'var(--border)' }}>
                                <div className="flex justify-between text-xl">
                                    <span className="font-bold" style={{ color: 'var(--text-primary)' }}>Total</span>
                                    <span className="font-bold" style={{ color: 'var(--primary)' }}>
                                        ${getTotalPrice().toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleCheckout}
                            disabled={loading}
                            className="btn-primary w-full"
                        >
                            {loading ? 'Processing...' : 'Proceed to Checkout'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
