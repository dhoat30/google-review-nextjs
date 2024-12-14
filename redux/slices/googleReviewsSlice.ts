import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { GoogleReviewsState, GoogleReview } from '../types/GoogleReview'

const initialState: GoogleReviewsState={ 
    reviewsByBusinessId: {},
    loading: false,
    error: null
}

const googleReviewsSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
         setReviews(state, action: PayloadAction<{ businessId: number; reviews: GoogleReview[] }>) {
          state.reviewsByBusinessId[action.payload.businessId] = action.payload.reviews;
        },
    },
});

export const googleReviewsAction = googleReviewsSlice.actions;

export default googleReviewsSlice.reducer;