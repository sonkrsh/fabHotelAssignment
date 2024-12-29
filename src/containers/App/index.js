import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../HomeScreen/index';
import DetailsScreen from '../DetailsScreen/index';
import Toast from '../../components/Toast';
import {shallowEqual, useSelector} from 'react-redux';

const Stack = createStackNavigator();

export default function App() {
  const {error} = useSelector(
    state => ({
      error: state.homeScreen.error?.message || null,
    }),
    shallowEqual,
  );

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#2F2F2F',
            },
            headerTransparent: false,
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>

      <Toast
        message={error}
        duration={2000}
        position="bottom"
        onClose={() => {}}
        style={{backgroundColor: 'red'}}
        textStyle={{color: 'white'}}
      />
    </>
  );
}
