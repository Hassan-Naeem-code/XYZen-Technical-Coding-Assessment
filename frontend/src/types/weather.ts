export interface WeatherData {
  temperature: number;
  windspeed: number;
  uv_index: number;
  precipitation: number;
  interesting: string;
}

export interface ForecastData {
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
    uv_index: number[];
  };
}
