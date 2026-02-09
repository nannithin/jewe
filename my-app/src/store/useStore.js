import { create } from "zustand";

const useStore = create((set) => ({
  wishlist: [],
  cart: [],

  // ---------- WISHLIST ----------
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
  addToCart: (product) =>
    set((state) => {
      const existing = state.cart.find(
        (item) => String(item._id) === String(product._id)
      );

      if (existing) {
        return {
          cart: state.cart.map((item) =>
            String(item._id) === String(product._id)
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        };
      }

      return {
        cart: [...state.cart, { ...product, qty: 1 }],
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
}));

export default useStore;
