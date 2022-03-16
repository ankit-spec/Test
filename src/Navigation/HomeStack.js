
import * as React from 'react';
import navgiationStrings from '../constants/navgiationStrings';
import TabRoutes from './TabRoutes';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={navgiationStrings.TAB_ROUTES} component={TabRoutes} />
        </Stack.Navigator>

    )
}