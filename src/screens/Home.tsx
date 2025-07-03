import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import React from 'react'

//Navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'

type HomeProps = NativeStackScreenProps <RootStackParamList, 'Home'>

const Home = ({navigation}: HomeProps) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>ESP32 Bluetooth Manager</Text>
        <Text style={styles.subtitle}>Choose an option to get started</Text>
        
        <TouchableOpacity 
          style={styles.Button} 
          onPress={() => navigation.navigate('GetStarted')}
          activeOpacity={0.8}
        >
          <Text style={styles.BtnTitle}>📱 Get Started</Text>
          <Text style={styles.buttonSubtext}>Learn how to use this app.</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.Button} 
          onPress={() => navigation.navigate('NewDevices')}
          activeOpacity={0.8}
        >
          <Text style={styles.BtnTitle}>🔍 Connect Devices</Text>
          <Text style={styles.buttonSubtext}>Scan for nearby devices and connect</Text>
        </TouchableOpacity>
      </View>

      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Text style={{ fontSize: 12, color: '#7f8c8d' }}>
          Innovated with ❤️ by{' '}
          <Text style={{ color: 'yellow' }} onPress={() => Linking.openURL('https://github.com/adaptableCoder')}>
            adaptableCoder
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 40,
    textAlign: 'center',
  },
  BtnTitle: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  Button: {
    backgroundColor: 'green',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 15,
    marginBottom: 20,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    shadowColor: '#2ecc71',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonSubtext: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.9,
    textAlign: 'center',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#e67e22',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 15,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#e67e22',
    fontSize: 16,
    fontWeight: '600',
  },
})

export default Home
