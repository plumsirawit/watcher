import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TokenData, UserData } from '@models/token';

export const contractsSlice = createSlice({
  name: 'contracts',
  initialState: {
    addresses: [] as string[],
    tokenData: {} as Record<string, TokenData>,
    userData: {} as Record<string, UserData>,
    error: '',
  },
  reducers: {
    requestContracts: (state) => state,
    contractsReceived: (state, action: PayloadAction<string[]>) => ({
      ...state,
      addresses: action.payload,
    }),
    contractsFailed: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
    tokenDataReceived: (
      state,
      action: PayloadAction<Record<string, TokenData>>,
    ) => ({
      ...state,
      tokenData: action.payload,
    }),
    tokenDataFailed: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
    userDataReceived: (
      state,
      action: PayloadAction<Record<string, UserData>>,
    ) => ({
      ...state,
      userData: action.payload,
    }),
    userDataFailed: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
  },
});

export const {
  requestContracts,
  contractsReceived,
  contractsFailed,
  tokenDataReceived,
  tokenDataFailed,
  userDataReceived,
  userDataFailed,
} = contractsSlice.actions;

export * from './selectors';
