import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      // ---------- USER ----------
      user: null,

      setUser: (userData) => set({ user: userData }),

      logout: () =>
        set({
          user: null,
          cart: [],
          wishlist: [],
        }),

      // ---------- WISHLIST ----------
      wishlist: [],

      addToWishlist: (product) =>
        set((state) => {
          const exists = state.wishlist.some(
            (item) => String(item._id) === String(product._id)
          );
          if (exists) return state;
          return { wishlist: [...state.wishlist, product] };
        }),

      removeFromWishlist: (id) =>
        set((state) => ({
          wishlist: state.wishlist.filter(
            (item) => String(item._id) !== String(id)
          ),
        })),

      // ---------- CART ----------
      cart: [],

      addToCart: (product, quantity = 1, size) =>
        set((state) => {
          const existing = state.cart.find(
            (item) =>
              String(item._id) === String(product._id) &&
              item.size === size
          );

          if (existing) {
            return {
              cart: state.cart.map((item) =>
                String(item._id) === String(product._id) &&
                  item.size === size
                  ? { ...item, qty: item.qty + quantity }
                  : item
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, size, qty: quantity }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter(
            (item) => String(item._id) !== String(id)
          ),
        })),

      increaseQty: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            String(item._id) === String(id)
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        })),

      decreaseQty: (id) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            String(item._id) === String(id) && item.qty > 1
              ? { ...item, qty: item.qty - 1 }
              : item
          ),
        })),
    }),
    {
      name: "jewe-store", // localStorage key
    }
  )
);

export default useStore;