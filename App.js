import React,  {Component}  from 'react';
import {createStackNavigator, createAppContainer } from 'react-navigation'
import HomeScreen from './src/screens/HomeScreen'
import TripsScreen from './src/screens/TripsScreen'
import TripScreen from './src/screens/TripScreen'
import AddPointScreen from './src/screens/AddPointScreen'
import AddTripScreen from './src/screens/AddTripScreen'
import APIRestScreen from './src/screens/APIRestScreen'

const AppNavigator = createStackNavigator({
  Home: HomeScreen
  ,Trips: TripsScreen
  ,Trip: TripScreen
  ,ApiRest: APIRestScreen
  ,AddPoint: AddPointScreen
  ,AddTrip: AddTripScreen
}, { initialRouteName:'Home' })

export default createAppContainer(AppNavigator)
