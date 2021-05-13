import { fetchBNBTransactions, RawBNBTransaction } from '@models/transactions';
import { call, put, select } from '@redux-saga/core/effects';
import { selectAddress } from '@store/address';
import { BNBTransactionsFailed, BNBTransactionsReceived } from '..';

export function* requestBNB() {
  try {
    const address: string = yield select(selectAddress);
    const txn: RawBNBTransaction[] = yield call(fetchBNBTransactions, address);
    yield put(BNBTransactionsReceived(txn));
  } catch (e) {
    yield put(BNBTransactionsFailed(e?.message ?? ''));
  }
}
