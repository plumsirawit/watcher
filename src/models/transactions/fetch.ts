import { APIKEY } from '../../constants';
import type { RawTransaction } from './types';

const encodeQuery = (params: Record<string, string>) =>
  Object.keys(params)
    .map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]);
    })
    .join('&');

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
    throw Error(`API error [${response.message}]`);
  }
};
