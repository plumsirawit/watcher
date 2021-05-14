import type { TokenPrice } from '@models/token';
import type { RootState } from '@store';
import {
  selectUserBNBTokenInfo,
  selectUserBEP20TokensInfo,
} from '@store/transactions';
import { createSelector } from 'reselect';
import type { UserInfo } from './types';

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

export const selectPrices = (state: RootState) => ({
  prices: state.information.prices as Record<string, TokenPrice>,
  BNBPrice: state.information.BNBPrice,
});

export const selectTokenUserData = createSelector(
  selectPrices,
  selectUserInfo,
  ({ prices, BNBPrice }, userInfo) => ({
    tokens: Object.fromEntries(
      Object.entries(userInfo.tokens).map(([k, v]) => [
        k,
        { amount: v, price: prices[k] },
      ]),
    ),
    fee: userInfo.fee,
    BNBAmount: userInfo.BNBAmount,
    BNBPrice,
  }),
);
