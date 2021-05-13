import { all, takeLatest } from '@redux-saga/core/effects';
import { requestBEP20Transactions, requestBNBTransactions } from '.';

import { requestBEP20 } from './BEP20/sagas';
import { requestBNB } from './BNB/sagas';

function* watchFetchContracts() {
  yield all([
    takeLatest(requestBEP20Transactions.type, requestBEP20),
    takeLatest(requestBNBTransactions.type, requestBNB),
  ]);
}

export default function* rootSaga() {
  yield all([watchFetchContracts()]);
}
