# Weather Assistant App

## Overview
The Weather Assistant App is a mobile application designed to provide users with personalized weather updates and notifications. It utilizes the Open-Meteo API to fetch current weather data and forecasts based on the user's location. The app features a sleek and modern interface, making it easy for users to navigate and access weather information.

## Project Structure
The project is divided into two main parts: the backend and the frontend.

### Backend
The backend is built using TypeScript and Express. It handles API requests and interacts with the Open-Meteo API to retrieve weather data.

- **src/index.ts**: Entry point of the backend application, sets up the Express server and initializes routes.
- **src/controllers/weatherController.ts**: Contains the `WeatherController` class with methods for fetching current weather and forecasts.
- **src/routes/weatherRoutes.ts**: Sets up the routes for weather-related endpoints using the `WeatherController`.
- **src/services/openMeteoService.ts**: Interacts with the Open-Meteo API to fetch weather data.
- **package.json**: Lists dependencies and scripts for the backend.
- **tsconfig.json**: TypeScript configuration for the backend.
- **README.md**: Documentation for the backend setup and API usage.

### Frontend
The frontend is developed using React Native with TypeScript. It provides a user-friendly interface for displaying weather information and notifications.

- **src/App.tsx**: Main entry point of the frontend application, sets up navigation and renders components.
- **src/components/WeatherCard.tsx**: Displays current weather data in a card format.
- **src/components/NotificationBanner.tsx**: Shows notifications regarding weather updates.
- **src/screens/HomeScreen.tsx**: Main screen displaying the `WeatherCard` and navigation options.
- **src/screens/DetailsScreen.tsx**: Displays detailed weather information for selected items.
- **src/screens/SettingsScreen.tsx**: Allows users to configure app settings, including notification preferences.
- **src/utils/api.ts**: Contains functions for API calls to the backend.
- **package.json**: Lists dependencies and scripts for the frontend.
- **tsconfig.json**: TypeScript configuration for the frontend.
- **README.md**: Documentation for the frontend setup and usage.

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the application:
   ```
   npm start
   ```

## Features
- Current weather updates based on user location.
- Detailed weather forecasts.
- User notifications for interesting weather updates not typically provided by standard weather apps.

## Additional Links
- GitHub Repository: [Your Repository Link]
- Demo Video: [Your Demo Video Link]

## License
This project is licensed under the MIT License.