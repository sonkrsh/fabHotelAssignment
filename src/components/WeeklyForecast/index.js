import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {shallowEqual, useSelector} from 'react-redux';
import HourlyForecast from '../../components/HourlyForecast';
import {DATE, MAX_MIN, RAIN_PERCENTAGE} from '../../utils/constants';
import {useNavigation} from '@react-navigation/native';

const WeatherUI = () => {
  const [visibleIndex, setVisibleIndex] = useState(null);

  const navigation = useNavigation();

  // Fetch forecast data from the Redux store
  const {forecastValue} = useSelector(
    state => ({
      forecastValue: state.homeScreen.forecastValue,
    }),
    shallowEqual,
  );

  // Extract forecast days
  const forecastDays = forecastValue?.forecast?.forecastday || [];

  return (
    <View style={styles.weeklyContainer}>
      {/* Header Row */}
      <View style={styles.dailyForecastContainer}>
        <Text style={styles.headerText}>{DATE}</Text>
        <View style={styles.tempContainer}>
          <Text style={styles.headerText}>{MAX_MIN}</Text>
        </View>
        <Text style={styles.headerText}>{RAIN_PERCENTAGE}</Text>
      </View>

      {forecastDays.map((forecast, index) => {
        const {date, day} = forecast || {};
        const {maxtemp_c, mintemp_c, daily_chance_of_rain} = day || {};

        return (
          <View key={index}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Details', {
                  item: forecastValue?.forecast?.forecastday?.[index],
                  hour: forecastValue?.forecast?.forecastday?.[index]?.hour,
                  astro: forecastValue?.forecast?.forecastday?.[index]?.astro,
                })
              }>
              <View style={styles.dailyForecastContainer}>
                <Text style={styles.day}>{date}</Text>
                <View style={styles.tempContainer}>
                  <Text style={styles.highTemp}>{maxtemp_c}°</Text>
                  <Text style={styles.lowTemp}>/{mintemp_c}°</Text>
                </View>
                <Text style={styles.rainChance}>{daily_chance_of_rain}%</Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  weeklyContainer: {
    marginTop: 10,
  },
  dailyForecastContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    paddingVertical: 10,
  },
  headerText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  day: {
    color: '#FFF',
    fontSize: 16,
  },
  tempContainer: {
    flexDirection: 'row',
  },
  highTemp: {
    color: '#FFF',
    fontSize: 16,
  },
  lowTemp: {
    color: '#CCC',
    fontSize: 14,
  },
  rainChance: {
    color: '#42A5F5',
    fontSize: 16,
  },
});

export default WeatherUI;
