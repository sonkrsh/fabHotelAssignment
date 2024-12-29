import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {NEXT_FEW_HOURS} from '../../utils/constants';
import backgroundcolor from '../../utils/weatherBAckgroundColor';

const HourlyForecast = ({hour}) => {
  return (
    <View style={styles.hourlyContainer}>
      <Text style={styles.hourlyTitle}>{NEXT_FEW_HOURS}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hour?.map((time, index) => (
          <TouchableOpacity key={index}>
            <View
              key={index}
              style={[
                styles.hourlyBox,
                backgroundcolor(time?.condition?.text),
              ]}>
              <Image
                source={{
                  uri: `https:${time?.condition?.icon}`,
                }}
                style={styles.image}
              />

              <Text style={styles.hourlyTime}>
                {time?.time?.split(' ')?.[1]}
              </Text>
              <Text style={styles.hourlyTemp}>{time?.temp_c}°</Text>
              <Text style={styles.hourlyTemp}>{time?.condition?.text}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  hourlyContainer: {
    marginBottom: 20,
  },
  hourlyTitle: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 10,
  },
  hourlyBox: {
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  hourlyTime: {
    color: '#FFF',
    fontSize: 12,
    textAlign: 'center',
  },
  hourlyTemp: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  image: {
    width: 60,
    height: 60,
  },
});

export default HourlyForecast;
