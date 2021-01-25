import { all } from 'redux-saga/effects';
import currencies from './currencies/sagas';
import analysis from './analysis/sagas';

export default function* rootSaga() {
  yield all([
    ...currencies,
    ...analysis,
  ]);
}
