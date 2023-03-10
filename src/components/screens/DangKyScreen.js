import { StyleSheet, Text, View, Image, TextInput, ImageBackground, Dimensions, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import { ApiContext } from '../contexts/ApiContext';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons, Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const DangKyScreen = (props) => {
    const { navigation } = props;
    const { onAddUser, onCheckRegister } = useContext(ApiContext);
    const [isShowMatKhau, setIsShowMatKhau] = useState(true);
    const [isShowMatKhau2, setIsShowMatKhau2] = useState(true);
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [matKhauLai, setMatKhauLai] = useState('');

    const onDangKy = async () => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const checkEmail = re.test(String(email).toLowerCase());
        if (checkEmail == false) {
            ToastAndroid.show('Vui lòng nhập đúng email', ToastAndroid.CENTER);
            return;
        }
        else if (matKhau.indexOf(" ") !== -1) {
            ToastAndroid.show('Mật khẩu không được chứa dấu cách', ToastAndroid.CENTER);
            return;
        } else if (matKhau.length < 6) {
            ToastAndroid.show('Mật khẩu phải có ít nhất 6 ký tự', ToastAndroid.CENTER);
            return;
        } else if (matKhauLai !== matKhau) {
            ToastAndroid.show('Mật khẩu không trùng khớp', ToastAndroid.CENTER);
            return;
        }
        const response1 = await onCheckRegister(email.toLowerCase());
        const checkDangKy = response1.results;
        if (checkDangKy == false) {
            ToastAndroid.show('Email này đã được đăng ký', ToastAndroid.CENTER);
            return;
        } else if (checkDangKy == true) {
            const response1 = await onAddUser(email.toLowerCase(), matKhau);
            ToastAndroid.show('Đăng ký thành công', ToastAndroid.CENTER);
            navigation.replace('DangNhapScreen');
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Image style={styles.background} source={require('../../assets/images/bglogin2.png')} />
                <TouchableOpacity style={styles.boxIconBack} onPress={() => navigation.replace('CaiDatScreen')}>
                    <Ionicons name="arrow-back-circle" size={30} color="white" />
                </TouchableOpacity>
                <Text style={styles.textDangNhap}>Đăng Ký</Text>
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
                            placeholder='Mật khẩu' cursorColor={'white'}
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
                    <View style={styles.boxTextInput}>
                        <Feather style={styles.iconTextInput} name="unlock" size={24} color="white" />
                        <TextInput
                            style={styles.textInputEmail}
                            placeholder='Nhập lại mật khẩu'
                            cursorColor={'white'}
                            placeholderTextColor={'#DDDDDD'}
                            secureTextEntry={isShowMatKhau2}
                            onChangeText={text => setMatKhauLai(text)} />
                        {
                            isShowMatKhau2 === true ?
                                <TouchableOpacity style={styles.iconShowPass} onPress={() => setIsShowMatKhau2(false)}>
                                    <Entypo name="eye" size={24} color="white" />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity style={styles.iconShowPass} onPress={() => setIsShowMatKhau2(true)}>
                                    <Entypo name="eye-with-line" size={24} color="white" />
                                </TouchableOpacity>
                        }
                    </View>
                </View>
                <TouchableOpacity style={styles.btDangNhap} onPress={() => onDangKy()}>
                    <Text style={styles.textBtDangNhap}>Đăng ký</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btDangKy} onPress={() => navigation.replace('DangNhapScreen')}>
                    <Text style={styles.textDangKy}>Đăng nhập</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default DangKyScreen

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
        marginTop: 120,
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