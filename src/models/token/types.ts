import type { CurrencyAmount, TokenAmount } from '@pancakeswap-libs/sdk';

export interface TokensData {
  tokens: Record<string, TokenAmount>;
  BNBAmount: CurrencyAmount;
  fee: CurrencyAmount;
}
