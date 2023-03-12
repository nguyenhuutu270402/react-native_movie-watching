import { StyleSheet, Text, View, ImageBackground, useWindowDimensions, Image } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { ApiContext } from '../contexts/ApiContext';

//  https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg
const CustomDrawer = (props) => {
    const { height, width } = useWindowDimensions();
    const heightBot = height - 195;
    const { nguoidung, isLoggedIn } = useContext(ApiContext);
    return (
        <View style={{ flex: 1 }}>

            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: 'rgba(1,8,34,255)' }}>
                <TouchableOpacity>
                    <ImageBackground style={styles.bgrImage} source={require('../../assets/images/bg_drawer.jpg')}>
                        <View style={styles.boxTaiKhoan}>
                            {isLoggedIn ? (
                                <View style={styles.iconPerson}>
                                    {nguoidung.avatar ? (
                                        <Image
                                            style={styles.imagePerson}
                                            source={{ uri: nguoidung.avatar }}
                                        />
                                    ) : (
                                        <Ionicons name="person" size={60} color="white" />
                                    )}
                                </View>
                            ) : (
                                <View style={styles.iconPerson}>
                                    <Ionicons name="person" size={60} color="white" />
                                </View>
                            )}
                            {nguoidung.tennguoidung == "" || nguoidung.avatar == "" ? (
                                <Text style={styles.txtName}>{nguoidung.tennguoidung || 'Cập nhật tài khoản'}</Text>
                            ) : (
                                <Text style={styles.txtName}>Chưa đăng nhập</Text>
                            )}
                            <Text style={styles.txtEmail}>{nguoidung.email || ''}</Text>
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
                <View style={[styles.boxBottom, { minHeight: heightBot }]}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
        </View>

    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    boxTaiKhoan: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    boxBottom: {
        backgroundColor: '#202025',
        paddingTop: 10,
        flex: 1,
    },
    txtEmail: {
        fontSize: 14,
        color: 'white',
        fontWeight: '400',
        marginBottom: 10,
    },
    txtName: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600'
    },
    iconPerson: {
        borderColor: 'white',
        borderWidth: 2,
        marginVertical: 20,
        borderRadius: 50,
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imagePerson: {
        width: 90,
        height: 90,
        borderColor: 'white',
        borderWidth: 2,
        marginVertical: 20,
        borderRadius: 50,
        resizeMode: 'cover',
    },
    bgrImage: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
})