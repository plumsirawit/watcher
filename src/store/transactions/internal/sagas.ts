import {
  fetchInternalTransactions,
  RawInternalTransaction,
} from '@models/transactions';
import { call, put, select } from '@redux-saga/core/effects';
import { selectAddress } from '@store/address';
import { internalTransactionsFailed, internalTransactionsReceived } from '..';

export function* requestInternal() {
  try {
    const address: string = yield select(selectAddress);
    const txn: RawInternalTransaction[] = yield call(
      fetchInternalTransactions,
      address,
    );
    yield put(internalTransactionsReceived(txn));
  } catch (e) {
    yield put(internalTransactionsFailed(e?.message ?? ''));
  }
}
