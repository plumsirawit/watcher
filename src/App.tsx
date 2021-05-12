import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { AddressGroup } from './components/Address';
import { Result } from './components/Result';

interface AppProps {}

const App = ({}: AppProps) => {
  return (
    <>
      <AddressGroup />
      <Result />
    </>
  );
};

export default App;
