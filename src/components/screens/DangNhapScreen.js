import { StyleSheet, Text, View, Image, TextInput, useWindowDimensions, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import { ApiContext } from '../contexts/ApiContext';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons, Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

const DangNhapScreen = (props) => {
    const { height, width } = useWindowDimensions();
    const { navigation } = props;
    const { onLoginUser, setIsLoggedIn, setNguoidung } = useContext(ApiContext);
    const [isShowMatKhau, setIsShowMatKhau] = useState(true);
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onDangNhap = async () => {
        setIsLoading(true);
        if (email.length < 1, matKhau.length < 1) {
            ToastAndroid.show('Email và mật khẩu không được để trống', ToastAndroid.CENTER);
            setIsLoading(false);
            return;
        }
        const response1 = await onLoginUser(email.toLowerCase(), matKhau);
        const checkLogin = response1.result;
        if (checkLogin == false) {
            ToastAndroid.show('Email hoặc mật khẩu không đúng', ToastAndroid.CENTER);
            setIsLoading(false);
            return;
        } else {
            const dataUser = response1.data;
            ToastAndroid.show('Đăng nhập thành công', ToastAndroid.CENTER);
            AsyncStorage.setItem('nguoidung', JSON.stringify(dataUser));
            setNguoidung(dataUser);
            setIsLoggedIn(true);
            navigation.navigate("Trang chủ");
        }
        setIsLoading(false);
    }
    return (
        <View>
            <ScrollView>
                <View style={[styles.container, { minHeight: height }]}>
                    <TouchableOpacity style={styles.boxIconBack} onPress={() => navigation.navigate("Trang chủ")}>
                        <Ionicons name="arrow-back-circle" size={30} color="white" />
                    </TouchableOpacity>
                    <Image style={[styles.logo, { width: width / 2, height: width / 4 }]} source={require('../../assets/images/login_logo.png')}></Image>
                    <View style={styles.boxAllTextInput}>
                        <View style={styles.boxTextInput}>
                            <MaterialCommunityIcons style={styles.iconTextInput} name="email-outline" size={24} color="white" />
                            <TextInput
                                style={styles.textInputEmail}
                                placeholder='Email'
                                cursorColor={'white'}
                                placeholderTextColor={'#DDDDDD'}
                                keyboardType='email-address'
                                onChangeText={text => setEmail(text)} />
                        </View>
                        <View style={styles.line} />
                        <View style={styles.boxTextInput}>
                            <Feather style={styles.iconTextInput} name="lock" size={24} color="white" />
                            <TextInput
                                style={styles.textInputEmail}
                                placeholder='Mật khẩu'
                                cursorColor={'white'}
                                placeholderTextColor={'#DDDDDD'}
                                secureTextEntry={isShowMatKhau}
                                onChangeText={text => setMatKhau(text)} />
                            {
                                isShowMatKhau === true ?
                                    <TouchableOpacity style={styles.iconShowPass} onPress={() => setIsShowMatKhau(false)}>
                                        <Entypo name="eye" size={24} color="white" />
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={styles.iconShowPass} onPress={() => setIsShowMatKhau(true)}>
                                        <Entypo name="eye-with-line" size={24} color="white" />
                                    </TouchableOpacity>
                            }
                        </View>
                    </View>
                    <TouchableOpacity style={styles.btDangNhap} onPress={() => onDangNhap()}>
                        <Text style={styles.textBtDangNhap}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <View style={styles.boxDangKy}>
                        <Text style={styles.textChuaCo}>Chưa có tài khoản?</Text>
                        <TouchableOpacity style={styles.btDangKy} onPress={() => navigation.replace('DangKyScreen')}>
                            <Text style={styles.textDangKy}>Đăng ký ngay</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
            <SpinnerOverlay
                visible={isLoading}
                textStyle={{ color: '#FFF' }}
                animation="fade"
                color="#fff"
            />
        </View>
    )
}

export default DangNhapScreen

const styles = StyleSheet.create({
    txtLoadingModal: {
        color: 'white',
    },
    loadingModal: {
        backgroundColor: 'rgba(11,12,12,0.5)',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textChuaCo: {
        color: 'white',
        fontSize: 16,
        fontWeight: '300',
    },
    boxDangKy: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginVertical: 28,
    },
    line: {
        height: 3,
        width: '100%',
        backgroundColor: '#25242a',
    },
    logo: {
        resizeMode: 'contain',
        marginTop: 100,
        marginBottom: 50,
    },
    iconShowPass: {
        position: 'absolute',
        right: 16,
        height: '100%',
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textDangKy: {
        color: '#20ab7d',
        fontSize: 16,
        fontWeight: '300',
        marginLeft: 10,
    },
    btDangKy: {
    },
    textBtDangNhap: {
        color: 'white',
        fontSize: 18,
        fontWeight: '300'
    },
    btDangNhap: {
        width: '85%',
        height: 60,
        backgroundColor: '#35343b',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        borderRadius: 16,
        elevation: 10,
    },
    iconTextInput: {
        marginLeft: 16,
    },
    textInputEmail: {
        width: '80%',
        height: 50,
        color: 'white',
        fontSize: 16,
        marginLeft: 16,
    },
    boxTextInput: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 10,
    },
    boxAllTextInput: {
        marginTop: 20,
        backgroundColor: '#17171b',
        borderRadius: 16,
        width: '85%',
    },
    textDangNhap: {
        fontSize: 30,
        color: 'white',
        fontWeight: '600',
        marginBottom: 50,
        marginTop: 150,
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        resizeMode: 'cover',
    },
    boxIconBack: {
        position: 'absolute',
        left: 16,
        top: 30,
    },
    container: {
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: '#25242a'
        // justifyContent: 'center',
    },
})
// tạo mới
// const myObject = {
//     name: 'John Doe',
//     age: 30
//   };
//   AsyncStorage.setItem('myObjectKey', JSON.stringify(myObject));

// lấy ra
//   AsyncStorage.getItem('myObjectKey')
//   .then(value => {
//     const myObject = JSON.parse(value);
//     console.log(myObject.name);
//     console.log(myObject.age);
//   });

// xóa đi
//   AsyncStorage.removeItem('myObjectKey')
//   .then(() => {
//     console.log('Item was removed.');
//   });


// clear tất cả
//   AsyncStorage.clear()
//   .then(() => {
//     console.log('All items were removed.');
//   });

// cập nhật
// AsyncStorage.getItem('myObjectKey')
//   .then(value => {
//     let myObject = JSON.parse(value);
//     myObject.age = 35;
//     return AsyncStorage.setItem('myObjectKey', JSON.stringify(myObject));
//   });

