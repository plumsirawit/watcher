import type {
  RawBEP20Transaction,
  UserBEP20TokensInfo,
} from '@models/transactions';
import { TransactionParser } from './TransactionParser';

class BEP20TransactionsParser extends TransactionParser<
  RawBEP20Transaction,
  UserBEP20TokensInfo
> {
  state = { tokens: {}, fee: 0 } as UserBEP20TokensInfo;
  parseEach(txn: RawBEP20Transaction) {
    const fee = (Number(txn.gasUsed) * Number(txn.gasPrice)) / 1e18;
    const value = Number(txn.value) / Math.pow(10, Number(txn.tokenDecimal));
    const isIn = txn.to.toLowerCase() === this.address.toLowerCase();
    const isOut = txn.from.toLowerCase() === this.address.toLowerCase();
    const tokenContract = txn.contractAddress;
    if (isIn) {
      this.state.tokens[tokenContract] =
        (this.state.tokens[tokenContract] ?? 0) + value;
    }
    if (isOut) {
      this.state.tokens[tokenContract] =
        (this.state.tokens[tokenContract] ?? 0) - value;
      this.state.fee += fee;
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
