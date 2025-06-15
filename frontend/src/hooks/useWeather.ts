import { useEffect, useState } from "react";
import { fetchWeather, fetchForecast } from "../api";

export function useWeather(lat: number, lon: number) {
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeather(lat, lon)
      .then(setWeather)
      .catch(() => setError("Failed to load weather"));
    fetchForecast(lat, lon)
      .then(setForecast)
      .catch(() => setError("Failed to load forecast"));
  }, [lat, lon]);

  return { weather, forecast, error };
}
