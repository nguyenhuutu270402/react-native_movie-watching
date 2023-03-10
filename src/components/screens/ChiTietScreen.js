import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


const ChiTietScreen = (props) => {
    const useNav = useNavigation();
    const { navigation } = props;

    return (
        <View>
            <Text>ChiTietScreen</Text>
            <TouchableOpacity onPress={() => useNav.openDrawer()}>
                <Text>Buttooon open</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('TrangChuScreen')}>
                <Text>chuyen trang</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ChiTietScreen

const styles = StyleSheet.create({})