import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type {
  IRawBEP20Transaction,
  IRawBNBTransaction,
  IRawInternalTransaction,
} from '@models/transactions/types';
import { BigintIsh, JSBI } from '@pancakeswap-libs/sdk';

export const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    BEP20Transactions: [] as IRawBEP20Transaction[],
    BNBTransactions: [] as IRawBNBTransaction[],
    internalTransactions: [] as IRawInternalTransaction[],
    BEP20Amounts: {} as Record<string, BigintIsh>,
    BNBAmounts: JSBI.BigInt(0) as BigintIsh,
    error: '',
  },
  reducers: {
    requestBEP20Transactions: (state) => state,
    BEP20TransactionsReceived: (
      state,
      action: PayloadAction<IRawBEP20Transaction[]>,
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
      action: PayloadAction<IRawBNBTransaction[]>,
    ) => ({
      ...state,
      BNBTransactions: action.payload,
    }),
    BNBTransactionsFailed: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
    requestInternalTransactions: (state) => state,
    internalTransactionsReceived: (
      state,
      action: PayloadAction<IRawInternalTransaction[]>,
    ) => ({
      ...state,
      internalTransactions: action.payload,
    }),
    internalTransactionsFailed: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
    BEP20AmountsReceived: (
      state,
      action: PayloadAction<Record<string, BigintIsh>>,
    ) => ({
      ...state,
      BEP20Amounts: action.payload,
    }),
    BEP20AmountsFailed: (state, action: PayloadAction<string>) => ({
      ...state,
      error: action.payload,
    }),
    BNBAmountsReceived: (state, action: PayloadAction<BigintIsh>) => ({
      ...state,
      BNBAmounts: action.payload,
    }),
    BNBAmountsFailed: (state, action: PayloadAction<string>) => ({
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
  requestInternalTransactions,
  internalTransactionsReceived,
  internalTransactionsFailed,
  BEP20AmountsReceived,
  BEP20AmountsFailed,
  BNBAmountsReceived,
  BNBAmountsFailed,
} = transactionsSlice.actions;

export * from './selectors';
