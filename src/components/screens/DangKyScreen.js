import { StyleSheet, Text, View, Image, TextInput, ImageBackground, Dimensions, TouchableOpacity, useWindowDimensions, ScrollView, ToastAndroid } from 'react-native'
import { ApiContext } from '../contexts/ApiContext';
import React, { useContext, useEffect, useState } from 'react';
import { Ionicons, Feather, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

const DangKyScreen = (props) => {
    const { navigation } = props;
    const { height, width } = useWindowDimensions();
    const { onAddUser } = useContext(ApiContext);
    const [isShowMatKhau, setIsShowMatKhau] = useState(true);
    const [isShowMatKhau2, setIsShowMatKhau2] = useState(true);
    const [email, setEmail] = useState('');
    const [matKhau, setMatKhau] = useState('');
    const [matKhauLai, setMatKhauLai] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const onDangKy = async () => {
        setIsLoading(true);
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const checkEmail = re.test(String(email).toLowerCase());
        if (checkEmail == false) {
            ToastAndroid.show('Vui lòng nhập đúng email', ToastAndroid.CENTER);
            setIsLoading(false);
            return;
        }
        else if (matKhau.indexOf(" ") !== -1) {
            ToastAndroid.show('Mật khẩu không được chứa dấu cách', ToastAndroid.CENTER);
            setIsLoading(false);
            return;
        } else if (matKhau.length < 6) {
            ToastAndroid.show('Mật khẩu phải có ít nhất 6 ký tự', ToastAndroid.CENTER);
            setIsLoading(false);
            return;
        } else if (matKhauLai !== matKhau) {
            ToastAndroid.show('Mật khẩu không trùng khớp', ToastAndroid.CENTER);
            setIsLoading(false);
            return;
        }
        const response1 = await onAddUser(email.toLowerCase(), matKhau);
        const checkDangKy = response1.result;
        if (checkDangKy == false) {
            ToastAndroid.show('Email này đã được đăng ký', ToastAndroid.CENTER);
            setIsLoading(false);
            return;
        } else if (checkDangKy == true) {
            ToastAndroid.show('Đăng ký thành công', ToastAndroid.CENTER);
            navigation.replace('DangNhapScreen');
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
                    {/* <Image style={[styles.logo2,]} source={require('../../assets/images/healthicons_coins-outline.png')}></Image> */}
                    <Feather style={[styles.logo2]} name="film" size={70} color="rgba(32,172,125,0.5)" />
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
                        <View style={styles.line} />
                        <View style={styles.boxTextInput}>
                            <Feather style={styles.iconTextInput} name="lock" size={24} color="white" />
                            <TextInput
                                style={styles.textInputEmail}
                                placeholder='Xác nhận mật khẩu'
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
                    <View style={styles.boxDangKy}>
                        <Text style={styles.textChuaCo}>Đã tài khoản?</Text>
                        <TouchableOpacity style={styles.btDangKy} onPress={() => navigation.replace('DangNhapScreen')}>
                            <Text style={styles.textDangKy}>Đăng nhập ngay</Text>
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
        </View >

    )
}

export default DangKyScreen

const styles = StyleSheet.create({
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
    logo2: {
        position: 'absolute',
        right: 0,
        top: 40,
        transform: [{ rotate: '45deg' }],
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