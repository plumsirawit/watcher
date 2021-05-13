import React, { useContext, useEffect, useMemo, useState } from 'react';
import type { UserData } from '../models/token/types';
import { getGetUserData, getTokenData, TokenData } from '../models/token';
import { GlobalContext } from './GlobalContext';
import { LocalContext } from './LocalContext';

interface IResultProps {}
export const Result = (props: IResultProps) => {
  const { tokens } = useContext(LocalContext);
  const { address } = useContext(GlobalContext);
  const getUserData = getGetUserData(address);
  const [tokenData, setTokenData] = useState<TokenData[]>([]);
  const [userData, setUserData] = useState<UserData[]>([]);
  useEffect(() => {
    Promise.all(tokens.map(getTokenData)).then((tokDats) =>
      setTokenData(tokDats.filter((tokDat) => !!tokDat?.name) as TokenData[]),
    );
    tokens
      .reduce(
        (pre: Promise<UserData[]>, cur) =>
          pre.then((res: UserData[]) =>
            Promise.all([...res, getUserData(cur)]),
          ),
        Promise.resolve([]),
      )
      .then(setUserData);
  }, [tokens]);
  const items = tokenData.map((tok, idx) => (
    <div key={tok.name}>
      {tok.name}({tok.symbol}): {tok.price}, {userData[idx]?.amount}
    </div>
  ));
  return <div>hello {items}</div>;
};
