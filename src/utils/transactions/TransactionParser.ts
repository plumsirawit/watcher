interface BaseTransaction {
  to: string;
  from: string;
  gasUsed: string;
  value: string;
}

export abstract class TransactionParser<T extends BaseTransaction, U> {
  abstract state: U;
  constructor(protected txns: T[], protected address: string) {}

  abstract parseEach(txn: T): U;
  public parseAll(): U {
    this.txns.forEach(this.parseEach, this);
    return this.state;
  }
}
