import React from 'react';
import {Provider} from 'react-redux';
import store from './store';
import App from './src/containers/App';

const WeatherApp = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default WeatherApp;
