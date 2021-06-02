import type { RootState } from '@store';
import { createSelector } from 'reselect';
import {
  IRawBEP20Transaction,
  UserBEP20TokensInfo,
} from '@models/transactions';
import { BigintIsh, JSBI } from '@pancakeswap-libs/sdk';

export const selectRawBEP20Transactions = (state: RootState) =>
  state.transactions.BEP20Transactions;
export const selectBEP20Amounts = (state: RootState) =>
  state.transactions.BEP20Amounts;
/*
This old method retrieves info from transactions.

export const selectUserBEP20TokensInfo = createSelector(
  selectRawBEP20Transactions,
  selectAddress,
  parseBEP20Transactions,
);
*/

export const selectUserBEP20Tokens = createSelector(
  selectRawBEP20Transactions,
  (txns: IRawBEP20Transaction[]) =>
    Array.from(new Set<string>(txns.map((txn) => txn.contractAddress))),
);

export const selectUserBEP20TokensInfo = createSelector(
  selectBEP20Amounts,
  (amts: Record<string, BigintIsh>): UserBEP20TokensInfo => ({
    tokens: amts,
    fee: JSBI.BigInt(0),
  }),
);
