import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import DangKyScreen from '../screens/DangKyScreen';
import DangNhapScreen from '../screens/DangNhapScreen';


const Stack = createNativeStackNavigator();

const TrangChuStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='DangNhapScreen' component={DangNhapScreen} />
            <Stack.Screen name='DangKyScreen' component={DangKyScreen} />
        </Stack.Navigator>
    )
}

export default TrangChuStack