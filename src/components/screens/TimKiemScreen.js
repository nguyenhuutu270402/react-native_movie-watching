import React, { useContext, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, useWindowDimensions, TextInput } from 'react-native';
import { ApiContext } from '../contexts/ApiContext';
import { Ionicons } from '@expo/vector-icons';
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import { color } from 'react-native-reanimated';


const TimKiemScreen = (props) => {
    const { navigation } = props;
    const { height, width } = useWindowDimensions();
    const { onGetPhimTheoLoai } = useContext(ApiContext);
    const [listPhim, setListPhim] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const timeout = useRef(null);

    const onSearch = async (text) => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(async () => {
            if (text.length > 0) {
                var searchArray = text.toLowerCase().split(" ");
                var qr = `WHERE 
                concat(phim.tenphim, '<>', phim.tenkhac, '<>', phim.namphathanh, '<>', 
                (
                    SELECT STRING_AGG(theloai.tentheloai, ', ') 
                    FROM theloai
                    INNER JOIN ct_theloai ON theloai.id = ct_theloai.idtheloai
                    WHERE ct_theloai.idphim = phim.id
                ), '<>', 
                (
                    SELECT STRING_AGG(dienvien.tendienvien, ', ') 
                    FROM dienvien
                    INNER JOIN ct_dienvien ON dienvien.id = ct_dienvien.iddienvien
                    WHERE ct_dienvien.idphim = phim.id
                ) , '<>', 
                (
                    SELECT STRING_AGG(daodien.tendaodien, ', ') 
                    FROM daodien
                    INNER JOIN ct_daodien ON daodien.id = ct_daodien.iddaodien
                    WHERE ct_daodien.idphim = phim.id
                )) ILIKE '%${searchArray[0]}%'`;
                for (let index = 1; index < searchArray.length; index++) {
                    const element = searchArray[index];
                    qr = qr + ` AND concat(phim.tenphim, '<>', phim.tenkhac, '<>', phim.namphathanh, '<>', 
                    (
                        SELECT STRING_AGG(theloai.tentheloai, ', ') 
                        FROM theloai
                        INNER JOIN ct_theloai ON theloai.id = ct_theloai.idtheloai
                        WHERE ct_theloai.idphim = phim.id
                    ), '<>', 
                    (
                        SELECT STRING_AGG(dienvien.tendienvien, ', ') 
                        FROM dienvien
                        INNER JOIN ct_dienvien ON dienvien.id = ct_dienvien.iddienvien
                        WHERE ct_dienvien.idphim = phim.id
                    ) , '<>', 
                    (
                        SELECT STRING_AGG(daodien.tendaodien, ', ') 
                        FROM daodien
                        INNER JOIN ct_daodien ON daodien.id = ct_daodien.iddaodien
                        WHERE ct_daodien.idphim = phim.id
                    )) ILIKE '%${element}%'`
                }

                const response = await onGetPhimTheoLoai(qr);
                setListPhim(response.data);
            }

        }, 1000);
    };
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
                <TextInput
                    style={styles.textInputSearch}
                    placeholder='Tên phim, thể loại, diễn viên, năm...'
                    cursorColor={'#777'}
                    placeholderTextColor={'#777'}
                    onChangeText={text => onSearch(text)}
                    numberOfLines={1} />
                <TouchableOpacity style={styles.boxIconSearch}>
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

export default TimKiemScreen

const styles = StyleSheet.create({
    textInputSearch: {
        fontSize: 16,
        fontWeight: '400',
        color: 'white',
        maxWidth: '70%',
        minWidth: '60%',
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