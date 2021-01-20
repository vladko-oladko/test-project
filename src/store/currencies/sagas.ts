import { createAction } from '@reduxjs/toolkit';
import { takeEvery, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  setCurrenciesDataAction,
  setCurrenciesLoadingAction,
  setCurrenciesTimeAction,
  setErrorAction,
} from './slice';

export const fetchCurrenciesDataAction = createAction('currencies/fetchCurrenciesData');

function* fetchCurrenciesData() {
  try {
    yield put(setCurrenciesLoadingAction(true));
    const { data } = yield axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
    yield delay(1000);

    const currenciesData = Object.keys(data?.bpi).map((item) => data?.bpi[item]) || null;
    const currenciesTime = data?.time?.updated || null;

    yield put(setCurrenciesDataAction(currenciesData));
    yield put(setCurrenciesTimeAction(currenciesTime));
    yield put(setErrorAction(null));
  } catch (e) {
    yield put(setErrorAction(e.message || 'Server error'));
  } finally {
    yield put(setCurrenciesLoadingAction(false));
  }
}

export default [
  takeEvery(fetchCurrenciesDataAction, fetchCurrenciesData),
];
