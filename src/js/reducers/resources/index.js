import { combineReducers } from 'redux';
import metrics from './metrics';
import cities from './cities';

export default combineReducers({
  cities,
  metrics
});