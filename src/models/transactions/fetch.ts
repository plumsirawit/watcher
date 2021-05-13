import { encodeQuery, APIKEY } from '@utils';
import type { RawBEP20Transaction, RawBNBTransaction } from './types';

export const fetchBEP20Transactions = async (
  address: string,
): Promise<RawBEP20Transaction[]> => {
  const result = await fetch(
    'https://api.bscscan.com/api?' +
      encodeQuery({
        module: 'account',
        action: 'tokentx',
        address,
        sort: 'asc',
        apikey: APIKEY,
      }),
  );
  const response = await result.json();
  if (response.message === 'OK') {
    return response.result;
  } else {
    throw Error(`fetchBEP20Transactions API error [${response.message}]`);
  }
};

export const fetchBNBTransactions = async (
  address: string,
): Promise<RawBNBTransaction[]> => {
  const result = await fetch(
    'https://api.bscscan.com/api?' +
      encodeQuery({
        module: 'account',
        action: 'txlist',
        address,
        sort: 'asc',
        apikey: APIKEY,
      }),
  );
  const response = await result.json();
  if (response.message === 'OK') {
    return response.result;
  } else {
    throw Error(`fetchBNBTransactions API error [${response.message}]`);
  }
};
