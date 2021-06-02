import {
  all,
  takeLatest,
  call,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import { requestBEP20Transactions, requestBNBTransactions } from '.';

import { requestBEP20 } from './BEP20/sagas';
import { requestBNB } from './BNB/sagas';
import { BigintIsh, JSBI } from '@pancakeswap-libs/sdk';
import { selectAddress } from '@store/address';
import { fetchBEP20Balance } from '../../tests/utils/fetchBEP20Balance';
import { fetchBNBBalance } from '../../tests/utils/fetchBNBBalance';
import { waitSequential } from '../../tests/utils/waitSequential';
import {
  BEP20TransactionsFailed,
  BEP20TransactionsReceived,
  BNBTransactionsReceived,
  BEP20AmountsReceived,
  BEP20AmountsFailed,
  BNBAmountsReceived,
  BNBAmountsFailed,
} from '.';
import { selectUserBEP20Tokens } from './selectors';
import { UserBEP20TokensInfo } from '@models/transactions';

function* watchFetchContracts() {
  yield all([
    takeLatest(requestBEP20Transactions.type, requestBEP20),
    takeLatest(requestBNBTransactions.type, requestBNB),
  ]);
}

function* watchRequestAmount() {
  yield all([
    takeLatest([BEP20TransactionsReceived.type], requestBEP20Amount),
    takeLatest(
      [BEP20TransactionsReceived.type, BNBTransactionsReceived.type],
      requestBNBAmount,
    ),
  ]);
}

const fetchBEP20TokensAmount = async (
  userBEP20Tokens: string[],
  address: string,
) =>
  waitSequential<Record<string, BigintIsh>>(
    userBEP20Tokens.map((tok) => async (pre) => {
      const bal = await fetchBEP20Balance(tok, address);
      pre[tok] = JSBI.BigInt(bal.result);
      return pre;
    }),
    Promise.resolve({}),
    201,
  );

function* requestBEP20Amount() {
  try {
    const userBEP20Tokens: string[] = yield select(selectUserBEP20Tokens);
    const address: string = yield select(selectAddress);
    const tokensAmount: Record<string, BigintIsh> = yield call(
      fetchBEP20TokensAmount,
      userBEP20Tokens,
      address,
    );
    yield put(BEP20AmountsReceived(tokensAmount));
  } catch (e) {
    yield put(BEP20AmountsFailed(e.message));
  }
}
function* requestBNBAmount() {
  try {
    const address: string = yield select(selectAddress);
    const { result }: { result: string } = yield call(fetchBNBBalance, address);
    yield put(BNBAmountsReceived(JSBI.BigInt(result)));
  } catch (e) {
    yield put(BNBAmountsFailed(e.message));
  }
}

export default function* rootSaga() {
  yield all([watchFetchContracts(), watchRequestAmount()]);
}
