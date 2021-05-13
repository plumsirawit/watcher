import { all } from 'redux-saga/effects';
import addressSaga from './address/sagas';
import contractsSaga from './contracts/sagas';

export default function* rootSaga() {
  yield all([addressSaga(), contractsSaga()]);
}
