import React from 'react';
import './App.css';
import { Result } from './components/Result';
import Container from '@components/Container';
import AppBody from '@components/AppBody';
import { AddressGroup } from '@components/Address';

const App = () => {
  return (
    <Container>
      <AppBody>
        <AddressGroup />
      </AppBody>
      <Result />
    </Container>
  );
};

export default App;
