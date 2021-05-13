import type { UserBEP20TokensInfo } from '@models/transactions';
import { createSelector } from 'reselect';

import { selectUserBEP20TokensInfo } from './BEP20/selectors';
export * from './BEP20/selectors';
export * from './BNB/selectors';

export const selectContractAddresses = createSelector(
  selectUserBEP20TokensInfo,
  (userBEP20TokensInfo: UserBEP20TokensInfo) =>
    Object.keys(userBEP20TokensInfo.tokens),
);
