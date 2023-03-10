import { StyleSheet, Text, View, ImageBackground, useWindowDimensions } from 'react-native';
import React from 'react';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { ScrollView } from 'react-navigation';
//  https://static.chotot.com/storage/chotot-kinhnghiem/c2c/2019/10/nuoi-meo-can-gi-0-1024x713.jpg
const CustomDrawer = (props) => {
    const { height, width } = useWindowDimensions();
    const heightBot = height - 195;
    return (
        <View style={{ flex: 1 }}>

            <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: 'rgba(1,8,34,255)' }}>
                <ImageBackground style={styles.bgrImage} source={require('../../assets/images/bg_drawer.jpg')}>
                    <View style={styles.iconPerson}>
                        <Ionicons name="person" size={60} color="white" />
                    </View>
                    <Text style={styles.txtName}>Nguyễn Văn Hẳng</Text>
                    <Text style={styles.txtEmail}>example1@gmail.com</Text>
                </ImageBackground>
                <View style={[styles.boxBottom, { minHeight: heightBot }]}>
                    <DrawerItemList {...props} />
                </View>
            </DrawerContentScrollView>
        </View>

    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    boxBottom: {
        backgroundColor: '#202025',
        paddingTop: 10,
        flex: 1,
    },
    txtEmail: {
        fontSize: 14,
        color: 'white',
        fontWeight: '400',
        marginBottom: 10,
    },
    txtName: {
        fontSize: 16,
        color: 'white',
        fontWeight: '600'
    },
    iconPerson: {
        borderColor: 'white',
        borderWidth: 2,
        marginVertical: 20,
        borderRadius: 50,
        width: 90,
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bgrImage: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
    },
})