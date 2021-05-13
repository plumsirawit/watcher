import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { addressSlice } from './address';
import { contractsSlice } from './contracts';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: {
    address: addressSlice.reducer,
    contracts: contractsSlice.reducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
