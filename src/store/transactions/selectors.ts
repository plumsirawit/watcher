import type { UserBEP20TokensInfo } from '@models/transactions';
import { createSelector } from 'reselect';

import { selectUserBEP20TokensInfo } from './BEP20/selectors';
import { selectUserBNBTokenInfo } from './BNB/selectors';
import type { UserInfo } from './types';
export * from './BEP20/selectors';

export const selectContractAddresses = createSelector(
  selectUserBEP20TokensInfo,
  (userBEP20TokensInfo: UserBEP20TokensInfo) =>
    Object.keys(userBEP20TokensInfo.tokens),
);

export const selectUserInfo = createSelector(
  selectUserBEP20TokensInfo,
  selectUserBNBTokenInfo,
  (userBEP20TokensInfo, userBNBTokenInfo) =>
    ({
      tokens: userBEP20TokensInfo.tokens,
      BNBAmount: userBNBTokenInfo.amount,
      fee: userBEP20TokensInfo.fee + userBNBTokenInfo.fee,
    } as UserInfo),
);
