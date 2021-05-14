import { call, put, select, takeLatest } from '@redux-saga/core/effects';
import {
  BEP20TransactionsReceived,
  selectContractAddresses,
  selectRawBEP20Transactions,
  selectUserBEP20TokensInfo,
} from '../transactions';
import { fetchBNBPrice, fetchTokenPrice, TokenPrice } from '@models/token';
import { pricesFailed, pricesReceived, BNBPriceReceived } from '.';
import type { UserBEP20TokensInfo } from '@models/transactions';

const getPricesFromContractAddresses = (
  contractAddresses: string[],
): Promise<Record<string, TokenPrice>> =>
  Promise.all(
    contractAddresses.map((tok) => Promise.all([tok, fetchTokenPrice(tok)])),
  ).then(Object.fromEntries);

function* watchRequestPrices() {
  yield takeLatest(BEP20TransactionsReceived.type, requestPrices);
}
function* requestPrices() {
  try {
    const userBEP20TokensInfo: UserBEP20TokensInfo = yield select(
      selectUserBEP20TokensInfo,
    );
    const contractAddresses: string[] = yield select(selectContractAddresses);
    console.log('DEBUG', userBEP20TokensInfo);
    const prices: Record<string, TokenPrice> = yield call(
      getPricesFromContractAddresses,
      contractAddresses,
    );
    yield put(pricesReceived(prices));
    const BNBPrice: number = yield call(fetchBNBPrice);
    yield put(BNBPriceReceived(BNBPrice));
  } catch (e) {
    yield put(pricesFailed(e?.message ?? ''));
  }
}

export default function* rootSaga() {
  yield watchRequestPrices();
}
