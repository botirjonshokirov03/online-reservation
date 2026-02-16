'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiCalendar, FiMapPin } from 'react-icons/fi';
import api from '@/lib/api';

interface Venue {
    _id: string;
    name: string;
    type: string;
    sections: Array<{
        _id: string;
        name: string;
        capacity: number;
        basePrice: number;
    }>;
}

interface SectionPricing {
    sectionId: string;
    sectionName: string;
    price: number;
    availableTickets: number;
}

export default function CeremoniesPage() {
    const router = useRouter();
    const [venues, setVenues] = useState<Venue[]>([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: '',
        date: '',
        time: '',
        location: '',
        venue: '',
    });
    const [sectionPricing, setSectionPricing] = useState<SectionPricing[]>([]);
    const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);

    useEffect(() => {
        fetchVenues();
    }, []);

    const fetchVenues = async () => {
        try {
            const response = await api.get('/venues');
            setVenues(response.data);
        } catch (error) {
            console.error('Error fetching venues:', error);
        }
    };

    const handleVenueChange = (venueId: string) => {
        const venue = venues.find((v) => v._id === venueId);
        setSelectedVenue(venue || null);
        setFormData({ ...formData, venue: venueId, location: venue?.name || '' });

        if (venue) {
            const pricing = venue.sections.map((section) => ({
                sectionId: section._id,
                sectionName: section.name,
                price: section.basePrice,
                availableTickets: section.capacity,
            }));
            setSectionPricing(pricing);
        } else {
            setSectionPricing([]);
        }
    };

    const updateSectionPrice = (index: number, price: number) => {
        const updated = [...sectionPricing];
        updated[index].price = price;
        setSectionPricing(updated);
    };

    const calculateTotalTickets = () => {
        return sectionPricing.reduce((sum, section) => sum + section.availableTickets, 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const totalTickets = calculateTotalTickets();
            await api.post('/ceremonies', {
                ...formData,
                sectionPricing,
                maxAttendees: totalTickets,
            });
            alert('Ceremony created successfully!');
            router.push('/admin');
        } catch (error) {
            console.error('Error creating ceremony:', error);
            alert('Failed to create ceremony');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>
                Create Ceremony
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-surface)' }}>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                Title
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-primary)',
                                }}
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-primary)',
                                }}
                                rows={3}
                                required
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                Image URL
                            </label>
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-primary)',
                                }}
                                placeholder="/images/ceremony-placeholder.png"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                Date
                            </label>
                            <input
                                type="date"
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-primary)',
                                }}
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                Time
                            </label>
                            <input
                                type="time"
                                value={formData.time}
                                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-primary)',
                                }}
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-surface)' }}>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                        Venue & Pricing
                    </h2>

                    <div className="mb-4">
                        <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                            Select Venue
                        </label>
                        <select
                            value={formData.venue}
                            onChange={(e) => handleVenueChange(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border"
                            style={{
                                backgroundColor: 'var(--background)',
                                borderColor: 'var(--color-border)',
                                color: 'var(--color-text-primary)',
                            }}
                            required
                        >
                            <option value="">Choose a venue...</option>
                            {venues.map((venue) => (
                                <option key={venue._id} value={venue._id}>
                                    {venue.name} ({venue.type})
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedVenue && (
                        <div className="space-y-4">
                            <h3 className="font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                Section Pricing
                            </h3>
                            {sectionPricing.map((section, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-lg border"
                                    style={{ borderColor: 'var(--color-border)' }}
                                >
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <label className="block mb-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                                Section
                                            </label>
                                            <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                                {section.sectionName}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                                Available Tickets
                                            </label>
                                            <p className="font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                                {section.availableTickets}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="block mb-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                                Price ($)
                                            </label>
                                            <input
                                                type="number"
                                                value={section.price}
                                                onChange={(e) => updateSectionPrice(index, parseFloat(e.target.value))}
                                                className="w-full px-3 py-2 rounded border"
                                                style={{
                                                    backgroundColor: 'var(--background)',
                                                    borderColor: 'var(--color-border)',
                                                    color: 'var(--color-text-primary)',
                                                }}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}

                            <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
                                <p className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                                    Total Available Tickets: {calculateTotalTickets().toLocaleString()}
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={loading || !selectedVenue}
                        className="btn-primary px-8 py-3"
                    >
                        {loading ? 'Creating...' : 'Create Ceremony'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-8 py-3 rounded-lg"
                        style={{
                            backgroundColor: 'var(--color-surface)',
                            color: 'var(--color-text-primary)',
                        }}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
