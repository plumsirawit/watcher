import type { RawBNBTransaction, UserBNBTokenInfo } from '@models/transactions';
import { TransactionParser } from './TransactionParser';

class BNBTransactionsParser extends TransactionParser<
  RawBNBTransaction,
  UserBNBTokenInfo
> {
  state = { amount: 0, fee: 0 } as UserBNBTokenInfo;
  parseEach(txn: RawBNBTransaction) {
    const fee = (Number(txn.gasUsed) * Number(txn.gasPrice)) / 1e18;
    const value = Number(txn.value) / 1e18;
    const isIn = txn.to.toLowerCase() === this.address.toLowerCase();
    const isOut = txn.from.toLowerCase() === this.address.toLowerCase();
    if (isIn) {
      this.state.amount += value;
    }
    if (isOut) {
      this.state.amount -= value;
      this.state.fee += fee;
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
  txns: RawBNBTransaction[],
  address: string,
) => new BNBTransactionsParser(txns, address).parseAll();
