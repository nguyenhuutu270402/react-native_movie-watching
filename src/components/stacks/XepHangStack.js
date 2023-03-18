import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import XepHangScreen from '../screens/XepHangScreen';
import ChiTietScreen from '../screens/ChiTietScreen';
import TimKiemScreen from '../screens/TimKiemScreen';
import ChiTietTapScreen from '../screens/ChiTietTapScreen';
import PhimTheoLoaiScreen from '../screens/PhimTheoLoaiScreen';


const Stack = createNativeStackNavigator();

const XepHangStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='XepHangScreen' component={XepHangScreen} />
            <Stack.Screen name='ChiTietScreen' component={ChiTietScreen} />
            <Stack.Screen name='TimKiemScreen' component={TimKiemScreen} />
            <Stack.Screen name='ChiTietTapScreen' component={ChiTietTapScreen} />
            <Stack.Screen name='PhimTheoLoaiScreen' component={PhimTheoLoaiScreen} />
        </Stack.Navigator>
    )
}
export default XepHangStack