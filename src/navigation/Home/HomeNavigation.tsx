import React from 'react';
import {HomeNavigationOptions} from '../NavigationTypes';
import {createStackNavigator} from '@react-navigation/stack';
import HomeTabNavigation from './HomeTabNavigation';

export default function HomeNavigation() {
  const Stack: any = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={HomeNavigationOptions}>
      <Stack.Screen name="HOME_TAB_NAVIGATION" component={HomeTabNavigation} />
    </Stack.Navigator>
  );
}
