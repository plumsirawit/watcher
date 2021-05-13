import type { RootState } from '..';

export const selectContractAddresses = (state: RootState) =>
  state.contracts.addresses;

export const selectTokenData = (state: RootState) => state.contracts.tokenData;
export const selectUserData = (state: RootState) => state.contracts.userData;
