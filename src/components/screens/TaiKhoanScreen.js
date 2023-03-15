import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, TextInput, ScrollView, Alert, ToastAndroid, Modal } from 'react-native'
import { Ionicons, Feather, MaterialIcons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../../config';
import { ApiContext } from '../contexts/ApiContext';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaiKhoanScreen = (props) => {
    const { navigation } = props;

    const [imageUri, setImageUri] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tenNguoiDung, setTenNguoiDung] = useState('');
    const [imageCurrent, setImageCurrent] = useState('');
    const { onUpdateUser, nguoidung, setNguoidung } = useContext(ApiContext);


    async function fetchData() {
        try {
            setImageUri(null);
            setTenNguoiDung(nguoidung.tennguoidung);
            setImageCurrent(nguoidung.avatar);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
                multiple: true,
            });
            const asset = result.assets[0];
            const source = { uri: asset.uri };
            console.log(source);
            setImageUri(source);
            setImageCurrent(source.uri);
        } catch (error) {
            console.log(error);

        }

    }

    const uploadImage = async () => {
        if (tenNguoiDung.length < 4 | tenNguoiDung.length > 28) {
            ToastAndroid.show('Tên phải từ 3 đến 27 ký tự', ToastAndroid.CENTER);
            return;
        }
        else if (imageUri != null) {
            setIsLoading(true);
            const timestamp = new Date().getTime();
            const respone = await fetch(imageUri.uri);
            const blob = await respone.blob();
            const filename = `avatar/${timestamp}_${imageUri.uri.substring(imageUri.uri.lastIndexOf('/') + 1)}`;
            var ref = firebase.storage().ref().child(filename).put(blob);

            try {
                await ref;
            } catch (error) {
                console.log(error);
            }
            // day len xong lay duong link ve
            const storageRef = firebase.storage().ref();
            const downloadUrl = await storageRef.child(filename).getDownloadURL();
            console.log(downloadUrl);
            const responeAPI = await onUpdateUser(tenNguoiDung, downloadUrl, nguoidung.id);
            setIsLoading(false);
            ToastAndroid.show('Cập nhật thành công', ToastAndroid.CENTER);

            //xóa ảnh cũ và cập nhật local
            AsyncStorage.getItem('nguoidung')
                .then(value => {
                    let myObject = JSON.parse(value);
                    try {
                        // Create a reference to the file to delete
                        const storageRef = firebase.storage().refFromURL(myObject.avatar);
                        // Delete the file
                        storageRef.delete().then(() => {
                            console.log('File deleted successfully');
                        }).catch((error) => {
                            console.log('Error deleting file: ', error);
                        });
                    } catch (error) {
                        console.log(error);
                    }

                    myObject.avatar = downloadUrl;
                    myObject.tennguoidung = tenNguoiDung;
                    setNguoidung(myObject);
                    return AsyncStorage.setItem('nguoidung', JSON.stringify(myObject));
                });
            console.log(">>>: ", imageUri);
            navigation.navigate("Trang chủ");
            return;
        } else {
            const responeAPI = await onUpdateUser(tenNguoiDung, imageCurrent, nguoidung.id);
            ToastAndroid.show('Cập nhật thành công', ToastAndroid.CENTER);
            // cập nhật local
            AsyncStorage.getItem('nguoidung')
                .then(value => {
                    let myObject = JSON.parse(value);
                    myObject.tennguoidung = tenNguoiDung;
                    setNguoidung(myObject);
                    return AsyncStorage.setItem('nguoidung', JSON.stringify(myObject));
                });
            console.log(">>>: ", imageUri);
            navigation.navigate("Trang chủ");
        }

    }

    return (
        <View style={styles.container}>
            <View style={styles.boxHeader}>
                <TouchableOpacity style={styles.boxIconDrawer} onPress={() => navigation.openDrawer()}>
                    <FontAwesome name="bars" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>Tài khoản</Text>
                <View style={styles.boxIconSearch}>
                </View>
            </View>



            <ScrollView>
                <View style={styles.boxBody}>

                    {imageCurrent !== null && imageCurrent !== "" && (
                        <Image
                            source={
                                imageUri !== null
                                    ? { uri: imageUri.uri }
                                    : { uri: nguoidung.avatar }
                            }
                            style={styles.imageAvatar}
                        />
                    )}

                    <TouchableOpacity style={styles.btPickImage} onPress={() => pickImage()}>
                        <Text style={styles.textPickImage}>Chọn ảnh</Text>
                    </TouchableOpacity>
                    <View style={styles.boxTextInput}>
                        <MaterialIcons style={styles.iconTextInput} name="drive-file-rename-outline" size={24} color="#13adb6" />
                        <TextInput
                            style={styles.textInputTen}
                            placeholder='Nhập tên người dùng'
                            value={tenNguoiDung}
                            cursorColor={'grey'}
                            placeholderTextColor={'grey'}
                            onChangeText={text => setTenNguoiDung(text)} />
                    </View>

                    <TouchableOpacity style={styles.btLuu} onPress={() => uploadImage()}>
                        <Text style={styles.textLuu}>Lưu</Text>
                    </TouchableOpacity>
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

export default TaiKhoanScreen

const styles = StyleSheet.create({
    textLuu: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    btLuu: {
        width: '70%',
        height: 46,
        backgroundColor: '#13adb6',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 40,
    },
    boxTextInput: {
        flexDirection: 'row',
        marginVertical: 20,
    },
    iconTextInput: {
        position: 'absolute',
        top: 12,
        left: 12,
    },
    textInputTen: {
        width: '90%',
        height: 50,
        borderRadius: 6,
        borderWidth: 1,
        paddingLeft: 50,
        fontSize: 16,
        borderColor: 'white',
        fontWeight: '600',
        color: 'white'
    },
    textPickImage: {
        color: 'white'
    },
    btPickImage: {
        // backgroundColor: '#999',
        backgroundColor: 'grey',
        width: 100,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        marginVertical: 10,
    },
    imageAvatar: {
        width: '60%',
        aspectRatio: 1,
        marginTop: 50,
        borderRadius: 10,
        resizeMode: 'cover',
    },
    boxBody: {
        alignItems: 'center',
        // backgroundColor: 'red'
    },
    boxHeaderShadow: {
        height: 1,
        backgroundColor: 'black',
        width: '100%',
        opacity: 0.1,
    },
    boxIconSearch: {
        // position: 'absolute',
        // right: 16,
        // top: 16,
    },
    boxIconDrawer: {
        // position: 'absolute',
        // left: 16,
        // top: 16,
    },
    txtHeader: {
        alignSelf: 'center',
        textAlignVertical: 'center',
        height: '100%',
        fontSize: 22,
        fontWeight: '500',
        color: 'white',
    },
    boxHeader: {
        width: '100%',
        position: 'relative',
        height: 54,
        backgroundColor: '#202025',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    container: {
        backgroundColor: '#161619',
        height: '100%',
        width: '100%',
    }
})