import api from './api';

export interface Ceremony {
    _id: string;
    title: string;
    description: string;
    image: string;
    date: string;
    time: string;
    location: string;
    venue: {
        _id: string;
        name: string;
        location: string;
        type: string;
    };
    sectionPricing: {
        _id: string;
        sectionName: string;
        price: number;
        availableTickets: number;
        soldTickets: number;
    }[];
    status: string;
}

export const getCeremonyById = async (id: string): Promise<Ceremony> => {
    try {
        const response = await api.get(`/ceremonies/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
