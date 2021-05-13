import React from 'react';

export interface ILocalContext {
  tokens: string[];
  setTokens: (tokens: string[]) => void;
}
export const LocalContext = React.createContext<ILocalContext>({
  tokens: [],
  setTokens: () => {},
});
