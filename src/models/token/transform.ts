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

// @todo: get user data from past txn instead of fetching each token
export const getGetUserData =
  (userAddress: string) =>
  async (tokenContractAddress: string): Promise<UserData> => {
    try {
      const result = await fetch(
        'https://api.bscscan.com/api?' +
          encodeQuery({
            module: 'account',
            action: 'tokenbalance',
            contractAddress: tokenContractAddress,
            address: userAddress,
            tag: 'latest',
            apikey: APIKEY,
          }),
      );
      const response = await result.json();
      await new Promise((res) => setTimeout(res, 500));
      return { amount: Number(response.result ?? 0) };
    } catch (e) {
      console.log(e);
      return { amount: 0 };
    }
  };
