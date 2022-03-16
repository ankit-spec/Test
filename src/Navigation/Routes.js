import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './HomeStack';
export default function Routes() {
  return <NavigationContainer>{HomeStack()}</NavigationContainer>;
}
