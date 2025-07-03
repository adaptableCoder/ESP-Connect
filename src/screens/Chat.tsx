import React, { useState, useEffect } from 'react';
import {
  Text,
  FlatList,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Pressable
} from 'react-native';

//Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { BluetoothEventSubscription } from 'react-native-bluetooth-classic';

type ChatProps = NativeStackScreenProps <RootStackParamList, 'Chat'>

const Chat = ({ route, navigation }: ChatProps) => {
  const { device } = route.params;
  const [message, setMessage] = useState('');
  const [log, setLog] = useState<string[]>([]);
  const [subscription, setSubscription] = useState<BluetoothEventSubscription | null>(null);

  
  useEffect(() => {
    const sub = device.onDataReceived((event) => {
      setLog((prev) => [...prev, `📥 ESP32: ${event.data}`]);
    });
    setSubscription(sub);

    return () => {
      sub?.remove();
    };
  }, []);

  useEffect(() => {
    return () => {
      if (device) {
        device.disconnect()
          .then(() => console.log('✅ Device disconnected on screen unmount'))
          .catch(err => console.warn('❌ Disconnection failed:', err));
      }
    };
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;
    try {
      await device.write(`${message}\n`);
      setLog((prev) => [...prev, `📤 You: ${message}`]);
      setMessage('');
    } catch {
      setLog((prev) => [...prev, '❌ Send failed']);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Connected to {device.name}</Text>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message"
        style={styles.input}
      />
      <Pressable onPress={sendMessage} style={styles.sendButton}>
        <Text style={styles.ButtonText}>Send</Text>
      </Pressable>
      <FlatList
        data={log}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item }) => <Text style={styles.messages}>{item}</Text>}
        style={{ marginTop: 10 }}
      />

      <Pressable
        style={styles.disconnectButton}
        onPress={async () => {
          try {
            await device.disconnect();
            log.push('🔌 Disconnected manually');
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'NewDevices',
                  params: {
                    disconnectLog: `🔌 Disconnected from ${device.name}`,
                  },
                },
              ],
            });
          } catch (e) {
            log.push('❌ Failed to disconnect');
          }
        }}
      >
        <Text style={styles.ButtonText}>Disconnect</Text>
      </Pressable>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 20,
    color: '#fff',
  },
  messages: {
    color: '#fff',
    marginVertical: 5,
  },
  sendButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  disconnectButton: {
    backgroundColor: 'darkred',
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    marginBottom: 10,
  },
  ButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Chat