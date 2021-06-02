import { fetchTokensDataFromUserInfo } from '@models/token';
import { all, call, put, select, takeLatest } from '@redux-saga/core/effects';
import {
  BEP20AmountsReceived,
  BNBAmountsReceived,
  selectUserInfo,
} from '@store/transactions';
import type { UserInfo } from '@store/transactions/types';
import { tokensDataRequested, tokensDataReceived } from '.';
import type { TokensData } from '.';

function* watchFetchTokensData() {
  yield takeLatest([BEP20AmountsReceived, BNBAmountsReceived], fetchTokens);
}

function* fetchTokens() {
  yield put(tokensDataRequested());
  const userInfo: UserInfo = yield select(selectUserInfo);
  const tokensData: TokensData = yield call(
    fetchTokensDataFromUserInfo,
    userInfo,
  );
  yield put(tokensDataReceived(tokensData));
}

export default function* rootSaga() {
  yield all([watchFetchTokensData()]);
}
