import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, ScrollView, Alert, ToastAndroid, TouchableOpacity, TouchableHighlight } from 'react-native'
import CustomDrawer from './CustomDrawer';
import { Ionicons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiContext } from '../contexts/ApiContext';

import LichSuScreen from '../screens/LichSuScreen';
import TrangChuStack from '../stacks/TrangChuStack';
import DangNhapStack from '../stacks/DangNhapStack';




const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {

    const { isLoggedIn, setIsLoggedIn, setNguoidung } = useContext(ApiContext);

    const LogOutStack = () => {
        useEffect(() => {
            AsyncStorage.removeItem('nguoidung')
                .then(() => {
                    console.log('Item was removed.');
                });
            setIsLoggedIn(false);
            setNguoidung({});
            ToastAndroid.show('Đăng xuất thành công', ToastAndroid.CENTER);
        }, [isLoggedIn])
    }


    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerLabelStyle: { marginLeft: -20, fontSize: 15 },
                drawerActiveBackgroundColor: 'white',
                drawerActiveTintColor: '#1a68b3',
                drawerInactiveTintColor: 'white'
            }}>

            <Drawer.Screen name="Trang Chủ" component={TrangChuStack} options={{
                headerShown: true,
                drawerIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={24} color={color} />
                )
            }}
            />
            <Drawer.Screen name="Lịch sử" component={LichSuScreen} options={{
                headerShown: true,
                drawerIcon: ({ color }) => (
                    <MaterialIcons name="history" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Lịch sử1" component={LichSuScreen} options={{
                headerShown: true,
                drawerIcon: ({ color }) => (
                    <MaterialIcons name="history" size={24} color={color} />
                )
            }} />
            {
                isLoggedIn ?
                    <Drawer.Screen name="Đăng xuất" component={LogOutStack} options={{
                        headerShown: true,
                        drawerIcon: ({ color }) => (
                            <AntDesign name="logout" size={20} color="#CC0000" />
                        )
                    }} />
                    :
                    <Drawer.Screen name="Đăng nhập" component={DangNhapStack} options={{
                        headerShown: false,
                        drawerIcon: ({ color }) => (
                            <AntDesign name="login" size={20} color="#339966" />
                        ),
                    }} />
            }
        </Drawer.Navigator>
    )
}

export default DrawerNavigation
