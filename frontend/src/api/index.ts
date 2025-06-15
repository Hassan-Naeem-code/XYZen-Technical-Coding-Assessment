import axios from "axios";
import { WeatherData } from "../types/weather";
import { API_URL } from "@env";

const BASE_URL = API_URL;

export const fetchWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  const res = await axios.get(`${BASE_URL}/weather/current?lat=${lat}&lon=${lon}`);
  return res.data.data;
};

export const fetchForecast = async (lat: number, lon: number) => {
  const res = await axios.get(`${BASE_URL}/weather/forecast?lat=${lat}&lon=${lon}`);
  return res.data.data;
};