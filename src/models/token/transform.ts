import type { TokenData } from './types';

export const getTokenData = async (
  tokenContractAddress: string,
): Promise<TokenData | undefined> => {
  const result = await fetch(
    `https://api.pancakeswap.info/api/v2/tokens/${tokenContractAddress}`,
  );
  const response = await result.json();
  return response.data;
};
