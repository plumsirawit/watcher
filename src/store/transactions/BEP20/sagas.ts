import { fetchBEP20Transactions } from '@models/transactions';
import type { IRawBEP20Transaction } from '@models/transactions/types';
import { call, put, select } from '@redux-saga/core/effects';
import { selectAddress } from '@store/address';
import { BEP20TransactionsFailed, BEP20TransactionsReceived } from '..';

export function* requestBEP20() {
  try {
    const address: string = yield select(selectAddress);
    const txn: IRawBEP20Transaction[] = yield call(
      fetchBEP20Transactions,
      address,
    );
    yield put(BEP20TransactionsReceived(txn));
  } catch (e) {
    yield put(BEP20TransactionsFailed(e?.message ?? ''));
  }
}
