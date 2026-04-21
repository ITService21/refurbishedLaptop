import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { wishlistApi } from "../api/wishlistApi";
import { STORAGE_KEYS } from "../config/constants";
import { toast } from "react-toastify";

// Initialize wishlist from localStorage
const loadWishlistFromStorage = () => {
  try {
    const savedWishlist = localStorage.getItem(STORAGE_KEYS.wishlist);
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  } catch (error) {
    console.error("Error loading wishlist from storage:", error);
    return [];
  }
};

// Save wishlist to localStorage
const saveWishlistToStorage = (items) => {
  try {
    localStorage.setItem(STORAGE_KEYS.wishlist, JSON.stringify(items));
  } catch (error) {
    console.error("Error saving wishlist to storage:", error);
  }
};

// Async thunks for server-side wishlist operations
export const syncWishlistWithServer = createAsyncThunk(
  "wishlist/syncWithServer",
  async (_, { getState, rejectWithValue }) => {
    try {
      const { login } = getState();
      if (!login.isLogin) {
        return null;
      }
      const response = await wishlistApi.getWishlist();
      return response?.data || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addToWishlistAsync = createAsyncThunk(
  "wishlist/addAsync",
  async (product, { getState, rejectWithValue }) => {
    try {
      const { login } = getState();
      if (login.isLogin) {
        await wishlistApi.addToWishlist(product.product_id);
      }
      return product;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeFromWishlistAsync = createAsyncThunk(
  "wishlist/removeAsync",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const { login } = getState();
      if (login.isLogin) {
        await wishlistApi.removeFromWishlist(productId);
      }
      return productId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: loadWishlistFromStorage(),
  loading: false,
  error: null,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    // Toggle wishlist item
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const existingIndex = state.items.findIndex(
        (item) => item.product_id === product.product_id
      );

      if (existingIndex >= 0) {
        // Remove from wishlist
        state.items.splice(existingIndex, 1);
        toast.info("Removed from wishlist");
      } else {
        // Add to wishlist
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
          addedAt: new Date().toISOString(),
        });
        toast.success("Added to wishlist!");
      }
      saveWishlistToStorage(state.items);
    },

    // Add item to wishlist
    addToWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.find(
        (item) => item.product_id === product.product_id
      );

      if (!exists) {
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
          addedAt: new Date().toISOString(),
        });
        saveWishlistToStorage(state.items);
        toast.success("Added to wishlist!");
      }
    },

    // Remove item from wishlist
    removeFromWishlist: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter(
        (item) => item.product_id !== productId
      );
      saveWishlistToStorage(state.items);
      toast.info("Removed from wishlist");
    },

    // Clear wishlist
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToStorage(state.items);
    },

    // Set wishlist items (for syncing)
    setWishlistItems: (state, action) => {
      state.items = action.payload;
      saveWishlistToStorage(state.items);
    },
  },
  extraReducers: (builder) => {
    builder
      // Sync with server
      .addCase(syncWishlistWithServer.pending, (state) => {
        state.loading = true;
      })
      .addCase(syncWishlistWithServer.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          // Merge server wishlist with local
          const serverItems = action.payload;
          const localItems = state.items;

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
          saveWishlistToStorage(state.items);
        }
      })
      .addCase(syncWishlistWithServer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add async
      .addCase(addToWishlistAsync.fulfilled, (state, action) => {
        const product = action.payload;
        const exists = state.items.find(
          (item) => item.product_id === product.product_id
        );

        if (!exists) {
          state.items.push({
            product_id: product.product_id,
            name: product.model_name || product.name,
            brand: product.brand_name || product.brand,
            price: product.price,
            mrp: product.mrp,
            image: product.images?.[0] || product.image,
            addedAt: new Date().toISOString(),
          });
          saveWishlistToStorage(state.items);
          toast.success("Added to wishlist!");
        }
      })
      // Remove async
      .addCase(removeFromWishlistAsync.fulfilled, (state, action) => {
        const productId = action.payload;
        state.items = state.items.filter(
          (item) => item.product_id !== productId
        );
        saveWishlistToStorage(state.items);
        toast.info("Removed from wishlist");
      });
  },
});

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items;
export const selectWishlistCount = (state) => state.wishlist.items.length;
export const selectIsInWishlist = (productId) => (state) =>
  state.wishlist.items.some((item) => item.product_id === productId);

export const {
  toggleWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  setWishlistItems,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;

