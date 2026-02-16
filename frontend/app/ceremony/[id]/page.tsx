'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getCeremonyById, Ceremony } from '@/lib/ceremony';

export default function CeremonyPage() {
    const params = useParams();
    const id = params.id as string;
    const [ceremony, setCeremony] = useState<Ceremony | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCeremony = async () => {
            try {
                const data = await getCeremonyById(id);
                setCeremony(data);
            } catch (err: any) {
                setError(err.response?.data?.message || 'Failed to load ceremony');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchCeremony();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <main className="flex-grow flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
                </main>
            </div>
        );
    }

    if (error || !ceremony) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <main className="flex-grow container mx-auto px-4 py-12 text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">Error</h1>
                    <p className="text-red-600">{error || 'Ceremony not found'}</p>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">

            <main className="flex-grow">
                {/* Hero Section */}
                <div className="relative h-[400px] w-full">
                    <Image
                        src={ceremony.image}
                        alt={ceremony.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-center text-white p-4">
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">{ceremony.title}</h1>
                            <p className="text-xl md:text-2xl font-light">
                                {new Date(ceremony.date).toLocaleDateString()} • {ceremony.time}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-8">
                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-semibold mb-4 text-indigo-600">About the Event</h2>
                                <p className="text-gray-700 leading-relaxed text-lg">
                                    {ceremony.description}
                                </p>
                            </section>

                            <section className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-semibold mb-4 text-indigo-600">Venue Details</h2>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-medium text-gray-900">{ceremony.venue.name}</h3>
                                    <p className="text-gray-600 flex items-center">
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        {ceremony.location}
                                    </p>
                                    <span className="inline-block bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded-full uppercase tracking-wide">
                                        {ceremony.venue.type}
                                    </span>
                                </div>
                            </section>
                        </div>

                        {/* Sidebar / Tickets */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-lg shadow-lg border border-indigo-100 sticky top-24">
                                <h2 className="text-2xl font-semibold mb-6 text-gray-900 border-b pb-2">Get Tickets</h2>

                                <div className="space-y-4">
                                    {ceremony.sectionPricing.map((section) => (
                                        <div
                                            key={section._id}
                                            className="border rounded-lg p-4 hover:border-indigo-300 transition-colors"
                                        >
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="font-semibold text-lg text-gray-800">{section.sectionName}</h3>
                                                    <p className="text-sm text-gray-500">
                                                        {section.availableTickets > 0
                                                            ? `${section.availableTickets} tickets remaining`
                                                            : <span className="text-red-500 font-medium">Sold Out</span>
                                                        }
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="block text-xl font-bold text-indigo-600">
                                                        ${section.price}
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                className={`w-full py-2 px-4 rounded-md font-medium transition-transform active:scale-95 ${section.availableTickets > 0
                                                    ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md hover:shadow-lg'
                                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                                    }`}
                                                disabled={section.availableTickets === 0}
                                                onClick={() => {
                                                    // Add to cart logic will go here
                                                    alert(`Added ${section.sectionName} ticket to cart (feature coming soon)`);
                                                }}
                                            >
                                                {section.availableTickets > 0 ? 'Add to Cart' : 'Unavailable'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
