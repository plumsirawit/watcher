import React from 'react';

export interface ILocalContext {
  tokens: Set<string>;
  setTokens: (tokens: Set<string>) => void;
}
export const LocalContext = React.createContext<ILocalContext>({
  tokens: new Set(),
  setTokens: () => {},
});
