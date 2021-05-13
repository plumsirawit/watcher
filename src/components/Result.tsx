import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectContractAddresses,
  selectTokenData,
  selectUserData,
} from '@store/contracts';

interface IResultProps {}
export const Result = (props: IResultProps) => {
  const contracts = useSelector(selectContractAddresses);
  const tokenData = useSelector(selectTokenData);
  const userData = useSelector(selectUserData);
  const items = contracts.map((tok) => {
    const tokenDatum = tokenData[tok];
    const userDatum = userData[tok];
    return (
      <div key={tok}>
        [{tok}]{tokenDatum?.name}({tokenDatum?.symbol}): {tokenDatum?.price},{' '}
        {userDatum?.amount}
      </div>
    );
  });
  return <div>hello {items}</div>;
};
