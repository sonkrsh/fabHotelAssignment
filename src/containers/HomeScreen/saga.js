import {
  getSearchValue,
  getSearchValueFail,
  getSearchValueSuccess,
  getWeatherForecast,
  getWeatherForecastFail,
  getWeatherForecastSuccess,
} from './reducer';
import {call, put, takeEvery} from 'redux-saga/effects';
import request from '../../utils/request';
import objectToQueryString from '../../utils/objectToQueryString';
import AsyncStorage from '@react-native-async-storage/async-storage';

function* getSearchValueSaga({payload}) {
  try {
    const options = {
      url: `search.json?q=${payload}&key=e58d810dca3744e5b24135829242712`,
      method: 'get',
    };

    const res = yield call(request, options);
    yield put(getSearchValueSuccess(res));
  } catch (error) {
    yield put(getSearchValueFail(error));
  }
}

function* getWeatherForecastSaga({payload}) {
  const encodedValue = objectToQueryString(payload);

  try {
    const options = {
      url: `forecast.json?${encodedValue}&key=e58d810dca3744e5b24135829242712`,
      method: 'get',
    };

    const res = yield call(request, options);

    yield AsyncStorage.setItem('data', JSON.stringify(res));

    yield put(getWeatherForecastSuccess(res));
  } catch (error) {
    yield put(getWeatherForecastFail(error));
  }
}

function* watchHomeScreen() {
  yield takeEvery(getSearchValue.type, getSearchValueSaga);
  yield takeEvery(getWeatherForecast.type, getWeatherForecastSaga);
}

export default watchHomeScreen;
