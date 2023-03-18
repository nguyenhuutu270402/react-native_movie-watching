import { createDrawerNavigator } from '@react-navigation/drawer';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TextInput, ScrollView, Alert, ToastAndroid, TouchableOpacity, TouchableHighlight } from 'react-native'
import CustomDrawer from './CustomDrawer';
import { Ionicons, MaterialIcons, AntDesign, Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiContext } from '../contexts/ApiContext';

import XepHangStack from '../stacks/XepHangStack';
import TrangChuStack from '../stacks/TrangChuStack';
import DangNhapStack from '../stacks/DangNhapStack';
import TaiKhoanStack from '../stacks/TaiKhoanStack';
import LichSuStack from '../stacks/LichSuStack';
import TheoDoiStack from '../stacks/TheoDoiStack';





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

            <Drawer.Screen name="Trang chủ" component={TrangChuStack} options={{
                headerShown: false,
                drawerIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={24} color={color} />
                )
            }}
            />
            <Drawer.Screen name="Xếp hạng" component={XepHangStack} options={{
                headerShown: false,
                drawerIcon: ({ color }) => (
                    <Feather name="bar-chart" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Lịch sử" component={LichSuStack} options={{
                headerShown: false,
                drawerIcon: ({ color }) => (
                    <MaterialIcons name="history" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Theo dõi" component={TheoDoiStack} options={{
                headerShown: false,
                drawerIcon: ({ color }) => (
                    <AntDesign name="heart" size={24} color={color} />
                )
            }} />
            {
                isLoggedIn &&
                <Drawer.Screen name="Tài khoản" component={TaiKhoanStack} options={{
                    headerShown: false,
                    drawerIcon: ({ color }) => (
                        <MaterialIcons name="switch-account" size={24} color={color} />
                    )
                }} />
            }
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
