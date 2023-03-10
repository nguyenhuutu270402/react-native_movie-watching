import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const TrangChuScreen = (props) => {
    const { navigation } = props;
    const useNav = useNavigation();
    return (
        <View style={styles.container}>
            <Text>trang chu</Text>
            <TouchableOpacity onPress={() => useNav.openDrawer()}>
                <Text>Buttooon open</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ChiTietScreen')}>
                <Text>chuyen trang</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text>Buttooon toggle</Text>
            </TouchableOpacity>
        </View>

    )
}

export default TrangChuScreen

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
    },
})