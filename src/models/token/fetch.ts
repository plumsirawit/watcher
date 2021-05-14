import type { TokenPrice } from './types';

/**
 * @todo: use https://github.com/pancakeswap/pancake-swap-interface-v1/blob/76dd2ce0cc15205166c8352f3d7978170ce5a5d4/src/hooks/Trades.ts#L87 instead of linear approximation.
 * This would give a result with higher accuracy.
 **/

export const fetchTokenPrice = async (
  tokenContractAddress: string,
): Promise<TokenPrice> => {
  console.log('tokenContractAddress', tokenContractAddress);
  const result = await fetch(
    'https://api.pancakeswap.info/api/tokens/' + tokenContractAddress,
  );
  const response = await result.json();
  return response.data;
};

export const fetchBNBPrice = async (): Promise<number> => {
  const result = await fetch(
    'https://api.pancakeswap.info/api/tokens/0x55d398326f99059ff775485246999027b3197955', // USDT contract address
  );
  const response = await result.json();
  return 1 / response.data?.price_BNB;
};
