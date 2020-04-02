import {takeLatest} from 'redux-saga/effects';
import fetchCities from './cities';
import fetchMetrics from './metrics';
import fetchTreemap from './treemap';

function* mySaga() {
  yield takeLatest('RESOURCES/CITIES/GET/PENDING', fetchCities);
  yield takeLatest('RESOURCES/METRICS/GET/PENDING', fetchMetrics);
  yield takeLatest('TREEMAP/CHART/GET/PENDING', fetchTreemap);
}

export default mySaga;