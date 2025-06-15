import { AxiosResponse } from "axios";
import requests from "./http.service";

const WeatherServices = {
  fetchCurrentWeather(query: any): Promise<AxiosResponse<any, any>> {
    return requests.get(`/weather/current?${query}`);
  },
  fetchCurrentWeatherForecast(query: any): Promise<AxiosResponse<any, any>> {
    return requests.get(`/weather/forecast?${query}`);
  },
};

export default WeatherServices;
