import { Request, Response } from "express";
import WeatherService from "../services/weatherService";
import { ApiError } from "../utils/error";
import { WeatherData } from "../types/weather";
import { ApiResponse } from "../utils/response";
export default class WeatherController {
  private weatherService: WeatherService;

  constructor() {
    this.weatherService = new WeatherService();
  }

  async getCurrentWeather(req: Request, res: Response): Promise<void> {
    // Extract latitude and longitude from query parameters
    const { lat, lon } = req.query;
    if (!lat || !lon) throw new ApiError("Missing lat/lon", 400);
    try {
      const weather: WeatherData = await this.weatherService.getCurrentWeather(
        lat as string,
        lon as string
      );
      res.status(200).json(new ApiResponse(weather));
    } catch (err) {
      throw new ApiError("Failed to fetch weather", 500);
    }
  }

  async getWeatherForecast(req: Request, res: Response) {
    // Extract latitude and longitude from query parameters
    const { lat, lon } = req.query;
    if (!lat || !lon) throw new ApiError("Missing lat/lon", 400);
    try {
      const forecast = await this.weatherService.getWeatherForecast(
        lat as string,
        lon as string
      );
      res.status(200).json(new ApiResponse(forecast));
    } catch (err) {
      throw new ApiError("Failed to fetch weather", 500);
    }
  }
}
