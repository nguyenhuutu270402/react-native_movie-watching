import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, Alert, TextInput, useWindowDimensions, Pressable, FlatList } from 'react-native';
import React, { useContext, useEffect, useCallback, useRef, useState } from 'react';
import { ApiContext } from '../contexts/ApiContext';
import { Ionicons, FontAwesome5, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo } from '@expo/vector-icons';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import { Video } from 'expo-av';

const ChiTietTapScreen = (props) => {
    const { navigation, route: { params: { idTap, idPhim, index } } } = props;
    const { height, width } = useWindowDimensions();
    const { onGetOneTapById, nguoidung, isLoggedIn, onAddLuotXem, onAddLichSu } = useContext(ApiContext);
    const [oneTap, setOneTap] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [linkVideo, setLinkVideo] = useState("");
    const video = useRef(null);

    async function fetchData() {
        try {
            setIsLoading(true);
            let response1 = {};
            if (isLoggedIn) {
                response1 = await onGetOneTapById(idTap, idPhim, nguoidung.id);
            } else {
                response1 = await onGetOneTapById(idTap, idPhim, 0);
            }
            setOneTap(response1.data);
            setLinkVideo(response1.data.video);
            video.current.playAsync()
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    const addLuotXem = async (idTap) => {
        if (isLoggedIn == false) {
            await onAddLuotXem(1, idTap);
        } else {
            await onAddLuotXem(nguoidung.id, idTap);
            await onAddLichSu(nguoidung.id, oneTap.idphim, idTap);
        }
    }
    const renderHeader = () => {
        return (
            <View style={styles.renderHeaderContainer}>

                <View style={styles.boxTenVaTap}>
                    <View style={styles.boxChuyenTap}>
                        {
                            oneTap.ds_tap && index == oneTap.ds_tap.length - 1 ?
                                <></>
                                :
                                <TouchableOpacity
                                    onPress={() => { addLuotXem(oneTap.ds_tap[index + 1].id); navigation.replace('ChiTietTapScreen', { idTap: oneTap.ds_tap[index + 1].id, idPhim: oneTap.idphim, index: index + 1 }) }}
                                    style={styles.btChuyenTap}>
                                    <AntDesign name="stepbackward" size={14} color="white" />
                                    <Text style={styles.txtChuyenTap}>Tập trước đó</Text>
                                </TouchableOpacity>
                        }

                        {
                            index == 0 ?
                                <></>
                                :
                                <TouchableOpacity
                                    onPress={() => { addLuotXem(oneTap.ds_tap[index - 1].id); navigation.replace('ChiTietTapScreen', { idTap: oneTap.ds_tap[index - 1].id, idPhim: oneTap.idphim, index: index - 1 }) }}
                                    style={styles.btChuyenTap}>
                                    <Text style={styles.txtChuyenTap}>Tập tiếp theo</Text>
                                    <AntDesign name="stepforward" size={14} color="white" />
                                </TouchableOpacity>
                        }

                    </View>
                    <Text style={styles.txtTenPhimVaTap}>{oneTap.tenphim} - {oneTap.tentap}</Text>
                </View>
                <View style={styles.lineDanhSachTap}></View>
                <Text style={styles.textDanhSachTap}>Danh sách tập</Text>
                <View style={styles.lineDanhSachTap}></View>
            </View>

        )
    }
    const renderItem = ({ item, index }) => (
        <>
            {
                item.id != oneTap.id ?
                    <TouchableOpacity
                        onPress={() => { addLuotXem(item.id); navigation.replace('ChiTietTapScreen', { idTap: item.id, idPhim: oneTap.idphim, index: index }) }}
                        style={[styles.boxTapItem, { width: width < 600 ? width / 5 : width / 8.6, opacity: item.idnguoidung_da_xem ? 0.5 : 1 }]} key={item.id}>
                        <Text style={styles.txtTenTapItem}>{item.tentap}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => { addLuotXem(item.id); navigation.replace('ChiTietTapScreen', { idTap: item.id, idPhim: oneTap.idphim, index: index }) }}
                        style={[styles.boxTapItem2, { width: width < 600 ? width / 5 : width / 8.6, }]}>
                        <Text style={styles.txtTenTapItem}>{item.tentap}</Text>
                    </TouchableOpacity>
            }
        </>

    );
    return (
        <View style={styles.container}>
            <View style={styles.boxHeader}>
                <TouchableOpacity style={styles.boxIconDrawer} onPress={() => navigation.pop()}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>{oneTap.tenphim}</Text>
                <View style={styles.boxIconSearch}>
                </View>
            </View>
            <View style={styles.boxVideo}>
                <Video
                    ref={video}
                    style={[styles.video, { height: height * 0.3 }]}
                    source={{
                        uri: linkVideo,
                    }}
                    useNativeControls={true}
                    androidImmersive={false}
                    resizeMode="contain"
                    isLooping
                />
            </View>
            {
                width < 600 ?
                    <FlatList
                        key={'1'}
                        data={oneTap.ds_tap}
                        renderItem={renderItem}
                        ListHeaderComponent={renderHeader}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={4}
                    />
                    :
                    <FlatList
                        key={'2'}
                        data={oneTap.ds_tap}
                        renderItem={renderItem}
                        ListHeaderComponent={renderHeader}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={6}
                    />
            }
            <SpinnerOverlay
                visible={isLoading}
                textStyle={{ color: '#FFF' }}
                animation="fade"
                color="#fff"
            />

        </View>
    )
}

export default ChiTietTapScreen

const styles = StyleSheet.create({
    txtChuyenTap: {
        color: 'white',
    },
    btChuyenTap: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    boxChuyenTap: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    boxVideo: {
        backgroundColor: 'black',
    },
    video: {
        width: '100%',
    },
    boxTenVaTap: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    renderHeaderContainer: {

    },

    txtTenPhimVaTap: {
        marginLeft: '3%',
        color: 'white',
        fontSize: 22,
        fontWeight: '600',
        width: '90%',
        textAlignVertical: 'center',
        textAlign: 'center',
    },
    textDanhSachTap: {
        marginLeft: '3%',
        color: 'white',
        fontSize: 21,
        fontWeight: '400',
    },
    lineDanhSachTap2: {
        width: '100%',
        height: 1,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginBottom: 30,
        marginTop: 10,
        opacity: 0.5,
    },
    lineDanhSachTap: {
        width: '95%',
        height: 1,
        backgroundColor: 'white',
        alignSelf: 'center',
        marginVertical: 10,
        opacity: 0.5,
    },
    txtTenTapItem: {
        color: 'white',
        fontSize: 14,
    },
    boxTapItem2: {
        backgroundColor: '#f17009',
        height: 30,
        marginHorizontal: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 6,
    },
    boxTapItem: {
        backgroundColor: '#3c3c3c',
        height: 30,
        marginHorizontal: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 6,
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
        width: 20,
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