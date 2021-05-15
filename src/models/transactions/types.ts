import type { BigintIsh } from '@pancakeswap-libs/sdk';
import * as t from 'io-ts';

export const RawBEP20Transaction = t.type({
  blockNumber: t.string,
  timeStamp: t.string,
  hash: t.string,
  nonce: t.string,
  blockHash: t.string,
  from: t.string,
  contractAddress: t.string,
  to: t.string,
  value: t.string,
  tokenName: t.string,
  tokenSymbol: t.string,
  tokenDecimal: t.string,
  transactionIndex: t.string,
  gas: t.string,
  gasPrice: t.string,
  gasUsed: t.string,
  cumulativeGasUsed: t.string,
  input: t.string,
  confirmations: t.string,
});
export type IRawBEP20Transaction = t.TypeOf<typeof RawBEP20Transaction>;

export interface UserBEP20TokensInfo {
  tokens: Record<string, BigintIsh>; // amount of each tokens (native)
  fee: BigintIsh;
}

export const RawBNBTransaction = t.type({
  blockNumber: t.string,
  timeStamp: t.string,
  hash: t.string,
  nonce: t.string,
  blockHash: t.string,
  transactionIndex: t.string,
  from: t.string,
  to: t.string,
  value: t.string,
  gas: t.string,
  gasPrice: t.string,
  isError: t.string,
  txreceipt_status: t.string,
  input: t.string,
  contractAddress: t.string,
  cumulativeGasUsed: t.string,
  gasUsed: t.string,
  confirmations: t.string,
});
export type IRawBNBTransaction = t.TypeOf<typeof RawBNBTransaction>;

export interface UserBNBTokenInfo {
  amount: BigintIsh;
  fee: BigintIsh;
}

export const RawInternalTransaction = t.type({
  blockNumber: t.string,
  timeStamp: t.string,
  hash: t.string,
  from: t.string,
  to: t.string,
  value: t.string,
  contractAddress: t.string,
  input: t.string,
  type: t.string,
  gas: t.string,
  gasUsed: t.string,
  traceId: t.string,
  isError: t.string,
  errCode: t.string,
});
export type IRawInternalTransaction = t.TypeOf<typeof RawInternalTransaction>;
