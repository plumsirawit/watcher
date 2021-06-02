import { UserBNBTokenInfo } from '@models/transactions';
import { BigintIsh, JSBI } from '@pancakeswap-libs/sdk';
import type { RootState } from '@store';
import { createSelector } from 'reselect';

export const selectRawBNBTransactions = (state: RootState) =>
  state.transactions.BNBTransactions;

export const selectBNBAmounts = (state: RootState) =>
  state.transactions.BNBAmounts;

export const selectUserBNBTokenInfo = createSelector(
  selectBNBAmounts,
  (amt: BigintIsh): UserBNBTokenInfo => ({
    amount: amt,
    fee: JSBI.BigInt(0),
  }),
);

/*
export const selectUserBNBTokenInfo = createSelector(
  selectRawBNBTransactions,
  selectRawInternalTransactions,
  selectAddress,
  (BNBTxns, internalTxns, address) => {
    const result = parseBNBTransactions(BNBTxns, address);
    result.amount = JSBI.add(
      parseBigintIsh(result.amount),
      parseBigintIsh(parseInternalTransactions(internalTxns, address).amount),
    );
    // no fees in internal transactions
    return result;
  },
);
*/
