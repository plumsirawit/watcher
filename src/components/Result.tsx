import React from 'react';
import { useSelector } from 'react-redux';
import { selectContractAddresses } from '@store/transactions';
import { selectTokenUserData } from '@store/information';

interface IResultProps {}
export const Result = (props: IResultProps) => {
  const tokenUserData = useSelector(selectTokenUserData);
  const tokens = Object.entries(tokenUserData.tokens);
  const netWorth = tokens.reduce(
    (pre, [_, { amount, price }]) => pre + amount * Number(price?.price ?? 0),
    0,
  );
  const items = tokens.map(([contract, { amount, price }]) => {
    return (
      price && (
        <div key={contract}>
          <div>{contract}</div>
          <div>
            {price.name}({price.symbol})
          </div>
          <div>{price.price}</div>
          <div>{amount}</div>
          <div>{amount * Number(price.price)}</div>
        </div>
      )
    );
  });
  return (
    <div>
      BNBVALUE {tokenUserData.BNBAmount}, {tokenUserData.BNBPrice} <br />
      hello {items} {netWorth}
    </div>
  );
};
