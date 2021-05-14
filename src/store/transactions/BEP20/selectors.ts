import type {
  RawBEP20Transaction,
  UserBEP20TokensInfo,
} from '@models/transactions';
import type { RootState } from '@store';
import { selectAddress } from '@store/address';
import { createSelector } from 'reselect';

export const selectRawBEP20Transactions = (state: RootState) =>
  state.transactions.BEP20Transactions;

export const selectUserBEP20TokensInfo = createSelector(
  selectRawBEP20Transactions,
  selectAddress,
  (txns: RawBEP20Transaction[], address: string) =>
    txns.reduce(
      (pre, cur) => {
        const fee = (Number(cur.gasUsed) * Number(cur.gasPrice)) / 1e18;
        const value =
          Number(cur.value) / Math.pow(10, Number(cur.tokenDecimal));
        const isIn = cur.to.toLowerCase() === address.toLowerCase();
        const isOut = cur.from.toLowerCase() === address.toLowerCase();
        const tokenContract = cur.contractAddress;
        if (isIn === isOut) {
          // @todo: fix, count fees
          return pre;
        } else if (isIn) {
          return {
            tokens: {
              ...pre.tokens,
              [tokenContract]: (pre.tokens[tokenContract] ?? 0) + value,
            },
            fee: pre.fee + fee,
          };
        } else if (isOut) {
          return {
            tokens: {
              ...pre.tokens,
              [tokenContract]: (pre.tokens[tokenContract] ?? 0) - value,
            },
            fee: pre.fee + fee,
          };
        } else {
          return pre;
        }
      },
      { tokens: {}, fee: 0 } as UserBEP20TokensInfo,
    ),
);
