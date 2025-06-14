import { Request, Response } from 'express';
import { OpenMeteoService } from '../services/openMeteoService';

export class WeatherController {
    private openMeteoService: OpenMeteoService;

    constructor() {
        this.openMeteoService = new OpenMeteoService();
    }

    public async getCurrentWeather(req: Request, res: Response): Promise<void> {
        try {
            const { latitude, longitude } = req.query;
            const weatherData = await this.openMeteoService.fetchCurrentWeather(latitude as string, longitude as string);
            res.status(200).json(weatherData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching current weather', error });
        }
    }

    public async getWeatherForecast(req: Request, res: Response): Promise<void> {
        try {
            const { latitude, longitude } = req.query;
            const forecastData = await this.openMeteoService.fetchWeatherForecast(latitude as string, longitude as string);
            res.status(200).json(forecastData);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching weather forecast', error });
        }
    }
}