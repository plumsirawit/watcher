import type { RootState } from '@store';

export const selectTokensData = (state: RootState) =>
  state.information.tokensData;
