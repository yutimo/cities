import { combineReducers } from 'redux';
import treemap from './treemap';
import selectedCities from './selectedCities';
import selectedMetric from './selectedMetric';

export default combineReducers({
  treemap,
  selectedCities,
  selectedMetric
});