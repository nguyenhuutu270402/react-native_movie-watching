import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TheoDoiScreen from '../screens/TheoDoiScreen';
import ChiTietScreen from '../screens/ChiTietScreen';
import TimKiemScreen from '../screens/TimKiemScreen';
import ChiTietTapScreen from '../screens/ChiTietTapScreen';
import PhimTheoLoaiScreen from '../screens/PhimTheoLoaiScreen';


const Stack = createNativeStackNavigator();

const TheoDoiStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='TheoDoiScreen' component={TheoDoiScreen} />
            <Stack.Screen name='ChiTietScreen' component={ChiTietScreen} />
            <Stack.Screen name='TimKiemScreen' component={TimKiemScreen} />
            <Stack.Screen name='ChiTietTapScreen' component={ChiTietTapScreen} />
            <Stack.Screen name='PhimTheoLoaiScreen' component={PhimTheoLoaiScreen} />
        </Stack.Navigator>
    )
}

export default TheoDoiStack