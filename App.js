import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { ApiContextProvider } from './src/components/contexts/ApiContext';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/components/navigations/DrawerNavigation';
import TestScreen from './src/components/screens/TestScreen';
// mã màu
// đen vừa bgr 202025 
// đen hơn bgr 161619 
// mau vàng fed700
export default function App() {
  return (
    <ApiContextProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" hidden={false} translucent={false} />
        <DrawerNavigation />
      </NavigationContainer>
    </ApiContextProvider>
  );
}

