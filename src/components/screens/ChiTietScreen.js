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
    const [aspectRatio, setAspectRatio] = useState(0);
    const { onGetOnePhimById, onAddTheoDoi, onDeleteTheoDoi,
        onAddLuotXem, onAddDanhGia, nguoidung, isLoggedIn,
        onKiemTraTheoDoi, onAddLichSu, onAddBinhLuan } = useContext(ApiContext);
    const [isShowModal, setIsShowModal] = useState(false);
    const [isShowModalBinhLuan, setIsShowModalBinhLuan] = useState(false);
    const [rating, setRating] = useState(0);
    const [onePhim, setOnePhim] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isShowListTap, setIsShowListTap] = useState(false);
    const [isShowXemThem, setIsShowXemThem] = useState(false);
    const [kiemTraTheoDoi, setKiemTraTheoDoi] = useState(false);
    const [listBinhLuan, setListBinhLuan] = useState([]);

    async function fetchData() {
        try {
            setIsLoading(true);
            let response1 = {};
            if (isLoggedIn) {
                response1 = await onGetOnePhimById(id, nguoidung.id);
                const response2 = await onKiemTraTheoDoi(nguoidung.id, id);
                setKiemTraTheoDoi(response2.result);
            } else {
                response1 = await onGetOnePhimById(id, 0);
            }
            setOnePhim(response1.data);
            Image.getSize(response1.data.image, (Width, Height) => {
                setAspectRatio(Width / Height);
            }, (errorMsg) => {
                console.log(errorMsg);
            });
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [id]);
    const onFormatTinhTrang = (tinhtrang) => {
        if (tinhtrang && tinhtrang == 1) {
            return 'Đang chiếu';
        } else if (tinhtrang && tinhtrang == 2) {
            return 'Hoàn thành';
        } else if (tinhtrang && tinhtrang == 3) {
            return 'Ngừng chiếu';
        }
    }
    const onFormatChatLuong = (chatluong) => {
        if (chatluong && chatluong == 1) {
            return '360p';
        } else if (chatluong && chatluong == 2) {
            return '720p';
        } else if (chatluong && chatluong == 3) {
            return '1080p';
        } else if (chatluong && chatluong == 4) {
            return '1440p';
        } else if (chatluong && chatluong == 5) {
            return '2160p';
        }
    }
    const onFormatLuotXem = (luotxem) => {
        try {
            if (luotxem) {
                return luotxem.toLocaleString();
            } else {
                return '0';
            }
        } catch (error) {
            console.log(error);
        }
    }
    const onFormatSoSao = (sosao) => {
        try {
            if (sosao) {
                const ssao = parseFloat(sosao);
                return ssao.toFixed(1);
            } else {
                return '0';
            }
        } catch (error) {
            console.log(error);
        }
    }
    const addLuotXem = async (idTap) => {
        if (isLoggedIn == false) {
            await onAddLuotXem(1, idTap);
        } else {
            await onAddLuotXem(nguoidung.id, idTap);
            await onAddLichSu(nguoidung.id, onePhim.id, idTap);
        }
    }
    const addTheoDoi = async () => {
        setIsLoading(true);
        if (isLoggedIn == false) {
            ToastAndroid.show('Đăng nhập để sử dụng chức năng này', ToastAndroid.CENTER);
            setIsLoading(false);
            return;
        }
        await onAddTheoDoi(nguoidung.id, onePhim.id);
        setKiemTraTheoDoi(true);
        setIsLoading(false);
        ToastAndroid.show('Theo dõi thành công', ToastAndroid.CENTER);
    }
    const addDanhGia = async () => {
        setIsLoading(true);
        if (isLoggedIn == false) {
            ToastAndroid.show('Đăng nhập để sử dụng chức năng này', ToastAndroid.CENTER);
            setIsLoading(false);
            return;
        }
        await onAddDanhGia(nguoidung.id, onePhim.id, rating)
        setIsShowModal(false);
        setIsLoading(false);
        ToastAndroid.show('Đánh giá thành công', ToastAndroid.CENTER);
    }
    const addBinhLuan = async () => {
        setIsLoading(true);
        if (isLoggedIn == false) {
            ToastAndroid.show('Đăng nhập để sử dụng chức năng này', ToastAndroid.CENTER);
            setIsLoading(false);
            return;
        }
        await onAddBinhLuan(nguoidung.id, onePhim.id, nodung);
        setIsLoading(false);
        ToastAndroid.show('Bình luận thành công', ToastAndroid.CENTER);
    }
    const deleteTheoDoi = async () => {
        setIsLoading(true);
        if (isLoggedIn == false) {
            ToastAndroid.show('Đăng nhập để sử dụng chức năng này', ToastAndroid.CENTER);
            setIsLoading(false);
            return;
        }
        await onDeleteTheoDoi(nguoidung.id, onePhim.id);
        setKiemTraTheoDoi(false);
        ToastAndroid.show('Bỏ theo dõi thành công', ToastAndroid.CENTER);
        setIsLoading(false);
    }
    const onAlertDeleteTheoDoi = () =>
        Alert.alert(
            "Thông báo",
            "Bạn có chắc bỏ theo dõi không?",
            [
                {
                    text: "Không",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Có", onPress: () => deleteTheoDoi() }
            ]
        );
    const openModalBinhLuan = async () => {
        try {
            setIsLoading(true);
            if (isLoggedIn == false) {
                ToastAndroid.show('Đăng nhập để sử dụng chức năng này', ToastAndroid.CENTER);
                setIsLoading(true);
                return;
            }
            const response = await onGetListBinhLuanByIdPhim(onePhim.id);
            setListBinhLuan(response.data);
            console.log(">>>>>> ", response.data);
            setIsShowModalBinhLuan(true);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    const renderHeader = () => {
        return (
            <View style={styles.renderHeaderContainer}>
                <Image style={[styles.imgPhim, { aspectRatio: aspectRatio }]} source={{ uri: onePhim.image }}></Image>
                <View style={styles.box2BTGradient}>
                    <TouchableOpacity onPress={() => setIsShowListTap(!isShowListTap)}>
                        <LinearGradient
                            colors={['#13adb6', '#d4df25']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[styles.btGradient, { width: width / 3.5 }]}
                        >
                            <FontAwesome5 name="chevron-down" size={10} color="white" />
                            <Text numberOfLines={1} style={styles.textGradient}>Chọn tập</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => { addLuotXem(onePhim.ds_tap[onePhim.ds_tap.length - 1].id); navigation.navigate('ChiTietTapScreen', { id: onePhim.ds_tap[onePhim.ds_tap.length - 1].id, index: onePhim.ds_tap.length - 1 }) }}>
                        <LinearGradient
                            colors={['#d4df25', '#e53b03']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={[styles.btGradient, { width: width / 3.5 }]}
                        >
                            <Ionicons name="md-play" size={14} color="white" />
                            <Text numberOfLines={1} style={styles.textGradient}>Xem phim</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                {
                    isShowListTap &&
                    <View>
                        <Text style={styles.textDanhSachTap}>Danh sách tập</Text>
                        <View style={styles.lineDanhSachTap} />
                    </View>
                }

            </View>

        )
    }
    const renderItem = ({ item, index }) => (
        // <TouchableOpacity key={item.id} onPress={() => { addLuotXem(item.id); navigation.navigate('ChiTietPhimScreen', { id: item.id, index: index }) }}>
        <TouchableOpacity
            onPress={() => { addLuotXem(item.id); navigation.navigate('ChiTietTapScreen', { id: item.id, index: index }) }}
            style={[styles.boxTapItem, { width: width < 600 ? width / 5 : width / 8.6, opacity: item.idnguoidung_da_xem ? 0.5 : 1 }]} key={item.id}>
            <Text style={styles.txtTenTapItem}>{item.tentap}</Text>
        </TouchableOpacity>

    );
    const rederFooter = () => {
        return (
            <View style={styles.renderFooterContainer}>
                {
                    isShowListTap &&
                    <View style={styles.lineDanhSachTap2} />
                }
                <View style={styles.boxTenPhim}>
                    <Text style={styles.txtTenPhim}>{onePhim.tenphim}</Text>
                </View>
                <View style={styles.boxThongTinPhim}>
                    {
                        onePhim.tenkhac != "" &&
                        <View>
                            <View style={styles.boxTitleThongTin}>
                                <Text style={styles.titleThongTin}>Tên khác: </Text>
                                <Text style={styles.textTenKhac}>{onePhim.tenkhac}</Text>
                            </View>
                            <View style={styles.lineThongTinPhim} />
                        </View>
                    }
                    <View style={styles.boxTitleThongTin}>
                        <Text style={styles.titleThongTin}>Mới cập nhật:</Text>
                        {
                            onePhim.ds_tap && onePhim.ds_tap.map((item, index) => (
                                index < 3 &&
                                <TouchableOpacity
                                    onPress={() => { addLuotXem(item.id); navigation.navigate('ChiTietTapScreen', { id: item.id, index: index }) }}
                                    style={[styles.boxTapItem2, { width: width < 600 ? width / 5 : width / 8.6, opacity: item.idnguoidung_da_xem ? 0.5 : 1 }]} key={item.id}>
                                    <Text style={styles.txtTenTapItem}>{item.tentap}</Text>
                                </TouchableOpacity>

                            ))
                        }
                    </View>
                    <View style={styles.lineThongTinPhim} />
                    <View style={styles.boxTitleThongTin}>
                        <Text style={styles.titleThongTin}>Tình trạng: </Text>
                        <Text style={styles.textTenKhac}>{onFormatTinhTrang(onePhim.trangthai)}</Text>
                    </View>
                    <View style={styles.lineThongTinPhim} />
                    <View style={styles.boxTitleThongTin}>
                        <Text style={styles.titleThongTin}>Năm: </Text>
                        <TouchableOpacity>
                            <Text style={styles.textTenKhac}>{onePhim.namphathanh}</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        onePhim.ds_daodien &&
                        <View>
                            <View style={styles.lineThongTinPhim} />
                            <View style={styles.boxTitleThongTin}>
                                <Text style={styles.titleThongTin}>Đạo diễn:</Text>
                                {
                                    onePhim.ds_daodien.map((item, index) => (
                                        <TouchableOpacity key={item.id} style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textTenKhac}>{item.tendaodien}</Text>
                                            {
                                                index < (onePhim.ds_daodien.length - 1) &&
                                                <Text style={{ color: '#c59306' }}>,  </Text>
                                            }
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>
                    }
                    {
                        onePhim.ds_dienvien &&
                        <View>
                            <View style={styles.lineThongTinPhim} />
                            <View style={styles.boxTitleThongTin}>
                                <Text style={styles.titleThongTin}>Diễn viên:</Text>
                                {
                                    onePhim.ds_dienvien.map((item, index) => (
                                        <TouchableOpacity key={item.id} style={{ flexDirection: 'row' }}>
                                            <Text style={styles.textTenKhac}>{item.tendienvien}</Text>
                                            {
                                                index < (onePhim.ds_dienvien.length - 1) &&
                                                <Text style={{ color: '#c59306' }}>,  </Text>
                                            }
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </View>
                    }
                    <View style={styles.lineThongTinPhim} />
                    <View style={styles.boxTitleThongTin}>
                        <Text style={styles.titleThongTin}>Chất lượng: </Text>
                        <Text style={styles.textTenKhac}>{onFormatChatLuong(onePhim.chatluong)}</Text>
                    </View>
                    <View style={styles.lineThongTinPhim} />
                    <View style={styles.boxTitleThongTin}>
                        <Text style={styles.titleThongTin}>Tổng lượt xem: </Text>
                        <Text style={styles.textTenKhac}>{onFormatLuotXem(onePhim.tongluotxem)}</Text>
                    </View>
                    <View style={styles.lineThongTinPhim} />
                    <View style={styles.boxTitleThongTin}>
                        <Text style={styles.titleThongTin}>Mô tả: </Text>
                        {
                            isShowXemThem ?
                                <Text style={styles.textTenKhac}>{onePhim.mota}</Text>
                                :
                                <Text numberOfLines={3} style={styles.textTenKhac}>{onePhim.mota}</Text>
                        }
                        <TouchableOpacity onPress={() => setIsShowXemThem(!isShowXemThem)}>
                            {
                                isShowXemThem ?
                                    <Text style={[styles.txtXemThem, { color: '#993366' }]}>Thu gọn</Text>
                                    :
                                    <Text style={styles.txtXemThem}>Xem thêm</Text>
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.boxDanhGiaTheoDoi}>
                    <TouchableOpacity style={styles.boxSoSao} onPress={() => setIsShowModal(true)}>
                        <Text style={styles.txtSao}>★ </Text>
                        <Text style={styles.txtSoSaoTrungBinh}>{onFormatSoSao(onePhim.sosaotrungbinh)}</Text>
                        <Text style={styles.tren5}>/5</Text>
                        <Text style={styles.txtTongDanhGia}>({onFormatLuotXem(onePhim.tongdanhgia)} đánh giá)</Text>
                    </TouchableOpacity>
                    {
                        kiemTraTheoDoi ?
                            <TouchableOpacity style={styles.boxSoSao} onPress={() => onAlertDeleteTheoDoi()} >
                                <AntDesign name="heart" size={24} color="#DD0000" />
                                <Text style={styles.txtTongDanhGia}>({onFormatLuotXem(onePhim.tongtheodoi)} lượt theo dõi)</Text>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity style={styles.boxSoSao} onPress={() => addTheoDoi()}>
                                <AntDesign name="hearto" size={24} color="#DD0000" />
                                <Text style={styles.txtTongDanhGia}>({onFormatLuotXem(onePhim.tongtheodoi)} lượt theo dõi)</Text>
                            </TouchableOpacity>
                    }
                    <TouchableOpacity style={styles.boxSoSao}>
                        <AntDesign name="message1" size={24} color="green" />
                        <Text style={styles.txtTongDanhGia}>({onFormatLuotXem(onePhim.tongbinhluan)} bình luận)</Text>
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
            {
                width < 600 ?
                    <FlatList
                        key={'1'}
                        data={onePhim.ds_tap}
                        renderItem={isShowListTap ? renderItem : () => <View />}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={rederFooter}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={4}
                    />
                    :
                    <FlatList
                        key={'2'}
                        data={onePhim.ds_tap}
                        renderItem={isShowListTap ? renderItem : () => <View />}
                        ListHeaderComponent={renderHeader}
                        ListFooterComponent={rederFooter}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        numColumns={6}
                    />
            }







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
                    <TouchableOpacity style={styles.btModalRate} onPress={() => addDanhGia()}>
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
    txtXemThem: {
        color: 'green',
    },
    txtTheoDoi: {
        color: '#c59306',
        marginLeft: 6,
    },
    txtTongDanhGia: {
        color: '#888',
        fontSize: 13,
        marginLeft: 6,
    },
    tren5: {
        color: '#c59306',
        fontSize: 13,
    },
    txtSoSaoTrungBinh: {
        color: '#c59306',
        fontSize: 22,
        textAlignVertical: 'bottom',
    },
    txtSao: {
        color: 'yellow',
        fontSize: 30,
    },
    boxSoSao: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginHorizontal: '3%',
        marginVertical: 6,
    },
    boxDanhGiaTheoDoi: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'baseline',
        justifyContent: 'flex-start',
    },
    lineThongTinPhim: {
        backgroundColor: '#1f2832',
        height: 2,
    },
    textTenKhac: {
        color: 'white',
        fontSize: 14,
    },
    titleThongTin: {
        color: '#c59306',
        textAlignVertical: 'center',
        marginRight: 10,
        fontSize: 14,
    },
    boxTitleThongTin: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginHorizontal: 10,
        marginVertical: 13,
    },
    boxThongTinPhim: {
        borderWidth: 2,
        borderColor: '#1f2832',
        borderRadius: 4,
        marginTop: 20,
    },
    txtTenPhim: {
        color: 'white',
        fontSize: 22,
        fontWeight: '600',
        maxWidth: '90%',
        textAlign: 'center',
    },
    boxTenPhim: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    renderFooterContainer: {
        marginHorizontal: '3%',
        width: '96%',
        alignSelf: 'center',
        marginBottom: 6,
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
        backgroundColor: '#243d5f',
        height: 30,
        marginHorizontal: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
        borderRadius: 6,
    },
    boxTapItem: {
        backgroundColor: '#243d5f',
        height: 30,
        marginHorizontal: '2.5%',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        borderRadius: 6,
    },
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
        justifyContent: 'space-between',
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
    imgPhim: {
        width: '65%',
        alignSelf: 'center',
        borderWidth: 3,
        borderColor: '#1f2832',
        borderRadius: 6,
        marginTop: 16,
        resizeMode: 'cover',
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