import { all } from 'redux-saga/effects';
import addressSaga from './address/sagas';
import contractsSaga from './transactions/sagas';

export default function* rootSaga() {
  yield all([addressSaga(), contractsSaga()]);
}
