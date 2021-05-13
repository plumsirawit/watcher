import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { addressSlice } from './address';
import { transactionsSlice } from './transactions';
import { informationSlices } from './information';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];

const store = configureStore({
  reducer: {
    address: addressSlice.reducer,
    transactions: transactionsSlice.reducer,
    information: informationSlices.reducer,
  },
  middleware,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
