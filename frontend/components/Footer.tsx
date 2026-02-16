'use client';

import Link from 'next/link';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

export default function Footer() {
    return (
        <footer className="border-t mt-20" style={{
            backgroundColor: 'var(--surface)',
            borderColor: 'var(--border)'
        }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-2xl font-bold text-gradient mb-4">Tisky</h3>
                        <p style={{ color: 'var(--text-secondary)' }}>
                            Your premier destination for event tickets and unforgettable experiences.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                            Quick Links
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/app" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                    Buy Tickets
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                            Support
                        </h4>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="transition-colors" style={{ color: 'var(--text-secondary)' }}>
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
                            Follow Us
                        </h4>
                        <div className="flex space-x-4">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full transition-all hover:scale-110"
                                style={{
                                    backgroundColor: 'var(--surface-hover)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                <FiFacebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full transition-all hover:scale-110"
                                style={{
                                    backgroundColor: 'var(--surface-hover)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                <FiInstagram className="w-5 h-5" />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full transition-all hover:scale-110"
                                style={{
                                    backgroundColor: 'var(--surface-hover)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                <FiTwitter className="w-5 h-5" />
                            </a>
                            <a
                                href="https://youtube.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-full transition-all hover:scale-110"
                                style={{
                                    backgroundColor: 'var(--surface-hover)',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                <FiYoutube className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t text-center" style={{ borderColor: 'var(--border)' }}>
                    <p style={{ color: 'var(--text-secondary)' }}>
                        © {new Date().getFullYear()} Tisky. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
