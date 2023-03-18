import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Modal, TouchableOpacity, Pressable } from 'react-native'
import { Ionicons, MaterialCommunityIcons, EvilIcons, FontAwesome, AntDesign, Fontisto, Entypo, Feather } from '@expo/vector-icons';
import { ApiContext } from '../contexts/ApiContext';


import SpinnerOverlay from 'react-native-loading-spinner-overlay';

const XepHangScreen = (props) => {
    const { navigation } = props;
    const { onGetPhimXepHang } = useContext(ApiContext);
    const [listPhim, setListPhim] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false);
    const [selectedValue, setSelectedValue] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const listSwap = [
        {
            id: 1,
            swap: 'Từ trước đến nay',
        },
        {
            id: 2,
            swap: 'Theo ngày',
        },
        {
            id: 3,
            swap: 'Theo tuần',
        },
        {
            id: 4,
            swap: 'Theo tháng',
        },
        {
            id: 5,
            swap: 'Theo năm',
        },
    ]

    async function fetchData() {
        try {
            setIsLoading(true);
            var qr = `
            GROUP BY phim.id
            ORDER BY COUNT(DISTINCT luotxem.id) DESC`
            const response = await onGetPhimXepHang(qr);
            setListPhim(response.data);
            setSelectedValue(1);
            setIsLoading(false);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const onFormatLuotXem = (luotxem) => {
        if (luotxem) {
            return parseInt(luotxem).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        } else {
            return '0';
        }
    }
    const getBackgroundColor = (index) => {
        if (index === 0) {
            return 'rgba(30,129,196,0.3)';
        } else if (index === 1) {
            return 'rgba(164,206,60,0.3)';
        } else if (index === 2) {
            return 'rgba(251,201,8,0.3)';
        } else {
            return 'rgba(212,212,210,0.3)';
        }
    }
    const renderItem = ({ item, index }) => (
        <TouchableOpacity key={item.id} onPress={() => navigation.push('ChiTietScreen', { id: item.id })} >
            <View style={[styles.containerItemPhim, { backgroundColor: getBackgroundColor(index) }]}>
                <Image style={styles.imagePhim} source={{ uri: item.image }}></Image>
                <View style={styles.boxNamePhim}>
                    <Text numberOfLines={1} style={styles.textNamePhim}>{item.tenphim}</Text>
                    <View style={styles.boxLuotXemPhim}>
                        <Text style={styles.textLuotXemPhim}><FontAwesome name="eye" size={15} color="#333" /> {onFormatLuotXem(item.tongluotxem)} Lượt xem</Text>
                    </View>
                    <Text numberOfLines={4} style={styles.textMoTaPhim}>{item.mota}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
    const onSwapType = async (key) => {
        try {
            setIsLoading(true);
            if (key == 1) {
                var qr = `
                GROUP BY phim.id
                ORDER BY COUNT(DISTINCT luotxem.id) DESC;`
                const response = await onGetPhimXepHang(qr);
                setListPhim(response.data);
                setSelectedValue(key);
                setIsShowModal(false);
                setIsLoading(false);
                return;
            } else if (key == 2) {
                var qr = `where luotxem.ngayxem >= CURRENT_TIMESTAMP - INTERVAL '1 DAY'
                GROUP BY phim.id
                ORDER BY COUNT(DISTINCT luotxem.id) DESC;`
                const response = await onGetPhimXepHang(qr);
                setListPhim(response.data);
                setSelectedValue(key);
                setIsShowModal(false);
                setIsLoading(false);
                return;
            } else if (key == 3) {
                var qr = `where luotxem.ngayxem >= CURRENT_TIMESTAMP - INTERVAL '7 DAY'
                GROUP BY phim.id
                ORDER BY COUNT(DISTINCT luotxem.id) DESC;`
                const response = await onGetPhimXepHang(qr);
                setListPhim(response.data);
                setSelectedValue(key);
                setIsShowModal(false);
                setIsLoading(false);
                return;
            } else if (key == 4) {
                var qr = `where luotxem.ngayxem >= CURRENT_TIMESTAMP - INTERVAL '30 DAY'
                GROUP BY phim.id
                ORDER BY COUNT(DISTINCT luotxem.id) DESC;`
                const response = await onGetPhimXepHang(qr);
                setListPhim(response.data);
                setSelectedValue(key);
                setIsShowModal(false);
                setIsLoading(false);
                return;
            } else if (key == 5) {
                var qr = `where luotxem.ngayxem >= CURRENT_TIMESTAMP - INTERVAL '365 DAY'
                GROUP BY phim.id
                ORDER BY COUNT(DISTINCT luotxem.id) DESC;`
                const response = await onGetPhimXepHang(qr);
                setListPhim(response.data);
                setSelectedValue(key);
                setIsShowModal(false);
                setIsLoading(false);
                return;
            }

        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.boxHeader}>
                <TouchableOpacity style={styles.boxIconDrawer} onPress={() => navigation.openDrawer()}>
                    <FontAwesome name="bars" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.txtHeader} numberOfLines={1}>Xếp hạng</Text>
                <TouchableOpacity style={styles.boxIconSearch} onPress={() => setIsShowModal(true)}>
                    <AntDesign name="swap" size={26} color="white" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={listPhim}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                numColumns={1}
            />
            <Modal animationType="fade" transparent={true} visible={isShowModal} onRequestClose={() => setIsShowModal(false)}>
                <Pressable style={styles.containerModal} onPress={() => setIsShowModal(false)}>

                    <View style={styles.modalSwap}>
                        {listSwap.map(item => {
                            return (
                                <View key={item.id}>
                                    <TouchableOpacity style={styles.itemSwap} onPress={() => onSwapType(item.id)}>
                                        <Text style={styles.textSwap}>{item.swap}</Text>
                                        <View style={styles.boxRadioButton}>
                                            {
                                                selectedValue === item.id ?
                                                    <View style={styles.pointRadioButton} />
                                                    :
                                                    <View />
                                            }
                                        </View>
                                    </TouchableOpacity>
                                    <View style={styles.lineItemTap}></View>
                                </View>
                            );
                        })}

                    </View>
                </Pressable>

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

export default XepHangScreen

const styles = StyleSheet.create({
    lineItemTap: {
        width: '100%',
        height: 1.5,
        backgroundColor: 'grey',
        opacity: 0.2
        // elevation: 2,
    },
    pointRadioButton: {
        width: 16,
        height: 16,
        borderWidth: 1.5,
        borderRadius: 30,
        backgroundColor: '#rgba(254,215,0,255)',
        borderColor: 'grey',

    },
    boxRadioButton: {
        width: 24,
        height: 24,
        borderWidth: 1.5,
        borderColor: 'grey',
        borderRadius: 30,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textSwap: {
        width: '85%',
        fontSize: 18,
        fontWeight: '400',
        color: 'white',
        lineHeight: 23,
    },
    itemSwap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        marginHorizontal: 10,
    },
    containerModal: {
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalSwap: {
        width: '90%',
        backgroundColor: '#202025',
        alignContent: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        minHeight: '30%'
    },
    textTheloai: {
        color: '#222',
        fontSize: 14,
        textAlign: 'center',
        fontWeight: '400',
        textAlignVertical: 'center',
        width: '95%',
        alignSelf: 'center',
        borderWidth: 0.5,
        borderRadius: 6,
        marginVertical: 10,
        padding: 6,
        borderColor: 'grey',
    },
    iconBack: {
        position: 'absolute',
        left: 10,
        top: 20,
    },
    textDatePhim: {
        color: 'white',
        fontSize: 11,
        textAlign: 'center',
        fontWeight: '500',
        height: '100%',
        textAlignVertical: 'center',
    },
    boxDatePhim: {
        position: 'absolute',
        backgroundColor: 'tomato',
        top: 6,
        left: 6,
        borderRadius: 10,
        width: 75,
        height: 18,
    },
    textTapterPhim: {
        color: '#222',
        fontSize: 13,
        fontWeight: '400',
        width: '100%',
    },
    textMoTaPhim: {
        color: 'rgba(255,248,242,0.7)',
    },
    boxLuotXemPhim: {
        flexDirection: 'row',
        marginVertical: 6,
    },
    textLuotXemPhim: {
        color: 'rgba(255,248,242,0.9)',
        fontSize: 13,
        borderRadius: 10,
        height: 20,
        backgroundColor: 'rgba(254,99,71,0.7)',
        textAlignVertical: 'center',
        paddingHorizontal: 10,
        // backgroundColor: 'cyan'
    },
    textNamePhim: {
        color: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        fontWeight: '500',
        width: '100%',
        // textTransform: 'capitalize',
    },
    boxNamePhim: {
        width: '67%',
        // backgroundColor: 'red',
        aspectRatio: 2,

    },
    imagePhim: {
        width: '30%',
        aspectRatio: 0.9,
        borderRadius: 2,
        marginRight: '2.5%',
    },
    containerItemPhim: {
        width: '95%',
        marginTop: 16,
        flexDirection: 'row',
        // backgroundColor: 'rgba(212,212,210,1)',
        borderRadius: 2,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5%',
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