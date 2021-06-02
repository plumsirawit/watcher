import { ChainId } from '@pancakeswap-libs/sdk';
import JSBI from 'jsbi';

export interface SFraction {
  numerator: JSBI;
  denominator: JSBI;
}

export interface SCurrency {
  decimals: number;
  symbol?: string;
  name?: string;
}

export interface SCurrencyAmount extends SFraction {
  currency: SCurrency;
}

export interface SToken extends SCurrency {
  readonly chainId: ChainId;
  readonly address: string;
}

export interface STokenAmount extends SCurrencyAmount {
  token: SToken;
}
