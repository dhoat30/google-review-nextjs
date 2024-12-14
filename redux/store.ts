import { configureStore } from '@reduxjs/toolkit';
import businessSlice from './slices/businessSlice';
import googleReviewsSlice from './slices/googleReviewsSlice'


export const makeStore = (preloadedState = {}) => {
    return configureStore({
      reducer: {
        business: businessSlice,
        googleReviews: googleReviewsSlice
      },
      preloadedState,
    });
  };
export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<ReturnType<typeof makeStore>['dispatch']>;
