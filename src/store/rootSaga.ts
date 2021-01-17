import { all } from 'redux-saga/effects';
import currencies from './currencies/sagas';

export default function* rootSaga() {
  yield all([
    ...currencies,
  ]);
}
