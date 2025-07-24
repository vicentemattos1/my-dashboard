import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';
import userReducer from './slices/userSlice';

export function setupStore(preloadedState = {}) {
  return configureStore({
    reducer: {
      user: userReducer,
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    preloadedState,
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppStore = ReturnType<typeof setupStore>;
