import {createSelector} from '@reduxjs/toolkit';
import { RootState } from '../index';
import { CurrenciesState }  from './slice'

export const selectUser = ({ currencies }: RootState): CurrenciesState => currencies;

export const selectIsLoggedUser = createSelector(
  selectUser,
  ({ currenciesData }: CurrenciesState) => currenciesData,
);
