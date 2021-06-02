import type { UserBEP20TokensInfo } from '@models/transactions';
import { selectAddress } from '@store/address';
import {
  parseBNBTransactions,
  parseInternalTransactions,
} from '@utils/transactions';
import { createSelector } from 'reselect';

import { selectUserBEP20TokensInfo } from './BEP20/selectors';
import { selectUserBNBTokenInfo } from './BNB/selectors';
import { selectRawInternalTransactions } from './internal/selectors';
import type { UserInfo } from './types';
export * from './BEP20/selectors';
export * from './BNB/selectors';

import { parseBigintIsh } from '@utils/pancakeswap-sdk';
import { JSBI } from '@pancakeswap-libs/sdk';

export const selectContractAddresses = createSelector(
  selectUserBEP20TokensInfo,
  (userBEP20TokensInfo: UserBEP20TokensInfo) =>
    Object.keys(userBEP20TokensInfo.tokens),
);

export const selectUserInfo = createSelector(
  selectUserBEP20TokensInfo,
  selectUserBNBTokenInfo,
  (userBEP20TokensInfo, userBNBTokenInfo): UserInfo => ({
    tokens: userBEP20TokensInfo.tokens,
    BNBAmount: userBNBTokenInfo.amount,
    fee: JSBI.add(
      parseBigintIsh(userBEP20TokensInfo.fee),
      parseBigintIsh(userBNBTokenInfo.fee),
    ),
  }),
);
