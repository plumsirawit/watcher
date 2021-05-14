import type { RootState } from '@store';

export const selectRawBNBTransactions = (state: RootState) =>
  state.transactions.BNBTransactions;
