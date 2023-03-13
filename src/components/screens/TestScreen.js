import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, RefreshControl, Slider } from 'react-native';
import { ApiContext } from '../contexts/ApiContext';
import { Video, AVPlaybackStatus } from 'expo-av';

const TestScreen = (props) => {
    const { navigation } = props;
    const { onGetAllPhim } = useContext(ApiContext);
    const [listPhim, setListPhim] = useState([]);
    const linkvideo = 'https://firebasestorage.googleapis.com/v0/b/movie-watching-f4f73.appspot.com/o/phim%2Fnguoiconsotlaitap1.ts?alt=media&token=43a0ddd8-0456-40b4-b57b-7c4c4ca8abf1';
    const video = useRef(null);
    const [status, setStatus] = useState({});
    const [testVideo, settestVideo] = useState("");
    async function fetchData() {
        try {

            settestVideo("https://firebasestorage.googleapis.com/v0/b/movie-watching-f4f73.appspot.com/o/phim%2Fnguoiconsotlaitap1.ts?alt=media&token=b2c89dbc-1faa-45b9-995b-2e0544eadadb");
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <View style={styles.boxVideo}>
            <Video
                ref={video}
                style={[styles.video]}
                source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/movie-watching-f4f73.appspot.com/o/phim%2Fnguoinhen.ts?alt=media&token=9de46e77-839d-4653-985d-1c8848c40950",
                }}
                useNativeControls={true}
                androidImmersive={true}
                resizeMode="contain"
                isLooping
                onPlaybackStatusUpdate={status => setStatus(() => status)}
            />
        </View>
    )
}

export default TestScreen

const styles = StyleSheet.create({
    video: {
        width: '100%',
        height: 300,
        backgroundColor: 'tomato',
    },
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})