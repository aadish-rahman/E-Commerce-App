import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
import favoritesReducer from "../redux/features/favorites/favoriteSlice";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice";

const initialFavorites = getFavoritesFromLocalStorage() || [];

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
  },
  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
