/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface CurrenciesState {
  currenciesData: object | null,
}

const initialState: CurrenciesState = {
  currenciesData: null,
};

const currenciesSlice = createSlice({
  name: 'currencies',
  initialState,
  reducers: {
    setCurrenciesData(state, { payload: status }) {
      state.currenciesData = status;
    },
  },
});

export const {
  setCurrenciesData: setCurrenciesDataAction
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
