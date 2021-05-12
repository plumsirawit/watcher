import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalContext, IGlobalContext } from './components/GlobalContext';
import { ILocalContext, LocalContext } from './components/LocalContext';
import './index.css';

const GlobalWrapper = (props: React.PropsWithChildren<{}>) => {
  const rawLocalStorageValue = localStorage.getItem('watcher-global-context');
  const defaultValue = rawLocalStorageValue
    ? JSON.parse(rawLocalStorageValue)
    : { address: '' };
  const [address, setAddress] = useState<string>(defaultValue.address);
  const globalContext: IGlobalContext = {
    address,
    setAddress,
  };
  useEffect(() => {
    localStorage.setItem('watcher-global-context', JSON.stringify({ address }));
  }, [address]);

  const [tokens, setTokens] = useState<Set<string>>(new Set());
  const localContext: ILocalContext = {
    tokens,
    setTokens,
  };
  return (
    <GlobalContext.Provider value={globalContext}>
      <LocalContext.Provider value={localContext}>
        {props.children}
      </LocalContext.Provider>
    </GlobalContext.Provider>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <GlobalWrapper>
      <App />
    </GlobalWrapper>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
