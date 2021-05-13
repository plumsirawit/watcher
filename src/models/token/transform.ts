import { encodeQuery, APIKEY } from '@utils';
import type { TokenData, UserData } from './types';

export const getTokenData = async (
  tokenContractAddress: string,
): Promise<TokenData> => {
  console.log('tokenContractAddress', tokenContractAddress);
  const result = await fetch(
    'https://api.pancakeswap.info/api/v2/tokens/' + tokenContractAddress,
  );
  const response = await result.json();
  return response.data;
};
