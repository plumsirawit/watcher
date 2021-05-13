import type {
  RawBEP20Transaction,
  RawBNBTransaction,
  UserBEP20TokensInfo,
  UserBNBTokenInfo,
} from '@models/transactions';
import type { RootState } from '@store';
import { selectAddress } from '@store/address';
import { createSelector } from 'reselect';

export const selectRawBNBTransactions = (state: RootState) =>
  state.transactions.BNBTransactions;

export const selectUserBNBTokenInfo = createSelector(
  selectRawBNBTransactions,
  selectAddress,
  (txns: RawBNBTransaction[], address: string) =>
    txns.reduce(
      (pre, cur) => {
        const fee = (Number(cur.gasUsed) * Number(cur.gasPrice)) / 1e18;
        const value = Number(cur.value) / 1e18;
        const isIn = cur.to === address;
        const isOut = cur.from === address;
        if (isIn === isOut) {
          // @todo: fix, count fees
          return pre;
        } else if (isIn) {
          return {
            amount: pre.amount + value,
            fee: pre.fee + fee,
          };
        } else if (isOut) {
          return {
            amount: pre.amount - value,
            fee: pre.fee + fee,
          };
        } else {
          return pre;
        }
      },
      { amount: 0, fee: 0 } as UserBNBTokenInfo,
    ),
);
