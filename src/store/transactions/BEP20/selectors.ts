import type { RootState } from '@store';
import { selectAddress } from '@store/address';
import { createSelector } from 'reselect';
import { parseBEP20Transactions } from '@utils/transactions';

export const selectRawBEP20Transactions = (state: RootState) =>
  state.transactions.BEP20Transactions;

export const selectUserBEP20TokensInfo = createSelector(
  selectRawBEP20Transactions,
  selectAddress,
  parseBEP20Transactions,
);
