import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChiTietTapScreen = (props) => {
    const { navigation, route: { params: { id, index } } } = props;
    return (
        <View>
            <Text>ChiTietTapScreen</Text>
            <Text>ChiTietTapScreen</Text>
            <Text>ChiTietTapScreen</Text>
            <Text>ChiTietTapScreen</Text>
            <Text>ChiTietTapScreen</Text>
            <Text>ChiTietTapScreen</Text>
            <Text>ChiTietTapScreen</Text>
            <Text>id   {id}</Text>
            <Text>index {index}</Text>

        </View>
    )
}

export default ChiTietTapScreen

const styles = StyleSheet.create({})