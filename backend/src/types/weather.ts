export interface WeatherData {
  temperature: number;
  windspeed: number;
  uv_index: number;
  precipitation: number;
  interesting: string;
}
export interface WeatherForecast {
  date: string;
  temperature: number;
  windspeed: number;
  uv_index: number;
  precipitation: number;
  interesting: string;
}
export interface WeatherResponse {
  current: WeatherData;
  forecast: WeatherForecast[];
}
