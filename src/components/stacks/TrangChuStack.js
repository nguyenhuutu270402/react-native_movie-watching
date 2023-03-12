import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TrangChuScreen from '../screens/TrangChuScreen';
import ChiTietScreen from '../screens/ChiTietScreen';
import TimKiemScreen from '../screens/TimKiemScreen';
import ChiTietTapScreen from '../screens/ChiTietTapScreen';


const Stack = createNativeStackNavigator();

const TrangChuStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='TrangChuScreen' component={TrangChuScreen} />
            <Stack.Screen name='ChiTietScreen' component={ChiTietScreen} />
            <Stack.Screen name='TimKiemScreen' component={TimKiemScreen} />
            <Stack.Screen name='ChiTietTapScreen' component={ChiTietTapScreen} />
        </Stack.Navigator>
    )
}

export default TrangChuStack