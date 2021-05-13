import type { RawBEP20Transaction } from '@models/transactions';

export const getTokensList = (raw: RawBEP20Transaction[]) =>
  Array.from(new Set(raw.map((txn) => txn.contractAddress)));
