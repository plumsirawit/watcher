import React, { useState, useEffect } from 'react';
import './App.css';
import { Result } from './components/Result';
import Container from '@components/Container';
import AppBody from '@components/AppBody';
import styled from 'styled-components';
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

export const BottomGrouping = styled.div`
  margin-top: 1rem;
`;

const App = () => {
  return (
    <Container>
      <AppBody>
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
              <Button onClick={() => {}} variant="primary" width="100%">
                Query
              </Button>
            </BottomGrouping>
          </AutoColumn>
        </CardBody>

        <Result />
      </AppBody>
    </Container>
  );
};

export default App;
