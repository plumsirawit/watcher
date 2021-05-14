import type { UserBEP20TokensInfo } from '@models/transactions';
import { selectAddress } from '@store/address';
import {
  parseBNBTransactions,
  parseInternalTransactions,
} from '@utils/transactions';
import { createSelector } from 'reselect';

import { selectUserBEP20TokensInfo } from './BEP20/selectors';
import { selectRawBNBTransactions } from './BNB/selectors';
import { selectRawInternalTransactions } from './internal/selectors';
export * from './BEP20/selectors';
export * from './BNB/selectors';

export const selectContractAddresses = createSelector(
  selectUserBEP20TokensInfo,
  (userBEP20TokensInfo: UserBEP20TokensInfo) =>
    Object.keys(userBEP20TokensInfo.tokens),
);

export const selectUserBNBTokenInfo = createSelector(
  selectRawBNBTransactions,
  selectRawInternalTransactions,
  selectAddress,
  (BNBTxns, internalTxns, address) => {
    const result = parseBNBTransactions(BNBTxns, address);
    result.amount += parseInternalTransactions(internalTxns, address).amount;
    // no fees in internal transactions
    return result;
  },
);
