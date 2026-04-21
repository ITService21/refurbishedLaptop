import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import cartReducer from "./cartSlice";
import wishlistReducer from "./wishlistSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore non-serializable values in cart/wishlist actions
        ignoredActions: ["cart/addToCart", "wishlist/addToWishlist"],
      },
    }),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
