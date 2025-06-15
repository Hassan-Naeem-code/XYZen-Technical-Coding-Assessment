import axios from "axios";

const BASE_URL = "http://localhost:4000/api"; // Use your backend URL

export const fetchWeather = async (lat: number, lon: number) => {
  const response = await axios.get(
    `${BASE_URL}/weather/current?lat=${lat}&lon=${lon}`
  );
  return response.data;
};
export const fetchForecast = async (lat: number, lon: number) => {
  const response = await axios.get(
    `${BASE_URL}/weather/forecast?lat=${lat}&lon=${lon}`
  );
  console.log("response", response);
  return response.data;
};
export const fetchAirQuality = async (lat: number, lon: number) => {
  const response = await axios.get(
    `${BASE_URL}/air-quality?lat=${lat}&lon=${lon}`
  );
  return response.data;
};
export const fetchNews = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/news?query=${query}`);
  return response.data;
};
export const fetchCovidStats = async (country: string) => {
  const response = await axios.get(
    `${BASE_URL}/covid-stats?country=${country}`
  );
  return response.data;
};
export const fetchCryptoPrices = async (currency: string) => {
  const response = await axios.get(
    `${BASE_URL}/crypto-prices?currency=${currency}`
  );
  return response.data;
};
export const fetchSportsScores = async (league: string) => {
  const response = await axios.get(
    `${BASE_URL}/sports-scores?league=${league}`
  );
  return response.data;
};
export const fetchStockPrices = async (symbol: string) => {
  const response = await axios.get(`${BASE_URL}/stock-prices?symbol=${symbol}`);
  return response.data;
};
export const fetchEntertainmentNews = async (category: string) => {
  const response = await axios.get(
    `${BASE_URL}/entertainment-news?category=${category}`
  );
  return response.data;
};
export const fetchTravelInfo = async (destination: string) => {
  const response = await axios.get(
    `${BASE_URL}/travel-info?destination=${destination}`
  );
  return response.data;
};
export const fetchHealthTips = async () => {
  const response = await axios.get(`${BASE_URL}/health-tips`);
  return response.data;
};
export const fetchLocalEvents = async (location: string) => {
  const response = await axios.get(
    `${BASE_URL}/local-events?location=${location}`
  );
  return response.data;
};
