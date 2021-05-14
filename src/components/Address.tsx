import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '@store';
import {
  requestBEP20Transactions,
  requestBNBTransactions,
} from '@store/transactions';
import { Button, CardBody, Flex, Heading, Text } from '@pancakeswap-libs/uikit';
import { AutoColumn } from '@components/Column';
import { AddressInputPanel } from '@components/AddressInputPanel';

const StyledPageHeader = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderColor};
  padding: 24px;
`;

const Details = styled.div`
  flex: 1;
`;

const BottomGrouping = styled.div`
  margin-top: 1rem;
`;

export const AddressGroup = () => {
  const dispatch = useDispatch<AppDispatch>();
  return (
    <>
      <StyledPageHeader>
        <Flex alignItems="center">
          <Details>
            <Heading mb="8px">Watcher</Heading>
            <Text color="textSubtle" fontSize="14px">
              Observe and analyze tokens in an instant
            </Text>
          </Details>
        </Flex>
      </StyledPageHeader>
      <CardBody>
        <AutoColumn gap="md">
          <AddressInputPanel />
          <BottomGrouping>
            <Button
              onClick={() => {
                dispatch(requestBEP20Transactions());
                dispatch(requestBNBTransactions());
              }}
              variant="primary"
              width="100%"
            >
              Query
            </Button>
          </BottomGrouping>
        </AutoColumn>
      </CardBody>
    </>
  );
};
