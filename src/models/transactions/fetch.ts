import { encodeQuery, APIKEY } from '@utils';
import type { RawTransaction } from './types';

export const fetchTransaction = async (
  address: string,
): Promise<RawTransaction[]> => {
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
    throw Error(`fetchTransaction API error [${response.message}]`);
  }
};

export const getTokensList = (raw: RawTransaction[]) =>
  Array.from(new Set(raw.map((txn) => txn.contractAddress)));
