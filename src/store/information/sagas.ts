import { fetchTokensDataFromUserInfo, TokensData } from '@models/token';
import {
  all,
  call,
  put,
  race,
  select,
  takeLatest,
} from '@redux-saga/core/effects';
import {
  BEP20TransactionsReceived,
  BNBTransactionsReceived,
  internalTransactionsReceived,
  selectUserInfo,
} from '@store/transactions';
import type { UserInfo } from '@store/transactions/types';
import { requestTokensData, tokensDataReceived } from '.';

function* watchFetchTokensData() {
  yield takeLatest(
    [
      BEP20TransactionsReceived,
      BNBTransactionsReceived,
      internalTransactionsReceived,
    ],
    fetchTokens,
  );
}
function* fetchTokens() {
  const userInfo: UserInfo = yield select(selectUserInfo);
  const tokensData: TokensData = yield call(
    fetchTokensDataFromUserInfo,
    userInfo,
  );
  yield put(tokensDataReceived(tokensData));
}

export default function* rootSaga() {
  yield watchFetchTokensData();
}
