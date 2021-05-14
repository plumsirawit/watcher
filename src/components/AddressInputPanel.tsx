import React, { ChangeEventHandler } from 'react';
import { Button, Input, Text } from '@pancakeswap-libs/uikit';
import styled from 'styled-components';
import { RowBetween } from './Row';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from '@store';
import { selectAddress, setAddress } from '@store/address';

const InputRow = styled.div<{ selected: boolean }>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: ${({ selected }) =>
    selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem'};
`;
const LabelRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
`;
const InputPanel = styled.div<{ hideInput?: boolean }>`
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 1;
`;
const Container = styled.div<{ hideInput?: boolean }>`
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.input};
  box-shadow: ${({ theme }) => theme.shadows.inset};
`;
const StyledInput = styled.input<{
  error?: boolean;
  fontSize?: string;
  align?: string;
}>`
  color: ${({ error, theme }) =>
    error ? theme.colors.failure : theme.colors.text};
  width: 0;
  position: relative;
  font-weight: 500;
  outline: none;
  border: none;
  flex: 1 1 auto;
  background-color: transparent;
  font-size: 16px;
  text-align: ${({ align }) => align && align};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
  -webkit-appearance: textfield;
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  [type='number'] {
    -moz-appearance: textfield;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  ::placeholder {
    color: ${({ theme }) => theme.colors.textSubtle};
  }
`;
export const AddressInputPanel = () => {
  const dispatch = useDispatch<AppDispatch>();
  const address = useSelector(selectAddress);
  return (
    <InputPanel>
      <Container>
        <LabelRow>
          <Text fontSize="14px">Account Address</Text>
        </LabelRow>
        <InputRow selected={false}>
          <StyledInput
            className="token-amount-input"
            type="text"
            value={address}
            onChange={(e) => dispatch(setAddress(e.target.value))}
          />
        </InputRow>
      </Container>
    </InputPanel>
  );
};
