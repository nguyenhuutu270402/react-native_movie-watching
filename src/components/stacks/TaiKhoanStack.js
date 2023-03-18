import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import TaiKhoanScreen from '../screens/TaiKhoanScreen';
import DoiMatKhauScreen from '../screens/DoiMatKhauScreen';


const Stack = createNativeStackNavigator();

const TaiKhoanStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }} >
            <Stack.Screen name='TaiKhoanScreen' component={TaiKhoanScreen} />
            <Stack.Screen name='DoiMatKhauScreen' component={DoiMatKhauScreen} />
        </Stack.Navigator>
    )
}

export default TaiKhoanStack