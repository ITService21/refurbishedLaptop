import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartApi } from "../api/cartApi";
import { STORAGE_KEYS } from "../config/constants";
import { toast } from "react-toastify";

// Initialize cart from localStorage
const loadCartFromStorage = () => {
  try {
    const savedCart = localStorage.getItem(STORAGE_KEYS.cart);
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error("Error loading cart from storage:", error);
    return [];
  }
};

// Save cart to localStorage
const saveCartToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
};

// Async thunks for server-side cart operations (when user is logged in)
export const syncCartWithServer = createAsyncThunk(
  "cart/syncWithServer",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { login } = getState();
      if (!login.isLogin) {
        return null;
      }
      const response = await cartApi.getCart();
      return response?.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: loadCartFromStorage(),
  coupon: null,
  couponDiscount: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add item to cart
    addToCart: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.product_id === product.product_id
      );

      if (existingIndex >= 0) {
        // Update quantity if item exists
        state.items[existingIndex].quantity += product.quantity || 1;
        toast.info("Quantity updated in cart");
      } else {
        // Add new item
        state.items.push({
          product_id: product.product_id,
          name: product.model_name || product.name,
          brand: product.brand_name || product.brand,
          processor: product.processor,
          ram: product.ram,
          storage: product.storage,
          price: product.price,
          mrp: product.mrp || product.price,
          image: product.images?.[0] || product.image,
          quantity: product.quantity || 1,
        });
        toast.success("Added to cart!");
      }
      saveCartToStorage(state.items);
    },

    // Update item quantity
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.items.findIndex(
        (item) => item.product_id === productId
      );

      if (itemIndex >= 0) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items.splice(itemIndex, 1);
          toast.info("Item removed from cart");
        } else {
          state.items[itemIndex].quantity = quantity;
        }
        saveCartToStorage(state.items);
      }
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(
        (item) => item.product_id !== productId
      );
      saveCartToStorage(state.items);
      toast.info("Item removed from cart");
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      state.couponDiscount = 0;
      saveCartToStorage(state.items);
    },

    // Apply coupon
    applyCoupon: (state, action) => {
      const { code, discount, type, maxDiscount } = action.payload;
      state.coupon = code;
      
      // Calculate discount
      const subtotal = state.items.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      if (type === "percentage") {
        state.couponDiscount = Math.min(
          (subtotal * discount) / 100,
          maxDiscount || Infinity
        );
      } else {
        state.couponDiscount = discount;
      }
    },

    // Remove coupon
    removeCoupon: (state) => {
      state.coupon = null;
      state.couponDiscount = 0;
    },

    // Set cart items (for syncing from server)
    setCartItems: (state, action) => {
      state.items = action.payload;
      saveCartToStorage(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(syncCartWithServer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(syncCartWithServer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          // Merge server cart with local cart
          const serverItems = action.payload;
          const localItems = state.items;

          // Simple merge: prefer server items, add local items that don't exist
          const mergedItems = [...serverItems];
          localItems.forEach((localItem) => {
            const exists = serverItems.find(
              (s) => s.product_id === localItem.product_id
            );
            if (!exists) {
              mergedItems.push(localItem);
            }
          });

          state.items = mergedItems;
          saveCartToStorage(state.items);
        }
      })
      .addCase(syncCartWithServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Selectors
export const selectCartItems = (state) => state.cart.items;
export const selectCartItemCount = (state) =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
export const selectCartTotal = (state) => {
  const subtotal = state.cart.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  return subtotal - (state.cart.couponDiscount || 0);
};
export const selectCouponDiscount = (state) => state.cart.couponDiscount;

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  setCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;

