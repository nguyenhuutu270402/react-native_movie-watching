import { createDrawerNavigator } from '@react-navigation/drawer';
const Drawer = createDrawerNavigator();
import LichSuScreen from '../screens/LichSuScreen';
import TrangChuStack from '../stacks/TrangChuStack';
import CustomDrawer from './CustomDrawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
const DrawerNavigation = () => {
    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                drawerLabelStyle: { marginLeft: -25, fontSize: 15 },
                drawerActiveBackgroundColor: 'white',
                drawerActiveTintColor: '#1a68b3',
                drawerInactiveTintColor: 'white'
            }}>

            <Drawer.Screen name="Trang Chủ" component={TrangChuStack} options={{
                headerShown: true,
                drawerIcon: ({ color }) => (
                    <Ionicons name="home-outline" size={24} color={color} />
                )
            }}
            />
            <Drawer.Screen name="Lịch sử" component={LichSuScreen} options={{
                headerShown: true,
                drawerIcon: ({ color }) => (
                    <MaterialIcons name="history" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Lịch sử1" component={LichSuScreen} options={{
                headerShown: true,
                drawerIcon: ({ color }) => (
                    <MaterialIcons name="history" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Lịch sử2" component={LichSuScreen} options={{
                headerShown: true,
                drawerIcon: ({ color }) => (
                    <MaterialIcons name="history" size={24} color={color} />
                )
            }} />
            <Drawer.Screen name="Lịch sử3" component={LichSuScreen} options={{
                headerShown: true,
                drawerIcon: ({ color }) => (
                    <MaterialIcons name="history" size={24} color={color} />
                )
            }} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation
