import {all} from 'redux-saga/effects';
import HomeScreen from './src/containers/HomeScreen/saga';

export default function* rootSaga() {
  yield all([HomeScreen()]);
}
