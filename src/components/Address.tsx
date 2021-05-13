import React, { useContext } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { setAddress } from '../store/address';
import { selectAddress } from '../store/address/selectors';
import type { AppDispatch } from '../store';
import { requestContracts } from '../store/contracts';

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
  const dispatch = useDispatch<AppDispatch>();
  const address = useSelector(selectAddress);

  return (
    <AddressInput
      type="text"
      value={address}
      onChange={(e) => dispatch(setAddress(e.target.value))}
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
  const dispatch = useDispatch<AppDispatch>();
  return (
    <AddressDiv>
      <AddressBar />
      <AddressButton
        onClick={() => {
          dispatch(requestContracts());
        }}
      />
    </AddressDiv>
  );
};
