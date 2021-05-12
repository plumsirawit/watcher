import React from 'react';

export interface IGlobalContext {
  address: string;
  setAddress: (address: string) => void;
}
export const GlobalContext = React.createContext<IGlobalContext>({
  address: '',
  setAddress: () => {},
});
