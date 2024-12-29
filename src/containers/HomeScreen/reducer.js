import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  searchValue: {},
  searchLoading: false,
  loading: false,
  forecastValue: {},
  noOfdays: 3,
  error: {},
};

const homeScreenSlice = createSlice({
  name: 'homeScreen',
  initialState,
  reducers: {
    getSearchValue: (state, action) => {
      state.searchLoading = true;
      state.error = '';
    },
    getSearchValueSuccess: (state, action) => {
      state.searchLoading = false;
      state.searchValue = action.payload;
    },
    getSearchValueFail: (state, action) => {
      state.searchLoading = false;
      state.searchValue = [];
      state.error = action.payload;
    },
    clearSearchValue: (state, action) => {
      state.loading = false;
      state.searchValue = [];
    },

    getWeatherForecast: (state, action) => {
      state.loading = true;
      state.error = '';
    },
    getWeatherForecastSuccess: (state, action) => {
      state.loading = false;
      state.forecastValue = action.payload;
    },
    getWeatherForecastFail: (state, action) => {
      state.loading = false;
      state.forecastValue = [];
      state.error = action.payload;
    },

    setNoOFDays: (state, action) => {
      state.loading = false;
      state.noOfdays = action.payload;
    },
  },
});

export const {
  getSearchValue,
  getSearchValueSuccess,
  getSearchValueFail,
  clearSearchValue,
  getWeatherForecast,
  getWeatherForecastSuccess,
  getWeatherForecastFail,
  setNoOFDays,
} = homeScreenSlice.actions;
export default homeScreenSlice.reducer;
