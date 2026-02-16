import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistItem {
    ceremonyId: string;
    ceremonyTitle: string;
    ceremonyDate: string;
    ceremonyImage: string;
    ceremonyLocation: string;
}

interface WishlistState {
    items: WishlistItem[];
    addToWishlist: (item: WishlistItem) => void;
    removeFromWishlist: (ceremonyId: string) => void;
    isInWishlist: (ceremonyId: string) => boolean;
    clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],
            addToWishlist: (item) =>
                set((state) => {
                    const exists = state.items.find((i) => i.ceremonyId === item.ceremonyId);
                    if (exists) return state;
                    return { items: [...state.items, item] };
                }),
            removeFromWishlist: (ceremonyId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.ceremonyId !== ceremonyId),
                })),
            isInWishlist: (ceremonyId) => {
                const state = get();
                return state.items.some((item) => item.ceremonyId === ceremonyId);
            },
            clearWishlist: () => set({ items: [] }),
        }),
        {
            name: 'wishlist-storage',
        }
    )
);
