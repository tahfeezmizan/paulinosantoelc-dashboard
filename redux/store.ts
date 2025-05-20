import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";
import authReducer from "./features/authentication/authSlice";
import cartReducer from "./features/cart/cartSlice";

// Persist config
const persistConfig = {
  key: "auth",
  storage, // default local storage
};

// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, authReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    cart: cartReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(baseApi.middleware),

  devTools: process.env.NODE_ENV !== "production",
});

// Define RootState from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Persister for rehydrating the store
export const persister = persistStore(store);
