import axios from "axios";

export default class WeatherRepository {
  async fetchCurrentWeather(lat: string, lon: string) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,apparent_temperature,precipitation,uv_index,relative_humidity_2m,windspeed_10m,winddirection_10m,weathercode,cloudcover,pressure_msl,dewpoint_2m,visibility,surface_pressure`;
    const response = await axios.get(url);
    return response.data;
  }

  async fetchWeatherForecast(lat: string, lon: string) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation,uv_index,relative_humidity_2m,windspeed_10m,winddirection_10m,weathercode,cloudcover,pressure_msl,dewpoint_2m,visibility,surface_pressure`;
    const response = await axios.get(url);
    return response.data;
  }
}
