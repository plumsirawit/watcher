import { all } from 'redux-saga/effects';
import addressSaga from './address/sagas';
import transactionsSaga from './transactions/sagas';
import informationSaga from './information/sagas';

export default function* rootSaga() {
  yield all([addressSaga(), transactionsSaga(), informationSaga()]);
}
