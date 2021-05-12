import React, { useContext } from 'react';
import { GlobalContext } from './GlobalContext';
import styled from 'styled-components';
import { fetchTransaction, selectTokensList } from '../models/transactions';
import { LocalContext } from './LocalContext';

const AddressInput = styled.input`
  flex: 1;
  margin: 10px 0px 10px 10vw;
  padding: 10px;
  outline: none;
  border: 0px;
  border-radius: 1em;
  background: #23eab2;
`;

export const AddressBar = () => {
  const { address, setAddress } = useContext(GlobalContext);
  return (
    <AddressInput
      type="text"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    />
  );
};

const AddressDiv = styled.div`
  display: flex;
  width: 100%;
`;

const AddressButton = styled.button`
  min-width: 5vmin;
  margin: 10px 10vw 10px 10px;
`;

export const AddressGroup = () => {
  const { address } = useContext(GlobalContext);
  const { setTokens } = useContext(LocalContext);
  return (
    <AddressDiv>
      <AddressBar />
      <AddressButton
        onClick={async () => {
          const txns = await fetchTransaction(address);
          setTokens(selectTokensList(txns));
        }}
      />
    </AddressDiv>
  );
};
