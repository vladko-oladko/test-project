import { combineReducers } from 'redux';
import currencies from './currencies/slice';
import analysis from './analysis/slice';

export default combineReducers({
  currencies,
  analysis,
});
