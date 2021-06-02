import { BigintIsh } from '@pancakeswap-libs/sdk';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  SCurrencyAmount,
  STokenAmount,
} from '@models/utils/serializable-types';

export interface TokensData {
  tokens: Record<string, STokenAmount>;
  BNBAmount: SCurrencyAmount;
  fee: SCurrencyAmount;
}

export const informationSlices = createSlice({
  name: 'information',
  initialState: {
    tokensData: {} as TokensData,
    error: '',
  },
  reducers: {
    tokensDataRequested: (state) => state,
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

export const { tokensDataRequested, tokensDataReceived, tokensDataFailed } =
  informationSlices.actions;

export * from './selectors';
