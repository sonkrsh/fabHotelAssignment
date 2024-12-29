import React from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import CurrentWeatherContainer from '../../components/CurrentWeatherContainer';
import HourlyForecast from '../../components/HourlyForecast';
import {shallowEqual, useSelector} from 'react-redux';
import AstroInfo from '../../components/Astro';

const DetailsScreen = ({route: params}) => {
  const {forecastValue} = useSelector(
    state => ({
      forecastValue: state.homeScreen.forecastValue,
    }),
    shallowEqual,
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <CurrentWeatherContainer
          forecastValue={params?.params?.item}
          location={forecastValue?.location}
        />
        <HourlyForecast hour={params?.params?.hour} />

        <AstroInfo astro={params?.params?.astro} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F2F2F',
  },
  scrollContainer: {
    padding: 10,
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

export default DetailsScreen;
