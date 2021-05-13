import React from 'react';
import { useSelector } from 'react-redux';
import { selectContractAddresses } from '@store/transactions';

interface IResultProps {}
export const Result = (props: IResultProps) => {
  const contracts = useSelector(selectContractAddresses);
  return <div>hello</div>;
};
