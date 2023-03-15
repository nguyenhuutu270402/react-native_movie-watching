import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LichSuScreen from '../screens/LichSuScreen';
import ChiTietScreen from '../screens/ChiTietScreen';
import TimKiemScreen from '../screens/TimKiemScreen';
import ChiTietTapScreen from '../screens/ChiTietTapScreen';
import PhimTheoLoaiScreen from '../screens/PhimTheoLoaiScreen';


const Stack = createNativeStackNavigator();

const LichSuStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='LichSuScreen' component={LichSuScreen} />
            <Stack.Screen name='ChiTietScreen' component={ChiTietScreen} />
            <Stack.Screen name='TimKiemScreen' component={TimKiemScreen} />
            <Stack.Screen name='ChiTietTapScreen' component={ChiTietTapScreen} />
            <Stack.Screen name='PhimTheoLoaiScreen' component={PhimTheoLoaiScreen} />
        </Stack.Navigator>
    )
}

export default LichSuStack