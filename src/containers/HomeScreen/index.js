import React, {useEffect, useMemo} from 'react';
import {StyleSheet, SafeAreaView, View, Text, ScrollView} from 'react-native';
import Header from '../../components/Header';
import CurrentWeatherContainer from '../../components/CurrentWeatherContainer';
import HourlyForecast from '../../components/HourlyForecast';
import WeeklyForecast from '../../components/WeeklyForecast';
import {shallowEqual, useDispatch, useSelector} from 'react-redux';
import {DEFAULT_REGION, PLEASE_SELECT_CITY} from '../../utils/constants';
import AstroInfo from '../../components/Astro';
import Loader from '../../components/Loader';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getWeatherForecast, getWeatherForecastSuccess} from './reducer';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const {forecastValue, loading, noOfdays} = useSelector(
    state => ({
      forecastValue: state.homeScreen.forecastValue,
      loading: state.homeScreen.loading,
      noOfdays: state.homeScreen.noOfdays,
    }),
    shallowEqual,
  );

  const hour = useMemo(
    () => forecastValue?.forecast?.forecastday?.[0]?.hour || [],
    [forecastValue],
  );

  const hasForecastData = useMemo(
    () => Object.keys(forecastValue || {}).length > 0,
    [forecastValue],
  );

  useEffect(() => {
    const queryObject = {
      q: DEFAULT_REGION,
      days: noOfdays,
    };

    dispatch(getWeatherForecast(queryObject));

    AsyncStorage.getItem('data')
      .then(e => {
        const value = JSON.parse(e);
        dispatch(getWeatherForecastSuccess(value));
      })
      .catch(e => console.log('==somethingWent Wrong'));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Loader loading={loading} />

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        {hasForecastData ? (
          <>
            <CurrentWeatherContainer
              location={forecastValue?.location}
              forecastValue={forecastValue?.forecast?.forecastday?.[0]}
            />
            <HourlyForecast hour={hour} />
            <AstroInfo
              astro={forecastValue?.forecast?.forecastday?.[0]?.astro}
            />
            <Text style={styles.forecastTitle}>Forecast</Text>
            <WeeklyForecast />
          </>
        ) : (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>{PLEASE_SELECT_CITY}</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
    // paddingTop: 45,
  },
  scrollContainer: {
    padding: 10,
  },
  forecastTitle: {
    color: 'white',
    fontSize: 20,
    paddingTop: 10,
    fontWeight: 'bold',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  emptyStateText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
