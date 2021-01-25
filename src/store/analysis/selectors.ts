import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { AnalysisState } from './slice';

export const selectAnalysis = ({ analysis }: RootState): AnalysisState => analysis;

export const selectAnalysisData = createSelector(
  selectAnalysis,
  ({ analysisData }: AnalysisState) => analysisData,
);

export const selectAnalysisLoading = createSelector(
  selectAnalysis,
  ({ analysisLoading }: AnalysisState) => analysisLoading,
);

export const selectError = createSelector(
  selectAnalysis,
  ({ error }: AnalysisState) => error,
);
