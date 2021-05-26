import {
  fetchBEP20Transactions,
  fetchBNBTransactions,
  fetchInternalTransactions,
} from '@models/transactions';
import { parseBigintIsh } from '@utils/pancakeswap-sdk';
import {
  parseBEP20Transactions,
  parseBNBTransactions,
  parseInternalTransactions,
} from '@utils/transactions';
import { expect } from '@esm-bundle/chai';
import * as t from 'io-ts';
import { fetchBNBBalance } from '../utils/fetchBNBBalance';
import { JSBI } from '@pancakeswap-libs/sdk';
export const TokenBalance = t.type({
  status: t.string,
  message: t.string,
  result: t.string,
});

const constructTest = (address: string) =>
  it(`returns correct BNB balance on address ${address}`, async () => {
    const transactions = await fetchBNBTransactions(address);
    // todo: count internal txns, fees, etc
    const tokenInfo = parseBNBTransactions(transactions, address);
    const balance = await fetchBNBBalance(address);
    const internalTransactions = await fetchInternalTransactions(address);
    const internalTokenInfo = parseInternalTransactions(
      internalTransactions,
      address,
    );
    const BEP20Transactions = await fetchBEP20Transactions(address);
    const BEP20Info = parseBEP20Transactions(BEP20Transactions, address);
    const amount = JSBI.subtract(
      JSBI.add(
        parseBigintIsh(tokenInfo.amount),
        parseBigintIsh(internalTokenInfo.amount),
      ),
      JSBI.add(parseBigintIsh(tokenInfo.fee), parseBigintIsh(BEP20Info.fee)),
    );
    console.log(
      'BNB amt',
      Number(
        JSBI.add(
          parseBigintIsh(tokenInfo.amount),
          parseBigintIsh(internalTokenInfo.amount),
        ).toString(),
      ) / 1e18,
    );
    console.log('BNB fee', Number(tokenInfo.fee.toString()) / 1e18);
    console.log('BEP20 fee', Number(BEP20Info.fee.toString()) / 1e18);
    expect(amount.toString()).to.equals(balance.result);
  });

describe('parseBNBransactions', () => {
  // These are random addresses found on bscscan
  constructTest('0x84DA89224132291c4D1B3B3AAC60c43B74A7c16b');
  constructTest('0x7AE2F5B9e386cd1B50A4550696D957cB4900f03a');
  constructTest('0x7CDDCB63bA13edd23Ed948ea0D25Fa6ed0683945');
});
