import type { TokenPrice } from './types';

export const fetchTokenPrice = async (
  tokenContractAddress: string,
): Promise<TokenPrice> => {
  console.log('tokenContractAddress', tokenContractAddress);
  const result = await fetch(
    'https://api.pancakeswap.info/api/v2/tokens/' + tokenContractAddress,
  );
  const response = await result.json();
  return response.data;
};

export const fetchBNBPrice = async (): Promise<number> => {
  const result = await fetch(
    'https://api.pancakeswap.info/api/v2/tokens/0x55d398326f99059ff775485246999027b3197955', // USDT contract address
  );
  const response = await result.json();
  return 1 / response.data?.price_BNB;
};
