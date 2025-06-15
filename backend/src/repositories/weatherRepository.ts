import axios from 'axios';

export default class WeatherRepository {
  async fetchCurrentWeather(lat: string, lon: string) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,precipitation,uv_index`;
    const response = await axios.get(url);
    return response.data;
  }

  async fetchWeatherForecast(lat: string, lon: string) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,uv_index`;
    const response = await axios.get(url);
    return response.data;
  }
}