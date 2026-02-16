'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import ThemeToggle from './ThemeToggle';
import { FiShoppingCart, FiUser, FiLogOut, FiHeart } from 'react-icons/fi';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const { isAuthenticated, user, logout } = useAuthStore();
    const { getTotalItems } = useCartStore();
    const [showUserMenu, setShowUserMenu] = useState(false);

    const cartItemsCount = getTotalItems();

    const handleLogout = () => {
        logout();
        setShowUserMenu(false);
    };

    return (
        <nav className="sticky top-0 z-50 backdrop-blur-md border-b" style={{
            backgroundColor: 'rgba(var(--background-rgb, 255, 255, 255), 0.8)',
            borderColor: 'var(--border)'
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="text-2xl font-bold text-gradient">
                            Tisky
                        </Link>

                        <div className="hidden md:flex space-x-6">
                            <Link
                                href="/"
                                className={`transition-colors ${pathname === '/' ? 'font-semibold' : ''
                                    }`}
                                style={{ color: pathname === '/' ? 'var(--primary)' : 'var(--text-secondary)' }}
                            >
                                Home
                            </Link>
                            <Link
                                href="/app"
                                className={`transition-colors ${pathname === '/app' ? 'font-semibold' : ''
                                    }`}
                                style={{ color: pathname === '/app' ? 'var(--primary)' : 'var(--text-secondary)' }}
                            >
                                Buy Tickets
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        <ThemeToggle />

                        <Link
                            href="/cart"
                            className="relative p-2 rounded-full hover:bg-opacity-10 transition-all"
                            style={{
                                backgroundColor: 'transparent',
                                color: 'var(--text-primary)'
                            }}
                        >
                            <FiShoppingCart className="w-6 h-6" />
                            {cartItemsCount > 0 && (
                                <span
                                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-semibold"
                                    style={{ backgroundColor: 'var(--secondary)' }}
                                >
                                    {cartItemsCount}
                                </span>
                            )}
                        </Link>

                        {isAuthenticated ? (
                            <div className="relative">
                                <button
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-opacity-10 transition-all"
                                    style={{ color: 'var(--text-primary)' }}
                                >
                                    <FiUser className="w-6 h-6" />
                                    <span className="hidden md:block font-medium">{user?.name}</span>
                                </button>

                                {showUserMenu && (
                                    <div
                                        className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-2"
                                        style={{
                                            backgroundColor: 'var(--surface)',
                                            border: '1px solid var(--border)'
                                        }}
                                    >
                                        <Link
                                            href="/profile"
                                            className="flex items-center space-x-2 px-4 py-2 transition-colors"
                                            style={{ color: 'var(--text-primary)' }}
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <FiUser className="w-4 h-4" />
                                            <span>Profile</span>
                                        </Link>
                                        <Link
                                            href="/wishlist"
                                            className="flex items-center space-x-2 px-4 py-2 transition-colors"
                                            style={{ color: 'var(--text-primary)' }}
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            <FiHeart className="w-4 h-4" />
                                            <span>Wishlist</span>
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-2 px-4 py-2 w-full text-left transition-colors"
                                            style={{ color: 'var(--error)' }}
                                        >
                                            <FiLogOut className="w-4 h-4" />
                                            <span>Logout</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="btn-primary"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
