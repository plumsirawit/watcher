import React, { useContext, useEffect, useMemo, useState } from 'react';
import { getTokenData, TokenData } from '../models/token';
import { LocalContext } from './LocalContext';

interface IResultProps {}
export const Result = (props: IResultProps) => {
  const { tokens } = useContext(LocalContext);
  const [tokenData, setTokenData] = useState<TokenData[]>([]);
  useEffect(() => {
    Promise.all(Array.from(tokens).map(getTokenData)).then((tokDats) =>
      setTokenData(tokDats.filter((tokDat) => !!tokDat?.name) as TokenData[]),
    );
  }, [tokens]);
  const items = tokenData.map((tok) => (
    <div key={tok.name}>
      {tok.name}({tok.symbol}): {tok.price}
    </div>
  ));
  return <div>hello {items}</div>;
};
