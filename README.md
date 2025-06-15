# Weather Assistant App

## Overview
Weather Assistant is a sleek, modern mobile app that provides personalized weather updates and notifications.  
It uses the [Open-Meteo API](https://open-meteo.com/) for live weather data and [Nominatim](https://nominatim.openstreetmap.org/) for geocoding.  
The app features a user-friendly React Native interface and sends unique iOS notifications for interesting weather events not found in the default iPhone Weather app.

---

## Project Structure

```
.
├── backend/   # (Optional) Express/Node backend if used as a proxy or for business logic
├── frontend/  # React Native app
```

### Frontend (React Native)
- **src/App.tsx**: App entry point, navigation setup.
- **src/screens/HomeScreen.tsx**: Main weather dashboard.
- **src/screens/ManualLocation/ManualLocation.tsx**: Search/set weather for any city.
- **src/components/Header.tsx**: App header/navigation.
- **src/services/geocodeService.ts**: Geocoding (city ↔ lat/lon) via Nominatim.
- **src/services/weatherService.ts**: Weather data via Open-Meteo.
- **src/store/**: Redux Toolkit slices for weather, loader, etc.
- **src/utils/notification.ts**: Local notification setup and triggers.
- **src/assets/**: Lottie animations, icons, etc.

### Backend (Optional)
- If you have a backend, describe its endpoints and structure here.  
  (If not, remove this section.)

---

## 🚀 Features

- **Current Weather:** Real-time weather for your location or any city.
- **Hourly & Daily Forecast:** Modern, animated UI with Lottie and icons.
- **Manual Location:** Search and set weather for any city.
- **Interesting Notifications:** iOS notifications for unique weather events (e.g., high wind, low visibility, extreme temperatures, UV index, heavy rain, storm warnings).
- **No Login Required:** Just open and use.
- **iOS & Android Support:** Designed for iPhone emulator, works on Android too.

---

## 🛠️ Getting Started

### 1. Clone the Repository

```sh
git clone <your-repo-url>
cd frontend
```

### 2. Install Dependencies

```sh
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of `frontend/`:

```
GEO_API_URL=https://nominatim.openstreetmap.org
WEATHER_API_URL=https://api.open-meteo.com/v1
```

### 4. iOS Setup

- Install CocoaPods dependencies:
  ```sh
  cd ios && pod install && cd ..
  ```
- Enable **Push Notifications** and **Background Modes** in Xcode (for notifications).

### 5. Start Metro

```sh
npm start
# or
yarn start
```

### 6. Run the App

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
- **Notifications:** Receive alerts for interesting weather events.
- **Pull to Refresh:** Swipe down to refresh weather data.

---

## 🔔 Notifications

The app sends **local iOS notifications** for weather events not covered by the default iPhone Weather app, such as:
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

See the demo video in the submission link for a walkthrough of the app and its features.

---

## 📝 Assignment Requirements

- [x] React Native UI
- [x] Backend (Open-Meteo API, optional Node backend)
- [x] 2+ pages (Home, Manual Location)
- [x] iOS notifications for unique weather events
- [x] iPhone emulator support
- [x] No login required

---

## Additional Links
- GitHub Repository: [Your Repository Link]
- Demo Video: [Your Demo Video Link]

---

## License
This project is licensed under the MIT License.