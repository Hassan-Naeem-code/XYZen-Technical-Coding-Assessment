import { Request, Response } from 'express';
import { OpenMeteoService } from '../services/openMeteoService';

export default class WeatherController {
    private openMeteoService: OpenMeteoService;

    constructor() {
        this.openMeteoService = new OpenMeteoService();
    }

    public async getCurrentWeather(req: Request, res: Response): Promise<void> {
        try {
            const { latitude, longitude } = req.query;
            const lat = Number(latitude);
            const lon = Number(longitude);
            const weatherData = await this.openMeteoService.fetchCurrentWeather(lat, lon);
            res.status(200).json(weatherData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching current weather', error });
        }
    }

    public async getWeatherForecast(req: Request, res: Response): Promise<void> {
        try {
            const { latitude, longitude } = req.query;
            const lat = Number(latitude);
            const lon = Number(longitude);
            const forecastData = await this.openMeteoService.fetchWeatherForecast(lat, lon);
            res.status(200).json(forecastData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching weather forecast', error });
        }
    }
}