import WeatherRepository from '../repositories/weatherRepository';

export default class WeatherService {
  private weatherRepository: WeatherRepository;

  constructor() {
    this.weatherRepository = new WeatherRepository();
  }

  async getCurrentWeather(lat: string, lon: string) {
    const data = await this.weatherRepository.fetchCurrentWeather(lat, lon);
    const current = data.current_weather;
    let interesting = '';
    if (current.uv_index > 7) interesting = 'High UV index!';
    if (current.precipitation > 0) interesting = 'Rain expected!';
    return { ...current, interesting };
  }

  async getWeatherForecast(lat: string, lon: string) {
    const data = await this.weatherRepository.fetchWeatherForecast(lat, lon);
    // Add more business logic if needed
    return data;
  }
}