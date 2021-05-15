import type {
  RawBEP20Transaction,
  UserBEP20TokensInfo,
} from '@models/transactions';
import { parseBigintIsh } from '@utils/pancakeswap-sdk';
import JSBI from 'jsbi';
import { TransactionParser } from './TransactionParser';

class BEP20TransactionsParser extends TransactionParser<
  RawBEP20Transaction,
  UserBEP20TokensInfo
> {
  state = { tokens: {}, fee: JSBI.BigInt(0) } as UserBEP20TokensInfo;
  parseEach(txn: RawBEP20Transaction) {
    const fee = JSBI.multiply(
      JSBI.BigInt(txn.gasUsed),
      JSBI.BigInt(txn.gasPrice),
    );
    const value = JSBI.BigInt(txn.value);
    const isIn = txn.to.toLowerCase() === this.address.toLowerCase();
    const isOut = txn.from.toLowerCase() === this.address.toLowerCase();
    const tokenContract = txn.contractAddress;
    if (isIn) {
      this.state.tokens[tokenContract] = JSBI.add(
        parseBigintIsh(this.state.tokens[tokenContract]) ?? JSBI.BigInt(0),
        value,
      );
    }
    if (isOut) {
      this.state.tokens[tokenContract] = JSBI.subtract(
        parseBigintIsh(this.state.tokens[tokenContract]) ?? JSBI.BigInt(0),
        value,
      );
      this.state.fee = JSBI.add(parseBigintIsh(this.state.fee), fee);
    }
    return this.state;
  }
}

/**
 * Transform a list of BEP20 token transactions to summary (i.e. amount of each token)
 * @param txns transactions list
 * @param address account address
 * @returns user information about BEP20 tokens
 */
export const parseBEP20Transactions = (
  txns: RawBEP20Transaction[],
  address: string,
) => new BEP20TransactionsParser(txns, address).parseAll();
