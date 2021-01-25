import { createAction } from '@reduxjs/toolkit';
import { takeEvery, put, delay } from 'redux-saga/effects';
import axios from 'axios';

import {
  setAnalysisDataAction,
  setAnalysisLoadingAction,
  setErrorAction,
} from './slice';

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

export interface ActionData {
  type: string,
  payload: string,
}

export const fetchPageForAnalysisAction = createAction('currencies/fetchPageForAnalysis', withPayloadType<string>());

function* fetchPageForAnalysis(data: ActionData) {
  try {
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const { payload } = data;
    yield put(setAnalysisLoadingAction(true));
    const response = yield axios.get(proxy + payload);
    yield put(setAnalysisDataAction(response?.data));
    yield put(setErrorAction(null));
  } catch (e) {
    yield put(setErrorAction(e.message || 'Server error'));
  } finally {
    yield put(setAnalysisLoadingAction(false));
  }
}

export default [
  takeEvery(fetchPageForAnalysisAction, fetchPageForAnalysis),
];
