/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export interface AnalysisState {
  analysisData: string,
  analysisLoading: boolean,
  error: string | null,
}

const initialState: AnalysisState = {
  analysisData: '',
  analysisLoading: false,
  error: null,
};

const analysisSlice = createSlice({
  name: 'analysis',
  initialState,
  reducers: {
    setAnalysisData(state, { payload }) {
      state.analysisData = payload;
    },
    setAnalysisLoading(state, { payload }) {
      state.analysisLoading = payload;
    },
    setError(state, { payload }) {
      state.error = payload;
    },
  },
});

export const {
  setAnalysisData: setAnalysisDataAction,
  setAnalysisLoading: setAnalysisLoadingAction,
  setError: setErrorAction,
} = analysisSlice.actions;

export default analysisSlice.reducer;
