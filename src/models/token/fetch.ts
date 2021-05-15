import {
  ChainId,
  CurrencyAmount,
  Fetcher,
  TokenAmount,
  Trade,
} from '@pancakeswap-libs/sdk';
import type { UserInfo } from '@store/transactions/types';
import { JsonRpcProvider } from '@ethersproject/providers';
const provider = new JsonRpcProvider('https://bsc-dataseed1.binance.org/');

/**
 * @todo: use https://github.com/pancakeswap/pancake-swap-interface-v1/blob/76dd2ce0cc15205166c8352f3d7978170ce5a5d4/src/hooks/Trades.ts#L87 instead of linear approximation.
 * This would give a result with higher accuracy.
 **/

export const fetchTokensDataFromUserInfo = async ({
  BNBAmount,
  tokens,
  fee,
}: UserInfo) => {
  const tokenAmounts: Record<string, TokenAmount> = Object.fromEntries(
    await Promise.all(
      Object.entries(tokens).map(async ([token, amount]) => {
        const tokenData = await Fetcher.fetchTokenData(
          ChainId.MAINNET,
          token,
          provider,
        );
        return [token, new TokenAmount(tokenData, amount)];
      }) as Promise<[string, TokenAmount]>[],
    ),
  );
  return {
    tokens: tokenAmounts,
    BNBAmount: CurrencyAmount.ether(BNBAmount),
    fee: CurrencyAmount.ether(fee),
  };
};

export const fetchBNBPrice = async (): Promise<number> => {
  const BUSD = await Fetcher.fetchTokenData(
    ChainId.MAINNET,
    '0xe9e7cea3dedca5984780bafc599bd69add087d56',
    provider,
  ); // BUSD
  const WBNB = await Fetcher.fetchTokenData(
    ChainId.MAINNET,
    '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    provider,
  ); // WBNB
  const pair = await Fetcher.fetchPairData(WBNB, BUSD);
  const [trade] = Trade.bestTradeExactIn(
    [pair],
    new TokenAmount(WBNB, '1'),
    BUSD,
  );
  return Number(trade.outputAmount.toFixed(2));
};
