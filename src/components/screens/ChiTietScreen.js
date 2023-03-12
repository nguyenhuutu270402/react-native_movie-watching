import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, Alert, useWindowDimensions, Pressable, FlatList } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Modal from "react-native-modal";
import { ApiContext } from '../contexts/ApiContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

const ChiTietScreen = (props) => {
    const { navigation, route: { params: { id } } } = props;
    const { height, width } = useWindowDimensions();
    const { onGetOnePhimById, onAddTheoDoi, onDeleteTheoDoi,
        onAddLuotXem, onAddDanhGia, nguoidung, isLoggedIn, onKiemTraTheoDoi } = useContext(ApiContext);
    const [isShowModal, setIsShowModal] = useState(false);
    const [rating, setRating] = useState(0);
    const [onePhim, setOnePhim] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    async function fetchData() {
        try {
            setIsLoading(true);
            let response1 = {};
            if (isLoggedIn) {
                response1 = await onGetOnePhimById(id, nguoidung.id);
            } else {
                response1 = await onGetOnePhimById(id, 0);
            }
            setOnePhim(response1.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [id]);
    const renderHeader = () => {
        return (
            <View style={styles.renderHeaderContainer}>
                <Image style={styles.imgPhim} source={{ uri: onePhim.image }}></Image>

                <View style={styles.box2BTGradient}>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#13adb6', '#d4df25']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[styles.btGradient, { width: width / 4 }]}
                        >
                            <FontAwesome5 name="chevron-down" size={10} color="white" />
                            <Text numberOfLines={1} style={styles.textGradient}>Chọn tập</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <LinearGradient
                            colors={['#d4df25', '#e53b03']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[styles.btGradient, { width: width / 4 }]}
                        >
                            <Ionicons name="md-play" size={14} color="white" />
                            <Text numberOfLines={1} style={styles.textGradient}>Xem phim</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>

        )
    }
    return (
        <View style={styles.container}>
            <View style={styles.boxHeader}>
                <TouchableOpacity style={styles.boxIconDrawer} onPress={() => navigation.pop()}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>Thông tin phim</Text>
                <TouchableOpacity style={styles.boxIconSearch} onPress={() => navigation.navigate('TimKiemScreen')}>
                    <Ionicons name="ios-search" size={28} color="white" />
                </TouchableOpacity>
            </View>


            <FlatList
                key={'1'}
                data={onePhim.ds_tap}
                ListHeaderComponent={renderHeader}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={3}
            />




            <Modal isVisible={isShowModal}
                animationIn='bounceInLeft'
                animationOut='bounceOutRight'
                customBackdrop={
                    <Pressable onPress={() => setIsShowModal(false)}>
                        <View style={{ width: '100%', height: '100%', backgroundColor: '#000' }} />
                    </Pressable>
                }
            >
                <View style={styles.boxModal}>
                    <Text style={styles.textTopModalRate}>Đánh giá của bạn là {rating}★</Text>
                    <View style={styles.boxStart}>
                        {[1, 2, 3, 4, 5].map(value => {
                            return (
                                <View style={styles.modalRateItem} key={value}>
                                    <TouchableOpacity style={styles.boxItemStart}
                                        onPress={() => setRating(value)}
                                    >
                                        <Text style={{ fontSize: 50, color: value <= rating ? 'tomato' : 'gray' }}>★</Text>
                                    </TouchableOpacity>
                                </View>

                            );
                        })}
                    </View>
                    {/* <TouchableOpacity onPress={() => addDanhGia()} style={styles.btModalRate}> */}
                    <TouchableOpacity style={styles.btModalRate}>
                        <Text style={styles.textSubmit}>Đánh giá</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setIsShowModal(false)}>
                        <Text style={styles.texHuyModalRate}>Hủy</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <SpinnerOverlay
                visible={isLoading}
                textStyle={{ color: '#FFF' }}
                animation="fade"
                color="#fff"
            />
        </View>
    )
}

export default ChiTietScreen

const styles = StyleSheet.create({

    textGradient: {
        color: 'white',
        fontSize: 14,
        marginLeft: 6,
    },
    btGradient: {
        borderRadius: 30,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    box2BTGradient: {
        flexDirection: 'row',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'center',
        marginTop: 10,
    },
    imgPhim: {
        width: '60%',
        aspectRatio: 0.7,
        alignSelf: 'center',
        borderWidth: 2,
        borderColor: '#243d5f',
        borderRadius: 6,
        marginTop: 16,
    },
    renderHeaderContainer: {
        width: '100%',
    },
    texHuyModalRate: {
        fontSize: 16,
        fontWeight: '600',
        color: 'grey',
        marginTop: 10,
        marginBottom: 20,
    },
    textSubmit: {
        fontSize: 16,
        fontWeight: '600',
        color: 'white',

    },
    btModalRate: {
        backgroundColor: '#63bf75',
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        borderRadius: 4,
    },
    boxItemStart: {

    },
    textTopModalRate: {
        fontSize: 22,
        fontWeight: '600',
        color: '#333',
        marginTop: 20,
        marginBottom: 10,
    },
    modalRateItem: {

    },
    boxStart: {
        flexDirection: 'row',
    },
    boxModal: {
        width: 300,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 6,
        alignItems: 'center',
    },
    //
    boxHeaderShadow: {
        height: 1,
        backgroundColor: 'black',
        width: '100%',
        opacity: 0.1,
    },
    boxIconSearch: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    boxIconDrawer: {
        position: 'absolute',
        left: 16,
        top: 16,
    },
    txtHeader: {
        alignSelf: 'center',
        textAlignVertical: 'center',
        height: '100%',
        fontSize: 22,
        fontWeight: '500',
        color: 'white'
    },
    boxHeader: {
        width: '100%',
        position: 'relative',
        height: 60,
        marginTop: 15,
        backgroundColor: '#202025'

    },
    container: {
        backgroundColor: '#161619',
        height: '100%',
        width: '100%',
    }
})