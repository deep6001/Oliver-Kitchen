// // src/store/useCartStore.jsx
// import { create } from 'zustand';

// export const useCartStore = create((set) => ({
//   cart: [],

//   addToCart: (newItem) =>
//     set((state) => {
//       const existingIndex = state.cart.findIndex(
//         (item) => item.variant.id === newItem.variant.id
//       );

//       if (existingIndex !== -1) {
//         const updatedCart = [...state.cart];
//         updatedCart[existingIndex].quantity += newItem.quantity;
//         return { cart: updatedCart };
//       }

//       return { cart: [...state.cart, newItem] };
//     }), 


//     removeFromCart: (id) =>
//     set((state) => ({
//       cart: state.cart.filter((item) => item.variant.id !== id),
//     })),



//     updateQuantity: (id, quantity) =>
//     set((state) => ({
//       cart: state.cart.map((item) =>
//         item.variant.id === id ? { ...item, quantity } : item
//       ),
//     })),




//     selectedCategory: null,


//     setSelectedCategory: (category) => {
//       set({ selectedCategory: category })},
//     clearSelectedCategory: () => set({ selectedCategory: null }),

//     clearCart: () => set({ cart: [] }),
// }));

// export default useCartStore;




















import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: {},

  addToCart: (categoryName, productName, size, price, quantity = 1) =>
    set((state) => {
      const category = state.cart[categoryName] || {};
      const key = `${productName}*${size}`;
      const existingItem = category[key];

      const updatedItem = existingItem
        ? {
            ...existingItem,
            quantity: existingItem.quantity + quantity,
            total: (existingItem.quantity + quantity) * price,
          }
        : {
            productName,
            size,
            price,
            quantity,
            total: quantity * price,
          };

      return {
        cart: {
          ...state.cart,
          [categoryName]: {
            ...category,
            [key]: updatedItem,
          },
        },
      };
    }),

 removeFromCart: (categoryName, productName) =>
  set(state => {
    const updated = { ...state.cart };
    delete updated[categoryName][productName];
    if (Object.keys(updated[categoryName]).length === 0) {
      delete updated[categoryName]; // if no products left in category
    }
    return { cart: updated };
  }),


  clearCart: () => set({ cart: {} }),

  updateQuantity: (categoryName, productName, newQuantity) => {
  set((state) => {
    const product = state.cart[categoryName][productName];
    if (!product) return state;

    const updatedProduct = {
      ...product,
      quantity: newQuantity,
      total: newQuantity * product.price,
    };

    return {
      cart: {
        ...state.cart,
        [categoryName]: {
          ...state.cart[categoryName],
          [productName]: updatedProduct,
        },
      },
    };
  });
}


}));

