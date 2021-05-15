import type { UserBNBTokenInfo } from '@models/transactions';
import type { IRawBNBTransaction } from '@models/transactions/types';
import { parseBigintIsh } from '@utils/pancakeswap-sdk';
import { JSBI } from '@pancakeswap-libs/sdk';
import { TransactionParser } from './TransactionParser';

class BNBTransactionsParser extends TransactionParser<
  IRawBNBTransaction,
  UserBNBTokenInfo
> {
  state = { amount: JSBI.BigInt(0), fee: JSBI.BigInt(0) } as UserBNBTokenInfo;
  parseEach(txn: IRawBNBTransaction) {
    const fee = JSBI.multiply(
      JSBI.BigInt(txn.gasUsed),
      JSBI.BigInt(txn.gasPrice),
    );
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
      this.state.fee = JSBI.add(parseBigintIsh(this.state.fee), fee);
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
export const parseBNBTransactions = (
  txns: IRawBNBTransaction[],
  address: string,
) => new BNBTransactionsParser(txns, address).parseAll();
