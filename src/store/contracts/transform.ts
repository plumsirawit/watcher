import type { UserData } from '../../models/token/types';
import { getGetUserData, getTokenData, TokenData } from '../../models/token';

export const getTokensDataFromContractAddresses = async (
  contractAddresses: string[],
): Promise<Record<string, TokenData>> =>
  Promise.all(
    contractAddresses.map((contract) =>
      Promise.all([contract, getTokenData(contract)]),
    ),
  ).then((arr) => Object.fromEntries(arr));

export const getUserDataFromContractAddressesAndAccount = async (
  contractAddresses: string[],
  accountAddress: string,
): Promise<Record<string, UserData>> => {
  const getUserData = getGetUserData(accountAddress);
  return Object.fromEntries(
    await contractAddresses.reduce(
      (pre, cur) =>
        pre.then((res: [string, UserData][]) =>
          Promise.all([...res, Promise.all([cur, getUserData(cur)])]),
        ),
      Promise.resolve([] as [string, UserData][]),
    ),
  );
};
