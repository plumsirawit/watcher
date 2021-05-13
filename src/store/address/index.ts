import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const addressSlice = createSlice({
  name: 'address',
  initialState: '',
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setAddress } = addressSlice.actions;
