import { fetchBNBTransactions } from '@models/transactions';
import type { IRawBNBTransaction } from '@models/transactions/types';
import { call, put, select } from '@redux-saga/core/effects';
import { selectAddress } from '@store/address';
import { BNBTransactionsFailed, BNBTransactionsReceived } from '..';

export function* requestBNB() {
  try {
    const address: string = yield select(selectAddress);
    const txn: IRawBNBTransaction[] = yield call(fetchBNBTransactions, address);
    yield put(BNBTransactionsReceived(txn));
  } catch (e) {
    yield put(BNBTransactionsFailed(e?.message ?? ''));
  }
}
