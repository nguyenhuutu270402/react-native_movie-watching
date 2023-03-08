import React, { useContext, useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Dimensions, RefreshControl, Slider } from 'react-native';
import { ApiContext } from '../contexts/ApiContext';
import { Video, AVPlaybackStatus } from 'expo-av';

const TestScreen = (props) => {
    const { navigation } = props;
    const { onGetAllPhim } = useContext(ApiContext);
    const [listPhim, setListPhim] = useState([]);

    const video = useRef(null);
    const [status, setStatus] = useState({});

    async function fetchData() {
        try {
            const response = await onGetAllPhim();
            console.log(response.results[2].ds_tap[0].video);
            setListPhim(response.results[2].ds_tap[0]);
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={[styles.video]}
                source={{
                    uri: listPhim.video,
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
        height: '60%',
        backgroundColor: 'tomato',
    },
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
})