import { call, put, select, takeLatest } from '@redux-saga/core/effects';
import {
  BEP20TransactionsReceived,
  selectContractAddresses,
} from '../transactions';
import { fetchBNBPrice, fetchTokenPrice } from '@models/token';
import { pricesFailed, pricesReceived, BNBPriceReceived } from '.';

const getPricesFromContractAddresses = (
  contractAddresses: string[],
): Promise<Record<string, number>> =>
  Promise.all(
    contractAddresses.map((tok) => Promise.all([tok, fetchTokenPrice(tok)])),
  ).then(Object.fromEntries);

function* watchRequestPrices() {
  yield takeLatest(BEP20TransactionsReceived.type, requestPrices);
}
function* requestPrices() {
  try {
    const contractAddresses: string[] = yield select(selectContractAddresses);
    const prices: Record<string, number> = yield call(
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
