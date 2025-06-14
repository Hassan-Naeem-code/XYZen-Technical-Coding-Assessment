import axios from 'axios';

const OPEN_METEO_API_URL = 'https://api.open-meteo.com/v1/forecast';

export class OpenMeteoService {
    async fetchCurrentWeather(latitude: number, longitude: number): Promise<any> {
        try {
            const response = await axios.get(OPEN_METEO_API_URL, {
                params: {
                    latitude,
                    longitude,
                    current_weather: true,
                },
            });
            return response.data.current_weather;
        } catch (error) {
            throw new Error('Error fetching current weather data: ' + error.message);
        }
    }

    async fetchWeatherForecast(latitude: number, longitude: number): Promise<any> {
        try {
            const response = await axios.get(OPEN_METEO_API_URL, {
                params: {
                    latitude,
                    longitude,
                    hourly: 'temperature_2m,precipitation_sum',
                },
            });
            return response.data.hourly;
        } catch (error) {
            throw new Error('Error fetching weather forecast data: ' + error.message);
        }
    }
}