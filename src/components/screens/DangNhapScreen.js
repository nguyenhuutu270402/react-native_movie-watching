import { StyleSheet, Text, View, Image, TextInput, ImageBackground, Dimensions, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import { ApiContext } from '../contexts/ApiContext';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons, Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const DangNhapScreen = (props) => {
    const useNav = useNavigation();
    const { navigation } = props;
    const { onLoginUser, isLoggedIn, setIsLoggedIn } = useContext(ApiContext);
    const [isShowMatKhau, setIsShowMatKhau] = useState(true);
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const onDangNhap = async () => {
        // if (email.length < 1, matKhau.length < 1) {
        //     ToastAndroid.show('Email và mật khẩu không được để trống', ToastAndroid.CENTER);
        //     return;
        // }
        // const response1 = await onLoginUser(email.toLowerCase(), matKhau);
        // const checkLogin = response1.results;
        // if (checkLogin == false) {
        //     ToastAndroid.show('Email hoặc mật khẩu không đúng', ToastAndroid.CENTER);
        //     return;
        // } else {
        //     ToastAndroid.show('Đăng nhập thành công', ToastAndroid.CENTER);
        //     AsyncStorage.setItem('nguoidung', JSON.stringify(checkLogin));
        //     navigation.replace('CaiDatScreen');
        // }
        setIsLoggedIn(true);
        navigation.navigate("Trang Chủ");
    }
    return (
        <ScrollView>

            <View style={styles.container}>
                <Image style={styles.background} source={require('../../assets/images/bglogin2.png')} />
                <TouchableOpacity style={styles.boxIconBack} onPress={() => useNav.navigate("Trang Chủ")}>
                    <Ionicons name="arrow-back-circle" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.textDangNhap}>Đăng nhập</Text>
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
                <TouchableOpacity style={styles.btDangKy} onPress={() => navigation.replace('DangKyScreen')}>
                    <Text style={styles.textDangKy}>Đăng ký</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default DangNhapScreen

const styles = StyleSheet.create({
    iconShowPass: {
        position: 'absolute',
        right: 10,
        top: 13
    },
    textDangKy: {
        color: 'blue',
        fontSize: 18,
        fontWeight: '500',
    },
    btDangKy: {
        marginTop: 16,
        // marginLeft: 100,
    },
    textBtDangNhap: {
        color: 'white',
        fontSize: 18,
    },
    btDangNhap: {
        width: 200,
        height: 50,
        backgroundColor: '#339966',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
        borderRadius: 6,
        elevation: 10,
    },
    iconTextInput: {
        position: 'absolute',
        left: 16,
        top: 13
    },
    textInputEmail: {
        width: Dimensions.get('window').width - 60,
        height: 50,
        borderWidth: 1,
        borderColor: 'white',
        paddingLeft: 50,
        borderRadius: 10,
        color: 'white',
        fontSize: 16,
    },
    boxTextInput: {
        flexDirection: 'row',
        marginVertical: 10,
    },
    boxAllTextInput: {
        marginTop: 20,
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
        height: Dimensions.get('window').height,
        // height: '100%',
        alignItems: 'center',
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

