import * as t from 'io-ts';
import { fold } from 'fp-ts/lib/Either';
import { encodeQuery } from '@utils/encodeQuery';
import { pipe } from 'fp-ts/lib/function';
import { APIKEY } from '../../constants';

export const TokenBalance = t.type({
  status: t.string,
  message: t.string,
  result: t.string,
});
export const fetchBNBBalance = async (address: string) => {
  const result = await fetch(
    'https://api.bscscan.com/api?' +
      encodeQuery({
        module: 'account',
        action: 'balance',
        address,
        tag: 'latest',
        apikey: APIKEY,
      }),
  );
  const response = await result.json();
  if (response.message === 'OK') {
    return pipe(
      TokenBalance.decode(response),
      fold(
        (left) => {
          throw Error(
            'fetchBNBBalance type error ' +
              left.map((err) => err.message).join(', '),
          );
        },
        (right) => right,
      ),
    );
  } else {
    throw Error(`fetchBNBBalance API error [${response.message}]`);
  }
};
