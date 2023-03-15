import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, useWindowDimensions } from 'react-native';
import { ApiContext } from '../contexts/ApiContext';
import { Ionicons } from '@expo/vector-icons';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';

const PhimTheoLoaiScreen = (props) => {
    const { navigation, route: { params: { title, idDaoDien, idDienVien, idTheLoai, idQuocGia, namphathanh } } } = props;
    const { height, width } = useWindowDimensions();
    const { onGetPhimTheoLoai } = useContext(ApiContext);
    const [listPhim, setListPhim] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    async function fetchData() {
        try {
            setIsLoading(true);
            let response;
            if (idTheLoai) {
                const qr = ` LEFT JOIN ct_theloai ON phim.id = ct_theloai.idphim 
    LEFT JOIN theloai ON ct_theloai.idtheloai = theloai.id 
    WHERE theloai.id = ${idTheLoai} `;
                response = await onGetPhimTheoLoai(qr);
            } else if (idDienVien) {
                const qr = ` LEFT JOIN ct_dienvien ON phim.id = ct_dienvien.idphim 
    LEFT JOIN dienvien ON ct_dienvien.iddienvien = dienvien.id 
    WHERE dienvien.id = ${idDienVien} `;
                response = await onGetPhimTheoLoai(qr);
            } else if (idDaoDien) {
                const qr = ` LEFT JOIN ct_daodien ON phim.id = ct_daodien.idphim 
    LEFT JOIN daodien ON ct_daodien.iddaodien = daodien.id 
    WHERE daodien.id = ${idDaoDien} `;
                response = await onGetPhimTheoLoai(qr);
            } else if (idQuocGia) {
                const qr = ` LEFT JOIN ct_quocgia ON phim.id = ct_quocgia.idphim 
    LEFT JOIN quocgia ON ct_quocgia.idquocgia = quocgia.id 
    WHERE quocgia.id = ${idQuocGia} `;
                response = await onGetPhimTheoLoai(qr);
            } else if (namphathanh) {
                const qr = ` WHERE phim.namphathanh = ${namphathanh} `;
                response = await onGetPhimTheoLoai(qr);
            }

            setListPhim(response.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);


    const renderItemPhim = ({ item }) => (
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
                <TouchableOpacity style={styles.boxIconDrawer} onPress={() => navigation.pop()}>
                    <Ionicons name="arrow-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.txtHeader} numberOfLines={1}>{title}</Text>
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

export default PhimTheoLoaiScreen

const styles = StyleSheet.create({
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