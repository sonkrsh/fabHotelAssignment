import {combineReducers} from '@reduxjs/toolkit';
import HomeScreenReducer from './src/containers/HomeScreen/reducer';

const rootReducer = combineReducers({
  homeScreen: HomeScreenReducer,
});

export default rootReducer;
