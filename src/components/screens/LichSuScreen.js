import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, useWindowDimensions, RefreshControl, ToastAndroid } from 'react-native';
import { ApiContext } from '../contexts/ApiContext';
import { Ionicons, FontAwesome, Feather } from '@expo/vector-icons';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

const LichSuScreen = (props) => {
    const { navigation } = props;
    const { height, width } = useWindowDimensions();
    const { onGetListLichSuTheoIdNguoiDung, isLoggedIn, nguoidung, onDeleteLichSu } = useContext(ApiContext);
    const [listPhim, setListPhim] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        try {
            setIsLoading(true);
            if (isLoggedIn) {
                const response = await onGetListLichSuTheoIdNguoiDung(nguoidung.id)
                setListPhim(response.data);
            } else {
                setListPhim([]);
                ToastAndroid.show('Chưa đăng nhập', ToastAndroid.CENTER);
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const deletLichSu = async (idphim) => {
        try {
            setIsLoading(true);
            await onDeleteLichSu(nguoidung.id, idphim);
            fetchData();
        } catch (error) {
            console.log(error);
        }
    }

    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
        // Fetch your data here and then set refreshing to false
        fetchData();
        setRefreshing(false);
    };

    const renderItemPhim = ({ item }) => (
        <TouchableOpacity style={[styles.boxItem]} onPress={() => navigation.navigate('ChiTietScreen', { id: item.id })}>
            <Image style={[styles.imageItemTop10, { width: width < 600 ? ((width / 2) - 12) : ((width / 3) - 12) }]} source={{ uri: item.image }} />
            <View style={[styles.boxName]}>
                <Text style={[styles.txtName]} numberOfLines={2}>{item.tenphim}</Text>
            </View>
            <Text style={[styles.txtChatLuong]}>{item.phan_hoac_chatluong}</Text>
            <Text style={[styles.txtThongTinTap]}>Đang xem {item.tentap_lichsu}</Text>
            <TouchableOpacity onPress={() => deletLichSu(item.id)} style={[styles.iconXoa]}>
                <Feather name="x" size={24} color="white" />
            </TouchableOpacity>

        </TouchableOpacity>
    );
    return (
        <View style={styles.container}>
            <View style={styles.boxHeader}>
                <TouchableOpacity style={styles.boxIconDrawer} onPress={() => navigation.openDrawer()}>
                    <FontAwesome name="bars" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.txtHeader} numberOfLines={1}>Lịch sử</Text>
                <TouchableOpacity style={styles.boxIconSearch} onPress={() => navigation.navigate('TimKiemScreen')}>
                    <Ionicons name="ios-search" size={28} color="white" />
                </TouchableOpacity>
            </View>
            {
                width < 600 ?
                    <FlatList
                        key={'1'}
                        data={listPhim}
                        renderItem={renderItemPhim}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                        refreshControl={
                            < RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
                    />
                    :
                    <FlatList
                        key={'2'}
                        data={listPhim}
                        renderItem={renderItemPhim}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={3}
                        refreshControl={
                            < RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                        }
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

export default LichSuScreen

const styles = StyleSheet.create({
    iconXoa: {
        backgroundColor: 'rgba(182,16,5,0.5)',
        position: 'absolute',
        width: 25,
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        top: 5,
        right: 5,
    },
    txtThongTinTap: {
        backgroundColor: 'rgba(11,52,108,0.9)',
        fontSize: 13,
        paddingHorizontal: 10,
        paddingVertical: 4,
        position: 'absolute',
        bottom: 45,
        right: 5,
        borderRadius: 5,
        color: 'white'
    },
    txtChatLuong: {
        backgroundColor: 'rgba(254,215,0,255)',
        fontSize: 13,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderTopLeftRadius: 10,
        borderBottomRightRadius: 10,
        position: 'absolute',
        top: 5,
        left: 5,
    },
    txtName: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        maxWidth: '90%',
        textAlign: 'center',
    },
    boxName: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        position: 'absolute',
        bottom: 0,
        height: 40,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
        elevation: 1,
    },
    imageItemTop10: {
        aspectRatio: 0.7,
        resizeMode: 'cover',
        borderRadius: 6,
    },
    boxItem: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 6,
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