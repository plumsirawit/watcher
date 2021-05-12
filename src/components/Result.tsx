import React, { useContext, useEffect, useMemo, useState } from 'react';
import { GlobalContext } from './GlobalContext';
import { LocalContext } from './LocalContext';

interface IResultProps {}
export const Result = (props: IResultProps) => {
  const { tokens } = useContext(LocalContext);
  const items = Array.from(tokens).map((tok) => <div key={tok}>{tok}</div>);
  return <div>hello {items}</div>;
};
