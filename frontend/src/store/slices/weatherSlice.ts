import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showLoader, hideLoader } from "./loaderSlice";
import WeatherServices from "../../services/weatherService";

export const fetchWeather = createAsyncThunk(
  "weather/fetchWeather",
  async (
    { lat, lon }: { lat: number; lon: number },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(showLoader());
    try {
      const res = await WeatherServices.fetchCurrentWeather(
        `lat=${lat}&lon=${lon}`
      );
      if (!res.data) throw new Error("No data received");
      return res.data.data;
    } catch (error: any) {
      // console.log("error", error);
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Unknown error"
      );
    } finally {
      dispatch(hideLoader());
    }
  }
);

export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (
    { lat, lon }: { lat: number; lon: number },
    { dispatch, rejectWithValue }
  ) => {
    dispatch(showLoader());
    try {
      const res = await WeatherServices.fetchCurrentWeatherForecast(
        `lat=${lat}&lon=${lon}`
      );
      if (!res.data) throw new Error("No data received");
      return res.data.data;
    } catch (error: any) {
      // console.log("error", error);
      return rejectWithValue(
        error?.response?.data?.message || error.message || "Unknown error"
      );
    } finally {
      dispatch(hideLoader());
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    weather: {} as any, // Replace with your actual WeatherData type
    forecast: {} as any, // Replace with your actual ForecastData type
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.weather = action.payload;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch weather";
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.forecast = action.payload;
        state.error = null;
      })
      .addCase(fetchForecast.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch forecast";
      });
  },
});

export default weatherSlice.reducer;
