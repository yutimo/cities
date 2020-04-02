import { combineReducers } from 'redux';

import resources from './resources';
import pages from './pages';

export default combineReducers({
  resources,
  pages
});