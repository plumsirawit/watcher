import type { RootState } from '@store';

export const selectRawInternalTransactions = (state: RootState) =>
  state.transactions.internalTransactions;
