/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface Currency {
  code: string,
  description: string,
  rate: string,
  rate_float: number,
  symbol: string,
}

export interface CurrenciesState {
  currenciesData: Array<Currency> | null,
  currenciesTime: string | null,
  currenciesLoading: boolean,
  error: string | null,
}

const initialState: CurrenciesState = {
  currenciesData: null,
  currenciesTime: null,
  currenciesLoading: false,
  error: null,
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setCurrenciesData(state, { payload }) {
      state.currenciesData = payload;
    },
    setCurrenciesTime(state, { payload }) {
      state.currenciesTime = payload;
    },
    setCurrenciesLoading(state, { payload }) {
      state.currenciesLoading = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const {
  setCurrenciesData: setCurrenciesDataAction,
  setCurrenciesTime: setCurrenciesTimeAction,
  setCurrenciesLoading: setCurrenciesLoadingAction,
  setError: setErrorAction,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
