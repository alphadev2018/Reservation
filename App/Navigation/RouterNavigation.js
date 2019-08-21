import React, { Component } from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import {Text} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";

import ReservationsScreen from '../Screens/ReservationsScreen';
import ReservationScreen from '../Screens/ReservationScreen';
import {NavigationActions} from 'react-navigation';

console.disableYellowBox = false;
const AppNavigator = createStackNavigator(
  {
    Reservations: ReservationsScreen,
    Reservation: ReservationScreen
  }
);

export default createAppContainer(AppNavigator);
