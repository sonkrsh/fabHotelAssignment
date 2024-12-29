/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {CHANCE_OF_RAIN, HUMIDITY, UV_INDEX} from '../../utils/constants';
import backgroundcolor from '../../utils/weatherBAckgroundColor';

const CurrentWeatherContainer = ({forecastValue, location}) => {
  const colotText =
    forecastValue?.day?.condition?.text === 'Sunny' ? '#000000' : '#FFF';
  return (
    <View
      style={[
        styles.currentWeatherContainer,
        backgroundcolor(forecastValue?.day?.condition?.text),
      ]}>
      <View
        style={{
          width: '80%',
        }}>
        <Text style={[styles.currentWeatherText, {color: colotText}]}>
          {`Location:- ${location?.country} |  ${location?.name}`}
        </Text>

        <Text
          style={[
            styles.currentWeatherText,
            {color: colotText},
          ]}>{`Date:- ${forecastValue.date}`}</Text>
        <Text style={[styles.currentWeatherText, {color: colotText}]}>
          {forecastValue?.day?.condition?.text}
        </Text>
        <Text style={[styles.temperatureText, {color: colotText}]}>
          {`${forecastValue?.day?.maxtemp_c}°C / ${forecastValue?.day?.mintemp_c}°C`}
        </Text>

        <Text style={[styles.feelsLikeText, {color: colotText}]}>
          {HUMIDITY} {forecastValue?.day?.avghumidity}%
        </Text>
        <Text style={[styles.moonInfoText, {color: colotText}]}>
          {UV_INDEX} {forecastValue?.day?.uv}
        </Text>
        <Text style={[styles.moonInfoText, {color: colotText}]}>
          {CHANCE_OF_RAIN} {forecastValue?.day?.daily_chance_of_rain}
        </Text>
      </View>
      <View
        style={{
          width: '30%',
        }}>
        <Image
          style={styles.image}
          source={{
            uri: `https:${forecastValue?.day?.condition?.icon}`,
          }}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  currentWeatherContainer: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    width: '100%',
  },
  currentWeatherText: {
    fontSize: 16,
  },
  temperatureText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  feelsLikeText: {
    fontSize: 14,
  },
  moonInfoText: {
    fontSize: 12,
    marginTop: 10,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
});

export default CurrentWeatherContainer;
