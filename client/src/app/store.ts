import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query/react';

import { baseApi } from './baseApi';

/** Configure store. */
export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    /**
     * Adding the api middleware enables caching, invalidation, polling,
     * and other useful features of `rtk-query`.
     */
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

/**
 * Setup redux listeners.
 *
 * Required for refetchOnFocus/refetchOnReconnect behaviors. See `setupListeners` docs - takes an optional
 * callback as the 2nd arg for customization.
 */
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;