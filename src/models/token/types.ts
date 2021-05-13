export interface TokenData {
  name: string;
  symbol: string;
  price: string;
  price_BNB: string;
}

export interface UserData {
  amount: number;
}

export type TokenUserData = TokenData & UserData;
