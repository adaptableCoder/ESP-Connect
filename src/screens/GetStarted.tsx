import React from 'react';
import {
  View,
  Text,
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  Platform,
  SafeAreaView,
  Pressable,
  ScrollView
} from 'react-native';

//Navigation
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { useNavigation } from '@react-navigation/native'

type GetStartedProps = NativeStackScreenProps <RootStackParamList, 'GetStarted'>

const GetStartedScreen = ({route}: GetStartedProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ padding: 20 }}>
        {/* 1. Welcome */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.title}>👋 ESP32 Bluetooth Classic Communication Suite</Text>
          <Text style={styles.subtitle}>This application provides a robust interface for establishing Bluetooth Classic connections between Android devices and ESP32 microcontrollers.</Text>
          <Text style={styles.subtitle}>Features bi-directional communication, device discovery, and real-time data exchange — ideal for IoT development and embedded systems integration.</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* 2. Steps to Use the App */}
        <View style={{ marginBottom: 20 }}>
          <Text style={styles.title}>🚀 Implementation Guide:</Text>

          <Text style={styles.title2}>1. Configure System Prerequisites</Text>
          <Text style={styles.subtitle}>Enable Bluetooth and Location Services in Android system settings.</Text>
          <Text style={styles.subtitle}>Grant application permissions for Bluetooth scanning, connection establishment, and location access when prompted.</Text>

          <Text style={styles.title2}>2. Initialize ESP32 Hardware</Text>
          <Text style={styles.subtitle}>Deploy Bluetooth Serial communication firmware to your ESP32 module (utilizing BluetoothSerial library).</Text>
          <Text style={styles.subtitle}>Reference implementation code is provided below for immediate deployment.</Text>
          <Text style={styles.subtitle}>Verify the device is in discoverable mode and broadcasting its identifier.</Text>

          <Text style={styles.title2}>3. Execute Device Discovery</Text>
          <Text style={styles.subtitle}>Navigate to the Device Discovery interface from the main dashboard.</Text>
          <Text style={styles.subtitle}>Initiate Bluetooth scanning protocol to enumerate available devices.</Text>
          <Text style={styles.subtitle}>Select your target ESP32 device from the discovered device list.</Text>

          <Text style={styles.title2}>4. Establish Connection</Text>
          <Text style={styles.subtitle}>Execute connection handshake with the selected ESP32 device.</Text>
          <Text style={styles.subtitle}>Ensure device identifier matches your configured ESP32 hardware.</Text>
          <Text style={styles.subtitle}>Monitor connection status through real-time logging interface.</Text>

          <Text style={styles.title2}>5. Execute Communication Protocol</Text>
          <Text style={styles.subtitle}>Upon successful connection, access the bidirectional communication interface.</Text>
          <Text style={styles.subtitle}>Transmit commands and receive responses through the integrated terminal.</Text>

          <Text style={styles.title2}>6. Terminate Connection</Text>
          <Text style={styles.subtitle}>Execute controlled disconnection using the dedicated disconnect function.</Text>
          <Text style={styles.subtitle}>System will return to device selection interface for subsequent operations.</Text>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* 3. Tips & Troubleshooting */}
        <View>
          <Text style={styles.title}>🧠 Technical Considerations:</Text>

          <Text style={styles.subtitle}>Ensure ESP32 implements Bluetooth Classic (BR/EDR) protocol, not Bluetooth Low Energy (BLE).</Text>
          <Text style={styles.subtitle}>Maximum concurrent connection limit: one client device per ESP32 instance.</Text>
          <Text style={styles.subtitle}>Execute hardware reset on ESP32 if communication becomes unresponsive or device visibility is lost.</Text>
          <Text style={styles.subtitle}>If device discovery fails, restart the application to reinitialize Bluetooth stack.</Text>

          <Text style={styles.title}>⚠️ Required System Permissions:</Text>

          <Text style={styles.subtitle}>This application requires the following Android permissions:</Text>
          <Text style={styles.subtitle}>BLUETOOTH_SCAN & BLUETOOTH_CONNECT (for device enumeration and connection management)</Text>
          <Text style={styles.subtitle}>ACCESS_FINE_LOCATION (required by Android for Bluetooth discovery operations)</Text>

          <Text style={styles.subtitle}>Verify all permissions are granted in Android system settings.</Text>

        </View>

        {/* Divider */}
        <View style={styles.divider} />

         {/* 4. Sample Code */}
        <View>
          <Text style={styles.title}>📩 ESP32 Firmware Implementation:</Text>

          <Text style={styles.subtitle}>Reference implementation for ESP32 Bluetooth Classic communication:</Text>

          <Text style={styles.subtitle}>Compatible with Arduino IDE or PlatformIO development environments using Arduino framework.</Text>
          <Text style={styles.subtitle}>Requires BluetoothSerial library dependency (included in ESP32 Arduino Core).</Text>
          <ScrollView 
            horizontal={true} 
            style={styles.codeContainer}
            showsHorizontalScrollIndicator={true}
          >
            <Text style={styles.codeBlock}>
              <Text style={styles.codeInclude}>#include</Text>
              <Text style={styles.codeString}> "BluetoothSerial.h"</Text>
              {'\n\n'}
              <Text style={styles.codeType}>BluetoothSerial</Text>
              <Text style={styles.codeDefault}> SerialBT;</Text>
              {'\n\n'}
              <Text style={styles.codeKeyword}>void</Text>
              <Text style={styles.codeFunction}> setup</Text>
              <Text style={styles.codeDefault}>{'() {'}</Text>
              {'\n  '}
              <Text style={styles.codeType}>Serial</Text>
              <Text style={styles.codeDefault}>.</Text>
              <Text style={styles.codeFunction}>begin</Text>
              <Text style={styles.codeDefault}>(</Text>
              <Text style={styles.codeNumber}>115200</Text>
              <Text style={styles.codeDefault}>{')'};                        </Text>
              <Text style={styles.codeComment}>// For USB Serial Monitor</Text>
              {'\n  '}
              <Text style={styles.codeDefault}>SerialBT.</Text>
              <Text style={styles.codeFunction}>begin</Text>
              <Text style={styles.codeDefault}>(</Text>
              <Text style={styles.codeString}>"ESP32-BT-Test"</Text>
              <Text style={styles.codeDefault}>{')'};   </Text>
              <Text style={styles.codeComment}>// Device name shown on Bluetooth (Using classic bluetooth)</Text>
              {'\n  '}
              <Text style={styles.codeDefault}>SerialBT.</Text>
              <Text style={styles.codeFunction}>enableSSP</Text>
              <Text style={styles.codeDefault}>();                       </Text>
              <Text style={styles.codeComment}>// 🔐 Enables Secure Simple Pairing (no PIN)</Text>
              {'\n  '}
              <Text style={styles.codeType}>Serial</Text>
              <Text style={styles.codeDefault}>.</Text>
              <Text style={styles.codeFunction}>println</Text>
              <Text style={styles.codeDefault}>(</Text>
              <Text style={styles.codeString}>"✅ Bluetooth started! Pair with 'ESP32-BT-Test'"</Text>
              <Text style={styles.codeDefault}>{')'};           </Text>
              {'\n}'}
              {'\n\n'}
              <Text style={styles.codeKeyword}>void</Text>
              <Text style={styles.codeFunction}> loop</Text>
              <Text style={styles.codeDefault}>{'() {'}</Text>
              {'\n  '}
              <Text style={styles.codeKeyword}>if</Text>
              <Text style={styles.codeDefault}> (SerialBT.</Text>
              <Text style={styles.codeFunction}>available</Text>
              <Text style={styles.codeDefault}>{'()) {'}</Text>
              {'\n    '}
              <Text style={styles.codeKeyword}>char</Text>
              <Text style={styles.codeDefault}> c = SerialBT.</Text>
              <Text style={styles.codeFunction}>read</Text>
              <Text style={styles.codeDefault}>();</Text>
              {'\n    '}
              <Text style={styles.codeType}>Serial</Text>
              <Text style={styles.codeDefault}>.</Text>
              <Text style={styles.codeFunction}>write</Text>
              <Text style={styles.codeDefault}>(c);                  </Text>
              <Text style={styles.codeComment}>// Show Bluetooth data in Serial Monitor</Text>
              {'\n  }'}
              {'\n\n  '}
              <Text style={styles.codeKeyword}>if</Text>
              <Text style={styles.codeDefault}> (</Text>
              <Text style={styles.codeType}>Serial</Text>
              <Text style={styles.codeDefault}>.</Text>
              <Text style={styles.codeFunction}>available</Text>
              <Text style={styles.codeDefault}>{'()) {'}</Text>
              {'\n    '}
              <Text style={styles.codeKeyword}>char</Text>
              <Text style={styles.codeDefault}> c = </Text>
              <Text style={styles.codeType}>Serial</Text>
              <Text style={styles.codeDefault}>.</Text>
              <Text style={styles.codeFunction}>read</Text>
              <Text style={styles.codeDefault}>{'()'};           </Text>
              {'\n    '}
              <Text style={styles.codeDefault}>SerialBT.</Text>
              <Text style={styles.codeFunction}>write</Text>
              <Text style={styles.codeDefault}>(c);             </Text>
              <Text style={styles.codeComment}>// Send data from Serial Monitor to phone</Text>
              {'\n  }'}
              {'\n}'}
            </Text>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontWeight: '700',
    fontSize: 20,
    marginBottom: 12,
    color: '#ffffff',
    letterSpacing: 0.5,
  },
  title2: {
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 8,
    marginTop: 16,
    color: '#f8f9fa',
    letterSpacing: 0.3,
  },
  subtitle: {
    fontSize: 15,
    color: '#e9ecef',
    marginBottom: 6,
    marginLeft: 16,
    lineHeight: 22,
    letterSpacing: 0.1,
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a2a',
    marginVertical: 20,
    opacity: 0.6,
  },
  codeBlock: {
    fontSize: 12,
    color: '#00ff00',
    fontFamily: 'monospace',
    padding: 15,
    minWidth: 400,
  },
  codeContainer: {
    marginVertical: 10,
    marginBottom: 50,
    backgroundColor: '#1a1a1a',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#333',
  },
  codeInclude: {
    fontSize: 12,
    color: '#ff6b6b',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  codeString: {
    fontSize: 12,
    color: '#4ecdc4',
    fontFamily: 'monospace',
  },
  codeType: {
    fontSize: 12,
    color: '#45b7d1',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  codeKeyword: {
    fontSize: 12,
    color: '#ff79c6',
    fontFamily: 'monospace',
    fontWeight: 'bold',
  },
  codeFunction: {
    fontSize: 12,
    color: '#ffeaa7',
    fontFamily: 'monospace',
  },
  codeDefault: {
    fontSize: 12,
    color: '#ffffff',
    fontFamily: 'monospace',
  },
  codeNumber: {
    fontSize: 12,
    color: '#fd79a8',
    fontFamily: 'monospace',
  },
  codeComment: {
    fontSize: 12,
    color: '#6c757d',
    fontFamily: 'monospace',
    fontStyle: 'italic',
  },
  chatContainer: {
    marginTop: 20,
  },
  connectedText: {
    fontSize: 16,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginVertical: 10,
    borderRadius: 5,
  },
  logTitle: {
    fontWeight: 'bold',
    marginTop: 10,
  },
  logLine: {
    fontSize: 14,
    paddingVertical: 2,
  },
  connectBtn: {
    borderRadius: 10,
    padding: 10,
  }
});

export default GetStartedScreen;