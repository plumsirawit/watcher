import React, { useContext } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setAddress, selectAddress } from '@store/address';
import type { AppDispatch } from '@store';
import {
  requestBEP20Transactions,
  requestBNBTransactions,
} from '@store/transactions';
import { Input } from '@pancakeswap-libs/uikit';

/*
const AddressInput = styled.input`
  flex: 1;
  margin: 10px 0px 10px 10vw;
  padding: 10px;
  outline: none;
  border: 0px;
  border-radius: 1em;
  background: #23eab2;
`;
*/

const AddressDiv = styled.div`
  display: flex;
  width: 100%;
`;

const AddressButton = styled.button`
  min-width: 5vmin;
  margin: 10px 10vw 10px 10px;
`;

export const AddressGroup = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <AddressDiv>
      <AddressButton
        onClick={() => {
          dispatch(requestBEP20Transactions());
          dispatch(requestBNBTransactions());
        }}
      />
    </AddressDiv>
  );
};
