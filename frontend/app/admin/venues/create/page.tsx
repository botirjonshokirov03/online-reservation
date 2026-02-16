'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiPlus, FiTrash2 } from 'react-icons/fi';
import api from '@/lib/api';

interface Section {
    name: string;
    capacity: number;
    basePrice: number;
    color: string;
}

export default function CreateVenue() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        type: 'stadium',
        location: '',
        description: '',
        totalCapacity: 0,
    });
    const [sections, setSections] = useState<Section[]>([
        { name: 'VIP', capacity: 100, basePrice: 150, color: '#6366f1' },
        { name: 'Premium', capacity: 200, basePrice: 100, color: '#ec4899' },
        { name: 'Standard', capacity: 500, basePrice: 50, color: '#f59e0b' },
    ]);

    const addSection = () => {
        setSections([...sections, { name: '', capacity: 0, basePrice: 0, color: '#6366f1' }]);
    };

    const removeSection = (index: number) => {
        setSections(sections.filter((_, i) => i !== index));
    };

    const updateSection = (index: number, field: keyof Section, value: any) => {
        const updated = [...sections];
        updated[index] = { ...updated[index], [field]: value };
        setSections(updated);
    };

    const calculateTotalCapacity = () => {
        return sections.reduce((sum, section) => sum + Number(section.capacity), 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const totalCapacity = calculateTotalCapacity();
            await api.post('/venues', {
                ...formData,
                totalCapacity,
                sections,
            });
            router.push('/admin/venues');
        } catch (error) {
            console.error('Error creating venue:', error);
            alert('Failed to create venue');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--color-text-primary)' }}>
                Create Venue
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-surface)' }}>
                    <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--color-text-primary)' }}>
                        Basic Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                Venue Name
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                                Type
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-4 py-3 rounded-lg border"
                                style={{
                                    backgroundColor: 'var(--background)',
                                    borderColor: 'var(--color-border)',
                                    color: 'var(--color-text-primary)',
                                }}
                            >
                                <option value="stadium">Stadium</option>
                                <option value="theater">Theater</option>
                                <option value="palace">Palace</option>
                                <option value="arena">Arena</option>
                                <option value="hall">Hall</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block mb-2 font-medium" style={{ color: 'var(--color-text-primary)' }}>
                                Location
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
                            />
                        </div>
                    </div>
                </div>

                <div className="p-6 rounded-xl" style={{ backgroundColor: 'var(--color-surface)' }}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            Sections
                        </h2>
                        <button
                            type="button"
                            onClick={addSection}
                            className="btn-primary flex items-center space-x-2"
                        >
                            <FiPlus />
                            <span>Add Section</span>
                        </button>
                    </div>

                    <div className="space-y-4">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="p-4 rounded-lg border"
                                style={{ borderColor: 'var(--color-border)' }}
                            >
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                                    <div>
                                        <label className="block mb-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={section.name}
                                            onChange={(e) => updateSection(index, 'name', e.target.value)}
                                            className="w-full px-3 py-2 rounded border"
                                            style={{
                                                backgroundColor: 'var(--background)',
                                                borderColor: 'var(--color-border)',
                                                color: 'var(--color-text-primary)',
                                            }}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                            Capacity
                                        </label>
                                        <input
                                            type="number"
                                            value={section.capacity}
                                            onChange={(e) => updateSection(index, 'capacity', parseInt(e.target.value))}
                                            className="w-full px-3 py-2 rounded border"
                                            style={{
                                                backgroundColor: 'var(--background)',
                                                borderColor: 'var(--color-border)',
                                                color: 'var(--color-text-primary)',
                                            }}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                            Base Price ($)
                                        </label>
                                        <input
                                            type="number"
                                            value={section.basePrice}
                                            onChange={(e) => updateSection(index, 'basePrice', parseFloat(e.target.value))}
                                            className="w-full px-3 py-2 rounded border"
                                            style={{
                                                backgroundColor: 'var(--background)',
                                                borderColor: 'var(--color-border)',
                                                color: 'var(--color-text-primary)',
                                            }}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm" style={{ color: 'var(--color-text-secondary)' }}>
                                            Color
                                        </label>
                                        <input
                                            type="color"
                                            value={section.color}
                                            onChange={(e) => updateSection(index, 'color', e.target.value)}
                                            className="w-full h-10 rounded border cursor-pointer"
                                            style={{ borderColor: 'var(--color-border)' }}
                                        />
                                    </div>

                                    <div className="flex items-end">
                                        <button
                                            type="button"
                                            onClick={() => removeSection(index)}
                                            className="w-full px-3 py-2 rounded transition-all"
                                            style={{
                                                backgroundColor: '#fee2e2',
                                                color: 'var(--color-error)',
                                            }}
                                        >
                                            <FiTrash2 className="inline w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'var(--background)' }}>
                        <p className="text-lg font-semibold" style={{ color: 'var(--color-text-primary)' }}>
                            Total Capacity: {calculateTotalCapacity().toLocaleString()}
                        </p>
                    </div>
                </div>

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="btn-primary px-8 py-3"
                    >
                        {loading ? 'Creating...' : 'Create Venue'}
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
