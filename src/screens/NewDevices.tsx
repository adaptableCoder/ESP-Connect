import React, { useState, useEffect, useCallback } from 'react';
import { 
  View,
  Text,
  FlatList,
  PermissionsAndroid,
  Pressable,
  SafeAreaView,
  StyleSheet,
  BackHandler
} from 'react-native';

import RNBluetoothClassic, {
  BluetoothDevice,
  BluetoothEventSubscription,
} from 'react-native-bluetooth-classic';

//Navigation
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { useNavigation } from '@react-navigation/native'

type NewDevicesProps = NativeStackScreenProps <RootStackParamList, 'NewDevices'>

const NewDevicesScreen = ({route}: NewDevicesProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [discoveredDevices, setDiscoveredDevices] = useState<BluetoothDevice[]>([]);
  const [scanning, setScanning] = useState(false);
  const [connectingDeviceId, setConnectingDeviceId] = useState<string | null>(null);
  const [connectedDevice, setConnectedDevice] = useState<BluetoothDevice | null>(null);
  const [message, setMessage] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [dataSubscription, setDataSubscription] = useState<BluetoothEventSubscription | null>(null);

  const logMessage = (msg: string) => {
    console.log(msg);
    setLog((prev) => [...prev, msg]);
  };

  const discoverDevices = async () => {
    try {
      setScanning(true);
      logMessage('🔍 Starting discovery...');

      const enabled = await RNBluetoothClassic.isBluetoothEnabled();
      if (!enabled) {
        logMessage('❌ Bluetooth is OFF. Please turn it ON.');
        setScanning(false);
        return;
      }

      // Cancel previous discovery if still running
      const cancelResult = await RNBluetoothClassic.cancelDiscovery();
      if (cancelResult) {
        logMessage('⛔ Cancelled previous discovery.');
      }

      const permissions = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      const denied = Object.entries(permissions).filter(([_, status]) => status !== PermissionsAndroid.RESULTS.GRANTED);
      if (denied.length > 0) {
        logMessage('❌ Required permissions not granted');
        setScanning(false);
        return;
      }

      const results = await RNBluetoothClassic.startDiscovery();

      setDiscoveredDevices(results);
      logMessage(`🔎 Found ${results.length} device(s).`);
    } catch (error: any) {
      console.error('Discovery error:', error);
      logMessage(`❌ Discovery failed: ${error.message}`);
    } finally {
      setScanning(false);
    }
  };

  const connectToDevice = async (device: BluetoothDevice) => {
    setConnectingDeviceId(device.address);
    logMessage(`🔗 Connecting to ${device.name || device.address}...`);
    await new Promise((r) => setTimeout(r, 0)); // Allow UI update

    const timeout = new Promise<false>((resolve) =>
      setTimeout(() => {
        logMessage('⏱️ Connection timed out.');
        resolve(false);
      }, 20000)
    );

    try {
      const connected = await Promise.race([
        device.connect(),
        timeout,
      ]);

      if (!connected) return;

      logMessage(`✅ Connected to ${device.name}`);
      logMessage(`⏳ Redirecting...`);

      // Wait 2s and navigate
      setTimeout(() => {
        navigation.navigate('Chat', { device });
      }, 2000);
    } catch (err: any) {
      logMessage(`❌ Connection failed: ${err.message}`);
    } finally {
      setConnectingDeviceId(null);
    }
  };

  useEffect(() => {
    return () => {
      dataSubscription?.remove();
      RNBluetoothClassic.cancelDiscovery().then(() => {
        console.log('Discovery cancelled on unmount');
      });
    };
  }, [dataSubscription]);
  
  useEffect(() => {
    logMessage('🧪 System working !');
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.disconnectLog) {
        logMessage(route.params.disconnectLog);
      }
    }, [route.params])
  );

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
        return true; // prevent default back behavior
      };

      const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        backHandler.remove();
      };
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Nearby Devices</Text>
      <Text style={styles.subtitle}>Make sure to turn ON both Bluetooth and Location Services simultaneously, to be able to scan for devices.</Text>

      <Pressable
        style={[styles.connectBtn, scanning && styles.connectingBtn]}
        onPress={discoverDevices}
        disabled={scanning}>
        <Text style={styles.btnText}>{scanning ? 'Scanning...' : 'Scan for Devices'}</Text>
      </Pressable>

      <FlatList
        data={discoveredDevices}
        keyExtractor={(item) => item.address}
        style={{ marginVertical: 10 }}
        ListEmptyComponent={
          !scanning
            ? (
              <Text style={styles.emptyText}>
                No devices found. Make sure ESP32 is discoverable.
              </Text>
            )
            : null
        }
        renderItem={({ item }) => (
          <Pressable
            style={[
              styles.connectBtn,
              connectingDeviceId === item.address && styles.connectingBtn,
            ]}
            onPress={() => connectToDevice(item)}
            disabled={!!connectingDeviceId}
          >
            <Text style={styles.btnText}>
              {connectingDeviceId === item.address
                ? `🔗 Connecting to ${item.name || item.address}...`
                : `Connect to ${item.name || item.address}`}
            </Text>
          </Pressable>
        )}
      />

      <Text style={styles.logTitle}>Logs:</Text>
      <FlatList
        data={log}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <Text style={styles.logLine}>{item}</Text>}
        style={styles.logContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
  },
  subtitle: {
    fontSize: 13,
    color: '#bbb',
    marginBottom: 20,
  },
  emptyText: {
    color: 'gray',
    marginTop: 10,
    textAlign: 'center',
  },
  scanBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  scanningBtn: {
    backgroundColor: '#ccc',
  },
  connectBtn: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    marginVertical: 5,
  },
  connectingBtn: {
    backgroundColor: '#ccc',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
  connectedText: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginVertical: 10,
  },
  logTitle: {
    paddingVertical: 5,
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 16,
  },
  logContainer: {
    backgroundColor: '#f9f9f9',
    padding: 5,
    borderRadius: 6,
    maxHeight: 500,
  },
  logLine: {
    fontSize: 13,
    color: '#333',
    marginBottom: 2,
  },
});

export default NewDevicesScreen;