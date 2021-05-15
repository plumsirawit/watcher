import { ChainId, Fetcher, Token } from '@pancakeswap-libs/sdk';
import type { RootState } from '@store';
import { selectUserInfo } from '@store/transactions';
import { createSelector } from 'reselect';

export const selectTokensData = (state: RootState) =>
  state.information.tokensData;
export const selectTokensAmount = createSelector(
  selectTokensData,
  ({ tokens }) => tokens,
);
