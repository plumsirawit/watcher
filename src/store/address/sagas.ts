import { all, put, select, takeLatest } from '@redux-saga/core/effects';
import { setAddress } from '.';
import { selectAddress } from './selectors';

function* watchAddressChanged() {
  yield takeLatest(setAddress.type, saveAddressToLocalStorage);
}

function* saveAddressToLocalStorage() {
  const address: string = yield select(selectAddress);
  localStorage.setItem('watcher-address', address);
}

function* getAddressFromLocalStorage() {
  const tempAddress = localStorage.getItem('watcher-address');
  if (tempAddress) {
    yield put(setAddress(tempAddress));
  }
}

export default function* rootSaga() {
  yield all([getAddressFromLocalStorage(), watchAddressChanged()]);
}
