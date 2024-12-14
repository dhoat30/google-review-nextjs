import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { Business } from '../types/Business';

const initialState: Business[]=[]

const busienssSlice = createSlice({
    name: 'business',
    initialState,
    reducers: {
        setBusinesses: (state, action: PayloadAction<Business[]>) => {
            return action.payload; // Replace the current state with the new array of businesses
          },
          addBusiness: (state, action: PayloadAction<Business>) => {
            state.push(action.payload); // Add a single business to the array
          },
          updateBusiness: (state, action: PayloadAction<Business>) => {
            const index = state.findIndex(
              (business) => business.businessName === action.payload.businessName
            );
            if (index !== -1) {
              state[index] = action.payload; // Update the business with the same name
            }
          },
          removeBusiness: (state, action: PayloadAction<string>) => {
            return state.filter((business) => business.businessName !== action.payload); // Remove a business by name
          },
    },
});

export const businessActions = busienssSlice.actions;

export default busienssSlice.reducer;