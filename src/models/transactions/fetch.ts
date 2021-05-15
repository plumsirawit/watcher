import { encodeQuery, APIKEY } from '@utils';
import { fold } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import * as t from 'io-ts';
import type {
  IRawBEP20Transaction,
  IRawBNBTransaction,
  IRawInternalTransaction,
} from './types';
import {
  RawBEP20Transaction,
  RawBNBTransaction,
  RawInternalTransaction,
} from './types';

export const fetchBEP20Transactions = async (
  address: string,
): Promise<IRawBEP20Transaction[]> => {
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
    return pipe(
      t.array(RawBEP20Transaction).decode(response.result),
      fold(
        (left) => {
          throw Error(
            'fetchBEP20Transactions type error ' +
              left.map((err) => err.message).join(', '),
          );
        },
        (right) => right,
      ),
    );
  } else {
    throw Error(`fetchBEP20Transactions API error [${response.message}]`);
  }
};

export const fetchBNBTransactions = async (
  address: string,
): Promise<IRawBNBTransaction[]> => {
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
    return pipe(
      t.array(RawBNBTransaction).decode(response.result),
      fold(
        (left) => {
          throw Error(
            'fetchBNBTransactions type error ' +
              left.map((err) => err.message).join(', '),
          );
        },
        (right) => right,
      ),
    );
  } else {
    throw Error(`fetchBNBTransactions API error [${response.message}]`);
  }
};

export const fetchInternalTransactions = async (
  address: string,
): Promise<IRawInternalTransaction[]> => {
  const result = await fetch(
    'https://api.bscscan.com/api?' +
      encodeQuery({
        module: 'account',
        action: 'txlistinternal',
        address,
        sort: 'asc',
        apikey: APIKEY,
      }),
  );
  const response = await result.json();
  if (response.message === 'OK') {
    return pipe(
      t.array(RawInternalTransaction).decode(response.result),
      fold(
        (left) => {
          throw Error(
            'fetchInternalTransactions type error ' +
              left.map((err) => err.message).join(', '),
          );
        },
        (right) => right,
      ),
    );
  } else {
    throw Error(`fetchInternalTransactions API error [${response.message}]`);
  }
};
