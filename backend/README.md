# Weather Assistant App - Backend

## Overview

The Weather Assistant App backend is a robust, enterprise-grade REST API built with TypeScript and Express. It fetches weather data from the Open-Meteo API and provides endpoints for current weather and forecasts, with industry-standard architecture, validation, logging, error handling, and documentation.

## Features

- Fetch current weather data based on user location.
- Retrieve weather forecasts for upcoming days.
- Consistent, typed API responses and error handling.
- Request validation using Zod.
- Centralized error handling with custom error classes.
- Structured logging with Winston.
- Security best practices (Helmet, rate limiting, CORS).
- Automated testing with Jest and Supertest.
- API documentation with Swagger (OpenAPI).

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/Hassan-Naeem-code/XYZen-Technical-Coding-Assessment
   ```
2. Navigate to the backend directory:
   ```sh
   cd XYZen-Technical-Coding-Assessment/backend
   ```
3. Install the dependencies:
   ```sh
   npm install
   ```

### Environment Variables

Create a `.env` file in the backend root:

```
PORT=4000
```

### Running the Server

To start the backend server, run:

```sh
npm start
```

The server will be running on `http://localhost:4000`.

### API Documentation

Swagger UI is available at:  
[http://localhost:4000/api-docs](http://localhost:4000/api-docs)

### API Endpoints

- **GET /api/weather/current**: Fetches the current weather data.  
  **Query params:** `lat` (string), `lon` (string)
- **GET /api/weather/forecast**: Retrieves the weather forecast.  
  **Query params:** `lat` (string), `lon` (string)

## Development

- **Architecture:** Follows controller-service-repository pattern.
- **Validation:** All requests are validated using Zod schemas.
- **Error Handling:** Centralized with custom `ApiError` class.
- **Logging:** All actions and errors are logged using Winston.
- **Security:** Uses Helmet and rate limiting for best practices.
- **Testing:** Automated tests in `src/__tests__/` using Jest and Supertest.
- **API Docs:** OpenAPI/Swagger docs in `src/docs/`.

## Testing

To run tests, use:

```sh
npm test
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is for educational/demo purposes.
