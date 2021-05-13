import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  RawBEP20Transaction,
  RawBNBTransaction,
} from '@models/transactions';

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    BEP20Transactions: [] as RawBEP20Transaction[],
    BNBTransactions: [] as RawBNBTransaction[],
    error: '',
  },
  reducers: {
    requestBEP20Transactions: (state) => state,
    BEP20TransactionsReceived: (
      state,
      action: PayloadAction<RawBEP20Transaction[]>,
    ) => ({
      ...state,
      BEP20Transactions: action.payload,
    }),
    BEP20TransactionsFailed: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
    requestBNBTransactions: (state) => state,
    BNBTransactionsReceived: (
      state,
      action: PayloadAction<RawBNBTransaction[]>,
    ) => ({
      ...state,
      BNBTransactions: action.payload,
    }),
    BNBTransactionsFailed: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
  },
});

export const {
  requestBEP20Transactions,
  BEP20TransactionsReceived,
  BEP20TransactionsFailed,
  requestBNBTransactions,
  BNBTransactionsReceived,
  BNBTransactionsFailed,
} = transactionsSlice.actions;

export * from './selectors';
