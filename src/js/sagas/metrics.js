import {call, put} from 'redux-saga/effects';
import loadMetrics from '../api/metrics/load';

export default function* fetchMetrics(action) { // eslint-disable-line
  try {
    const metrics = yield call(loadMetrics);
    yield put({type: "RESOURCES/METRICS/GET/SUCCESS", payload: metrics.data});
  } catch (e) {
    yield put({type: "RESOURCES/METRICS/GET/ERROR", message: e.message});
  }
}