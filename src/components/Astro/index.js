import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import SunIcon from '../../assets/images/sun.jpeg';
import MoonIcon from '../../assets/images/moon.jpeg';

const AstroInfo = ({astro}) => {
  const {
    sunrise,
    sunset,
    moonrise,
    moonset,
    moon_phase,
    moon_illumination,
    is_moon_up,
    is_sun_up,
  } = astro;

  return (
    <View style={styles.container}>
      {/* Sun Details */}
      <View style={styles.section}>
        <Image source={SunIcon} style={styles.icon} />
        <View>
          <Text style={styles.title}>Sun</Text>
          <Text style={styles.detail}>Sunrise: {sunrise}</Text>
          <Text style={styles.detail}>Sunset: {sunset}</Text>
          <Text style={styles.status}>
            {is_sun_up ? 'Sun is up' : 'Sun is down'}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Moon Details */}
      <View style={styles.section}>
        <Image source={MoonIcon} style={styles.icon} />
        <View>
          <Text style={styles.title}>Moon</Text>
          <Text style={styles.detail}>Moonrise: {moonrise}</Text>
          <Text style={styles.detail}>Moonset: {moonset}</Text>
          <Text style={styles.detail}>Phase: {moon_phase}</Text>
          <Text style={styles.detail}>Illumination: {moon_illumination}%</Text>
          <Text style={styles.status}>
            {is_moon_up ? 'Moon is up' : 'Moon is down'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#2F2F2F',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 10,
  },
  title: {
    color: '#FFD700',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detail: {
    color: 'white',
    fontSize: 14,
    marginBottom: 2,
  },
  status: {
    color: '#ADD8E6',
    fontSize: 14,
    marginTop: 5,
  },
  divider: {
    height: 1,
    backgroundColor: '#444',
    marginVertical: 10,
  },
});

export default AstroInfo;
