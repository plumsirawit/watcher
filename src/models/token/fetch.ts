import {
  ChainId,
  Currency,
  CurrencyAmount,
  Fetcher,
  TokenAmount,
  Trade,
} from '@pancakeswap-libs/sdk';
import type { UserInfo } from '@store/transactions/types';
import { JsonRpcProvider } from '@ethersproject/providers';
import { TokensData } from '@store/information';
import {
  SCurrency,
  SCurrencyAmount,
  STokenAmount,
} from '@models/utils/serializable-types';
const provider = new JsonRpcProvider('https://bsc-dataseed1.binance.org/');

const fetchTokenNameAndSymbol = async (token: string) => {
  const response = await fetch(
    `https://api.pancakeswap.info/api/v2/tokens/${token}`,
  );
  const info = await response.json();
  return info.data;
};

const serializeCurrency = ({
  decimals,
  symbol,
  name,
}: Currency): SCurrency => ({
  decimals,
  symbol,
  name,
});
const serializeCurrencyAmount = ({
  currency,
  numerator,
  denominator,
}: CurrencyAmount): SCurrencyAmount => ({
  currency: serializeCurrency(currency),
  numerator,
  denominator,
});
const serializeTokenAmount = ({
  currency,
  token,
  numerator,
  denominator,
}: TokenAmount): STokenAmount => ({
  currency: serializeCurrency(currency),
  token: {
    decimals: token.decimals,
    symbol: token.symbol,
    name: token.name,
    chainId: token.chainId,
    address: token.address,
  },
  numerator,
  denominator,
});

/**
 * @todo: use https://github.com/pancakeswap/pancake-swap-interface-v1/blob/76dd2ce0cc15205166c8352f3d7978170ce5a5d4/src/hooks/Trades.ts#L87 instead of linear approximation.
 * This would give a result with higher accuracy.
 **/

export const fetchTokensDataFromUserInfo = async ({
  BNBAmount,
  tokens,
  fee,
}: UserInfo): Promise<TokensData> => {
  const tokenAmounts = (await Promise.all(
    Object.entries(tokens).map(async ([token, amount]) => {
      const { name = '', symbol = undefined } =
        (await fetchTokenNameAndSymbol(token)) ?? {};
      const tokenData = await Fetcher.fetchTokenData(
        ChainId.MAINNET,
        token,
        provider,
        symbol,
        name,
      );
      return [token, serializeTokenAmount(new TokenAmount(tokenData, amount))];
    }),
  ).then(Object.fromEntries)) as Record<string, STokenAmount>;
  return {
    tokens: tokenAmounts,
    BNBAmount: serializeCurrencyAmount(CurrencyAmount.ether(BNBAmount)),
    fee: serializeCurrencyAmount(CurrencyAmount.ether(fee)),
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
