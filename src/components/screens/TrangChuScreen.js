import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, RefreshControl, useWindowDimensions } from 'react-native';
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

    const data = [
        {
            "id": 1,
            "tenphim": "The Last Of Us (Season 1)",
            "image": "http://photos.q00gle.com/storage/files/images-2021/images-movies/09/63c57473d4b74.jpg",
            "tongluotxem": "9",
            "phan_hoac_chatluong": "Season 1",
            "thong_tin_tap": "Tập 3"
        },
        {
            "id": 2,
            "tenphim": "Spider-Man: No Way Home",
            "image": "https://photos.q00gle.com/storage/files/images-2021/images-movies/09/61bab2aa370d9.jpg",
            "tongluotxem": "1",
            "phan_hoac_chatluong": "HD",
            "thong_tin_tap": "HD"
        },
        {
            "id": 3,
            "tenphim": "Titanic",
            "image": "https://i.imgur.com/wI3ngaN.jpg",
            "tongluotxem": "1",
            "phan_hoac_chatluong": "SD",
            "thong_tin_tap": "SD"
        },
        {
            "id": 4,
            "tenphim": "The Point Men",
            "image": "https://storage.googleapis.com/app-movie-watching.appspot.com/truyen/1678369066252_64013d9e1d760.jpg?GoogleAccessId=firebase-adminsdk-5sp9w%40app-movie-watching.iam.gserviceaccount.com&Expires=16725200400&Signature=vHg4q340GExVYRh%2B2SAXNuIySl7h3NsdnaCr%2BgRPxsqddnKh7kFZAL8s43b09FbcxRQzthUhRyWHOP15gCT8cVQYCYxqlbMQ4ABlmsfndwlFxEtwk%2FcZq15YbIb5VMKjx04Mrlu6UVFnLg956usk4XzxtYejbkhTXkrgl7b8er9NKRblGDK3gyk9ctfvw%2BEaY%2BjQd3wHUx7nCW9GTo9jFiaNVmq2h79PCK4gSBK%2BqMfnPFh89QLd0LPsQBzyo5UKnuk%2BpEQwr9DWi99QT3xyQMQQ%2FCWMozpb3FxprUpdv5hkgtlk28uKRr1%2BpItisChaOppiWJwUFc5u5ACAK0%2FouA%3D%3D",
            "tongluotxem": "0",
            "phan_hoac_chatluong": "HD",
            "thong_tin_tap": "Vietsub"
        },
        {
            "id": 5,
            "tenphim": "Moon Knight (Season 1)",
            "image": "https://storage.googleapis.com/app-movie-watching.appspot.com/truyen/1678376441698_62442caaf2a76.jpg?GoogleAccessId=firebase-adminsdk-5sp9w%40app-movie-watching.iam.gserviceaccount.com&Expires=16725200400&Signature=K%2Bxtzcy1N30e7SllT2C%2F2gC1JFfgUQvlqNPCpJQ3p5YlWMb1ao%2FatU5rCeroYa9xUMB0eW4HRnjPSvwTrGTZUsrFrpqrMk1h9sPgo3t94bZoYoXNhEmIK9O%2Bk3NJJDzgR5rWmGspWt3rxRH2zs4zBK8M8p2065Hl5ED7XOeUMYNQhZr4VVFGM309iTor%2BN08fXWq7VK950J%2B8EG%2F05dsLKgjzCgL5arh7wjxd2nfyWGXEZfX0WG7LmQuJ2vOLeYeIMex9gmHOBp5sYI13JVTYBe4Ohcf61zagq7p%2FvHjo6UQ90HnkBaUC%2FdTK74P2aQtSMyKW8Um6KJHXCYIE%2BJBww%3D%3D",
            "tongluotxem": "0",
            "phan_hoac_chatluong": "Season 1",
            "thong_tin_tap": "Full (2/6)"
        },
        {
            "id": 6,
            "tenphim": "We Have a Ghost",
            "image": "https://storage.googleapis.com/app-movie-watching.appspot.com/phim/1678376765377_63fb8d9226713.jpg?GoogleAccessId=firebase-adminsdk-5sp9w%40app-movie-watching.iam.gserviceaccount.com&Expires=16725200400&Signature=r2Br%2FEKPirkhV39LgIH5IHNmTyHT9w2SAYwzHp03oL7HhnDZzLf5OujuD6BRAa7rIu%2FYt2zC91WvL6RiczU%2FydzOrR22UuTXzLWcpHa7aKydX392nGoRj7Wq%2Bu07Xa5dGxtwBWyA4znXLQQFL%2F7d4NAI8zZBRtjk%2BB6lb8ck2jTjEx%2B%2BsU7mmtuDfLAOvG5QihKP3CUW5KBox%2FIb7mDQnLzVPciIvb72YRyjkb6Pb7Pa8i2J48NAr9RjYo4nBRWxb8HRaM40sLvhyOoZ%2BqlzVZ4DqfdIVLZA0N%2BXNY%2BX1XOR25dkcUz%2FJh4lghay2%2BZ5%2Bvdm%2BbCluUu%2FniSW6OU0kw%3D%3D",
            "tongluotxem": "0",
            "phan_hoac_chatluong": "HD",
            "thong_tin_tap": "HD"
        },
        {
            "id": 7,
            "tenphim": "Violent Night",
            "image": "https://storage.googleapis.com/app-movie-watching.appspot.com/phim/1678377162523_63a4f5162fc79.jpg?GoogleAccessId=firebase-adminsdk-5sp9w%40app-movie-watching.iam.gserviceaccount.com&Expires=16725200400&Signature=18TaV5GyMXnAxRiQsXxE4so6MvdDEgB8jibTzr3NqqvK0HFKpBlt2mBqbs33n%2BHE39Ed866lQmDXUW12ho%2B%2F%2BowCiP%2BZtYu2hWfRpMHvJhzgc2pwp5HsMCVqfiWUBPz0l7p2ocFBC6WVjf2l0jSozRB1HdSRKRISunw2VNACqjlTGTWYN6Oi9D1m9c%2F569ATPVy2X8NhBarFJMb9%2FiWBxr0ls749Wj2%2BAPZ660TxLdc3ZCPVC%2FCzUFdwUOXEzXTiGUm8Ks%2Bz0gJu1KuYR4g6Rvu7WKPRSEl7X4QBhXNHR319CG7rcutxuavCKkEWvtSfpN4kd7N0zKJppC7Zy5n%2FuQ%3D%3D",
            "tongluotxem": "0",
            "phan_hoac_chatluong": "HD",
            "thong_tin_tap": "HD"
        }
    ]
    async function fetchData() {
        try {
            setIsLoading(true);
            const response1 = await onGetTop10Phim();
            const response2 = await onGetAllPhim();
            console.log(">>> ", response1);
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
            <View>
                {
                    width < 600 ?
                        <TouchableOpacity style={[styles.boxItem]} onPress={() => console.log(item.id)}>

                            <Image style={[styles.imageItemTop10, { width: (width / 2) - 12 }]} source={{ uri: item.image }} />
                            <View style={[styles.boxName]}>
                                <Text style={[styles.txtName]} numberOfLines={2}>{item.tenphim}</Text>
                            </View>
                            <Text style={[styles.txtChatLuong]}>{item.phan_hoac_chatluong}</Text>
                            <Text style={[styles.txtThongTinTap]}>{item.thong_tin_tap}</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={[styles.boxItem]} onPress={() => console.log(item.id)}>
                            <Image style={[styles.imageItemTop10, { width: (width / 3) - 12 }]} source={{ uri: item.image }} />
                            <View style={[styles.boxName]}>
                                <Text style={[styles.txtName]} numberOfLines={2}>{item.tenphim}</Text>
                            </View>
                            <Text style={[styles.txtChatLuong]}>{item.phan_hoac_chatluong}</Text>
                            <Text style={[styles.txtThongTinTap]}>{item.thong_tin_tap}</Text>
                        </TouchableOpacity>
                }
            </View>

        )

    }
    const renderItemAllPhim = ({ item }) => (
        <View>
            {
                width < 600 ?
                    <TouchableOpacity style={[styles.boxItem]} onPress={() => console.log(item.id)}>

                        <Image style={[styles.imageItemTop10, { width: (width / 2) - 12 }]} source={{ uri: item.image }} />
                        <View style={[styles.boxName]}>
                            <Text style={[styles.txtName]} numberOfLines={2}>{item.tenphim}</Text>
                        </View>
                        <Text style={[styles.txtChatLuong]}>{item.phan_hoac_chatluong}</Text>
                        <Text style={[styles.txtThongTinTap]}>{item.thong_tin_tap}</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity style={[styles.boxItem]} onPress={() => console.log(item.id)}>
                        <Image style={[styles.imageItemTop10, { width: (width / 3) - 12 }]} source={{ uri: item.image }} />
                        <View style={[styles.boxName]}>
                            <Text style={[styles.txtName]} numberOfLines={2}>{item.tenphim}</Text>
                        </View>
                        <Text style={[styles.txtChatLuong]}>{item.phan_hoac_chatluong}</Text>
                        <Text style={[styles.txtThongTinTap]}>{item.thong_tin_tap}</Text>
                    </TouchableOpacity>
            }
        </View>

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
});