import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import { ApiContext } from '../contexts/ApiContext';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

const TrangChuScreen = (props) => {
    const { navigation } = props;
    const { height, width } = useWindowDimensions();
    const { onGetTop10Phim, onGetAllPhim } = useContext(ApiContext);
    const [top10Phim, setTop10Phim] = useState([]);
    const [allPhim, setAllPhim] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        try {
            setIsLoading(true);
            const response1 = await onGetTop10Phim();
            const response2 = await onGetAllPhim();
            setAllPhim(response2.data);
            setTop10Phim(response1.data);
            setIsLoading(false);

        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const renderHeader = () => {
        return (
            <View>
                <Text style={styles.textPhimDeCu}>Xem gì hôm nay?</Text>
                <View style={styles.lineTextPhimDeCu} />
                <SwiperFlatList
                    autoplay
                    autoplayDelay={5}
                    autoplayLoop
                    data={top10Phim}
                    renderItem={renderTop10Phim}

                />
                <View style={styles.boxPhimMoi} >
                    <View style={styles.lineTextPhimMoiCapNhat} />
                    <Text style={styles.textPhimMoiCapNhat}>Phim mới cập nhật</Text>
                    <View style={styles.lineTextPhimMoiCapNhat} />
                </View>

            </View>
        )
    }
    const renderTop10Phim = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.boxItem]} onPress={() => navigation.navigate('ChiTietScreen', { id: item.id })}>
                <Image style={[styles.imageItemTop10, { width: width < 600 ? ((width / 2) - 12) : ((width / 3) - 12) }]} source={{ uri: item.image }} />
                <View style={[styles.boxName]}>
                    <Text style={[styles.txtName]} numberOfLines={2}>{item.tenphim}</Text>
                </View>
                <Text style={[styles.txtChatLuong]}>{item.phan_hoac_chatluong}</Text>
                <Text style={[styles.txtThongTinTap]}>{item.thong_tin_tap}</Text>
            </TouchableOpacity>
        )

    }
    const renderItemAllPhim = ({ item }) => (
        <TouchableOpacity style={[styles.boxItem]} onPress={() => navigation.navigate('ChiTietScreen', { id: item.id })}>
            <Image style={[styles.imageItemTop10, { width: width < 600 ? ((width / 2) - 12) : ((width / 3) - 12) }]} source={{ uri: item.image }} />
            <View style={[styles.boxName]}>
                <Text style={[styles.txtName]} numberOfLines={2}>{item.tenphim}</Text>
            </View>
            <Text style={[styles.txtChatLuong]}>{item.phan_hoac_chatluong}</Text>
            <Text style={[styles.txtThongTinTap]}>{item.thong_tin_tap}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.boxHeader}>
                <TouchableOpacity style={styles.boxIconDrawer} onPress={() => navigation.openDrawer()}>
                    <FontAwesome name="bars" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.txtHeader}>Trang chủ</Text>
                <TouchableOpacity style={styles.boxIconSearch} onPress={() => navigation.navigate('TimKiemScreen')}>
                    <Ionicons name="ios-search" size={28} color="white" />
                </TouchableOpacity>
            </View>
            {
                width < 600 ?
                    <FlatList
                        key={'1'}
                        data={allPhim}
                        renderItem={renderItemAllPhim}
                        ListHeaderComponent={renderHeader}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={2}
                    />
                    :
                    <FlatList
                        key={'2'}
                        data={allPhim}
                        renderItem={renderItemAllPhim}
                        ListHeaderComponent={renderHeader}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={3}
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

export default TrangChuScreen


const styles = StyleSheet.create({
    boxPhimMoi: {
        marginVertical: 30,
    },
    lineTextPhimMoiCapNhat: {
        width: '96%',
        alignSelf: 'center',
        marginHorizontal: 10,
        height: 1,
        backgroundColor: 'white',
    },
    textPhimMoiCapNhat: {
        textTransform: 'uppercase',
        fontSize: 20,
        color: 'white',
        marginLeft: 16,
        // backgroundColor: 'red',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 50,
    },
    lineTextPhimDeCu: {
        width: '96%',
        alignSelf: 'center',
        marginHorizontal: 10,
        height: 5,
        backgroundColor: '#202025',
        marginBottom: 10,
    },
    textPhimDeCu: {
        textTransform: 'uppercase',
        fontSize: 20,
        color: 'white',
        marginLeft: 16,
        marginTop: 20,
    },
    txtThongTinTap: {
        backgroundColor: 'rgba(254,215,0,255)',
        fontSize: 13,
        paddingHorizontal: 10,
        paddingVertical: 2,
        position: 'absolute',
        bottom: 45,
        right: 5,
        borderRadius: 5,
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
        maxWidth: '70%',
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
});