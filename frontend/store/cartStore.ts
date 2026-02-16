import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CartItem {
    ticketId: string;
    ceremonyId: string;
    ceremonyTitle: string;
    ticketType: string;
    price: number;
    quantity: number;
    ceremonyDate: string;
    ceremonyImage: string;
}

interface CartState {
    items: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (ticketId: string) => void;
    updateQuantity: (ticketId: string, quantity: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalItems: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addToCart: (item) =>
                set((state) => {
                    const existingItem = state.items.find(
                        (i) => i.ticketId === item.ticketId
                    );
                    if (existingItem) {
                        return {
                            items: state.items.map((i) =>
                                i.ticketId === item.ticketId
                                    ? { ...i, quantity: i.quantity + item.quantity }
                                    : i
                            ),
                        };
                    }
                    return { items: [...state.items, item] };
                }),
            removeFromCart: (ticketId) =>
                set((state) => ({
                    items: state.items.filter((item) => item.ticketId !== ticketId),
                })),
            updateQuantity: (ticketId, quantity) =>
                set((state) => ({
                    items: state.items.map((item) =>
                        item.ticketId === ticketId ? { ...item, quantity } : item
                    ),
                })),
            clearCart: () => set({ items: [] }),
            getTotalPrice: () => {
                const state = get();
                return state.items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },
            getTotalItems: () => {
                const state = get();
                return state.items.reduce((total, item) => total + item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
