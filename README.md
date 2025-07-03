
# 🔵 ESP32 Bluetooth Communicator

A React Native Android application for establishing **Bluetooth Classic (SPP)** communication with ESP32 boards. This app enables smooth, real-time, bidirectional data exchange between your Android device and ESP32 via serial Bluetooth — ideal for embedded development, IoT prototyping, and hardware interfacing.

---

## 🚀 What This App Does

- 🔍 **Discovers** nearby Bluetooth Classic (not BLE) devices  
- 🔗 **Connects** to ESP32 and other compatible modules using SPP  
- 💬 **Sends and receives** serial data with real-time log output  
- 🧾 Provides a clean **chat-like interface** for terminal-style communication  
- 📲 Handles permissions & discovery gracefully  
- 🧭 Includes an in-app **Get Started Guide** with instructions for ESP32 setup  

---

## 🚀 APK File

You can find the APK file for this app in the root directory itself.
```
../app-release.apk
```
Simply download this file in your Android phone and run it to install the app.

---

## 🛠 Running Locally (for Developers)

> **Platform Support:** Android only  
> iOS is not supported due to lack of Bluetooth Classic API access.

### 1. Clone the Repository

```bash
git clone https://github.com/adaptableCoder/ESP-Connect.git
cd ESP-Connect
```

### 2. Install Dependencies

```bash
# Using npm
npm install
```

### 3. Run the App on Android

Start the Metro bundler:

```bash
# Using npm
npm start

# OR using Yarn
yarn start
```

Build and launch on a connected Android device or emulator:

```bash
npm run android

# OR using Yarn
yarn start
```
### iOS (Still if you want to try and tweak)

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

---

## 📂 Project Structure Overview

```
src/
 ┣ App.tsx                 # App entry point and root navigator
 ┗ screens/
   ┣ HomeScreen.tsx
   ┣ NewDevices.tsx
   ┣ GetStarted.tsx
   ┗ Chat.tsx

```

---

## 💡 Using the App

For setup instructions and a complete usage guide:

> 📖 **Open the app** and navigate to the **"Get Started"** screen.

This guide covers:
- Required Android permissions
- ESP32 firmware expectations
- Device discovery and connection flow
- Communication workflow
- Troubleshooting and tips

---

## 🧪 Troubleshooting

| Problem                            | Possible Fix                                                 |
|------------------------------------|--------------------------------------------------------------|
| Device not found                   | Make sure ESP32 is powered and discoverable via Bluetooth    |
| App doesn't ask for permissions    | Manually enable from system settings                         |
| Still scanning after timeout       | Restart the app to reinitiate discovery                      |
| Logs not shown                     | Ensure proper pairing and that ESP32 is not already connected|

---

## 🛠 Tech Stack

- **React Native** (CLI)
- **TypeScript**
- **React Navigation**
- [`react-native-bluetooth-classic`](https://github.com/kenjdavidson/react-native-bluetooth-classic)
- **ESP32** with Bluetooth Serial

---

## 📚 Resources

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [ESP32 Bluetooth Classic (SPP)](https://randomnerdtutorials.com/esp32-bluetooth-classic-arduino/)
- [Bluetooth Classic Plugin](https://github.com/kenjdavidson/react-native-bluetooth-classic)
