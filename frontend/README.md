# Weather Assistant – React Native Frontend

A sleek, modern personal weather assistant app built with **React Native**.  
It fetches live weather data from the [Open-Meteo API](https://open-meteo.com/) and provides unique weather notifications not found in the default iPhone Weather app.

---

## 🚀 Features

- **Current Weather:** See real-time weather for your location or any city.
- **Hourly & Daily Forecast:** Modern, animated UI with Lottie and icons.
- **Manual Location:** Search and set weather for any city.
- **Interesting Notifications:** Get iOS notifications for unique weather events (e.g., high wind, low visibility, extreme temperatures).
- **No Login Required:** Just open and use.
- **iOS & Android Support:** Designed for iPhone emulator, works on Android too.

---

## 🛠️ Getting Started

### 1. **Clone the Repository**

```sh
git clone <your-repo-url>
cd frontend
```

### 2. **Install Dependencies**

```sh
npm install
# or
yarn install
```

### 3. **Set Up Environment Variables**

Create a `.env` file in the root with your API base URLs:

```
GEO_API_URL=https://nominatim.openstreetmap.org
WEATHER_API_URL=https://api.open-meteo.com/v1
```

### 4. **iOS Setup**

- Install CocoaPods dependencies:
  ```sh
  cd ios && pod install && cd ..
  ```
- Enable **Push Notifications** and **Background Modes** in Xcode (for notifications).

### 5. **Start Metro**

```sh
npm start
# or
yarn start
```

### 6. **Run the App**

- **iOS:**
  ```sh
  npm run ios
  # or
  yarn ios
  ```
- **Android:**
  ```sh
  npm run android
  # or
  yarn android
  ```

---

## 📱 Usage

- **Home:** View current weather and forecast for your location.
- **Manual Location:** Tap the location icon to search for any city.
- **Notifications:** Receive alerts for interesting weather events (e.g., "High Wind Alert!").
- **Pull to Refresh:** Swipe down to refresh weather data.

---

## 🔔 Notifications

- The app sends **local iOS notifications** for weather events not covered by the default iPhone Weather app, such as:
  - High wind speed
  - Low visibility
  - Extreme temperatures
  - High UV index
  - Heavy rain
  - Storm warnings

---

## 🧑‍💻 Tech Stack

- **React Native** (TypeScript)
- **Redux Toolkit** for state management
- **Open-Meteo API** for weather data
- **Nominatim API** for geocoding
- **Lottie** for animations
- **react-native-push-notification** for notifications

---

## 📸 Demo

- See the demo video in the submission link for a walkthrough of the app and its features.

---

## 📝 Assignment Requirements

- [x] React Native UI
- [x] Backend (Open-Meteo API)
- [x] 2+ pages (Home, Manual Location)
- [x] iOS notifications for unique weather events
- [x] iPhone emulator support
- [x] No login required

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---

## 📚 Learn More

- [React Native Docs](https://reactnative.dev/docs/getting-started)
- [Open-Meteo API Docs](https://open-meteo.com/en/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Lottie for React Native](https://github.com/lottie-react-native/lottie-react-native)

---

## 🛡️ License

This project is for educational/demo purposes.
