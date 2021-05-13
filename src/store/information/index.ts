import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const informationSlices = createSlice({
  name: 'information',
  initialState: {
    prices: {},
    BNBPrice: 0,
    error: '',
  },
  reducers: {
    pricesReceived: (state, action: PayloadAction<Record<string, number>>) => ({
      ...state,
      prices: action.payload,
    }),
    BNBPriceReceived: (state, action: PayloadAction<number>) => ({
      ...state,
      BNBPrice: action.payload,
    }),
    pricesFailed: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
  },
});

export const { pricesReceived, pricesFailed, BNBPriceReceived } =
  informationSlices.actions;

export * from './selectors';
