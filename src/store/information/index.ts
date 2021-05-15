import type { TokensData } from '@models/token';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const informationSlices = createSlice({
  name: 'information',
  initialState: {
    tokensData: {} as TokensData,
    error: '',
  },
  reducers: {
    requestTokensData: (state) => state,
    tokensDataReceived: (state, action: PayloadAction<TokensData>) => ({
      ...state,
      tokensData: action.payload,
    }),
    tokensDataFailed: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
  },
});

export const { requestTokensData, tokensDataReceived, tokensDataFailed } =
  informationSlices.actions;

export * from './selectors';
