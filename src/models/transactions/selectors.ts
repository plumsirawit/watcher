import type { RawTransaction } from './types';

export const selectTokensList = (raw: RawTransaction[]) =>
  Array.from(new Set(raw.map((txn) => txn.contractAddress)));
