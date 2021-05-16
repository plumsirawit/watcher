import { fetchBEP20Transactions } from '@models/transactions';
import { parseBEP20Transactions } from '@utils/transactions/parseBEP20Transactions';
import { expect } from '@esm-bundle/chai';
import { parseBigintIsh } from '@utils/pancakeswap-sdk';
import { fetchBEP20Balance, TokenBalance } from '../utils/fetchBEP20Balance';
import * as t from 'io-ts';
import { waitSequential } from '../utils/waitSequential';

const constructTest = (address: string) =>
  it(`returns correct BEP-20 balance on address ${address}`, async () => {
    const transactions = await fetchBEP20Transactions(address);
    const tokenInfo = parseBEP20Transactions(transactions, address);
    const thunks = Object.keys(tokenInfo.tokens).map(
      (contractAddress) =>
        async (retObj: Record<string, t.TypeOf<typeof TokenBalance>>) => {
          const bal = await fetchBEP20Balance(contractAddress, address);
          retObj[contractAddress] = bal;
          return retObj;
        }, // A little bit bad practice, but I think it's fine.
    );
    const balances = await waitSequential<
      Record<string, t.TypeOf<typeof TokenBalance>>
    >(thunks, Promise.resolve({}));
    Object.entries(tokenInfo.tokens).map(([token, amount]) => {
      expect(balances).to.have.own.property(token);
      const stringAmount = parseBigintIsh(amount).toString();
      expect(stringAmount).to.equals(
        balances[token].result,
        `incorrect balance for ${token}`,
      );
    });
  });

describe('parseBEP20Transactions', () => {
  // These are random addresses found on bscscan
  constructTest('0x84DA89224132291c4D1B3B3AAC60c43B74A7c16b');
  constructTest('0x7AE2F5B9e386cd1B50A4550696D957cB4900f03a');
  constructTest('0x7CDDCB63bA13edd23Ed948ea0D25Fa6ed0683945');
});
