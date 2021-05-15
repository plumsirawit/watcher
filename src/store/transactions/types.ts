import type { BigintIsh } from '@pancakeswap-libs/sdk';

export type UserInfo = {
  tokens: Record<string, BigintIsh>;
  BNBAmount: BigintIsh;
  fee: BigintIsh;
};
