import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { CurrenciesState } from './slice';

export const selectCurrencies = ({ currencies }: RootState): CurrenciesState => currencies;

export const selectCurrenciesData = createSelector(
  selectCurrencies,
  ({ currenciesData }: CurrenciesState) => currenciesData || [],
);

export const selectCurrenciesTime = createSelector(
  selectCurrencies,
  ({ currenciesTime }: CurrenciesState) => currenciesTime,
);

export const selectCurrenciesLoading = createSelector(
  selectCurrencies,
  ({ currenciesLoading }: CurrenciesState) => currenciesLoading,
);

export const selectError = createSelector(
  selectCurrencies,
  ({ error }: CurrenciesState) => error,
);
