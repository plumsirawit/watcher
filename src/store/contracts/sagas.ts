import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from '@redux-saga/core/effects';
import type { TokenData, UserData } from '@models/token';
import {
  fetchTransaction,
  getTokensList,
  RawTransaction,
} from '@models/transactions';
import { selectAddress } from '@store/address';
import {
  requestContracts,
  contractsReceived,
  contractsFailed,
  tokenDataReceived,
  tokenDataFailed,
  userDataReceived,
  userDataFailed,
} from './index';
import { selectContractAddresses } from './selectors';
import {
  getTokensDataFromContractAddresses,
  getUserDataFromContractAddressesAndAccount,
} from './transform';

function* watchFetchContracts() {
  yield takeLatest(requestContracts.type, fetchContracts);
}
function* fetchContracts() {
  try {
    const address: string = yield select(selectAddress);
    const txn: RawTransaction[] = yield call(fetchTransaction, address);
    yield put(contractsReceived(getTokensList(txn)));
  } catch (e) {
    yield put(contractsFailed(e?.message ?? ''));
  }
}

function* watchContractsReceived() {
  yield all([
    takeLatest(contractsReceived.type, fetchTokensData),
    takeLatest(contractsReceived.type, fetchUserData),
  ]);
}
function* fetchTokensData() {
  try {
    const contractAddresses: string[] = yield select(selectContractAddresses);
    const tokensData: Record<string, TokenData> = yield call(
      getTokensDataFromContractAddresses,
      contractAddresses,
    );
    yield put(tokenDataReceived(tokensData));
  } catch (e) {
    yield put(tokenDataFailed(e?.message ?? ''));
  }
}
function* fetchUserData() {
  try {
    const contractAddresses: string[] = yield select(selectContractAddresses);
    const accountAddress: string = yield select(selectAddress);
    const userData: Record<string, UserData> = yield call(
      getUserDataFromContractAddressesAndAccount,
      contractAddresses,
      accountAddress,
    );
    yield put(userDataReceived(userData));
  } catch (e) {
    yield put(userDataFailed(e?.message ?? ''));
  }
}

export default function* rootSaga() {
  yield all([watchFetchContracts(), watchContractsReceived()]);
}
