import { createAction } from '@reduxjs/toolkit';
import { takeEvery } from 'redux-saga/effects';

export const fetchCurrenciesDataAction = createAction('currencies/fetchCurrenciesData');

function* fetchCurrenciesData() {
  yield console.log('test');
}

export default [
  takeEvery(fetchCurrenciesDataAction, fetchCurrenciesData),
];
