import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as React from 'react';
import {Image} from 'react-native';
import imagePath from '../constants/imagePath';
import navgiationStrings from '../constants/navgiationStrings';
import {Home, Messages} from '../Screens';
import colors from '../styles/colors';

const BototmTab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <BototmTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.blackOpacity50,
        tabBarActiveTintColor: colors.themeColor,
      }}>
      <BototmTab.Screen
        name={navgiationStrings.HOME}
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  tintColor: focused
                    ? colors.themeColor
                    : colors.blackOpacity50,
                }}
                source={imagePath.home}
              />
            );
          },
        }}
      />
      <BototmTab.Screen
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  tintColor: focused
                    ? colors.themeColor
                    : colors.blackOpacity50,
                }}
                source={imagePath.booking}
              />
            );
          },
        }}
        name="Messages"
        component={Messages}
      />
    </BototmTab.Navigator>
  );
}
