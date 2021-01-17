import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import reducer from './rootReducer';
import saga from './rootSaga';

export const createStore = () => {
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    ...getDefaultMiddleware(),
    sagaMiddleware,
  ];

  if (process.env.NODE_ENV === 'development') {
    middleware.push(createLogger({ collapsed: true }));
  }

  const store = configureStore({ middleware, reducer });

  sagaMiddleware.run(saga);

  return store;
};

export type RootState = ReturnType<typeof reducer>;
