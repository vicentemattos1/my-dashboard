import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './api/baseApi';

export function setupStore(
  preloadedState?: Partial<RootState>
): ReturnType<typeof configureStore> {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
    preloadedState,
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = ReturnType<typeof setupStore>;
