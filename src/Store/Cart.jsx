// src/store/useCartStore.jsx
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: [],

  addToCart: (newItem) =>
    set((state) => {
      const existingIndex = state.cart.findIndex(
        (item) => item.variant.id === newItem.variant.id
      );

      if (existingIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingIndex].quantity += newItem.quantity;
        return { cart: updatedCart };
      }

      return { cart: [...state.cart, newItem] };
    }), 

    removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.variant.id !== id),
    })),

    updateQuantity: (id, quantity) =>
    set((state) => ({
      cart: state.cart.map((item) =>
        item.variant.id === id ? { ...item, quantity } : item
      ),
    })),
    selectedCategory: null,
    setSelectedCategory: (category) => {
      set({ selectedCategory: category })},
    clearSelectedCategory: () => set({ selectedCategory: null }),

    clearCart: () => set({ cart: [] }),
}));

export default useCartStore;