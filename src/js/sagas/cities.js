import {call, put} from 'redux-saga/effects'
import loadCities from '../api/cities/load';

export default function* fetchCities(action) { // eslint-disable-line
  try {
    const cities = yield call(loadCities);
    yield put({type: "RESOURCES/CITIES/GET/SUCCESS", payload: cities.data});
  } catch (e) {
    yield put({type: "RESOURCES/CITIES/GET/ERROR", message: e.message});
  }
}