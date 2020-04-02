import {call, put} from 'redux-saga/effects';
import loadTreemap from '../api/treemap/load';

export default function* fetchTreemap(action) { // eslint-disable-line
  try {
    const treemap = yield call(loadTreemap);
    yield put({type: "TREEMAP/CHART/GET/SUCCESS", payload: treemap.data});
  } catch (e) {
    yield put({type: "TREEMAP/CHART/GET/ERROR", message: e.message});
  }
}