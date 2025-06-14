# Weather Assistant App - Backend

## Overview
The Weather Assistant App is a mobile application designed to provide users with personalized weather updates. The backend of the application is built using TypeScript and Express, and it interacts with the Open-Meteo API to fetch current weather data and forecasts.

## Features
- Fetch current weather data based on user location.
- Retrieve weather forecasts for upcoming days.
- Send iOS notifications with interesting weather updates.

## Setup Instructions

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/weather-assistant-app.git
   ```
2. Navigate to the backend directory:
   ```
   cd weather-assistant-app/backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

### Running the Server
To start the backend server, run:
```
npm start
```
The server will be running on `http://localhost:3000`.

### API Endpoints
- **GET /weather/current**: Fetches the current weather data.
- **GET /weather/forecast**: Retrieves the weather forecast.

## Development
- The backend is structured into controllers, routes, and services for better organization and maintainability.
- The main entry point of the application is located in `src/index.ts`.

## Testing
To run tests, use:
```
npm test
```

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.