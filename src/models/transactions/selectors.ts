import type { RawTransaction } from './types';

export const selectTokensList = (raw: RawTransaction[]) =>
  new Set(raw.map((txn) => txn.contractAddress));
