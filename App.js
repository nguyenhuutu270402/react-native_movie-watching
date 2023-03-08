import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { ApiContextProvider } from './src/components/contexts/ApiContext';

import TestScreen from './src/components/screens/TestScreen';
export default function App() {
  return (
    <View style={styles.container}>
      <ApiContextProvider>
        <TestScreen />
      </ApiContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
