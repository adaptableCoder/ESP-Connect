import React,{ JSX, useEffect } from 'react'
import { Alert, PermissionsAndroid, SafeAreaView, StatusBar } from 'react-native'

//Navigation
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

//screens
import Home from './screens/Home'
import NewDevices from './screens/NewDevices'
import Chat from './screens/Chat'
import BluetoothDevice from 'react-native-bluetooth-classic/lib/BluetoothDevice'
import GetStartedScreen from './screens/GetStarted'

export type RootStackParamList = {
  Home: undefined;
  GetStarted: undefined;
  NewDevices: { disconnectLog?: string } | undefined;
  Chat: { device: BluetoothDevice };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
          PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        ]);

        const denied = Object.values(granted).filter(
          (result) => result !== PermissionsAndroid.RESULTS.GRANTED
        );

        if (denied.length > 0) {
          Alert.alert('Permissions required', 'Please allow all Bluetooth permissions to proceed.');
        }
      } catch (err) {
        console.warn('Permission error', err);
      }
    };

    requestPermissions();
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true, headerStyle: { backgroundColor: '#000' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'bold' }, headerLeft: () => null}}>
          <Stack.Screen name="Home" component={Home}/>
          <Stack.Screen name="GetStarted" component={GetStartedScreen} options={{ title: 'Get Started' }} />
          <Stack.Screen name="NewDevices" component={NewDevices} options={{ title: 'Connect Devices' }} />
          <Stack.Screen name="Chat" component={Chat} options={({ route }) => ({ title: `Chat with ${route.params.device.name}` })} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;