import type {
  RawInternalTransaction,
  UserBNBTokenInfo,
} from '@models/transactions';
import { parseBigintIsh } from '@utils/pancakeswap-sdk';
import JSBI from 'jsbi';
import { TransactionParser } from './TransactionParser';

class InternalTransactionsParser extends TransactionParser<
  RawInternalTransaction,
  UserBNBTokenInfo
> {
  state = { amount: JSBI.BigInt(0), fee: JSBI.BigInt(0) } as UserBNBTokenInfo;
  parseEach(txn: RawInternalTransaction) {
    const value = JSBI.BigInt(txn.value);
    const isIn = txn.to.toLowerCase() === this.address.toLowerCase();
    const isOut = txn.from.toLowerCase() === this.address.toLowerCase();
    if (isIn) {
      this.state.amount = JSBI.add(parseBigintIsh(this.state.amount), value);
    }
    if (isOut) {
      this.state.amount = JSBI.subtract(
        parseBigintIsh(this.state.amount),
        value,
      );
    }
    return this.state;
  }
}

/**
 * Transform a list of normal transactions to amount of BNB and fees
 * @param txns transactions list
 * @param address account address
 * @returns user information about BNB and fees
 */
export const parseInternalTransactions = (
  txns: RawInternalTransaction[],
  address: string,
) => new InternalTransactionsParser(txns, address).parseAll();
